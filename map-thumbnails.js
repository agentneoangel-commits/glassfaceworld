#!/usr/bin/env node
/**
 * Thumbnail Mapping Script
 * Maps existing portfolio thumbnails to timeline projects
 */

const fs = require('fs');
const path = require('path');

// Read the projects.js file to extract image mappings
const projectsJsPath = path.join(__dirname, 'js', 'projects.js');
const projectsJsContent = fs.readFileSync(projectsJsPath, 'utf8');

// Extract all project objects with their images
const imageMap = {};

// Parse projects.js to find image mappings
// Look for patterns like: id: "...", image: "..."
const idImagePairs = projectsJsContent.match(/id:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g);

if (idImagePairs) {
    idImagePairs.forEach(pair => {
        const idMatch = pair.match(/id:\s*"([^"]+)"/);
        const imageMatch = pair.match(/image:\s*"([^"]+)"/);
        if (idMatch && imageMatch) {
            imageMap[idMatch[1]] = imageMatch[1];
        }
    });
}

console.log('Found', Object.keys(imageMap).length, 'projects with images in portfolio');
console.log('');

// Create mapping file
const mappingContent = `// Thumbnail Mapping - Portfolio to Timeline
// Generated: ${new Date().toISOString()}

const THUMBNAIL_MAP = ${JSON.stringify(imageMap, null, 2)};

// Usage in timeline:
// If project._id matches a key in THUMBNAIL_MAP, use that image
// Otherwise fall back to YouTube thumbnail or placeholder
`;

fs.writeFileSync(path.join(__dirname, 'thumbnail-map.js'), mappingContent);

console.log('Mapping saved to: thumbnail-map.js');
console.log('');
console.log('Sample mappings:');
Object.entries(imageMap).slice(0, 5).forEach(([id, img]) => {
    console.log(`  ${id} -> ${img}`);
});
