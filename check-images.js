// Script to check and fix all thumbnail paths in projects.js
const fs = require('fs');
const path = require('path');

// Read projects.js
const projectsPath = path.join(__dirname, 'js/projects.js');
const projectsContent = fs.readFileSync(projectsPath, 'utf8');

// List all files in images/cargo/
const cargoDir = path.join(__dirname, 'images/cargo');
const cargoFiles = fs.readdirSync(cargoDir);

console.log('Files in images/cargo/:');
cargoFiles.forEach(f => console.log(`  - ${f}`));
console.log('\n');

// Extract project IDs and their current image paths from projects.js
const projectMatches = projectsContent.match(/id:\s*"([^"]+)"/g) || [];
const imageMatches = projectsContent.match(/image:\s*"([^"]+)"/g) || [];

console.log('Checking projects...\n');

// Check critical projects first
const criticalProjects = [
    'google-creator-labs-comprehensive',
    'target-lil-yachty-carly-rae-jepsen', 
    'piaget-michael-b-jordan',
    'adidas-kylie-jenner',
    'reel'
];

let fixesNeeded = [];

// Check each critical project
criticalProjects.forEach(projectId => {
    const regex = new RegExp(`id:\s*"${projectId}"[\\s\\S]*?image:\s*"([^"]+)"`);
    const match = projectsContent.match(regex);
    if (match) {
        const currentPath = match[1];
        const filename = path.basename(currentPath);
        const exists = cargoFiles.includes(filename);
        console.log(`${projectId}:`);
        console.log(`  Current: ${currentPath}`);
        console.log(`  Filename: ${filename}`);
        console.log(`  Exists: ${exists ? '✓' : '✗'}`);
        
        // Find the correct file
        const correctFile = cargoFiles.find(f => f.startsWith(projectId));
        if (correctFile && correctFile !== filename) {
            console.log(`  CORRECT FILE: ${correctFile}`);
            fixesNeeded.push({
                projectId,
                oldPath: currentPath,
                newPath: `images/cargo/${correctFile}`,
                oldFilename: filename,
                newFilename: correctFile
            });
        }
        console.log('');
    }
});

console.log('\n=== FIXES NEEDED ===');
if (fixesNeeded.length === 0) {
    console.log('No fixes needed for critical projects!');
} else {
    fixesNeeded.forEach(fix => {
        console.log(`${fix.projectId}:`);
        console.log(`  ${fix.oldPath} → ${fix.newPath}`);
    });
}

// Now check ALL projects
console.log('\n\n=== CHECKING ALL PROJECTS ===');
let allFixes = [];

// Find all project definitions and their images
const projectRegex = /id:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
let m;
while ((m = projectRegex.exec(projectsContent)) !== null) {
    const projectId = m[1];
    const currentPath = m[2];
    const filename = path.basename(currentPath);
    const exists = cargoFiles.includes(filename);
    
    if (!exists) {
        // Find what file should be used
        const correctFile = cargoFiles.find(f => {
            // Try exact match first
            if (f.startsWith(projectId)) return true;
            // Try some variations
            const baseId = projectId.replace(/-/g, '');
            const fileBase = f.replace(/\.[^.]+$/, '').replace(/-/g, '');
            return fileBase.toLowerCase() === baseId.toLowerCase();
        });
        
        if (correctFile) {
            allFixes.push({
                projectId,
                oldPath: currentPath,
                newPath: `images/cargo/${correctFile}`
            });
            console.log(`✗ ${projectId}: ${filename} not found → should be ${correctFile}`);
        } else {
            console.log(`✗ ${projectId}: ${filename} not found (no replacement found)`);
        }
    }
}

console.log(`\n\nTotal fixes needed: ${allFixes.length}`);
console.log(JSON.stringify(allFixes, null, 2));
