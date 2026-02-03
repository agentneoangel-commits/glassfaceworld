const fs = require('fs');
const https = require('https');
const path = require('path');

const COVERS_DIR = path.join(__dirname, 'images', 'covers');

// Spotify image URLs - fill these in as you find them from the playlists
// Playlist 1: https://open.spotify.com/playlist/2wLab6oZy2HhRxn3JZrNoL
// Playlist 2: https://open.spotify.com/playlist/37i9dQZF1DZ06evO2UilRG
const SPOTIFY_COVERS = {
  // Example format - replace with actual URLs:
  // 'music-glassface-foundation': 'https://i.scdn.co/image/abc123',
  // 'music-glassface-oblivion': 'https://i.scdn.co/image/def456',
  // 'music-glassface-theres-no-other-one': 'https://i.scdn.co/image/ghi789',
  // 'music-glassface-endless-color': 'https://i.scdn.co/image/jkl012',
  // 'music-glassface-whatever': 'https://i.scdn.co/image/mno345',
  
  // Add more as you find them from the playlists
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
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

async function downloadAll() {
  console.log('Spotify Cover Art Downloader');
  console.log('============================');
  console.log('');
  
  if (Object.keys(SPOTIFY_COVERS).length === 0) {
    console.log('⚠️  No URLs configured yet.');
    console.log('');
    console.log('Instructions:');
    console.log('1. Open the Spotify playlists in browser');
    console.log('2. Find each missing track');
    console.log('3. Right-click cover art → Inspect Element');
    console.log('4. Copy the image URL (starts with https://i.scdn.co/image/)');
    console.log('5. Add to SPOTIFY_COVERS object above');
    console.log('6. Run this script again');
    console.log('');
    console.log('Missing tracks to find:');
    console.log('- Foundation, Oblivion, There\'s No Other One, Endless Color, Whatever');
    console.log('- The Fun, Cult Classic, Solange, New Bish');
    return;
  }
  
  let downloaded = 0;
  let failed = 0;
  
  for (const [id, url] of Object.entries(SPOTIFY_COVERS)) {
    const filepath = path.join(COVERS_DIR, `${id}.jpg`);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ Already exists: ${id}`);
      continue;
    }
    
    try {
      await downloadImage(url, filepath);
      console.log(`✅ Downloaded: ${id}`);
      downloaded++;
    } catch (err) {
      console.log(`❌ Failed: ${id} - ${err.message}`);
      failed++;
    }
    
    // Be nice to servers
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('');
  console.log('============================');
  console.log(`Downloaded: ${ downloaded}`);
  console.log(`Failed: ${failed}`);
}

downloadAll().catch(console.error);
