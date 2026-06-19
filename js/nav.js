document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE NAVIGATION TOGGLE & DRAWER
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const closeBtn = document.querySelector('.mobile-nav-drawer-close');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;

    function openMenu() {
        if (!drawer || !toggleBtn) return;
        drawer.classList.add('open');
        if (overlay) overlay.classList.add('open');
        body.classList.add('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        drawer.removeAttribute('aria-hidden');
        closeBtn.focus();
    }

    function closeMenu() {
        if (!drawer || !toggleBtn) return;
        drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        body.classList.remove('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.focus();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', openMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
            closeMenu();
        }
    });

    // Close on mobile link clicks
    const mobileLinks = document.querySelectorAll('.nav-links-mobile a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });


    // 2. FOCUS MANAGEMENT FOR SCROLL ANCHORS
    const anchorLinks = document.querySelectorAll('a[href^="#"], a[href*=".html#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const targetId = href.includes('#') ? href.split('#')[1] : null;
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // If it's on the same page, we can handle it smoothly and move focus
                if (!href.startsWith('http') && (href.startsWith('#') || window.location.pathname.endsWith(href.split('#')[0]))) {
                    // Set tabindex temporarily or permanently
                    if (!targetElement.hasAttribute('tabindex')) {
                        targetElement.setAttribute('tabindex', '-1');
                    }
                    targetElement.focus({ preventScroll: true });
                    // Keep normal smooth scroll behavior of the browser
                }
            }
        });
    });

    // Check if the current page has a hash target on page load (e.g. buy.html#subscriptions)
    if (window.location.hash) {
        const targetElement = document.getElementById(window.location.hash.substring(1));
        if (targetElement) {
            targetElement.setAttribute('tabindex', '-1');
            setTimeout(() => {
                targetElement.focus();
            }, 100);
        }
    }
});
