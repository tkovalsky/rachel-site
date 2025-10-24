#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to get all markdown files from a directory
function getMarkdownFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith('.md'));
  } catch (error) {
    return [];
  }
}

// Function to extract content from markdown frontmatter
function extractContentInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) return null;
    
    const frontmatter = frontmatterMatch[1];
    const lines = frontmatter.split('\n');
    const info = {};
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        info[key.trim()] = value;
      }
    });
    
    return info;
  } catch (error) {
    return null;
  }
}

console.log('🔍 MISSING CONTENT ANALYSIS\n');

// Check Articles
console.log('📰 ARTICLES:');
const articleFiles = getMarkdownFiles('./src/content/articles');
const articleNames = articleFiles.map(file => {
  const info = extractContentInfo(`./src/content/articles/${file}`);
  return {
    file: file,
    title: info?.title || 'No title',
    slug: info?.slug || file.replace('.md', ''),
    imageSrc: info?.imageSrc || 'No image'
  };
});

articleNames.forEach(article => {
  console.log(`  • ${article.title}`);
  console.log(`    File: ${article.file}`);
  console.log(`    Slug: ${article.slug}`);
  console.log(`    Image: ${article.imageSrc}`);
  console.log('');
});

// Check Areas
console.log('🏘️ AREAS:');
const areaFiles = getMarkdownFiles('./src/content/areas');
const areaNames = areaFiles.map(file => {
  const info = extractContentInfo(`./src/content/areas/${file}`);
  return {
    file: file,
    name: info?.name || 'No name',
    slug: info?.slug || file.replace('.md', ''),
    imageSrc: info?.imageSrc || 'No image'
  };
});

areaNames.forEach(area => {
  console.log(`  • ${area.name}`);
  console.log(`    File: ${area.file}`);
  console.log(`    Slug: ${area.slug}`);
  console.log(`    Image: ${area.imageSrc}`);
  console.log('');
});

// Check Developments
console.log('🏢 DEVELOPMENTS:');
const developmentFiles = getMarkdownFiles('./src/content/developments');
const developmentNames = developmentFiles.map(file => {
  const info = extractContentInfo(`./src/content/developments/${file}`);
  return {
    file: file,
    name: info?.name || 'No name',
    slug: info?.slug || file.replace('.md', ''),
    imageSrc: info?.imageSrc || 'No image'
  };
});

developmentNames.forEach(dev => {
  console.log(`  • ${dev.name}`);
  console.log(`    File: ${dev.file}`);
  console.log(`    Slug: ${dev.slug}`);
  console.log(`    Image: ${dev.imageSrc}`);
  console.log('');
});

// Summary
console.log('📊 SUMMARY:');
console.log(`  Articles: ${articleNames.length} files`);
console.log(`  Areas: ${areaNames.length} files`);
console.log(`  Developments: ${developmentNames.length} files`);

console.log('\n✅ Content analysis complete!');
