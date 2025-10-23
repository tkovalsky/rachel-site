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

export async function addLeadToSheet(leadData: LeadData): Promise<{ success: boolean; error?: string; isDuplicate?: boolean; action?: string }> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || 'Leads';

    if (!spreadsheetId) {
      console.warn('Google Sheet ID not configured');
      return { success: false, error: 'Sheet not configured' };
    }

    // Check for existing email and determine action
    try {
      const existingLead = await findExistingLead(leadData.email, spreadsheetId, sheetName);
      
      if (existingLead) {
        // Smart duplicate handling based on lead types
        const action = determineLeadAction(existingLead, leadData);
        
        if (action === 'skip') {
          console.log('Duplicate email with same type, skipping:', leadData.email);
          return { success: true, isDuplicate: true, action: 'skipped' };
        } else if (action === 'update') {
          console.log('Updating existing lead with additional info:', leadData.email);
          await updateExistingLead(existingLead, leadData, spreadsheetId, sheetName);
          return { success: true, action: 'updated' };
        }
        // If action is 'add', continue to add new row
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

// Enhanced lead management functions
async function findExistingLead(email: string, spreadsheetId: string, sheetName: string): Promise<any> {
  try {
    // Get all data to find the most recent entry for this email
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:H`,
    });

    const rows = response.data.values || [];
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find the most recent entry for this email (assuming data is chronological)
    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i];
      if (row && row[2] && row[2].toLowerCase().trim() === normalizedEmail) {
        return {
          rowIndex: i + 1, // Google Sheets is 1-indexed
          data: {
            timestamp: row[0],
            type: row[1],
            email: row[2],
            name: row[3],
            phone: row[4],
            neighborhoods: row[5],
            message: row[6],
            source: row[7]
          }
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding existing lead:', error);
    return null;
  }
}

function determineLeadAction(existingLead: any, newLeadData: LeadData): 'skip' | 'update' | 'add' {
  const existing = existingLead.data;
  
  // If same type (both newsletter or both contact), skip
  if (existing.type === newLeadData.type) {
    return 'skip';
  }
  
  // If different types, update with additional information
  // newsletter -> contact: add contact details
  // contact -> newsletter: just add newsletter signup
  if (existing.type === 'newsletter' && newLeadData.type === 'contact') {
    return 'update'; // Add contact details to newsletter signup
  }
  
  if (existing.type === 'contact' && newLeadData.type === 'newsletter') {
    return 'add'; // Add newsletter signup as new entry
  }
  
  return 'add';
}

async function updateExistingLead(existingLead: any, newLeadData: LeadData, spreadsheetId: string, sheetName: string): Promise<void> {
  try {
    const existing = existingLead.data;
    
    // Merge data intelligently
    const updatedData = [
      existing.timestamp, // Keep original timestamp
      'contact', // Upgrade to contact type
      newLeadData.email.toLowerCase().trim(),
      newLeadData.name || existing.name || '', // Use new name if provided
      newLeadData.phone || existing.phone || '', // Use new phone if provided
      newLeadData.neighborhoods || existing.neighborhoods || '', // Merge neighborhoods
      newLeadData.message || existing.message || '', // Use new message if provided
      `${existing.source}, ${newLeadData.source}` // Combine sources
    ];

    // Update the existing row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${existingLead.rowIndex}:H${existingLead.rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [updatedData],
      },
    });

    console.log('Updated existing lead with additional information');
  } catch (error) {
    console.error('Error updating existing lead:', error);
    throw error;
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
