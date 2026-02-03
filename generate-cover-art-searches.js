#!/usr/bin/env node
/**
 * Cover Art Scraper via Brave Search
 * Searches for cover artwork for all music projects
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load career database
const dbPath = path.join(__dirname, 'career-database-enriched.json');
const database = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Ensure directories exist
const COVERS_DIR = path.join(__dirname, 'images', 'covers');
if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
}

// Music categories
const MUSIC_CATEGORIES = ['music-production', 'music-video'];

// Get all music projects
const musicProjects = database.projects.filter(p => 
    MUSIC_CATEGORIES.includes(p.category) ||
    p.roles?.some(r => r.toLowerCase().includes('music'))
);

console.log(`Found ${musicProjects.length} music projects to search cover art for`);
console.log('');

// Track Facer vs Glassface
function getMusicAlias(year) {
    return year < 2019 ? 'Facer' : 'Glassface';
}

// Generate search query
function generateSearchQuery(project) {
    const year = new Date(project.publishedAt || '2015-01-01').getFullYear();
    const alias = getMusicAlias(year);
    
    // For production credits - search the song
    if (project.category === 'music-production' || 
        project.roles?.some(r => r.toLowerCase().includes('production'))) {
        return `${project.artist} ${project.title} cover art single artwork`;
    }
    
    // For music videos - search the video thumbnail or single art
    if (project.category === 'music-video') {
        return `${project.artist} ${project.title} music video cover art`;
    }
    
    return `${project.artist} ${project.title} cover artwork`;
}

// Save search queries for manual batch processing
const searchList = musicProjects.map(project => {
    const year = new Date(project.publishedAt || '2015-01-01').getFullYear();
    const alias = getMusicAlias(year);
    const query = generateSearchQuery(project);
    
    return {
        id: project._id,
        title: project.title,
        artist: project.artist,
        year: year,
        musicAlias: alias,
        searchQuery: query,
        category: project.category,
        externalUrl: project.externalUrl
    };
});

// Save to file
const listPath = path.join(__dirname, 'cover-art-search-list.json');
fs.writeFileSync(listPath, JSON.stringify(searchList, null, 2));

console.log('Search list saved to: cover-art-search-list.json');
console.log('');

// Group by artist for easier searching
const byArtist = {};
searchList.forEach(item => {
    if (!byArtist[item.artist]) {
        byArtist[item.artist] = [];
    }
    byArtist[item.artist].push(item);
});

// Print organized list
console.log('PROJECTS NEEDING COVER ART (organized by artist):');
console.log('=====================================================');

Object.entries(byArtist)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([artist, projects]) => {
        console.log('');
        console.log(`${artist}:`);
        projects.forEach(p => {
            const icon = p.category === 'music-video' ? '🎬' : '🎵';
            console.log(`  ${icon} "${p.title}" (${p.year}) [${p.musicAlias}]`);
            console.log(`     Search: "${p.searchQuery}"`);
        });
    });

console.log('');
console.log('=====================================================');
console.log('SUMMARY:');
console.log(`  Total projects: ${searchList.length}`);
console.log(`  Unique artists: ${Object.keys(byArtist).length}`);
console.log('');
console.log('NEXT STEPS:');
console.log('1. Use Brave image search or Google Images with the search queries above');
console.log('2. Download 600x600 or larger JPG/PNG files');
console.log('3. Save as: images/covers/{project-id}.jpg');
console.log('4. Run: node update-cover-art-paths.js to update database');
console.log('');
console.log('PRIORITY ARTISTS (major projects):');
const priorityArtists = ['tobi lou', 'Glassface', 'Facer', 'Lil Yachty', 'Young Thug', 'Chief Keef'];
priorityArtists.forEach(artist => {
    if (byArtist[artist]) {
        console.log(`  ${artist}: ${byArtist[artist].length} projects`);
    }
});

// Save prioritized list
const priorityProjects = searchList.filter(p => 
    priorityArtists.includes(p.artist) || 
    p.year >= 2020 ||
    p.category === 'music-video'
);

const priorityPath = path.join(__dirname, 'cover-art-priority-list.json');
fs.writeFileSync(priorityPath, JSON.stringify(priorityProjects, null, 2));
console.log('');
console.log(`Priority list saved: ${priorityPath} (${priorityProjects.length} projects)`);
