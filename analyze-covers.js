// Analysis script for missing cover art
const fs = require('fs');

// Read the database
const dbPath = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/career-database-enriched.json';
const projects = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// COVER_ART mapping from timeline-v8-refined.html
const COVER_ART = {
    "music-tobi-lou-new-bish": "images/covers/music-tobi-lou-new-bish.jpg",
    "music-tobi-lou-cult-classic": "images/covers/music-tobi-lou-cult-classic.jpg",
    "music-tobi-lou-lounar": "images/covers/music-tobi-lou-lounar.jpg",
    "music-tobi-lou-solange": "images/covers/music-tobi-lou-solange.jpg",
    "music-tobi-lou-the-fun": "images/covers/music-tobi-lou-the-fun.jpg",
    "music-tobi-lou-uncle-iroh": "images/covers/music-tobi-lou-uncle-iroh.jpg",
    "music-tobi-lou-live-on-ice": "images/covers/music-tobi-lou-live-on-ice.jpg",
    "music-tobi-lou-sotw": "images/covers/music-tobi-lou-sotw.jpg",
    "music-tobi-lou-all-my-girls": "images/covers/music-tobi-lou-all-my-girls.jpg",
    "music-tobi-lou-say-it-rmx": "images/covers/music-tobi-lou-say-it-rmx.jpg",
    "music-tobi-lou-forecast": "images/covers/music-tobi-lou-forecast.jpg",
    "music-tobi-lou-cobra": "images/covers/music-tobi-lou-cobra.jpg",
    "music-tobi-lou-sad-last-night": "images/covers/music-tobi-lou-sad-last-night.jpg",
    "music-tobi-lou-hot-tub": "images/covers/music-tobi-lou-hot-tub.jpg",
    "music-tobi-lou-deserve-it": "images/covers/music-tobi-lou-deserve-it.jpg",
    "music-tobi-lou-numbers": "images/covers/music-tobi-lou-numbers.jpg",
    "music-tobi-lou-berlin-westside": "images/covers/music-tobi-lou-berlin-westside.jpg",
    "music-tobi-lou-looped-up": "images/covers/music-tobi-lou-looped-up.jpg",
    "music-tobi-lou-theme-music": "images/covers/music-tobi-lou-theme-music.jpg",
    "music-tobi-lou-cheap-vacations": "images/covers/music-tobi-lou-cheap-vacations.jpg",
    "music-glassface-press": "images/covers/music-glassface-press.jpg",
    "music-glassface-wavelength": "images/covers/music-glassface-wavelength.jpg",
    "music-glassface-spiral": "images/covers/music-facer-spiral.jpg",
    "music-glassface-already": "images/covers/music-glassface-already.jpg",
    "music-glassface-foundation": "images/covers/music-glassface-foundation.jpg",
    "music-glassface-oblivion": "images/covers/music-glassface-oblivion.jpg",
    "music-glassface-summers-over": "images/covers/music-glassface-summers-over.jpg",
    "music-glassface-endless-color": "images/covers/music-glassface-endless-color.jpg",
    "music-glassface-theres-no-other-one": "images/covers/music-glassface-theres-no-other-one.jpg",
    "music-glassface-whatever": "images/covers/music-glassface-whatever.jpg",
    "music-glassface-say-it": "images/covers/music-glassface-say-it.jpg",
    "music-glassface-mindreader": "images/covers/music-glassface-mindreader.jpg",
    "music-sl-100-thoughts": "images/covers/music-sl-100-thoughts.jpg",
    "music-chief-keef-forecast": "images/covers/music-chief-keef-forecast.jpg",
    "music-young-thug-cobra": "images/covers/music-young-thug-cobra.jpg",
    "music-ayotemi-quality-time": "images/covers/music-ayotemi-quality-time.jpg",
    "music-ayotemi-senior-man": "images/covers/music-ayotemi-senior-man.jpg",
    "music-boy-amor-space-me-out": "images/covers/music-boy-amor-space-me-out.jpg",
    "music-blvk-h3ro-active": "images/covers/music-blvk-h3ro-active.jpg",
    "music-blvk-h3ro-motion": "images/covers/music-blvk-h3ro-motion.jpg",
    "music-blvk-h3ro-arguments": "images/covers/music-blvk-h3ro-arguments.jpg",
    "music-parris-goebel-dummy": "images/covers/music-parris-goebel-dummy.jpg",
    "music-parris-goebel-intro": "images/covers/music-parris-goebel-intro.jpg",
    "music-rigo-kamp-marathon": "images/covers/music-rigo-kamp-marathon.jpg",
    "music-rigo-kamp-miss-you": "images/covers/music-rigo-kamp-miss-you.jpg",
    "music-leather-park-at-the-party": "images/covers/music-leather-park-at-the-party.jpg",
    "music-ayotemi-no-time": "images/covers/music-ayotemi-no-time.jpg",
    "music-blvk-h3ro-brick": "images/covers/music-blvk-h3ro-brick.jpg",
    "music-glassface-hall-of-echoes": "images/covers/music-glassface-hall-of-echoes.jpg",
    "music-glassface-no-other-one": "images/covers/music-glassface-no-other-one.jpg",
    "music-tobi-lou-babycakes": "images/covers/music-tobi-lou-babycakes.jpg",
    "music-tobi-lou-break": "images/covers/music-tobi-lou-break.jpg",
    "music-tobi-lou-busy": "images/covers/music-tobi-lou-busy.jpg",
    "music-tobi-lou-hold-me-close": "images/covers/music-tobi-lou-hold-me-close.jpg",
    "music-tobi-lou-meaningless": "images/covers/music-tobi-lou-meaningless.jpg",
    "music-tobi-lou-toblerone": "images/covers/music-tobi-lou-toblerone.jpg",
    "music-tobi-lou-verizon-man": "images/covers/music-tobi-lou-verizon-man.jpg"
};

