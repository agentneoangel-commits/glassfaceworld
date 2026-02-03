/**
 * Sanity CMS About Page Loader
 * Fetches about page content from Sanity
 */

(function() {
    'use strict';

    const SANITY_CONFIG = {
        projectId: 'wxjd5ij6',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: true
    };

    const ABOUT_QUERY = encodeURIComponent(`
        *[_type == "about"][0] {
            name,
            headline,
            titles,
            tagline,
            bio,
            stats,
            artists,
            pressQuotes
        }
    `);

    const apiUrl = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${ABOUT_QUERY}`;

    async function fetchAboutPage() {
        try {
            console.log('[Sanity] Fetching about page...');
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            const about = data.result;
            
            if (about) {
                console.log('[Sanity] About page loaded');
                window.sanityAbout = about;
                
                // Dispatch event
                window.dispatchEvent(new CustomEvent('aboutLoaded', {
                    detail: { source: 'sanity' }
                }));
                
                return about;
            }
            
        } catch (error) {
            console.error('[Sanity] Failed to fetch about:', error);
        }
        return null;
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchAboutPage);
    } else {
        fetchAboutPage();
    }

})();
