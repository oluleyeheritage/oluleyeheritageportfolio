document.addEventListener('DOMContentLoaded', () => {
    // 1. Single Page Application (SPA) View Switcher
    const pageViews = document.querySelectorAll('.page-view');
    const navTriggers = document.querySelectorAll('[data-page]');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');

    function switchPage(targetPageId) {
        pageViews.forEach(view => {
            view.classList.remove('active-view');
        });

        const selectedView = document.getElementById(`page-${targetPageId}`);
        if (selectedView) {
            selectedView.classList.add('active-view');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active states in desktop navbar
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active');
            }
        });
    }

    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const targetPage = trigger.getAttribute('data-page');
            const scrollTarget = trigger.getAttribute('data-scroll');

            if (targetPage) {
                switchPage(targetPage);

                if (scrollTarget) {
                    setTimeout(() => {
                        const el = document.getElementById(scrollTarget);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 50);
                }
            }

            // Close mobile menu if open
            if (mobileNav && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // 2. Mobile Menu Toggle Handler
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('open');
            mobileNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            mobileNav.setAttribute('aria-hidden', !isOpen);
        });
    }

    // 3. Projects Search and Filtering Logic
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterProjects() {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const keywords = card.getAttribute('data-keywords');
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-desc').textContent.toLowerCase();

            const matchesCategory = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = (title.includes(searchQuery) || desc.includes(searchQuery) || keywords.includes(searchQuery));

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProjects();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterProjects();
        });
    });
});