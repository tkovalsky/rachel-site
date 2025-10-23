# Additional Google Sheets Integration Steps

## 🎯 Current Status
✅ **Already Implemented:**
- Google Sheets API integration (`src/lib/googleSheets.ts`)
- Contact form API route with Google Sheets integration
- Lead data structure and types
- Header setup functionality
- `googleapis` package installed
- Contact form component

## 🔧 Missing Implementation Steps

### 1. Newsletter Signup Form
**Status:** ❌ Missing

**What's needed:**
- Create a dedicated newsletter signup form component
- Add newsletter signup to relevant pages (homepage, guides, etc.)
- Ensure it sends `type: 'newsletter'` to the API

**Files to create/modify:**
- `src/app/components/NewsletterSignup.tsx` (new)
- Add to homepage and guide pages

### 2. Source Field Implementation
**Status:** ⚠️ Partially implemented

**What's needed:**
- Add `source` hidden field to ContactForm
- Add `source` hidden field to NewsletterSignup
- Update API to handle source field properly

**Current issue:** ContactForm doesn't include source field

### 3. Environment Variables Setup
**Status:** ❓ Unknown - needs verification

**Required variables:**
```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your-spreadsheet-id-here
GOOGLE_SHEET_NAME=Leads
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"

# SMTP Configuration (for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_TO=rachel@compass.com
MAIL_FROM=Website <your-email@gmail.com>
```

### 4. Google Sheet Setup
**Status:** ❌ Needs to be created

**Steps:**
1. Create Google Sheet named "Rachel's Real Estate Leads"
2. Set up Google Cloud Service Account
3. Share sheet with service account
4. Add environment variables to `.env.local`
5. Add same variables to Vercel dashboard

### 5. Testing & Validation
**Status:** ❌ Not tested

**Test scenarios:**
- Contact form submission
- Newsletter signup
- Verify data appears in Google Sheet
- Verify email notifications work
- Test on mobile devices

## 🚀 Implementation Priority

### Phase 1: Complete Current Implementation
1. **Add source field to ContactForm**
2. **Create NewsletterSignup component**
3. **Set up Google Sheet and environment variables**
4. **Test contact form integration**

### Phase 2: Newsletter Integration
1. **Add newsletter signup to homepage**
2. **Add newsletter signup to guide pages**
3. **Test newsletter signup flow**

### Phase 3: Final Testing & Launch
1. **End-to-end testing**
2. **Mobile testing**
3. **Email notification testing**
4. **Google Sheet data validation**

## 🔍 Code Changes Needed

### ContactForm.tsx Updates
```tsx
// Add source field
<input type="hidden" name="source" value="contact-form" />
```

### NewsletterSignup.tsx (New Component)
```tsx
// Create new component with:
// - Email input
// - Hidden source field
// - Hidden type field (newsletter)
// - Submit to /api/contact
```

### API Route Updates
```typescript
// Ensure source field is properly handled
const source = getStr("source") || "Website";
```

## 📋 Testing Checklist

- [ ] Contact form submits to Google Sheets
- [ ] Newsletter signup submits to Google Sheets
- [ ] Email notifications sent to Rachel
- [ ] Data appears correctly in Google Sheet
- [ ] Headers are created automatically
- [ ] Mobile forms work properly
- [ ] Error handling works (network issues, etc.)

## 🎯 Success Criteria

1. **All forms capture leads in Google Sheets**
2. **Rachel receives email notifications**
3. **Data is properly categorized (newsletter vs contact)**
4. **Source tracking works for all forms**
5. **Mobile experience is smooth**
6. **Error handling is robust**

## 🔧 Troubleshooting Guide

### Common Issues:
- **"Sheet not configured"** → Check GOOGLE_SHEET_ID
- **"Authentication failed"** → Check service account setup
- **"Failed to add lead"** → Check sheet permissions
- **"Email not sending"** → Check SMTP configuration

### Debug Steps:
1. Check browser console for errors
2. Check server logs for API errors
3. Verify environment variables
4. Test Google Sheets API directly
5. Verify email SMTP settings
