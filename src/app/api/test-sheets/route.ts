// Test endpoint to verify Google Sheets configuration
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { setupSheetHeaders } from "@/lib/googleSheets";
import { google } from 'googleapis';

export async function GET() {
  try {
    // Check if environment variables are present
    const envCheck = {
      GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_SHEET_NAME: !!process.env.GOOGLE_SHEET_NAME,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
    };

    // Show partial values for debugging (without exposing full secrets)
    const envValues = {
      GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID ? `${process.env.GOOGLE_SHEET_ID.substring(0, 10)}...` : 'NOT_SET',
      GOOGLE_SHEET_NAME: process.env.GOOGLE_SHEET_NAME || 'NOT_SET',
      GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'NOT_SET', // Show full email for sharing
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? `${process.env.GOOGLE_PRIVATE_KEY.substring(0, 30)}...` : 'NOT_SET',
    };

    // Test Google Sheets connection
    let sheetTest;
    let authTest;
    
    try {
      // Test authentication first
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      // Test if we can get credentials
      const authClient = await auth.getClient();
      authTest = { success: true, message: "Authentication successful" };
      
      // Test Google Sheets connection
      sheetTest = await setupSheetHeaders();
    } catch (authError) {
      authTest = { 
        success: false, 
        error: authError instanceof Error ? authError.message : "Authentication failed",
        details: authError
      };
      sheetTest = { success: false, error: "Authentication failed" };
    }

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      envVariables: envCheck,
      envValues: envValues,
      authTest: authTest,
      sheetTest: sheetTest,
      message: "Google Sheets configuration test completed"
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
