# Google Sheets Integration Setup Guide

## 🎯 Why Google Sheets for Real Estate?

**Perfect for Rachel's business:**
- ✅ **Familiar interface** - Easy to use and manage
- ✅ **Real-time updates** - See leads as they come in
- ✅ **Easy sharing** - Share with team members
- ✅ **Mobile access** - Check leads on the go
- ✅ **Export capabilities** - Import to CRM systems
- ✅ **Free** - No monthly costs

## 📋 Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Rachel's Real Estate Leads"
4. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

### 2. Set Up Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name: "Rachel Real Estate Website"
   - Click "Create and Continue"
   - Skip role assignment for now
   - Click "Done"

5. Create a Service Account Key:
   - Click on your new service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file

### 3. Share the Google Sheet

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from the JSON file):
   - Email: `your-service-account@project-id.iam.gserviceaccount.com`
   - Role: "Editor"
   - Click "Send"

### 4. Set Up Environment Variables

Add these to your `.env.local` file:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your-spreadsheet-id-here
GOOGLE_SHEET_NAME=Leads
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"

# SMTP Configuration (still needed for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_TO=rachel@compass.com
MAIL_FROM=Website <your-email@gmail.com>
```

## 📊 What Gets Tracked

The system will automatically create columns for:

| Column | Description |
|--------|-------------|
| **Timestamp** | When the lead was captured |
| **Type** | "newsletter" or "contact" |
| **Email** | Lead's email address |
| **Name** | Lead's name (if provided) |
| **Phone** | Lead's phone number (if provided) |
| **Neighborhoods** | Areas of interest (if provided) |
| **Message** | Additional message (if provided) |
| **Source** | Always "Website" |

## 🔄 How It Works

### Newsletter Signups
- User enters email in newsletter form
- Data saved to Google Sheet
- Email notification sent to Rachel
- Lead marked as "newsletter" type

### Contact Form Submissions
- User fills out contact form
- All details saved to Google Sheet
- Email notification sent to Rachel
- Lead marked as "contact" type

## 🚀 Benefits for Rachel

**Real-time Lead Management:**
- See all leads in one place
- Track lead sources and types
- Follow up on contact inquiries
- Manage newsletter subscribers

**Easy CRM Integration:**
- Export leads to Excel/CSV
- Import into Compass CRM
- Share with team members
- Mobile access for on-the-go

**Professional Organization:**
- Automatic timestamping
- Categorized lead types
- Complete contact information
- Source tracking

## 🔧 Troubleshooting

### Common Issues:

**"Sheet not configured" error:**
- Check `GOOGLE_SHEET_ID` is correct
- Ensure sheet is shared with service account

**"Failed to add lead to sheet" error:**
- Verify service account has Editor access
- Check `GOOGLE_PRIVATE_KEY` format (include \n characters)
- Ensure Google Sheets API is enabled

**Authentication errors:**
- Double-check service account email
- Verify private key is properly formatted
- Ensure JSON credentials are correct

## 📱 Mobile Access

Rachel can access leads on mobile:
1. Install Google Sheets app
2. Open "Rachel's Real Estate Leads" sheet
3. View leads in real-time
4. Add notes or follow-up actions
5. Export for CRM import

## 🔒 Security Notes

- Service account has limited access to only your sheet
- Private key should be kept secure
- Sheet sharing is controlled by you
- No sensitive data stored in code

## 🎉 Next Steps

1. **Set up the Google Sheet** (5 minutes)
2. **Configure service account** (10 minutes)
3. **Add environment variables** (2 minutes)
4. **Test the forms** (5 minutes)
5. **Start capturing leads!** 🚀

This system will give Rachel a professional, easy-to-use lead management system that integrates perfectly with her real estate business!
