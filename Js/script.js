// ==========================================
// 1. NAVIGATION & PAGE SWITCHING LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-page]');
    const pageViews = document.querySelectorAll('.page-view');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    // Function to switch between pages/views smoothly
    function switchPage(targetPageId) {
        // Hide all page views
        pageViews.forEach(view => {
            view.classList.remove('active-view');
        });

        // Show target page view
        const targetView = document.getElementById(`page-${targetPageId}`);
        if (targetView) {
            targetView.classList.add('active-view');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active states on desktop/mobile nav links
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile menu if open
        if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Attach click listeners to all elements with data-page attribute
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetPage = link.getAttribute('data-page');
            const targetScroll = link.getAttribute('data-scroll');

            // If it's a regular page switch
            if (targetPage) {
                e.preventDefault();
                switchPage(targetPage);
            }

            // If it needs to scroll to a specific section on the home page (like Skills)
            if (targetScroll) {
                e.preventDefault();
                switchPage('home');
                setTimeout(() => {
                    const section = document.getElementById(targetScroll);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        });
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            mobileNav.setAttribute('aria-hidden', !isOpen);
        });
    }

    // ==========================================
    // 3. PROJECTS FILTERING & SEARCH
    // ==========================================
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.all-projects-grid .project-card');

    // Filter by Category button click
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button style
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            // Clear search bar when filtering by category
            if (searchInput) searchInput.value = '';
        });
    });

    // Search input live filtering
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            // Reset category filter buttons visually to "All" when searching
            filterButtons.forEach(b => {
                if (b.getAttribute('data-filter') === 'all') {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });

            projectCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const desc = card.querySelector('.card-desc').textContent.toLowerCase();
                const keywords = card.getAttribute('data-keywords') || '';

                if (title.includes(searchTerm) || desc.includes(searchTerm) || keywords.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});