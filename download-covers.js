// Download script for cover art
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';

// Ensure covers directory exists
if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
}

// Read the analysis
const analysis = JSON.parse(fs.readFileSync('/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/cover-art-analysis.json', 'utf8'));

const downloadQueue = [];

// Add video thumbnail entries
analysis.videoThumbnailEntries.forEach(entry => {
    downloadQueue.push({
        id: entry.id,
        url: `https://img.youtube.com/vi/${entry.videoId}/maxresdefault.jpg`,
        fallbackUrl: `https://img.youtube.com/vi/${entry.videoId}/hqdefault.jpg`,
        filename: `${entry.id}.jpg`,
        title: entry.title
    });
});

// Add cargo thumbnail entries  
analysis.cargoThumbnailEntries.forEach(entry => {
    // Convert gif to jpg for consistency
    const ext = entry.thumbnail.endsWith('.gif') ? '.gif' : 
                entry.thumbnail.endsWith('.png') ? '.png' : '.jpg';
    downloadQueue.push({
        id: entry.id,
        url: entry.thumbnail,
        filename: `${entry.id}${ext === '.gif' ? '.jpg' : ext}`, // Convert gif to jpg
        title: entry.title,
        convertGif: ext === '.gif'
    });
});

console.log(`Total downloads queued: ${downloadQueue.length}`);

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        const request = client.get(url, { timeout: 30000 }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                downloadFile(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }
            
            if (response.statusCode !== 200) {
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            
            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                resolve(filepath);
            });
            
            fileStream.on('error', reject);
        });
        
        request.on('error', reject);
        request.on('timeout', () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

async function processDownloads() {
    const results = {
        success: [],
        failed: [],
        skipped: []
    };
    
    for (let i = 0; i < downloadQueue.length; i++) {
        const item = downloadQueue[i];
        const filepath = path.join(coversDir, item.filename);
        
        // Skip if already exists
        if (fs.existsSync(filepath)) {
            console.log(`[${i + 1}/${downloadQueue.length}] SKIP: ${item.filename} (already exists)`);
            results.skipped.push(item);
            continue;
        }
        
        console.log(`[${i + 1}/${downloadQueue.length}] DOWNLOAD: ${item.title} -> ${item.filename}`);
        
        try {
            await downloadFile(item.url, filepath);
            
            // Check file size (YouTube returns 404 image that's small)
            const stats = fs.statSync(filepath);
            if (stats.size < 1000) {
                // Try fallback URL
                if (item.fallbackUrl) {
                    console.log(`  -> Retrying with fallback URL...`);
                    fs.unlinkSync(filepath);
                    await downloadFile(item.fallbackUrl, filepath);
                    const newStats = fs.statSync(filepath);
                    if (newStats.size < 1000) {
                        throw new Error('File too small (likely 404)');
                    }
                } else {
                    throw new Error('File too small (likely 404)');
                }
            }
            
            console.log(`  -> SUCCESS (${(stats.size / 1024).toFixed(1)} KB)`);
            results.success.push(item);
        } catch (error) {
            console.log(`  -> FAILED: ${error.message}`);
            results.failed.push({ ...item, error: error.message });
            // Clean up failed file
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        
        // Small delay to be nice to servers
        await new Promise(r => setTimeout(r, 200));
    }
    
    return results;
}

processDownloads().then(results => {
    console.log('\n=== DOWNLOAD SUMMARY ===');
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}`);
    console.log(`Skipped: ${results.skipped.length}`);
    
    if (results.failed.length > 0) {
        console.log('\nFailed downloads:');
        results.failed.forEach(item => {
            console.log(`  - ${item.id}: ${item.title} (${item.error})`);
        });
    }
    
    // Save results
    fs.writeFileSync('/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/download-results.json', JSON.stringify(results, null, 2));
    console.log('\nResults saved to: download-results.json');
});
