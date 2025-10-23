# Email Setup Guide for Rachel's Real Estate Website

## 🔧 SMTP Configuration

### Option 1: Gmail (Recommended for simplicity)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
MAIL_TO=rachel@compass.com
MAIL_FROM=Website <your-gmail@gmail.com>
```

### Option 2: Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
MAIL_TO=rachel@compass.com
MAIL_FROM=Website <your-email@outlook.com>
```

### Option 3: Custom SMTP (Titan, etc.)
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
MAIL_TO=rachel@compass.com
MAIL_FROM=Website <your-email@yourdomain.com>
```

## 📧 How It Works

### Newsletter Signups
- Users enter email in newsletter form
- Email sent to Rachel with subject "New Newsletter Signup"
- Includes email and name (if provided)

### Contact Form Submissions
- Users fill out contact form with details
- Email sent to Rachel with subject "New Real Estate Inquiry"
- Includes all contact details and message

## 🚀 Next Steps

1. **Set up SMTP credentials** in your environment variables
2. **Test the forms** to ensure emails are being sent
3. **Optional: Add database** for lead tracking (see below)

## 💾 Optional: Add Simple Database

If you want to track leads in a database, you can add:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/rachel_leads
```

This would allow you to:
- Track all leads in one place
- See who signed up for newsletter
- Follow up on contact inquiries
- Export leads for CRM import

## 🔒 Security Notes

- Use app passwords for Gmail (not your regular password)
- Keep SMTP credentials secure
- Consider using environment variables in production
- Test thoroughly before going live
