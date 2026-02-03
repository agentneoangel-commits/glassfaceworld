# Missing Cover Art - Spotify Sources

## Playlist 1: Glassface/Facer Collection
https://open.spotify.com/playlist/2wLab6oZy2HhRxn3JZrNoL

## Playlist 2: tobi lou Collection  
https://open.spotify.com/playlist/37i9dQZF1DZ06evO2UilRG

## How to Extract Cover Art from Spotify

### Method 1: Direct URL (if you have the track/album ID)
Spotify images use this pattern:
```
https://i.scdn.co/image/{IMAGE_ID}
```

### Method 2: Browser DevTools
1. Open Spotify Web Player
2. Navigate to track/album
3. Right-click cover art → "Inspect"
4. Find `<img>` tag with `src` starting with `https://i.scdn.co/image/`
5. Copy the URL

### Method 3: Spotify Downloader Sites
- https://spotifydown.com
- https://spotifymate.com
- Search "Spotify cover art downloader"

### Method 4: Third-party APIs
- https://api.spotify.com (requires auth)
- https://songlink.io (can extract metadata + images)

## Missing Tracks to Find

From the research, these need cover art:

**Glassface Solo:**
- Foundation
- Oblivion  
- There's No Other One
- Endless Color
- Whatever

**Facer-era tobi lou:**
- The Fun
- Cult Classic
- Solange (ft. Glassface/Facer)
- New Bish

**Other Productions:**
- Various 2022-2025 tobi lou tracks
- Parris Goebel tracks
- Ayotemi tracks

## Next Steps

1. Open the Spotify playlists above
2. For each missing track, find the album/single cover
3. Copy image URL (starts with `https://i.scdn.co/image/`)
4. Save to: `images/covers/{project-id}.jpg`
5. Run: `node update-database-with-covers.js`

## Quick Download Script

```javascript
// save as: download-spotify-covers.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const COVERS_DIR = path.join(__dirname, 'images', 'covers');

// Add Spotify image URLs here as you find them
const SPOTIFY_COVERS = {
  // Example:
  // 'music-glassface-foundation': 'https://i.scdn.co/image/...',
  // 'music-glassface-oblivion': 'https://i.scdn.co/image/...',
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

// Download all
async function downloadAll() {
  for (const [id, url] of Object.entries(SPOTIFY_COVERS)) {
    const filepath = path.join(COVERS_DIR, `${id}.jpg`);
    try {
      await downloadImage(url, filepath);
      console.log(`✅ Downloaded: ${id}`);
    } catch (err) {
      console.log(`❌ Failed: ${id} - ${err.message}`);
    }
  }
}

downloadAll();
```

Fill in the `SPOTIFY_COVERS` object with URLs from the playlists, then run the script.
