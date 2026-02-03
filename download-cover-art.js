#!/usr/bin/env node
/**
 * Cover Art Downloader for Glassface Career Database
 * Downloads cover art for all music projects (production + videos)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Ensure directories exist
const COVERS_DIR = path.join(__dirname, 'images', 'covers');
if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
}

// Load career database
const dbPath = path.join(__dirname, 'career-database-enriched.json');
const database = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Track Facer vs Glassface naming
// Facer = pre-2019 music name
// Glassface = 2019+ music name (and all visual work)

const MUSIC_CATEGORIES = ['music-production', 'music-video'];

// Projects that need cover art
const musicProjects = database.projects.filter(p => 
    MUSIC_CATEGORIES.includes(p.category) ||
    p.roles?.some(r => r.toLowerCase().includes('music'))
);

console.log(`Found ${musicProjects.length} music projects to get cover art for`);
console.log('');

// Download function
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filepath);
        
        client.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                downloadImage(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }
            
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(filepath);
            });
        }).on('error', reject);
    });
}

// Get YouTube thumbnail
function getYouTubeThumbnail(videoId) {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Get high-res YouTube thumbnail
function getYouTubeThumbnailMax(videoId) {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// Process each project
async function processProjects() {
    const results = {
        downloaded: [],
        failed: [],
        skipped: []
    };
    
    for (const project of musicProjects) {
        const year = new Date(project.publishedAt || '2015-01-01').getFullYear();
        const musicAlias = year < 2019 ? 'Facer' : 'Glassface';
        
        console.log(`Processing: ${project.title} (${year}) [${musicAlias}]`);
        
        // Determine cover art source
        let coverUrl = null;
        let source = null;
        
        // 1. Try YouTube thumbnail (for videos)
        if (project.videoId) {
            coverUrl = getYouTubeThumbnailMax(project.videoId);
            source = 'youtube-max';
        }
        
        // 2. If no video, this is a production credit - need to find song cover
        // For production credits, we need to search for the song's cover art
        if (!coverUrl && project.artist && project.title) {
            // These need manual lookup or API search
            // For now, mark as needing manual research
            results.skipped.push({
                id: project._id,
                title: project.title,
                artist: project.artist,
                reason: 'Production credit - needs manual cover art lookup',
                year,
                musicAlias
            });
            console.log(`  ⚠️  Production credit - needs manual lookup`);
            continue;
        }
        
        if (!coverUrl) {
            results.skipped.push({
                id: project._id,
                title: project.title,
                artist: project.artist,
                reason: 'No video ID or cover source',
                year,
                musicAlias
            });
            console.log(`  ⚠️  No cover source available`);
            continue;
        }
        
        // Download the cover
        const filename = `${project._id}.jpg`;
        const filepath = path.join(COVERS_DIR, filename);
        
        try {
            await downloadImage(coverUrl, filepath);
            
            // Update database with local path
            project.coverArt = project.coverArt || {};
            project.coverArt.localPath = `images/covers/${filename}`;
            project.coverArt.url = coverUrl;
            project.coverArt.downloaded = true;
            project.musicAlias = musicAlias; // Track which alias was used
            
            results.downloaded.push({
                id: project._id,
                title: project.title,
                filepath: `images/covers/${filename}`,
                source,
                year,
                musicAlias
            });
            
            console.log(`  ✅ Downloaded: ${filename}`);
            
        } catch (error) {
            results.failed.push({
                id: project._id,
                title: project.title,
                error: error.message,
                url: coverUrl,
                year,
                musicAlias
            });
            console.log(`  ❌ Failed: ${error.message}`);
        }
        
        // Small delay to be nice to servers
        await new Promise(r => setTimeout(r, 100));
    }
    
    return results;
}

// Run
processProjects().then(results => {
    console.log('');
    console.log('========================================');
    console.log('DOWNLOAD COMPLETE');
    console.log('========================================');
    console.log(`Downloaded: ${results.downloaded.length}`);
    console.log(`Failed: ${results.failed.length}`);
    console.log(`Skipped (need manual): ${results.skipped.length}`);
    console.log('');
    
    // Save updated database
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
    console.log('Database updated with cover art paths');
    
    // Save report
    const reportPath = path.join(__dirname, 'cover-art-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`Report saved: ${reportPath}`);
    
    // Print manual lookup list
    if (results.skipped.length > 0) {
        console.log('');
        console.log('PROJECTS NEEDING MANUAL COVER ART LOOKUP:');
        console.log('(Production credits - search Spotify/Apple Music for these)');
        console.log('');
        results.skipped.forEach(s => {
            console.log(`  - ${s.artist} - ${s.title} (${s.year}) [${s.musicAlias}]`);
        });
    }
    
}).catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
