/**
 * Enhanced Project Descriptions
 * Extended descriptions and metadata for portfolio projects
 */

var enhancedDescriptions = {
    "google-creator-labs-comprehensive": {
        bodyCopy: "Google Creator Labs is an incubator for emerging artists and creators, providing access to Google's latest technology and mentorship from industry leaders. Glassface has been an integral part of the program since its inception in 2019.",
        processNotes: "Documentary-style filming with Pixel phones",
        accolades: [
            { type: "award", text: "Vogue Feature" },
            { type: "press", text: "V Magazine" }
        ]
    },
    "lil-yachty-1-night": {
        bodyCopy: "The breakthrough music video that put Lil Yachty on the map. Shot with a distinct visual style that became synonymous with the SoundCloud rap era.",
        processNotes: "Early career viral hit",
        accolades: [
            { type: "award", text: "RIAA Platinum" },
            { type: "press", text: "Pitchfork Best Videos 2016" }
        ]
    },
    "jhene-aiko-love": {
        bodyCopy: "Official music video for Jhene Aiko's 'Love'. A visually stunning masterpiece showcasing Glassface's direction and VFX capabilities.",
        processNotes: "Intimate performance capture"
    }
};

// Press logos for modal display
var pressLogos = {
    "Vogue": { logo: "images/logos/vogue.png" },
    "V Magazine": { logo: "images/logos/vmagazine.png" },
    "Billboard": { logo: "images/logos/billboard.png" },
    "MTV": { logo: "images/logos/mtv.png" },
    "Complex": { logo: "images/logos/complex.png" },
    "The Fader": { logo: "images/logos/fader.png" },
    "Pitchfork": { logo: "images/logos/pitchfork.png" },
    "Hypebeast": { logo: "images/logos/hypebeast.png" },
    "Variety": { logo: "images/logos/variety.png" },
    "Adweek": { logo: "images/logos/adweek.png" },
    "Creative Review": { logo: null },
    "Highsnobiety": { logo: null },
    "CoinDesk": { logo: null },
    "AdAge": { logo: null },
    "Noisey": { logo: null },
    "Pigeons & Planes": { logo: null },
    "Esquire": { logo: null },
    "WWD": { logo: null },
    "Essence": { logo: null },
    "Google Blog": { logo: null }
};

// Expose to global scope
if (typeof window !== 'undefined') {
    window.enhancedDescriptions = enhancedDescriptions;
    window.pressLogos = pressLogos;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { enhancedDescriptions, pressLogos };
}