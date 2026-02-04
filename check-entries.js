const fs = require('fs');

const dbPath = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/career-database-enriched.json';
const projects = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Check specific entries
const checkIds = [
    'tunji-ige-war',
    'lil-yachty-boom', 
    'tokyos-revenge',
    'prhyme',
    'fifth-harmony',
    'impermanent-digital',
    'i-was-sad-last-night-i-m-ok-now',
    'looped-up',
    'uncle-iroh',
    '100-thoughts',
    'music-glassface-crash-747',
    'music-glassface-vivid-color-dreams',
    'music-sango-mindreader-remix',
    'music-blvk-h3ro-up'
];

console.log('=== CHECKING SPECIFIC ENTRIES ===\n');

checkIds.forEach(id => {
    const project = projects.find(p => p._id === id);
    if (project) {
        console.log(`\n${id}:`);
        console.log(`  Title: ${project.title}`);
        console.log(`  Category: ${project.category}`);
        console.log(`  Artist: ${project.artist || 'N/A'}`);
        console.log(`  VideoID: ${project.videoId || 'N/A'}`);
        console.log(`  Thumbnail: ${project.thumbnail || 'N/A'}`);
        console.log(`  External URL: ${project.externalUrl || 'N/A'}`);
    } else {
        console.log(`\n${id}: NOT FOUND`);
    }
});
