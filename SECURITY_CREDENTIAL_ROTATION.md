# 🔒 Google Sheets Security & Credential Rotation Guide

## 🚨 **Immediate Action Required**

Your Google Service Account credentials were exposed during debugging. Follow these steps to secure your system.

## 📋 **Step-by-Step Security Checklist**

### **Step 1: Rotate Service Account Key**

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Navigate to:** IAM & Admin → Service Accounts
3. **Find your service account:** `rachel-real-estate-website@racheldelray.iam.gserviceaccount.com`
4. **Click on the service account**
5. **Go to "Keys" tab**
6. **Delete the current key:**
   - Click the trash icon next to the existing key
   - Confirm deletion
7. **Create a new key:**
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Download the new JSON file
   - **Keep this file secure!**

### **Step 2: Update Vercel Environment Variables**

1. **Go to [Vercel Dashboard](https://vercel.com)**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Update these variables with new values from the JSON file:**

   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-new-service-account@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour new private key here\n-----END PRIVATE KEY-----
   ```

5. **Save the changes**

### **Step 3: Redeploy Application**

1. **Go to Deployments tab in Vercel**
2. **Click "Redeploy" on your latest deployment**
3. **Wait for deployment to complete**

### **Step 4: Test Integration**

1. **Visit your website**
2. **Submit the contact form**
3. **Check your Google Sheet** to verify leads are being added
4. **Verify no errors in Vercel logs**

## 🔒 **Security Best Practices**

### **Environment Variable Security**
- ✅ **Never commit credentials to git**
- ✅ **Use environment variables for all secrets**
- ✅ **Rotate keys regularly (every 6 months)**
- ✅ **Monitor access logs**

### **Google Cloud Security**
- ✅ **Service account has minimal permissions**
- ✅ **Only access to your specific Google Sheet**
- ✅ **Regular key rotation**
- ✅ **Monitor unusual access patterns**

### **Vercel Security**
- ✅ **Environment variables are encrypted**
- ✅ **No credentials in code**
- ✅ **Secure deployment pipeline**

## 🚨 **Security Incident Response**

### **If Credentials are Compromised:**
1. **Immediately rotate the service account key**
2. **Update all environment variables**
3. **Redeploy the application**
4. **Monitor Google Cloud Console for unusual activity**
5. **Check Google Sheet for unauthorized changes**

### **Red Flags to Watch For:**
- Unusual access patterns in Google Cloud Console
- Unexpected changes to your Google Sheet
- Failed authentication attempts
- Error spikes in application logs

## 📊 **Monitoring & Maintenance**

### **Monthly Checks:**
- [ ] Review Google Cloud Console access logs
- [ ] Check Google Sheet for unexpected changes
- [ ] Verify contact form is working
- [ ] Review Vercel deployment logs

### **Quarterly Tasks:**
- [ ] Review service account permissions
- [ ] Check for unused credentials
- [ ] Update dependencies
- [ ] Test backup procedures

### **Annual Tasks:**
- [ ] Rotate all service account keys
- [ ] Review and update security policies
- [ ] Conduct security audit
- [ ] Update documentation

## 🔧 **Troubleshooting**

### **Common Issues After Key Rotation:**

**"Authentication failed" error:**
- Check new service account email is correct
- Verify private key format in Vercel
- Ensure new key is properly formatted

**"Sheet not accessible" error:**
- Verify Google Sheet is still shared with service account
- Check service account has Editor permissions
- Confirm sheet ID hasn't changed

**"Environment variables not found" error:**
- Verify variables are set in Vercel
- Check variable names match exactly
- Ensure variables are set for Production environment

## 📋 **Quick Reference**

### **Service Account Email Format:**
```
your-service-account@your-project-id.iam.gserviceaccount.com
```

### **Private Key Format in Vercel:**
```
-----BEGIN PRIVATE KEY-----\nYour key here\n-----END PRIVATE KEY-----
```

### **Required Environment Variables:**
```
GOOGLE_SHEET_ID=your-spreadsheet-id
GOOGLE_SHEET_NAME=Leads
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour key\n-----END PRIVATE KEY-----
```

## 🎯 **Success Criteria**

After completing these steps:
- [ ] New service account key is active
- [ ] Old key is deleted
- [ ] Vercel environment variables updated
- [ ] Application redeployed successfully
- [ ] Contact form saves leads to Google Sheet
- [ ] No authentication errors in logs

## 🚀 **Next Steps**

1. **Complete the security rotation** (follow steps above)
2. **Test the integration thoroughly**
3. **Document the new credentials securely**
4. **Set up monitoring alerts**
5. **Schedule regular key rotation**

---

**Remember:** Security is an ongoing process, not a one-time task. Regular maintenance and monitoring are essential for keeping your system secure.
