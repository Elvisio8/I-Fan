(function () {
    const body = document.body;
    const toggle = document.querySelector('.navbar__toggle');
    const navLinks = document.querySelector('.navbar__links');
    const overlay = document.querySelector('.navbar__overlay');
    const mobileQuery = window.matchMedia('(max-width: 900px)');
    const uaMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test(navigator.userAgent);

    const applyMobileState = () => {
        const shouldUseMobile = mobileQuery.matches || uaMobile;
        body.classList.toggle('is-mobile', shouldUseMobile);
        if (!shouldUseMobile) {
            body.classList.remove('is-menu-open');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    };

    applyMobileState();

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', applyMobileState);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(applyMobileState);
    }

    const closeMenu = () => {
        if (!body.classList.contains('is-menu-open')) {
            return;
        }
        body.classList.remove('is-menu-open');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    };

    if (toggle) {
        toggle.addEventListener('click', () => {
            const willOpen = !body.classList.contains('is-menu-open');
            body.classList.toggle('is-menu-open', willOpen);
            toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            if (willOpen && navLinks) {
                navLinks.querySelector('a')?.focus();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    if (navLinks) {
        navLinks.addEventListener('click', event => {
            if (event.target instanceof HTMLAnchorElement) {
                closeMenu();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
})();
