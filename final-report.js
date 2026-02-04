// Final cover art collection report
const fs = require('fs');

const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';
const dbPath = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/career-database-enriched.json';

const projects = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const existingCovers = fs.readdirSync(coversDir).filter(f => f.match(/\.(jpg|png|gif)$/));

// Map cover filenames to entry IDs
const coverToId = {};
existingCovers.forEach(filename => {
    const id = filename.replace(/\.(jpg|png|gif)$/, '');
    coverToId[id] = filename;
});

// Categorize entries
const withCoverArt = [];
const withVideoThumbnail = [];
const trulyMissing = [];

projects.forEach(project => {
    const id = project._id;
    const hasCover = coverToId[id] || existingCovers.some(f => f.startsWith(id));
    const hasVideo = project.videoId;
    
    if (hasCover) {
        withCoverArt.push({
            id,
            title: project.title,
            artist: project.artist,
            category: project.category,
            filename: coverToId[id] || existingCovers.find(f => f.startsWith(id))
        });
    } else if (hasVideo) {
        withVideoThumbnail.push({
            id,
            title: project.title,
            artist: project.artist,
            category: project.category,
            videoId: project.videoId
        });
    } else {
        trulyMissing.push({
            id,
            title: project.title,
            artist: project.artist,
            category: project.category
        });
    }
});

console.log('==============================================');
console.log('  GLASSFACE COVER ART COLLECTION - FINAL REPORT');
console.log('==============================================\n');

console.log(`TOTAL DATABASE ENTRIES: ${projects.length}`);
console.log(`TOTAL COVER FILES: ${existingCovers.length}`);
console.log(`ENTRIES WITH COVER ART: ${withCoverArt.length}`);
console.log(`ENTRIES WITH VIDEO THUMBNAIL (YouTube): ${withVideoThumbnail.length}`);
console.log(`ENTRIES TRULY MISSING COVER ART: ${trulyMissing.length}`);

console.log('\n----------------------------------------------');
console.log('COVER ART BY CATEGORY:');
console.log('----------------------------------------------');

const byCategory = {};
withCoverArt.forEach(item => {
    byCategory[item.category] = byCategory[item.category] || [];
    byCategory[item.category].push(item);
});

Object.entries(byCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([category, items]) => {
        console.log(`\n${category}: ${items.length} entries`);
        items.slice(0, 5).forEach(item => {
            console.log(`  ✓ ${item.id}`);
        });
        if (items.length > 5) {
            console.log(`  ... and ${items.length - 5} more`);
        }
    });

console.log('\n----------------------------------------------');
console.log('ENTRIES TRULY MISSING COVER ART:');
console.log('----------------------------------------------');
if (trulyMissing.length === 0) {
    console.log('NONE - All entries have cover art! 🎉');
} else {
    trulyMissing.forEach(item => {
        console.log(`  ✗ ${item.id}: "${item.title}" (${item.category})`);
    });
}

console.log('\n----------------------------------------------');
console.log('NEW COVER ART DOWNLOADED:');
console.log('----------------------------------------------');
const newCovers = [
    'prhyme-prhyme.jpg',
    'forever-young.jpg',
    'lounar.jpg',
    'solange.jpg',
    'mama-don-t-worry-still-ain-t-dirty-.jpg',
    'dram-ill-nana.jpg',
    'why-don-t-you.jpg',
    'smokepurpp-bless-yo-trap.jpg',
    'migos-motorsport.jpg',
    'target-lil-yachty-carly.jpg',
    'finish-line-nike.jpg',
    'bhad-bhabie-hacked.jpg',
    'a-ap-twelvyy-glock-rivers.jpg',
    'adidas-kylie-jenner.jpg',
    'lil-yachty-66.jpg',
    'young-thug-dirty-shoes.jpg',
    'complex-networks-reel.jpg',
    'cousin-stizz-perfect.jpg',
    'hulu-free-machine.jpg',
    'swizz-dmx-ross.jpg',
    'bea-miller-feel-something.jpg',
    'elley-duhe.jpg',
    'amine-campfire.jpg',
    'shy-glizzy-volcano.jpg',
    'vic-mensa-metaphysical.jpg',
    'madeon-all-my-friends.jpg',
    'swizz-beats-dmx-rick-ross.jpg',
    'google-ultradreamer.jpg',
    'tobi-lou-game-ova.jpg',
    '2hrs.jpg',
    'tobi-lou-hot-tub.jpg',
    'tobi-lou-lingo-starr.jpg',
    'jhene-aiko-summer-2020.jpg',
    'piaget-michael-b-jordan.jpg',
    'adidas-jd-sports.jpg',
    'puma-jd-sports.jpg',
    'snapple-elements-nft.jpg',
    'tobi-lou-non-perishable.jpg',
    'reel.jpg',
    'sochi-olympics.jpg',
    'archive-early-works.jpg',
    'fifth-harmony-visuals.jpg',
    'rome-fortune.jpg',
    'disto-fine-art.jpg',
    'google-creator-labs.jpg',
    'jd-sports-ar.jpg',
    'jd-sports-infinite-objects.jpg',
    'kid-cudi-members-of-the-rage-s1.png',
    'lauryn-hill-merch.jpg',
    'kid-cudi-insano.png',
    'tobi-lou-non-perishable-cover.png',
    'kid-cudi-porsche.png',
    'kid-cudi-at-the-party.png',
    'lauryn-hill-rebel.jpg',
    'kid-cudi-members-of-the-rage-s2.png',
    'tunji-ige-war.jpg',
    'lil-yachty-boom.jpg',
    'tokyos-revenge.jpg',
    'lil-yachty-1-night.jpg',
    'act-up.jpg',
    'lil-yachty-one-night.jpg',
    'one-night.jpg',
    'dua-lipa-genesis.jpg',
    'target-lil-yachty-carly-rae-jepsen.jpg',
    'sango-khlorine.jpg',
    'cheap-vacations.jpg',
    'jhene-aiko-love.jpg',
    'jhene-aiko-surrender.jpg'
];

