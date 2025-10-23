# Google Sheets Security & Key Management Guide

## 🔒 **Security Features Added**

### ✅ **Data Validation**
- **Duplicate Email Detection** - Prevents duplicate entries
- **Email Normalization** - Converts emails to lowercase and trims whitespace
- **Input Sanitization** - Trims all text fields
- **Case-Insensitive Matching** - Prevents duplicates like "User@Email.com" and "user@email.com"

### ✅ **Error Handling**
- **Graceful Degradation** - Forms work even if Google Sheets fails
- **Duplicate Handling** - No duplicate emails sent to Rachel
- **Logging** - All actions are logged for debugging

## 🔑 **How to Change Google Private Key**

### **Step 1: Generate New Service Account Key**

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Navigate to your project** (racheldelray)
3. **Go to "APIs & Services" > "Credentials"**
4. **Find your service account** (rachel-real-estate-website)
5. **Click on the service account**
6. **Go to "Keys" tab**
7. **Click "Add Key" > "Create new key"**
8. **Choose "JSON" format**
9. **Download the new JSON file**

### **Step 2: Update Environment Variables**

**In your `.env.local` file, update these values:**

```env
# Update with new values from the new JSON file
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-new-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour new private key here\n-----END PRIVATE KEY-----"
```

### **Step 3: Update Vercel (Production)**

1. **Go to [Vercel Dashboard](https://vercel.com)**
2. **Select your project**
3. **Go to "Settings" > "Environment Variables"**
4. **Update the same variables** with the new values
5. **Redeploy your site**

### **Step 4: Delete Old Key (Security Best Practice)**

1. **Go back to Google Cloud Console**
2. **Find the old key** in the service account
3. **Click the trash icon** to delete it
4. **Confirm deletion**

## 🛡️ **Additional Security Measures**

### **Service Account Permissions**
- ✅ **Limited Scope** - Only has access to your specific Google Sheet
- ✅ **No User Data Access** - Cannot access other Google services
- ✅ **Read/Write Only** - Cannot delete or modify sheet structure

### **Environment Security**
- ✅ **Environment Variables** - Sensitive data not in code
- ✅ **Vercel Integration** - Secure production deployment
- ✅ **Local Development** - `.env.local` not committed to git

### **Data Protection**
- ✅ **Input Validation** - All data is sanitized
- ✅ **Duplicate Prevention** - No spam or duplicate entries
- ✅ **Error Logging** - Track issues without exposing data

## 🔄 **Key Rotation Schedule**

### **Recommended Rotation:**
- **Every 6 months** for production
- **Immediately** if key is compromised
- **Before major deployments** for extra security

### **Rotation Checklist:**
- [ ] Generate new service account key
- [ ] Update `.env.local` (development)
- [ ] Update Vercel environment variables (production)
- [ ] Test forms work correctly
- [ ] Delete old key
- [ ] Document rotation date

## 🚨 **Security Incident Response**

### **If Key is Compromised:**
1. **Immediately generate new key** (follow steps above)
2. **Update all environments** (local + Vercel)
3. **Delete compromised key**
4. **Monitor Google Sheets** for unauthorized access
5. **Review access logs** in Google Cloud Console

### **If Service Account is Compromised:**
1. **Delete the entire service account**
2. **Create new service account**
3. **Re-share Google Sheet** with new account
4. **Update all credentials**
5. **Review all access permissions**

## 📊 **Monitoring & Alerts**

### **What to Monitor:**
- **Google Sheets access logs** (in Google Cloud Console)
- **Application error logs** (in Vercel dashboard)
- **Lead data patterns** (unusual spikes or patterns)
- **Failed authentication attempts**

### **Red Flags:**
- Multiple failed authentication attempts
- Unusual access patterns
- Unexpected data modifications
- Error spikes in application logs

## 🔧 **Troubleshooting**

### **Common Issues:**

**"Invalid grant" error:**
- Check service account email format
- Verify private key is complete
- Ensure sheet is shared with service account

**"Permission denied" error:**
- Verify service account has Editor access
- Check Google Sheets API is enabled
- Confirm sheet sharing permissions

**Duplicate emails still appearing:**
- Check email normalization is working
- Verify duplicate detection logic
- Review Google Sheets data

## 📋 **Security Checklist**

### **Initial Setup:**
- [ ] Service account created with minimal permissions
- [ ] Google Sheet shared only with service account
- [ ] Environment variables properly configured
- [ ] Vercel environment variables set
- [ ] Test forms work correctly

### **Ongoing Maintenance:**
- [ ] Regular key rotation (every 6 months)
- [ ] Monitor access logs
- [ ] Review permissions quarterly
- [ ] Update dependencies regularly
- [ ] Test backup procedures

## 🎯 **Best Practices**

1. **Never commit credentials** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate keys regularly** for maximum security
4. **Monitor access patterns** for anomalies
5. **Keep service account permissions minimal**
6. **Document all changes** for team reference
7. **Test thoroughly** after any credential changes

This security setup ensures your lead capture system is both functional and secure! 🔒
