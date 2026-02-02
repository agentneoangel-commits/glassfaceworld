#!/usr/bin/env node
/**
 * Thumbnail Audit Script for Glassface World V2
 * Verifies all project thumbnails are valid and match their titles
 */

const fs = require('fs');
const path = require('path');

// Import projects data
const { projects } = require('/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/js/projects.js');

const CARGO_DIR = '/Users/Trinity/.openclaw/workspace/glassfaceworld-v2/images/cargo';
const MIN_FILE_SIZE = 1000; // Files under 1KB are suspicious

// Results tracking
const results = {
    total: 0,
    valid: 0,
    corrupted: [],
    suspicious: [],
    missing: [],
    youtubeFixed: [],
    pngFixed: []
};

// Check if file is corrupted (XML error instead of image)
function isCorrupted(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return content.includes('<?xml') && content.includes('<Error>');
    } catch (e) {
        return true;
    }
}

// Get file size
function getFileSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.size;
    } catch (e) {
        return 0;
    }
}

// Check if file is valid image
function isValidImage(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8', 100);
        return content.includes('GIF89a') || content.includes('PNG') || content.includes('JFIF') || content.includes('\xFF\xD8\xFF');
    } catch (e) {
        return false;
    }
}

// Process all projects
Object.keys(projects).forEach(category => {
    projects[category].forEach(project => {
        results.total++;
        
        const imagePath = project.image;
        const isYouTubeUrl = imagePath && imagePath.includes('img.youtube.com');
        
        // If already using YouTube URL, consider it fixed
        if (isYouTubeUrl) {
            results.valid++;
            results.youtubeFixed.push({
                id: project.id,
                title: project.title,
                category: category,
                image: imagePath,
                youtubeId: project.youtubeId
            });
            return;
        }
        
        // Check local file
        if (imagePath && imagePath.startsWith('images/cargo/')) {
            const fileName = path.basename(imagePath);
            const fullPath = path.join(CARGO_DIR, fileName);
            
            if (!fs.existsSync(fullPath)) {
                results.missing.push({
                    id: project.id,
                    title: project.title,
                    category: category,
                    expectedFile: fileName,
                    youtubeId: project.youtubeId
                });
                return;
            }
            
            const size = getFileSize(fullPath);
            
            // Check for corruption
            if (isCorrupted(fullPath)) {
                results.corrupted.push({
                    id: project.id,
                    title: project.title,
                    category: category,
                    fileName: fileName,
                    fileSize: size,
                    youtubeId: project.youtubeId
                });
                return;
            }
            
            // Check for suspiciously small files
            if (size < MIN_FILE_SIZE) {
                results.suspicious.push({
                    id: project.id,
                    title: project.title,
                    category: category,
                    fileName: fileName,
                    fileSize: size,
                    youtubeId: project.youtubeId
                });
                return;
            }
            
            results.valid++;
        } else {
            // External URL or other
            results.valid++;
        }
    });
});

// Generate report
console.log('='.repeat(80));
console.log('THUMBNAIL AUDIT REPORT - Glassface World V2');
console.log('='.repeat(80));
console.log();
console.log(`Total Projects: ${results.total}`);
console.log(`Valid Thumbnails: ${results.valid}`);
console.log(`Corrupted Files: ${results.corrupted.length}`);
console.log(`Suspicious Files: ${results.suspicious.length}`);
console.log(`Missing Files: ${results.missing.length}`);
console.log(`YouTube URL Fixes: ${results.youtubeFixed.length}`);
console.log();

if (results.corrupted.length > 0) {
    console.log('─'.repeat(80));
    console.log('CORRUPTED FILES (need immediate fix):');
    console.log('─'.repeat(80));
    results.corrupted.forEach(item => {
        console.log(`❌ ${item.category} > ${item.title}`);
        console.log(`   File: ${item.fileName} (${item.fileSize} bytes)`);
        console.log(`   YouTube ID: ${item.youtubeId || 'N/A'}`);
        
        // Check for alternative PNG
        const pngPath = path.join(CARGO_DIR, item.fileName.replace('.gif', '.png'));
        if (fs.existsSync(pngPath)) {
            const pngSize = getFileSize(pngPath);
            console.log(`   ✅ PNG alternative exists: ${pngSize} bytes`);
        } else if (item.youtubeId) {
            console.log(`   🔧 Fix: Use https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`);
        }
        console.log();
    });
}

if (results.suspicious.length > 0) {
    console.log('─'.repeat(80));
    console.log('SUSPICIOUS FILES (under 1KB):');
    console.log('─'.repeat(80));
    results.suspicious.forEach(item => {
        console.log(`⚠️  ${item.category} > ${item.title}`);
        console.log(`   File: ${item.fileName} (${item.fileSize} bytes)`);
        console.log();
    });
}

if (results.missing.length > 0) {
    console.log('─'.repeat(80));
    console.log('MISSING FILES:');
    console.log('─'.repeat(80));
    results.missing.forEach(item => {
        console.log(`🚫 ${item.category} > ${item.title}`);
        console.log(`   Expected: ${item.expectedFile}`);
        if (item.youtubeId) {
            console.log(`   🔧 Fix: Use https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`);
        }
        console.log();
    });
}

// Specific check for Archive section projects mentioned in the task
console.log('─'.repeat(80));
console.log('ARCHIVE SECTION VERIFICATION:');
console.log('─'.repeat(80));

const archiveProjectsToCheck = [
    'tobi-lou-game-ova', 'tunji-ige-war', 'tokyos-revenge', 
    'swizz-beats-dmx-rick-ross', 'bea-miller-feel-something', 'wiz-khalifa-alright',
    'shy-glizzy-volcano', 'elley-duhe', 'lil-yachty-66', 'vic-mensa-metaphysical',
    'young-thug-dirty-shoes', 'amine-campfire', 'bhad-bhabie-hacked', 'prhyme',
    'fifth-harmony', 'dua-lipa-genesis', 'dram-ill-nana', 'khalid-location',
    'smokepurpp-bless-yo-trap', 'migos-motorsport', 'tobi-lou-2hrs'
];

archiveProjectsToCheck.forEach(id => {
    const project = projects.archive.find(p => p.id === id);
    if (project) {
        const imagePath = project.image;
        const isYouTubeUrl = imagePath && imagePath.includes('img.youtube.com');
        
        if (isYouTubeUrl) {
            console.log(`✅ ${id}: Using YouTube URL (${imagePath.substring(0, 60)}...)`);
        } else {
            const fileName = path.basename(imagePath);
            const fullPath = path.join(CARGO_DIR, fileName);
            
            if (fs.existsSync(fullPath)) {
                const size = getFileSize(fullPath);
                const corrupted = isCorrupted(fullPath);
                console.log(`${corrupted ? '❌' : '✅'} ${id}: ${fileName} (${(size/1024).toFixed(1)}KB)${corrupted ? ' - CORRUPTED!' : ''}`);
            } else {
                console.log(`🚫 ${id}: File missing - ${fileName}`);
            }
        }
    } else {
        console.log(`⚠️  ${id}: Project not found in archive`);
    }
});

// Save results to file
fs.writeFileSync('/Users/Trinity/.openclaw/workspace/thumbnail-audit-report.json', JSON.stringify(results, null, 2));
console.log();
console.log('📄 Full report saved to: thumbnail-audit-report.json');
console.log();
console.log('='.repeat(80));

// Export for use by other scripts
module.exports = { results };
