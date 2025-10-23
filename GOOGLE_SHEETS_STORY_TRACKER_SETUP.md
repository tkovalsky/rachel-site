# Google Sheets Story Tracker Setup

## Create New Google Sheet: "Story Tracker"

### Sheet Structure

Create a new Google Sheet with these columns:

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | Story ID | Unique identifier | story-001 |
| B | Client Names | Client family name | The Grinkevichs |
| C | Target Segment | Buyer type | 55-plus-cash-buyer |
| D | Development/Community | Property location | Wycliffe Golf & Country Club |
| E | Area | Geographic area | lake-worth |
| F | Property Type | Home type | villa |
| G | Key Details | Bedrooms, price, features | 3BR, $800K, golf-cart garage |
| H | Pain Points Addressed | Client challenges | maintenance, proximity to family |
| I | Solution Provided | What Rachel delivered | Expert guidance, smooth process |
| J | Outcome | Success metrics | Successful close, happy clients |
| K | Content Variations | Different angles | adult-kids focus, investment focus |
| L | Tags | Comma-separated keywords | wycliffe, 55-plus, retirement |
| M | Publication Status | Current status | draft, in-review, ready-to-publish, published |
| N | Publish Date | When published | 2024-10-23 |
| O | Article Slug | URL slug | wycliffe-success-story |
| P | Content Draft URL | Link to draft | Google Doc link |
| Q | Notes | Additional info | Any special notes |

### Sample Data (First 3 Stories)

| Story ID | Client Names | Target Segment | Development/Community | Area | Property Type | Key Details | Pain Points Addressed | Solution Provided | Outcome | Content Variations | Tags | Publication Status | Publish Date | Article Slug | Content Draft URL | Notes |
|----------|--------------|----------------|----------------------|------|---------------|-------------|---------------------|-------------------|---------|-------------------|------|-------------------|--------------|---------------|-------------------|-------|
| story-001 | Cheryl & Eddie | 55-plus-cash-buyer | Wycliffe Golf & Country Club | lake-worth | villa | 3BR, $800K, golf-cart garage | retirement transition, maintenance-free living | Expert guidance, smooth process | Successful close, happy clients | - | wycliffe, 55-plus, retirement, golf | published | 2024-10-23 | wycliffe-success-story | - | First success story |
| story-002 | The Grinkevichs | second-home-buyer | TBD | TBD | single-family | TBD, vacation home | multigenerational family needs | TBD | TBD | adult-kids focus, investment focus | nj-buyers, vacation-home, family | draft | - | grinkevich-vacation-home | - | New Jersey business owners |
| story-003 | TBD | 55-plus-cash-buyer | TBD | TBD | TBD | TBD | TBD | TBD | TBD | - | TBD | draft | - | TBD | - | Next story to develop |

## Google Sheets Setup Instructions

### Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new sheet
3. Name it "Story Tracker"
4. Add the column headers as shown above

### Step 2: Add Sample Data
1. Copy the sample data from the table above
2. Paste into your sheet starting from row 2
3. Format the headers (bold, freeze row 1)

### Step 3: Set Up Data Validation
1. **Publication Status** (Column M): Create dropdown with options:
   - draft
   - in-review
   - ready-to-publish
   - published

2. **Target Segment** (Column C): Create dropdown with options:
   - 55-plus-cash-buyer
   - second-home-buyer
   - family
   - investor
   - professional

3. **Area** (Column E): Create dropdown with options:
   - boca-raton
   - delray-beach
   - lake-worth
   - wellington
   - palm-beach-gardens
   - boynton-beach
   - deerfield-beach
   - greenacres
   - parkland
   - pompano-beach
   - west-palm-beach

### Step 4: Add Conditional Formatting
1. **Publication Status**:
   - draft: Yellow background
   - in-review: Orange background
   - ready-to-publish: Blue background
   - published: Green background

### Step 5: Create Views/Filtering
1. Create a filter on row 1
2. Add filter views for:
   - "Published Stories" (Status = published)
   - "Draft Stories" (Status = draft)
   - "55+ Buyers" (Target Segment = 55-plus-cash-buyer)
   - "Second Home Buyers" (Target Segment = second-home-buyer)

## Benefits of This System

### Content Management
- **Single source of truth** for all stories
- **Easy to see gaps** in coverage
- **Track publication pipeline**
- **Manage content variations**

### SEO & Marketing
- **Track which developments** have stories
- **Identify target segments** needing content
- **Monitor publication dates**
- **Plan content calendar**

### Automation Ready
- **Export to JSON** for website integration
- **Apps Script** for automated workflows
- **Status tracking** for content pipeline
- **AI generation** prompts based on data

## Next Steps

1. **Create the Google Sheet** with the structure above
2. **Add the sample data** for existing stories
3. **Set up data validation** and formatting
4. **Start adding new story ideas** to the tracker
5. **Use this as your content planning tool**

This system will scale with you as you create 10+ articles per day!
