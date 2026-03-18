window.scrollTo(0, 0);

// [EFEITO: scroll hijacking - features section]
const featuresWrapper = document.getElementById('features-scroll-wrapper');
const featuresSection = document.getElementById('features-section');
const featureCards = document.querySelectorAll('.features-cards > div');

function updateFeaturesScroll() {
    const scrolled = -featuresWrapper.getBoundingClientRect().top;
    const scrollRange = featuresWrapper.offsetHeight - featuresSection.offsetHeight;
    const progress = Math.min(1, Math.max(0, scrolled / scrollRange));

    featureCards.forEach((card, index) => {
        const threshold = (index + 1) / (featureCards.length + 1);
        if (progress >= threshold) {
            card.classList.add('card-visible');
        }
    });
}

window.addEventListener('scroll', updateFeaturesScroll, { passive: true });
updateFeaturesScroll();
// [/EFEITO: scroll hijacking - features section]

// [EFEITO: tilt no hover - pain points]
const cards = document.querySelectorAll('#pain-points .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
// [/EFEITO: tilt no hover - pain points]

// [EFEITO: fade + slide-up ao entrar na viewport - customization section]
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay ?? 0;
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
// [/EFEITO: fade + slide-up ao entrar na viewport - customization section]
