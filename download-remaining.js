// Download remaining thumbnails
const fs = require('fs');
const https = require('https');
const path = require('path');

const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';

const remainingDownloads = [
    // Failed downloads with Cargo Collective thumbnails
    { id: 'tunji-ige-war', url: 'https://payload.cargocollective.com/1/22/713998/12472468/prt_1516764314_2x.gif', filename: 'tunji-ige-war.jpg' },
    { id: 'lil-yachty-boom', url: 'https://payload.cargocollective.com/1/22/713998/12472415/prt_1486444310.gif', filename: 'lil-yachty-boom.jpg' },
    { id: 'tokyos-revenge', url: 'https://payload.cargocollective.com/1/22/713998/13974237/prt_1572198908.gif', filename: 'tokyos-revenge.jpg' },
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

async function processDownloads() {
    for (const item of remainingDownloads) {
        const filepath = path.join(coversDir, item.filename);
        
        if (fs.existsSync(filepath)) {
            console.log(`SKIP: ${item.filename} (already exists)`);
            continue;
        }
        
        console.log(`DOWNLOAD: ${item.id}`);
        
        try {
            await downloadFile(item.url, filepath);
            const stats = fs.statSync(filepath);
            console.log(`  -> SUCCESS (${(stats.size / 1024).toFixed(1)} KB)`);
        } catch (error) {
            console.log(`  -> FAILED: ${error.message}`);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
    }
}

processDownloads();
