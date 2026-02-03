/**
 * Sanity CMS Loader for Glassface Portfolio
 * Fetches projects from Sanity and exposes them as global 'projects' variable
 * Falls back to static data if Sanity is unavailable
 */

(function() {
    'use strict';

    // Sanity configuration
    const SANITY_CONFIG = {
        projectId: 'wxjd5ij6',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: true
    };

    // GROQ query to fetch all projects
    const PROJECTS_QUERY = encodeURIComponent(`
        *[_type == "project"] | order(order asc, releaseDate desc) {
            _id,
            title,
            "id": slug.current,
            category,
            role,
            "image": imageUrl,
            youtubeId,
            releaseDate,
            playCount,
            description,
            press,
            links
        }
    `);

    // Build Sanity API URL
    const apiUrl = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${PROJECTS_QUERY}`;

    // Category mapping (Sanity -> projects.js format)
    const categoryMap = {
        'commercial': 'commercial',
        'musicVideo': 'musicVideo',
        'coverArtwork': 'coverArtwork',
        'narrative': 'narrative',
        'web3': 'web3',
        'graphicDesign': 'graphicDesign',
        'archive': 'archive'
    };

    // Transform Sanity project to projects.js format
    function transformProject(project) {
        return {
            id: project.id || project._id,
            title: project.title,
            role: project.role || '',
            // Use imageUrl from Sanity, fallback to YouTube thumbnail, then placeholder
            image: project.image || (project.youtubeId 
                ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
                : `images/placeholders/${project.category || 'archive'}-placeholder.svg`
            ),
            youtubeId: project.youtubeId || null,
            releaseDate: project.releaseDate || '',
            playCount: project.playCount || 0,
            description: project.description || '',
            press: (project.press || []).map(p => ({
                quote: p.quote || '',
                source: p.source || ''
            })),
            links: {
                youtube: project.links?.youtube || '',
                vimeo: project.links?.vimeo || '',
                article: project.links?.article || '',
                series: project.links?.series || ''
            }
        };
    }

    // Group projects by category
    function groupByCategory(projects) {
        const grouped = {
            commercial: [],
            musicVideo: [],
            coverArtwork: [],
            narrative: [],
            web3: [],
            graphicDesign: [],
            archive: []
        };

        projects.forEach(project => {
            const category = categoryMap[project.category] || 'archive';
            if (grouped[category]) {
                grouped[category].push(transformProject(project));
            }
        });

        return grouped;
    }

    // Fetch projects from Sanity
    async function fetchFromSanity() {
        try {
            console.log('[Sanity] Fetching projects...');
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            const projects = data.result || [];
            
            console.log(`[Sanity] Loaded ${projects.length} projects`);
            return groupByCategory(projects);
            
        } catch (error) {
            console.error('[Sanity] Failed to fetch:', error);
            return null;
        }
    }

    // Load static projects as fallback
    function loadStaticProjects() {
        console.log('[Sanity] Falling back to static projects.js');
        // The static projects.js should already be loaded
        if (typeof window.projects !== 'undefined' && window.projects) {
            return window.projects;
        }
        return null;
    }

    // Initialize loader
    async function init() {
        // Try Sanity first
        const sanityProjects = await fetchFromSanity();
        
        if (sanityProjects) {
            // Success - use Sanity data
            window.projects = sanityProjects;
            console.log('[Sanity] Using CMS data');
            
            // Dispatch event to notify app.js that projects are ready
            window.dispatchEvent(new CustomEvent('projectsLoaded', {
                detail: { source: 'sanity', count: Object.values(sanityProjects).flat().length }
            }));
            
        } else {
            // Fallback to static
            const staticProjects = loadStaticProjects();
            if (staticProjects) {
                window.projects = staticProjects;
                console.log('[Sanity] Using static data');
                
                window.dispatchEvent(new CustomEvent('projectsLoaded', {
                    detail: { source: 'static', count: Object.values(staticProjects).flat().length }
                }));
            } else {
                console.error('[Sanity] No project data available');
            }
        }
    }

    // Start loading immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
