import fs from 'fs';
import path from 'path';

const filesToFix = [
  'scratch/seed-foundations-details.mjs',
  'scratch/seed-excel-details.mjs',
  'scratch/seed-python-details.mjs',
  'scratch/seed-remaining-sections.mjs'
];

for (const file of filesToFix) {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the specific line looking up by exact slug
    const targetLookup = `const topicDoc = await topicsColl.findOne({ course: course._id, lesson: lesson._id, slug: data.slug });`;
    const replacementLookup = `const baseSlug = data.slug.substring(0, data.slug.lastIndexOf('-'));
      const topicDoc = await topicsColl.findOne({ course: course._id, lesson: lesson._id, slug: { $regex: new RegExp('^' + baseSlug) } });`;
    
    if (content.includes(targetLookup)) {
      content = content.replace(targetLookup, replacementLookup);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed ${file}`);
    } else {
      console.log(`Could not find target lookup in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
