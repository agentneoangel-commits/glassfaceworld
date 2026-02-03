const https = require('https');
const fs = require('fs');
const path = require('path');

const coversDir = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/covers';

// Ensure directory exists
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

// All found album art URLs from Spotify
const coversToDownload = {
  'music-glassface-foundation': 'https://i.scdn.co/image/ab67616d00001e02f67434244b1bdee8cac6f0bb',
  'music-glassface-oblivion': 'https://i.scdn.co/image/ab67616d00001e02cb6e332e5bcd6e70aef79cdd',
  'music-glassface-theres-no-other-one': 'https://i.scdn.co/image/ab67616d00001e02d80d4d5d232b79d12ecf4454',
  'music-glassface-endless-color': 'https://i.scdn.co/image/ab67616d00001e02761f0875bf44530ec40a6538',
  'music-glassface-whatever': 'https://i.scdn.co/image/ab67616d00001e029d02e2b26cad3f1e23c2070c',
  'music-tobi-lou-the-fun': 'https://i.scdn.co/image/ab67616d00001e021db3772149d929264a517e16',
  'music-tobi-lou-solange': 'https://i.scdn.co/image/ab67616d00001e0213229ce2ab3376528b0e1d05',
  'music-tobi-lou-new-bish': 'https://i.scdn.co/image/ab67616d00001e023adef64b37ce36645085a3ee',
  // Cult Classic uses same art as The Fun (it's an interlude from the same album)
  'music-tobi-lou-cult-classic': 'https://i.scdn.co/image/ab67616d00001e021db3772149d929264a517e16',
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
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

async function downloadAll() {
  const results = [];
  
  for (const [filename, url] of Object.entries(coversToDownload)) {
    const filepath = path.join(coversDir, `${filename}.jpg`);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`SKIP: ${filename}.jpg (already exists)`);
      results.push({ filename, status: 'skipped', path: filepath });
      continue;
    }
    
    try {
      await downloadImage(url, filepath);
      const stats = fs.statSync(filepath);
      console.log(`✓ DOWNLOADED: ${filename}.jpg (${(stats.size / 1024).toFixed(1)} KB)`);
      results.push({ filename, status: 'downloaded', path: filepath, size: stats.size });
    } catch (error) {
      console.error(`✗ FAILED: ${filename}.jpg - ${error.message}`);
      results.push({ filename, status: 'failed', error: error.message });
    }
  }
  
  return results;
}

downloadAll().then(results => {
  console.log('\n=== DOWNLOAD SUMMARY ===');
  const downloaded = results.filter(r => r.status === 'downloaded').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const failed = results.filter(r => r.status === 'failed').length;
  
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed downloads:');
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`  - ${r.filename}: ${r.error}`);
    });
  }
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