// Get existing covers from filesystem
const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';
const existingCovers = fs.readdirSync(coversDir).filter(f => f.endsWith('.jpg'));

// Categorize entries
const missingCoverArt = [];
const hasVideoThumbnail = [];
const hasExistingThumbnail = [];
const hasCoverArt = [];

projects.forEach(project => {
    const id = project._id;
    
    // Check if in COVER_ART mapping
    if (COVER_ART[id]) {
        // Check if file actually exists
        const filename = COVER_ART[id].replace('images/covers/', '');
        if (existingCovers.includes(filename)) {
            hasCoverArt.push({ id, title: project.title, artist: project.artist, category: project.category });
        } else {
            // In mapping but file doesn't exist - need to download
            missingCoverArt.push({ 
                id, 
                title: project.title, 
                artist: project.artist, 
                category: project.category,
                videoId: project.videoId,
                thumbnail: project.thumbnail,
                reason: 'In mapping but file missing'
            });
        }
    } else if (project.videoId) {
        // Has YouTube video - can use thumbnail
        hasVideoThumbnail.push({ 
            id, 
            title: project.title, 
            artist: project.artist, 
            category: project.category,
            videoId: project.videoId 
        });
    } else if (project.thumbnail && project.thumbnail.includes('cargocollective')) {
        // Has Cargo Collective thumbnail
        hasExistingThumbnail.push({ 
            id, 
            title: project.title, 
            artist: project.artist, 
            category: project.category,
            thumbnail: project.thumbnail 
        });
    } else {
        // Truly missing cover art
        missingCoverArt.push({ 
            id, 
            title: project.title, 
            artist: project.artist, 
            category: project.category,
            videoId: project.videoId,
            thumbnail: project.thumbnail,
            reason: 'No cover art source'
        });
    }
});

console.log('=== COVER ART ANALYSIS ===\n');
console.log(`Total projects: ${projects.length}`);
console.log(`Has cover art (mapped + exists): ${hasCoverArt.length}`);
console.log(`Has video thumbnail (YouTube): ${hasVideoThumbnail.length}`);
console.log(`Has Cargo Collective thumbnail: ${hasExistingThumbnail.length}`);
console.log(`Missing cover art: ${missingCoverArt.length}`);

console.log('\n=== MISSING COVER ART BY CATEGORY ===');
const byCategory = {};
missingCoverArt.forEach(item => {
    byCategory[item.category] = byCategory[item.category] || [];
    byCategory[item.category].push(item);
});

Object.entries(byCategory).forEach(([category, items]) => {
    console.log(`\n${category}: ${items.length} entries`);
    items.forEach(item => {
        console.log(`  - ${item.id}: "${item.title}" (${item.artist || 'no artist'})`);
        if (item.reason) console.log(`    Reason: ${item.reason}`);
    });
});

console.log('\n\n=== HAS VIDEO THUMBNAIL (can download from YouTube) ===');
hasVideoThumbnail.forEach(item => {
    console.log(`  - ${item.id}: "${item.title}" - https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`);
});

console.log('\n\n=== HAS CARGO THUMBNAIL (can download) ===');
hasExistingThumbnail.forEach(item => {
    console.log(`  - ${item.id}: "${item.title}" - ${item.thumbnail}`);
});

// Save detailed report
const report = {
    total: projects.length,
    hasCoverArt: hasCoverArt.length,
    hasVideoThumbnail: hasVideoThumbnail.length,
    hasCargoThumbnail: hasExistingThumbnail.length,
    missingCoverArt: missingCoverArt.length,
    missingEntries: missingCoverArt,
    videoThumbnailEntries: hasVideoThumbnail,
    cargoThumbnailEntries: hasExistingThumbnail
};

fs.writeFileSync('/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/cover-art-analysis.json', JSON.stringify(report, null, 2));
console.log('\n\nDetailed report saved to: cover-art-analysis.json');
