#!/usr/bin/env node
/**
 * Cover Art Downloader - Phase 2
 * Downloads cover artwork for music projects using direct URLs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure directories exist
const COVERS_DIR = path.join(__dirname, 'images', 'covers');
if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
}

// Load career database
const dbPath = path.join(__dirname, 'career-database-enriched.json');
const database = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Known cover art URLs (from Apple Music, Spotify CDNs, etc.)
const KNOWN_COVERS = {
    // tobi lou - Live on Ice album
    'music-tobi-lou-sad-last-night': {
        url: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/5e/ea/8f/5eea8f5d-8f2d-6d1a-8b4c-9b2c6d4f3e2a/859727352830_cover.jpg',
        source: 'Apple Music'
    },
    // Add more as we find them
};

// Download function
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filepath);
        
        client.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
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

// Main function
async function downloadCovers() {
    const results = {
        downloaded: [],
        failed: [],
        skipped: []
    };
    
    // Process known covers first
    for (const [projectId, coverInfo] of Object.entries(KNOWN_COVERS)) {
        const project = database.projects.find(p => p._id === projectId);
        if (!project) continue;
        
        const filename = `${projectId}.jpg`;
        const filepath = path.join(COVERS_DIR, filename);
        
        // Skip if already downloaded
        if (fs.existsSync(filepath)) {
            console.log(`✓ Already exists: ${filename}`);
            results.skipped.push({ id: projectId, reason: 'Already exists' });
            continue;
        }
        
        try {
            await downloadImage(coverInfo.url, filepath);
            
            // Update database
            project.coverArt = project.coverArt || {};
            project.coverArt.localPath = `images/covers/${filename}`;
            project.coverArt.source = coverInfo.source;
            
            results.downloaded.push({
                id: projectId,
                title: project.title,
                filename
            });
            
            console.log(`✅ Downloaded: ${filename}`);
            
        } catch (error) {
            results.failed.push({
                id: projectId,
                error: error.message,
                url: coverInfo.url
            });
            console.log(`❌ Failed: ${filename} - ${error.message}`);
        }
        
        // Be nice to servers
        await new Promise(r => setTimeout(r, 500));
    }
    
    // Save updated database
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
    
    // Save report
    const reportPath = path.join(__dirname, 'cover-art-download-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log('');
    console.log('========================================');
    console.log('DOWNLOAD COMPLETE');
    console.log('========================================');
    console.log(`Downloaded: ${results.downloaded.length}`);
    console.log(`Failed: ${results.failed.length}`);
    console.log(`Skipped: ${results.skipped.length}`);
    console.log(`Report: ${reportPath}`);
}

// Manual URL list for future additions
console.log('Cover Art Downloader');
console.log('====================');
console.log('');
console.log('To add more covers, update the KNOWN_COVERS object with:');
console.log('- Apple Music CDN URLs (is1-ssl.mzstatic.com)');
console.log('- Spotify CDN URLs (i.scdn.co)');
console.log('- Direct album art URLs');
console.log('');

downloadCovers().catch(console.error);
