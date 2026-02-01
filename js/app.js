// Main App - Glassface Portfolio
(function() {
    'use strict';

    // === DOM ELEMENTS ===
    const loader = document.querySelector('.loader');
    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    const revealElements = document.querySelectorAll('[data-reveal]');

    // === INITIALIZATION ===
    function init() {
        // Remove loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                // Show nav after loader
                setTimeout(() => {
                    nav.classList.add('visible');
                }, 300);
            }, 1500);
        });

        // Render projects
        renderProjects();

        // Setup event listeners
        setupEventListeners();

        // Setup scroll animations
        setupScrollAnimations();

        // Setup intersection observer for reveals
        setupRevealObserver();

        // Update active nav on scroll
        updateActiveNavOnScroll();
    }

    // === PROJECT RENDERING ===
    function renderProjects() {
        const sections = {
            'commercial-grid': projects.commercial,
            'music-video-grid': projects.musicVideo,
            'cover-artwork-grid': projects.coverArtwork,
            'narrative-grid': projects.narrative,
            'web3-grid': projects.web3,
            'graphic-design-grid': projects.graphicDesign,
            'archive-grid': projects.archive
        };

        Object.entries(sections).forEach(([gridId, projectList]) => {
            const grid = document.getElementById(gridId);
            if (grid && projectList) {
                grid.innerHTML = projectList.map((project, index) => `
                    <article class="project-card" data-project="${encodeURIComponent(JSON.stringify(project))}" style="animation-delay: ${index * 0.05}s">
                        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                        <div class="project-overlay">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-role">${project.role}</p>
                        </div>
                    </article>
                `).join('');

                // Add click handlers
                grid.querySelectorAll('.project-card').forEach(card => {
                    card.addEventListener('click', () => openModal(card.dataset.project));
                });
            }
        });
    }

    // === EVENT LISTENERS ===
    function setupEventListeners() {
        // Mobile nav toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                nav.classList.toggle('visible');
            });
        }

        // Smooth scroll for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        // Close mobile nav
                        navToggle?.classList.remove('active');
                        nav?.classList.remove('visible');
                    }
                }
            });
        });

        // Modal close
        modalClose?.addEventListener('click', closeModal);
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Parallax on mouse move (hero only)
        const hero = document.querySelector('.hero');
        if (hero && !window.matchMedia('(pointer: coarse)').matches) {
            hero.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const x = (clientX / innerWidth - 0.5) * 20;
                const y = (clientY / innerHeight - 0.5) * 20;
                
                hero.style.setProperty('--parallax-x', `${x}px`);
                hero.style.setProperty('--parallax-y', `${y}px`);
            });
        }
    }

    // === MODAL FUNCTIONS ===
    function openModal(projectData) {
        try {
            const project = JSON.parse(decodeURIComponent(projectData));
            
            const modalTitle = modal.querySelector('.modal-title');
            const modalRole = modal.querySelector('.modal-role');
            const modalMedia = modal.querySelector('.modal-media');
            
            modalTitle.textContent = project.title;
            modalRole.textContent = project.role;
            modalMedia.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } catch (e) {
            console.error('Error opening modal:', e);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // === SCROLL ANIMATIONS ===
    function setupScrollAnimations() {
        // Project cards reveal on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all project cards
        document.querySelectorAll('.project-card').forEach(card => {
            cardObserver.observe(card);
        });
    }

    // === REVEAL OBSERVER ===
    function setupRevealObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // === ACTIVE NAV ON SCROLL ===
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // === UTILITY FUNCTIONS ===
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // === PERFORMANCE OPTIMIZATIONS ===
    
    // Use passive listeners for scroll
    window.addEventListener('scroll', () => {}, { passive: true });

    // Preload images for current viewport
    function preloadVisibleImages() {
        const images = document.querySelectorAll('.project-image[data-src]');
        images.forEach(img => {
            if (isElementInViewport(img)) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= -window.innerHeight &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight * 2 &&
            rect.right <= window.innerWidth
        );
    }

    // === MAGNETIC LINKS ===
    function initMagneticLinks() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const magneticElements = document.querySelectorAll('[data-hover]');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    // === TEXT SCRAMBLE EFFECT ===
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // === INIT ===
    init();
    initMagneticLinks();

    // Expose for debugging
    window.Glassface = {
        openModal,
        closeModal,
        TextScramble
    };

})();
