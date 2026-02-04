// Fix failed downloads with alternative URLs
const fs = require('fs');
const https = require('https');
const path = require('path');

const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';

// Failed downloads with alternative approaches
const retryQueue = [
    // Try mqdefault instead of maxresdefault
    { id: 'lil-yachty-1-night', url: 'https://img.youtube.com/vi/251cxou3yR4/mqdefault.jpg', filename: 'lil-yachty-1-night.jpg' },
    { id: 'act-up', url: 'https://img.youtube.com/vi/FFmorSFE6D0/mqdefault.jpg', filename: 'act-up.jpg' },
    { id: 'lil-yachty-one-night', url: 'https://img.youtube.com/vi/251cxou3yR4/mqdefault.jpg', filename: 'lil-yachty-one-night.jpg' },
    { id: 'one-night', url: 'https://img.youtube.com/vi/251cxou3yR4/mqdefault.jpg', filename: 'one-night.jpg' },
    { id: 'tunji-ige-war', url: 'https://img.youtube.com/vi/9QCgXehnM04/mqdefault.jpg', filename: 'tunji-ige-war.jpg' },
    { id: 'dua-lipa-genesis', url: 'https://img.youtube.com/vi/nAQ77H7Fzfw/mqdefault.jpg', filename: 'dua-lipa-genesis.jpg' },
    { id: 'target-lil-yachty-carly-rae-jepsen', url: 'https://img.youtube.com/vi/x_YT2abZUX0/mqdefault.jpg', filename: 'target-lil-yachty-carly-rae-jepsen.jpg' },
    { id: 'sango-khlorine', url: 'https://img.youtube.com/vi/dbv1O3jV_Hk/mqdefault.jpg', filename: 'sango-khlorine.jpg' },
    { id: 'lil-yachty-boom', url: 'https://img.youtube.com/vi/7L0Xn2nu2xU/mqdefault.jpg', filename: 'lil-yachty-boom.jpg' },
    { id: 'cheap-vacations', url: 'https://img.youtube.com/vi/f9KcAdacn2o/mqdefault.jpg', filename: 'cheap-vacations.jpg' },
    { id: 'tokyos-revenge', url: 'https://img.youtube.com/vi/RgKqxFR--eo/mqdefault.jpg', filename: 'tokyos-revenge.jpg' },
    { id: 'jhene-aiko-love', url: 'https://img.youtube.com/vi/nfsr8Yf6oPo/mqdefault.jpg', filename: 'jhene-aiko-love.jpg' },
    { id: 'jhene-aiko-surrender', url: 'https://img.youtube.com/vi/jtMin8GTNGA/mqdefault.jpg', filename: 'jhene-aiko-surrender.jpg' },
];

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, { timeout: 30000 }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
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
        }).on('error', reject);
    });
}

async function processRetries() {
    const results = { success: [], failed: [] };
    
    for (let i = 0; i < retryQueue.length; i++) {
        const item = retryQueue[i];
        const filepath = path.join(coversDir, item.filename);
        
        console.log(`[${i + 1}/${retryQueue.length}] RETRY: ${item.id}`);
        
        try {
            await downloadFile(item.url, filepath);
            const stats = fs.statSync(filepath);
            
            if (stats.size < 1000) {
                throw new Error('File too small');
            }
            
            console.log(`  -> SUCCESS (${(stats.size / 1024).toFixed(1)} KB)`);
            results.success.push(item);
        } catch (error) {
            console.log(`  -> FAILED: ${error.message}`);
            results.failed.push({ ...item, error: error.message });
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
        
        await new Promise(r => setTimeout(r, 100));
    }
    
    return results;
}

processRetries().then(results => {
    console.log('\n=== RETRY SUMMARY ===');
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}`);
    
    if (results.failed.length > 0) {
        console.log('\nStill failed:');
        results.failed.forEach(item => console.log(`  - ${item.id}`));
    }
});
