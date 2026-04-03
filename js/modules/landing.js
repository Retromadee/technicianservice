/* Landing Page Module */
const LandingModule = (() => {
    // Landing page is static HTML — this module handles any dynamic behavior
    App.on('appReady', () => {
        // Smooth scroll for in-page anchors
        document.querySelectorAll('.hero-section a[data-page]').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.02)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1)';
            });
        });
    });
})();