console.log(`Total new covers: ${newCovers.length}`);

console.log('\n----------------------------------------------');
console.log('SPECIFIC PROJECTS REQUESTED BY USER:');
console.log('----------------------------------------------');

const requestedProjects = [
    { name: 'Blvk H3ro Active EP', ids: ['music-blvk-h3ro-active', 'music-blvk-h3ro-motion', 'music-blvk-h3ro-brick', 'music-blvk-h3ro-arguments', 'music-blvk-h3ro-up'] },
    { name: 'Kid Cudi INSANO', ids: ['kid-cudi-insano'] },
    { name: 'Kid Cudi Porsche Topless', ids: ['kid-cudi-porsche'] },
    { name: 'Kid Cudi At The Party', ids: ['kid-cudi-at-the-party'] },
    { name: 'Mindreader remixes', ids: ['music-glassface-mindreader', 'music-sango-mindreader-remix'] }
];

requestedProjects.forEach(project => {
    console.log(`\n${project.name}:`);
    project.ids.forEach(id => {
        const hasCover = coverToId[id] || existingCovers.some(f => f.startsWith(id));
        const status = hasCover ? '✓' : '✗';
        const filename = coverToId[id] || existingCovers.find(f => f.startsWith(id));
        console.log(`  ${status} ${id}${filename ? ` (${filename})` : ''}`);
    });
});

console.log('\n----------------------------------------------');
console.log('ENTRIES NEEDING USER CLARIFICATION:');
console.log('----------------------------------------------');
const needsClarification = [
    { id: 'prhyme', reason: 'Archive entry - no video or thumbnail available' },
    { id: 'fifth-harmony', reason: 'Archive entry - only Vimeo link, no direct thumbnail' },
    { id: 'impermanent-digital', reason: 'Web3 entry - no artwork source available' },
    { id: 'i-was-sad-last-night-i-m-ok-now', reason: 'Music video entry - no videoId or thumbnail (has separate music production entry with cover)' },
    { id: 'looped-up', reason: 'Music video entry - no videoId or thumbnail (has separate music production entry with cover)' },
    { id: 'uncle-iroh', reason: 'Music video entry - no videoId or thumbnail (has separate music production entry with cover)' },
    { id: '100-thoughts', reason: 'Music video entry - no videoId or thumbnail (has separate music production entry with cover)' },
    { id: 'music-glassface-crash-747', reason: 'Music production - no album artwork available' },
    { id: 'music-glassface-vivid-color-dreams', reason: 'Music production - no album artwork available' },
    { id: 'music-sango-mindreader-remix', reason: 'Music production - no album artwork available' },
    { id: 'music-blvk-h3ro-up', reason: 'Music production - no album artwork available' }
];

needsClarification.forEach(item => {
    console.log(`  ? ${item.id}: ${item.reason}`);
});

// Save comprehensive report
const report = {
    generatedAt: new Date().toISOString(),
    summary: {
        totalEntries: projects.length,
        totalCoverFiles: existingCovers.length,
        entriesWithCoverArt: withCoverArt.length,
        entriesWithVideoThumbnail: withVideoThumbnail.length,
        entriesTrulyMissing: trulyMissing.length
    },
    coverArtByCategory: byCategory,
    trulyMissing: trulyMissing,
    needsClarification: needsClarification,
    newCovers: newCovers
};

fs.writeFileSync('/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/COVER_ART_REPORT.json', JSON.stringify(report, null, 2));

console.log('\n==============================================');
console.log('  Report saved to: COVER_ART_REPORT.json');
console.log('==============================================');
