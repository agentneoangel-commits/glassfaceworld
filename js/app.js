// GLASSFACE v3.0 - Premium Animations & Interactions

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const config = {
        scrollReveal: {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        },
        cursor: {
            enabled: true,
            magneticStrength: 0.3,
            smoothing: 0.15
        },
        parallax: {
            enabled: true,
            intensity: 0.3
        },
        animations: {
            staggerDelay: 0.08,
            duration: 0.8
        }
    };

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const elements = {
        modal: document.getElementById('modal'),
        modalClose: document.querySelector('.modal-close'),
        modalTitle: document.querySelector('.modal-title'),
        modalRole: document.querySelector('.modal-role'),
        modalMedia: document.querySelector('.modal-media'),
        modalText: document.querySelector('.modal-text'),
        modalStats: document.getElementById('modalStats'),
        modalPress: document.getElementById('modalPress'),
        navToggle: document.getElementById('navToggle'),
        navLinks: document.getElementById('navLinks'),
        topNav: document.getElementById('topNav'),
        sections: document.querySelectorAll('.section'),
        hero: document.querySelector('.hero')
    };

    // ============================================
    // CUSTOM CURSOR WITH MAGNETIC EFFECT
    // ============================================
    class MagneticCursor {
        constructor() {
            if (window.matchMedia('(pointer: coarse)').matches) return;
            
            this.cursor = null;
            this.cursorDot = null;
            this.mouseX = 0;
            this.mouseY = 0;
            this.cursorX = 0;
            this.cursorY = 0;
            this.dotX = 0;
            this.dotY = 0;
            this.isActive = false;
            this.magneticElements = [];
            
            this.init();
        }
        
        init() {
            this.createCursor();
            this.bindEvents();
            this.animate();
        }
        
        createCursor() {
            this.cursor = document.createElement('div');
            this.cursor.className = 'cursor';
            this.cursorDot = document.createElement('div');
            this.cursorDot.className = 'cursor-dot';
            
            document.body.appendChild(this.cursor);
            document.body.appendChild(this.cursorDot);
        }
        
        bindEvents() {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.isActive = true;
            });
            
            document.addEventListener('mousedown', () => {
                this.cursor?.classList.add('clicking');
            });
            
            document.addEventListener('mouseup', () => {
                this.cursor?.classList.remove('clicking');
            });
            
            // Magnetic effect for interactive elements
            const magneticSelectors = 'a, button, .project-card, .nav-link, .logo, .modal-close';
            document.querySelectorAll(magneticSelectors).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor?.classList.add('hover');
                    el.classList.add('magnetic');
                });
                
                el.addEventListener('mouseleave', () => {
                    this.cursor?.classList.remove('hover');
                    el.classList.remove('magnetic');
                    el.style.transform = '';
                });
                
                el.addEventListener('mousemove', (e) => this.handleMagnetic(e, el));
            });
            
            // Hide cursor when leaving window
            document.addEventListener('mouseleave', () => {
                if (this.cursor) this.cursor.style.opacity = '0';
                if (this.cursorDot) this.cursorDot.style.opacity = '0';
            });
            
            document.addEventListener('mouseenter', () => {
                if (this.cursor) this.cursor.style.opacity = '1';
                if (this.cursorDot) this.cursorDot.style.opacity = '1';
            });
        }
        
        handleMagnetic(e, el) {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * config.cursor.magneticStrength;
            const deltaY = (e.clientY - centerY) * config.cursor.magneticStrength;
            
            el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
        
        animate() {
            if (!this.isActive) {
                requestAnimationFrame(() => this.animate());
                return;
            }
            
            // Smooth cursor follow
            this.cursorX += (this.mouseX - this.cursorX) * config.cursor.smoothing;
            this.cursorY += (this.mouseY - this.cursorY) * config.cursor.smoothing;
            
            // Faster dot follow
            this.dotX += (this.mouseX - this.dotX) * 0.5;
            this.dotY += (this.mouseY - this.dotY) * 0.5;
            
            if (this.cursor) {
                this.cursor.style.left = this.cursorX + 'px';
                this.cursor.style.top = this.cursorY + 'px';
            }
            
            if (this.cursorDot) {
                this.cursorDot.style.left = this.dotX + 'px';
                this.cursorDot.style.top = this.dotY + 'px';
            }
            
            requestAnimationFrame(() => this.animate());
        }
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    class ScrollReveal {
        constructor() {
            this.observer = null;
            this.init();
        }
        
        init() {
            const options = {
                root: null,
                rootMargin: config.scrollReveal.rootMargin,
                threshold: config.scrollReveal.threshold
            };
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.reveal(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, options);
            
            // Observe sections for animation
            elements.sections.forEach((section, index) => {
                // Add animation class
                section.classList.add('animate-in');
                
                // Check if already in viewport
                const rect = section.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInViewport) {
                    // Reveal immediately with small delay for stagger
                    setTimeout(() => {
                        section.classList.add('revealed');
                    }, index * 100);
                } else {
                    // Observe for later reveal
                    this.observer.observe(section);
                }
            });
        }
        
        reveal(element) {
            element.classList.add('revealed');
        }
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    class ParallaxEffect {
        constructor() {
            if (!config.parallax.enabled) return;
            
            this.hero = elements.hero;
            this.heroContent = document.querySelector('.hero-content');
            this.ticking = false;
            
            this.init();
        }
        
        init() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    requestAnimationFrame(() => {
                        this.update();
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        }
        
        update() {
            const scrollY = window.scrollY;
            const heroHeight = this.hero?.offsetHeight || 0;
            
            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                
                // Parallax for hero content
                if (this.heroContent) {
                    this.heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                    this.heroContent.style.opacity = 1 - (progress * 0.8);
                }
                
                // Parallax for hero background
                const heroBefore = this.hero?.querySelector('::before');
                if (this.hero) {
                    this.hero.style.setProperty('--parallax-offset', `${scrollY * 0.1}px`);
                }
            }
        }
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    class SmoothScroll {
        constructor() {
            this.init();
        }
        
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        
                        const navHeight = elements.topNav?.offsetHeight || 72;
                        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile nav
                        elements.navLinks?.classList.remove('active');
                        elements.navToggle?.classList.remove('active');
                    }
                });
            });
        }
    }

    // ============================================
    // NAVIGATION
    // ============================================
    class Navigation {
        constructor() {
            this.lastScroll = 0;
            this.init();
        }
        
        init() {
            // Mobile toggle
            elements.navToggle?.addEventListener('click', () => {
                elements.navLinks?.classList.toggle('active');
                elements.navToggle?.classList.toggle('active');
            });
            
            // Scroll effects
            window.addEventListener('scroll', () => {
                this.handleScroll();
            }, { passive: true });
        }
        
        handleScroll() {
            const currentScroll = window.scrollY;
            
            // Add scrolled class
            if (currentScroll > 50) {
                elements.topNav?.classList.add('scrolled');
            } else {
                elements.topNav?.classList.remove('scrolled');
            }
            
            // Update active nav link
            this.updateActiveLink();
            
            this.lastScroll = currentScroll;
        }
        
        updateActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            const scrollPos = window.scrollY + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // ============================================
    // PROJECT RENDERER
    // ============================================
    class ProjectRenderer {
        constructor() {
            this.sectionMap = {
                'commercial-grid': 'commercial',
                'music-video-grid': 'musicVideo',
                'cover-artwork-grid': 'coverArtwork',
                'narrative-grid': 'narrative',
                'web3-grid': 'web3',
                'graphic-design-grid': 'graphicDesign',
                'archive-grid': 'archive'
            };
            this.retryCount = 0;
            this.maxRetries = 10;
            
            // Category-based gradient fallbacks (SVG data URIs with category icons)
            this.fallbackGradients = {
                commercial: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffb4b4 100%)',
                musicVideo: 'linear-gradient(135deg, #4ecdc4 0%, #6ee7df 50%, #8ff0ea 100%)',
                coverArtwork: 'linear-gradient(135deg, #ffe66d 0%, #ffef9d 50%, #fff5c2 100%)',
                narrative: 'linear-gradient(135deg, #a8e6cf 0%, #c2f0db 50%, #d4f5e6 100%)',
                web3: 'linear-gradient(135deg, #c7ceea 0%, #d9ddf0 50%, #e8eaf6 100%)',
                graphicDesign: 'linear-gradient(135deg, #ffd3b6 0%, #ffe4d1 50%, #ffeedc 100%)',
                archive: 'linear-gradient(135deg, #ff8b94 0%, #ffa8af 50%, #ffc5ca 100%)'
            };
            
            // SVG placeholder images as data URIs for when no thumbnail exists
            this.svgPlaceholders = {
                commercial: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ff6b6b"/><stop offset="100%" style="stop-color:%23ffb4b4"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">▶</text></svg>')}`,
                musicVideo: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234ecdc4"/><stop offset="100%" style="stop-color:%238ff0ea"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">♪</text></svg>')}`,
                coverArtwork: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffe66d"/><stop offset="100%" style="stop-color:%23fff5c2"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">🎨</text></svg>')}`,
                narrative: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23a8e6cf"/><stop offset="100%" style="stop-color:%23d4f5e6"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">🎬</text></svg>')}`,
                web3: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23c7ceea"/><stop offset="100%" style="stop-color:%23e8eaf6"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">⬡</text></svg>')}`,
                graphicDesign: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffd3b6"/><stop offset="100%" style="stop-color:%23ffeedc"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">✏</text></svg>')}`,
                archive: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ff8b94"/><stop offset="100%" style="stop-color:%23ffc5ca"/></linearGradient></defs><rect fill="url(%23g)" width="400" height="250"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" fill="rgba(0,0,0,0.3)">📦</text></svg>')}`
            };
        }
        
        getProjectsData() {
            // Try multiple methods to access projects data
            // 1. Check for global var projects (most reliable)
            if (typeof projects !== 'undefined' && projects && typeof projects === 'object') {
                return projects;
            }
            // 2. Check window.projects
            if (window.projects && typeof window.projects === 'object') {
                return window.projects;
            }
            // 3. Check for any global variable named projects
            if (window.hasOwnProperty('projects')) {
                return window.projects;
            }
            return null;
        }
        
        getProjectList(sectionKey) {
            const data = this.getProjectsData();
            return data?.[sectionKey] || [];
        }
        
        render() {
            const projectsData = this.getProjectsData();
            
            if (!projectsData) {
                this.retryCount++;
                if (this.retryCount <= this.maxRetries) {
                    console.warn(`Projects data not loaded yet, retrying... (${this.retryCount}/${this.maxRetries})`);
                    setTimeout(() => this.render(), 300);
                    return;
                } else {
                    console.error('Failed to load projects data after maximum retries');
                    this.showErrorMessage();
                    return;
                }
            }
            
            // Success - reset retry count
            this.retryCount = 0;
            console.log('[Glassface] Projects data loaded, rendering...');
            
            let totalCards = 0;
            
            Object.entries(this.sectionMap).forEach(([gridId, sectionKey]) => {
                const grid = document.getElementById(gridId);
                const projectList = this.getProjectList(sectionKey);
                
                if (grid && projectList && projectList.length > 0) {
                    // Clear existing content
                    grid.innerHTML = '';
                    
                    // Render with stagger delay
                    projectList.forEach((project, index) => {
                        const card = this.createProjectCard(project, index, sectionKey);
                        grid.insertAdjacentHTML('beforeend', card);
                        totalCards++;
                    });
                    
                    // Add click handlers
                    grid.querySelectorAll('.project-card').forEach(card => {
                        card.addEventListener('click', () => {
                            const projectId = card.dataset.projectId;
                            if (projectId) {
                                window.Glassface?.openModal(projectId);
                            }
                        });
                    });
                }
            });
            
            console.log(`[Glassface] Rendered ${totalCards} project cards`);
            
            // Cards are now visible by default in CSS
            // Add optional stagger animation for cards entering viewport
            setTimeout(() => {
                const cards = document.querySelectorAll('.project-card');
                console.log(`[Glassface] Setting up animations for ${cards.length} cards`);
                
                cards.forEach((card, index) => {
                    // Add animation class
                    card.classList.add('animate-in');
                    card.style.transitionDelay = `${index * 0.05}s`;
                    
                    // Check if card is in viewport
                    const rect = card.getBoundingClientRect();
                    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isInViewport) {
                        // Small delay for stagger effect, then reveal
                        setTimeout(() => {
                            card.classList.add('revealed');
                        }, 100 + (index * 50));
                    } else {
                        // Set up observer for cards not yet in viewport
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    entry.target.classList.add('revealed');
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
                        
                        observer.observe(card);
                    }
                });
            }, 100);
        }
        
        createProjectCard(project, index, sectionKey) {
            const playCountBadge = project.playCount && project.playCount >= 1000000 
                ? `<div class="project-views">${this.formatPlayCount(project.playCount)} views</div>` 
                : '';
            
            // Determine the best image source with fallback chain:
            // 1. YouTube thumbnail (if youtubeId exists) - most reliable
            // 2. Original project.image (Cargo CDN or other) with fallback to SVG placeholder
            // 3. SVG placeholder (final fallback for projects without YouTube)
            let imageUrl;
            let fallbackChain = [];
            
            const svgPlaceholder = this.svgPlaceholders[sectionKey] || this.svgPlaceholders.archive;
            
            if (project.youtubeId) {
                // Primary: YouTube thumbnail (most reliable)
                imageUrl = `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;
                // Fallback chain: hqdefault → Cargo image → SVG placeholder
                fallbackChain = [
                    `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`,
                    project.image,
                    svgPlaceholder
                ].filter(Boolean);
            } else {
                // No YouTube ID: Try Cargo image first, fallback to SVG placeholder
                imageUrl = project.image || svgPlaceholder;
                fallbackChain = [svgPlaceholder];
            }
            
            const hasGif = project.youtubeId;
            const gifUrl = hasGif ? `gifs/${project.id}.gif` : null;
            
            // Build onerror handler with chained fallbacks
            const buildOnError = (chain) => {
                if (chain.length === 0) return `this.style.display='none'`;
                const [next, ...rest] = chain;
                return `this.src='${next}'; this.onerror=function(){${buildOnError(rest)}}`;
            };
            
            const onerrorHandler = fallbackChain.length > 0 
                ? buildOnError(fallbackChain)
                : `this.onerror=null;this.src='${svgPlaceholder}';`;
            
            return `
                <article class="project-card" data-project-id="${project.id}" data-has-gif="${hasGif}" style="transition-delay: ${index * 0.05}s">
                    <div class="project-image-wrapper" style="background-image: url('${svgPlaceholder}'); background-size: cover; background-position: center;">
                        <img src="${imageUrl}" alt="${project.title}" class="project-image" loading="lazy" onerror="${onerrorHandler}">
                        ${gifUrl ? `<img src="${gifUrl}" alt="" class="project-image-animated" loading="lazy" onerror="this.style.display='none'">` : ''}
                    </div>
                    ${playCountBadge}
                    <div class="project-overlay">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-role">${project.role}</p>
                    </div>
                </article>
            `;
        }
        
        formatPlayCount(count) {
            if (!count) return '';
            if (count >= 1000000) {
                return (count / 1000000).toFixed(1) + 'M';
            } else if (count >= 1000) {
                return (count / 1000).toFixed(1) + 'K';
            }
            return count.toString();
        }
    }

    // ============================================
    // MODAL MANAGER
    // ============================================
    class ModalManager {
        constructor() {
            this.init();
        }
        
        init() {
            elements.modalClose?.addEventListener('click', () => this.close());
            elements.modal?.addEventListener('click', (e) => {
                if (e.target === elements.modal) this.close();
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.close();
            });
        }
        
        open(projectId) {
            const allProjects = this.getAllProjects();
            const project = allProjects.find(p => p.id === projectId);
            
            if (!project) return;
            
            this.populateModal(project);
            elements.modal?.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        close() {
            elements.modal?.classList.remove('active');
            document.body.style.overflow = '';
            
            // Stop YouTube video
            const iframe = elements.modal?.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }
        
        populateModal(project) {
            if (elements.modalTitle) elements.modalTitle.textContent = project.title;
            if (elements.modalRole) elements.modalRole.textContent = project.role;
            
            // Enhanced content
            const enhanced = this.getEnhancedContent(project.id);
            
            // Description
            let descriptionHTML = '';
            if (enhanced?.bodyCopy) {
                descriptionHTML = `<p class="modal-body-text">${enhanced.bodyCopy.replace(/\n\n/g, '</p><p class="modal-body-text">')}</p>`;
            } else {
                descriptionHTML = `<p class="modal-body-text">${project.description || 'No description available.'}</p>`;
            }
            
            if (enhanced?.processNotes) {
                descriptionHTML += `<div class="modal-process"><strong>Process:</strong> ${enhanced.processNotes}</div>`;
            }
            
            if (enhanced?.accolades?.length) {
                descriptionHTML += `<div class="modal-accolades">`;
                enhanced.accolades.forEach(acc => {
                    descriptionHTML += `<span class="accolade-badge accolade-${acc.type}">${acc.text}</span>`;
                });
                descriptionHTML += `</div>`;
            }
            
            if (elements.modalText) elements.modalText.innerHTML = descriptionHTML;
            
            // Media
            if (elements.modalMedia) {
                if (project.youtubeId) {
                    elements.modalMedia.innerHTML = `
                        <iframe 
                            src="https://www.youtube.com/embed/${project.youtubeId}" 
                            title="${project.title}"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    `;
                } else {
                    elements.modalMedia.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
                }
            }
            
            // Stats
            if (elements.modalStats) {
                if (project.playCount && project.playCount >= 1000000) {
                    elements.modalStats.innerHTML = `
                        <div class="stat-item">
                            <div class="stat-value">${this.formatPlayCount(project.playCount)}</div>
                            <div class="stat-label">YouTube Views</div>
                        </div>
                    `;
                    elements.modalStats.style.display = 'flex';
                } else {
                    elements.modalStats.innerHTML = '';
                    elements.modalStats.style.display = 'none';
                }
            }
            
            // Press
            if (elements.modalPress && project.press?.length) {
                elements.modalPress.innerHTML = `
                    <h3>Press</h3>
                    <div class="press-quotes-grid">
                        ${project.press.map(quote => this.createPressQuote(quote)).join('')}
                    </div>
                `;
                elements.modalPress.style.display = 'block';
            } else if (elements.modalPress) {
                elements.modalPress.innerHTML = '';
                elements.modalPress.style.display = 'none';
            }
        }
        
        createPressQuote(quote) {
            const logoData = window.pressLogos?.[quote.source];
            const logoHTML = logoData?.logo 
                ? `<img src="${logoData.logo}" alt="${quote.source}" class="press-logo-img" onerror="this.style.display='none'">`
                : `<span class="press-logo-text">${quote.source}</span>`;
            
            return `
                <div class="press-quote-card">
                    <div class="press-quote-header">
                        ${logoHTML}
                    </div>
                    <p class="press-quote-text">"${quote.quote}"</p>
                </div>
            `;
        }
        
        getProjectsData() {
            return typeof projects !== 'undefined' ? projects : (window.projects || null);
        }
        
        getAllProjects() {
            const data = this.getProjectsData();
            if (!data) return [];
            return [
                ...(data.commercial || []),
                ...(data.musicVideo || []),
                ...(data.coverArtwork || []),
                ...(data.narrative || []),
                ...(data.web3 || []),
                ...(data.graphicDesign || []),
                ...(data.archive || [])
            ];
        }
        
        getEnhancedContent(projectId) {
            return window.enhancedDescriptions?.[projectId] || null;
        }
        
        formatPlayCount(count) {
            if (!count) return '';
            if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
            if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
            return count.toString();
        }
        
        showErrorMessage() {
            // Show error message in all project grids
            Object.keys(this.sectionMap).forEach(gridId => {
                const grid = document.getElementById(gridId);
                if (grid) {
                    grid.innerHTML = `
                        <div class="project-error" style="
                            grid-column: 1 / -1;
                            text-align: center;
                            padding: 40px 20px;
                            color: #ff69b4;
                            font-family: Inter, sans-serif;
                        ">
                            <p style="margin-bottom: 16px;">⚠️ Unable to load projects</p>
                            <button onclick="location.reload()" style="
                                background: #ff69b4;
                                color: #000;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-family: Inter, sans-serif;
                                font-weight: 600;
                            ">Reload Page</button>
                        </div>
                    `;
                }
            });
        }
    }

    // ============================================
    // PAGE LOADER
    // ============================================
    class PageLoader {
        constructor() {
            this.loader = null;
            this.init();
        }
        
        init() {
            // Create loader
            this.loader = document.createElement('div');
            this.loader.className = 'page-loader';
            this.loader.innerHTML = '<span class="loader-text">GLASSFACE</span>';
            document.body.appendChild(this.loader);
            
            // Hide when loaded
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.loader.classList.add('loaded');
                    setTimeout(() => {
                        this.loader.remove();
                    }, 800);
                }, 500);
            });
            
            // Fallback
            setTimeout(() => {
                if (this.loader.parentNode) {
                    this.loader.classList.add('loaded');
                    setTimeout(() => {
                        this.loader.remove();
                    }, 800);
                }
            }, 3000);
        }
    }

    // ============================================
    // SCROLL INDICATOR
    // ============================================
    class ScrollIndicator {
        constructor() {
            this.init();
        }
        
        init() {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = `
                <span class="scroll-text">Scroll</span>
                <div class="scroll-line"></div>
            `;
            
            // Add click to scroll
            indicator.addEventListener('click', () => {
                const firstSection = document.querySelector('.section');
                if (firstSection) {
                    firstSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            hero.appendChild(indicator);
            
            // Hide on scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    indicator.style.opacity = '0';
                    indicator.style.pointerEvents = 'none';
                } else {
                    indicator.style.opacity = '1';
                    indicator.style.pointerEvents = 'auto';
                }
            }, { passive: true });
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        // Add js-ready class to enable animations
        document.body.classList.add('js-ready');
        
        // Initialize components
        new PageLoader();
        new MagneticCursor();
        new ParallaxEffect();
        new SmoothScroll();
        new Navigation();
        
        // Render projects FIRST (before ScrollReveal so cards exist)
        console.log('[Glassface] Starting project render...');
        const renderer = new ProjectRenderer();
        renderer.render();
        
        // Initialize ScrollReveal AFTER projects are rendered
        // so it can properly observe the project cards
        console.log('[Glassface] Initializing ScrollReveal...');
        new ScrollReveal();
        
        // Initialize modal
        const modal = new ModalManager();
        console.log('[Glassface] Initialization complete');
        
        // Add scroll indicator after a delay
        setTimeout(() => {
            new ScrollIndicator();
        }, 2000);
        
        // Expose to global scope
        window.Glassface = {
            openModal: (id) => modal.open(id),
            closeModal: () => modal.close(),
            config: config
        };
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
