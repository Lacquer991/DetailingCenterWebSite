export function initPageLoad() {
    window.addEventListener('load', function () {
        const loadTime = Math.round(performance.now());
        const info = document.getElementById('loadTime');
        if (info) info.textContent = `Время загрузки страницы: ${loadTime} мс`;

        const navLinks = document.querySelectorAll('.nav__link');
        const currentPath = window.location.pathname
            .replace(/\/index\.html$/, '')
            .replace(/\/$/, '');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname
                .replace(/\/index\.html$/, '')
                .replace(/\/$/, '');

            if (linkPath === currentPath) {
                link.classList.add('nav__link--active');
            }
        });
    });
}

initPageLoad();