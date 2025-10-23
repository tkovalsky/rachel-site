import { google } from 'googleapis';

// Google Sheets API setup
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export interface LeadData {
  timestamp: string;
  type: 'newsletter' | 'contact';
  email: string;
  name?: string;
  phone?: string;
  neighborhoods?: string;
  message?: string;
  source: string;
}

export async function addLeadToSheet(leadData: LeadData): Promise<{ success: boolean; error?: string; isDuplicate?: boolean }> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Leads';

    if (!spreadsheetId) {
      console.warn('Google Sheet ID not configured');
      return { success: false, error: 'Sheet not configured' };
    }

    // Check for duplicate email first (but don't fail if check fails)
    try {
      const duplicateCheck = await checkForDuplicateEmail(leadData.email, spreadsheetId, sheetName);
      if (duplicateCheck.isDuplicate) {
        console.log('Duplicate email detected:', leadData.email);
        return { success: true, isDuplicate: true };
      }
    } catch (duplicateError) {
      console.warn('Duplicate check failed, proceeding with lead addition:', duplicateError);
      // Continue with lead addition even if duplicate check fails
    }

    // Prepare the row data with validation
    const rowData = [
      leadData.timestamp,
      leadData.type,
      leadData.email.toLowerCase().trim(), // Normalize email
      (leadData.name || '').trim(),
      (leadData.phone || '').trim(),
      (leadData.neighborhoods || '').trim(),
      (leadData.message || '').trim(),
      leadData.source,
    ];

    // Append the row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:H`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Lead added to Google Sheets:', leadData.email);
    return { success: true };
  } catch (error) {
    console.error('Error adding lead to Google Sheets:', error);
    return { success: false, error: 'Failed to add lead to sheet' };
  }
}

async function checkForDuplicateEmail(email: string, spreadsheetId: string, sheetName: string): Promise<{ isDuplicate: boolean; error?: string }> {
  try {
    // Get all existing emails from column C (Email column)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!C:C`,
    });

    const existingEmails = response.data.values?.flat() || [];
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if email already exists (case-insensitive)
    const isDuplicate = existingEmails.some((existingEmail: unknown) => 
      existingEmail && 
      typeof existingEmail === 'string' && 
      existingEmail.toLowerCase().trim() === normalizedEmail
    );

    return { isDuplicate };
  } catch (error) {
    console.error('Error checking for duplicate email:', error);
    return { isDuplicate: false, error: 'Failed to check for duplicates' };
  }
}

export async function setupSheetHeaders(): Promise<{ success: boolean; error?: string }> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Leads';

    if (!spreadsheetId) {
      return { success: false, error: 'Sheet not configured' };
    }

    // Check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:H1`,
    });

    const existingHeaders = response.data.values?.[0];
    
    // If no headers exist, add them
    if (!existingHeaders || existingHeaders.length === 0) {
      const headers = [
        'Timestamp',
        'Type',
        'Email',
        'Name',
        'Phone',
        'Neighborhoods',
        'Message',
        'Source',
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:H1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });

      console.log('Headers added to Google Sheet');
    }

    return { success: true };
  } catch (error) {
    console.error('Error setting up sheet headers:', error);
    return { success: false, error: 'Failed to setup sheet headers' };
  }
}
