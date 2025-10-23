# Branch Protection Setup Guide

## 🛡️ **Protect Your Main Branch**

### **Current Status:**
- ✅ Cleaned up abandoned branches
- ✅ Established content workflow
- ⚠️ Need to protect main branch from conflicts

## **GitHub Branch Protection Rules**

### **1. Enable Branch Protection on GitHub:**

1. **Go to your repository on GitHub:**
   - Navigate to `https://github.com/tkovalsky/rachel-site`

2. **Go to Settings:**
   - Click "Settings" tab
   - Click "Branches" in left sidebar

3. **Add Branch Protection Rule:**
   - Click "Add rule"
   - Branch name pattern: `main`
   - Enable these settings:

### **2. Recommended Protection Settings:**

#### **✅ Enable These:**
- [x] **Require a pull request before merging**
- [x] **Require approvals (1 person)**
- [x] **Dismiss stale PR approvals when new commits are pushed**
- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**
- [x] **Restrict pushes that create files larger than 100MB**

#### **❌ Don't Enable These (for content workflow):**
- [ ] Require linear history
- [ ] Require conversation resolution
- [ ] Require signed commits
- [ ] Require deployments to succeed

### **3. Status Checks to Require:**
- [x] **Vercel deployment check**
- [x] **TypeScript compilation**
- [ ] ESLint (optional - can be slow)

## **Vercel Deployment Settings**

### **1. Configure Vercel Branch Settings:**

1. **Go to Vercel Dashboard:**
   - Navigate to your project
   - Go to "Settings" → "Git"

2. **Production Branch:**
   - Set to `main`
   - Auto-deploy from main branch

3. **Preview Branches:**
   - Only deploy previews for feature branches
   - Don't auto-deploy content branches

### **2. Deployment Strategy:**

#### **For Content (Main Branch):**
- ✅ Auto-deploy from main
- ✅ No branch restrictions
- ✅ Immediate deployment

#### **For Features (Feature Branches):**
- ✅ Preview deployments only
- ✅ Manual merge to main
- ✅ Full testing required

## **Content Creation Workflow (Protected)**

### **Daily Content Process:**

#### **Step 1: Create Content**
```bash
# Work directly on main (for content)
git checkout main
git pull origin main

# Create articles
# (Add article files, update index)
```

#### **Step 2: Commit and Push**
```bash
# Commit content
git add .
git commit -m "Add: 5 success stories"
git push origin main

# Vercel auto-deploys
```

#### **Step 3: Verify Deployment**
- Check Vercel dashboard
- Verify articles are live
- Test functionality

### **Feature Development Process:**

#### **For Major Changes:**
```bash
# Create feature branch
git checkout -b feature/new-functionality
# Make changes
git commit -m "Add: new functionality"
git push origin feature/new-functionality

# Create PR on GitHub
# Get approval
# Merge to main
```

## **Emergency Procedures**

### **If Content Gets Blocked:**

#### **Option 1: Bypass Protection (Emergency)**
```bash
# Force push (use carefully)
git push origin main --force
```

#### **Option 2: Use Admin Override**
- GitHub admin can override protection
- Use sparingly for content emergencies

#### **Option 3: Create Hotfix Branch**
```bash
git checkout -b hotfix/content-update
# Make changes
git push origin hotfix/content-update
# Merge via GitHub (faster approval)
```

## **Content Safety Measures**

### **1. Backup Strategy:**
```bash
# Create content backup branch
git checkout -b backup/content-$(date +%Y%m%d)
git push origin backup/content-$(date +%Y%m%d)
```

### **2. Content Validation:**
- Test articles locally before pushing
- Use TypeScript compilation check
- Verify image paths

### **3. Rollback Plan:**
```bash
# If content breaks site
git log --oneline -5
git checkout [previous-commit] -- src/app/content/
git commit -m "Rollback: content to working state"
git push origin main
```

## **Monitoring and Alerts**

### **1. Vercel Monitoring:**
- Set up deployment notifications
- Monitor build success rates
- Track deployment times

### **2. Content Metrics:**
- Track article publication rate
- Monitor SEO performance
- Check for broken links

### **3. Performance Monitoring:**
- Page load times
- Core Web Vitals
- Search engine indexing

## **Recommended Settings Summary**

### **GitHub Protection:**
- ✅ Require PR for main
- ✅ Require 1 approval
- ✅ Require Vercel deployment success
- ❌ Don't require linear history
- ❌ Don't require signed commits

### **Vercel Settings:**
- ✅ Auto-deploy from main
- ✅ Preview branches for features
- ✅ Build optimization enabled

### **Content Workflow:**
- ✅ Direct commits to main for content
- ✅ Feature branches for functionality
- ✅ Daily content batches
- ✅ Immediate deployment

---

## **Next Steps:**

1. **Set up GitHub branch protection** (5 minutes)
2. **Configure Vercel settings** (5 minutes)
3. **Test content workflow** (10 minutes)
4. **Start creating 10+ articles/day** (ongoing)

**This setup protects your main branch while allowing fast content creation!**
