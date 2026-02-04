const fs = require('fs');

const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';
const existingCovers = fs.readdirSync(coversDir).filter(f => f.match(/\.(jpg|png|gif)$/));

// Generate the updated COVER_ART object
const COVER_ART = {};

existingCovers.forEach(filename => {
    // Remove file extension to get ID
    const id = filename.replace(/\.(jpg|png|gif)$/, '');
    COVER_ART[id] = `images/covers/${filename}`;
});

// Output as JavaScript object format
console.log('const COVER_ART = {');
Object.entries(COVER_ART).sort().forEach(([key, value], index, array) => {
    const comma = index < array.length - 1 ? ',' : '';
    console.log(`    "${key}": "${value}"${comma}`);
});
console.log('};');

console.log('\n\n// Summary:');
console.log(`// Total entries: ${Object.keys(COVER_ART).length}`);

// Save as JSON for easy reference
fs.writeFileSync('/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/COVER_ART_MAPPING.json', JSON.stringify(COVER_ART, null, 2));
console.log('// Mapping saved to: COVER_ART_MAPPING.json');
