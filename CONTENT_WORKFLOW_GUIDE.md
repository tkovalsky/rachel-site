# High-Volume Content Creation Workflow

## 🎯 **Streamlined Process for 10+ Articles/Day**

### **Current Setup:**
- ✅ Main branch: `main` (production)
- ✅ Content branch: `feature/success-stories-content` (for testing)
- ✅ Cleaned up abandoned branches

### **Recommended Workflow:**

## **Option A: Direct Main Branch (Recommended for Content)**

### **For Daily Content Creation:**
1. **Work directly on `main` branch**
2. **Create articles using the established structure:**
   ```bash
   # Add new article
   src/app/content/articles/[article-name].ts
   # Update index
   src/app/content/articles/index.ts
   ```

3. **Commit and push immediately:**
   ```bash
   git add .
   git commit -m "Add: [Article Title] - [Brief Description]"
   git push origin main
   ```

4. **Vercel auto-deploys from main**

### **Benefits:**
- ✅ No branch conflicts
- ✅ Immediate deployment
- ✅ Simple workflow
- ✅ No merge conflicts

## **Option B: Content-Only Branch (If you prefer separation)**

### **For Content Creation:**
1. **Create content branch:**
   ```bash
   git checkout -b content-updates
   ```

2. **Add articles and commit:**
   ```bash
   git add .
   git commit -m "Add: 5 new success stories"
   git push origin content-updates
   ```

3. **Merge to main daily:**
   ```bash
   git checkout main
   git merge content-updates
   git push origin main
   ```

## **Content Creation Process (10+ Articles/Day)**

### **1. Article Structure (Use Template)**
```typescript
// src/app/content/articles/[story-name].ts
import { Article } from '../types';
import { createArticle } from './helpers';

export const STORY_NAME: Article = createArticle({
  id: 'story-name',
  title: 'Compelling Title',
  slug: 'story-name',
  // ... rest of fields
});
```

### **2. Batch Processing**
- Create 5-10 articles in one session
- Commit as batch: `"Add: 8 success stories for 55+ buyers"`
- Push to main immediately

### **3. Image Management**
- Add images to `public/articles/[story-name].jpg`
- Use `ImageManager.getArticleImage('story-name')`

## **Branch Protection Strategy**

### **Protect Main Branch:**
1. **Only allow content updates and minor fixes**
2. **Use feature branches for major functionality only**
3. **Content changes go directly to main**

### **When to Use Feature Branches:**
- ✅ Major functionality changes
- ✅ New components or pages
- ✅ API changes
- ❌ NOT for individual articles
- ❌ NOT for content updates

## **Daily Workflow Example**

### **Morning (Content Creation):**
```bash
# 1. Pull latest changes
git pull origin main

# 2. Create 5-10 articles
# (Add article files, update index)

# 3. Commit batch
git add .
git commit -m "Add: 8 success stories - 55+ buyers segment"
git push origin main

# 4. Vercel auto-deploys
```

### **Afternoon (More Content):**
```bash
# Repeat process for next batch
git add .
git commit -m "Add: 5 market updates and area guides"
git push origin main
```

## **Content Organization**

### **File Structure:**
```
src/app/content/articles/
├── index.ts                    # Export all articles
├── helpers.ts                  # Helper functions
├── template.ts                 # Template for new articles
├── wycliffe-success-story.ts   # Individual stories
├── grinkevich-story.ts
├── [story-name].ts
└── README.md                   # Documentation
```

### **Batch Naming Convention:**
- `git commit -m "Add: 5 success stories - 55+ buyers"`
- `git commit -m "Add: 3 area guides - Palm Beach County"`
- `git commit -m "Add: 4 market updates - Q4 2024"`

## **Quality Control**

### **Pre-Commit Checklist:**
- [ ] Article follows template structure
- [ ] Image paths are correct
- [ ] SEO fields populated
- [ ] Target segments assigned
- [ ] No TypeScript errors

### **Content Review:**
- [ ] Titles are compelling
- [ ] Meta descriptions under 160 chars
- [ ] Images optimized
- [ ] Internal links added

## **Automation Opportunities**

### **Future Enhancements:**
1. **Google Sheets Integration:**
   - Track article pipeline
   - Auto-generate article files
   - Batch processing

2. **AI Content Generation:**
   - Standardized prompts
   - Template variables
   - Quality checklists

3. **Deployment Automation:**
   - Auto-commit from Google Sheets
   - Content validation
   - SEO optimization

## **Emergency Procedures**

### **If Content Gets Overwritten:**
1. **Check git history:**
   ```bash
   git log --oneline -10
   ```

2. **Restore from backup:**
   ```bash
   git checkout [commit-hash] -- src/app/content/articles/
   ```

3. **Force push if needed:**
   ```bash
   git push origin main --force
   ```

## **Success Metrics**

### **Daily Goals:**
- ✅ 10+ articles published
- ✅ Zero deployment conflicts
- ✅ All content indexed
- ✅ SEO optimization complete

### **Weekly Goals:**
- ✅ 50+ articles published
- ✅ All target segments covered
- ✅ Content interconnections built
- ✅ Performance monitoring

---

## **Next Steps:**

1. **Choose workflow (Option A recommended)**
2. **Start with 5 articles today**
3. **Establish daily routine**
4. **Scale to 10+ articles/day**
5. **Add automation as needed**

**Recommendation: Start with Option A (direct main branch) for simplicity and speed.**
