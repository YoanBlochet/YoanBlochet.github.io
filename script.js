// Génération d'étoiles animées
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Animation au scroll
function handleScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Effet de parallaxe subtil
function handleMouseMove(e) {
    const sections = document.querySelectorAll('.section');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    sections.forEach((section, index) => {
        const offsetX = (mouseX - 0.5) * 10 * (index % 2 === 0 ? 1 : -1);
        const offsetY = (mouseY - 0.5) * 5;
        section.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

// Effet de clic sur les cartes avec délai pour voir l'animation
function setupCardClickEffects() {
    document.querySelectorAll('.link-card, .project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche l'ouverture immédiate du lien
            
            const originalHref = this.href;
            const originalTarget = this.target;
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.15s ease';
            
            // Ouvre le lien après l'animation
            setTimeout(() => {
                this.style.transform = '';
                if (originalHref) {
                    window.open(originalHref, originalTarget || '_self');
                }
            }, 150);
        });
    });
}

// Initialisation de l'animation d'entrée pour les sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
}

// Fonction d'initialisation principale
function init() {
    createStars();
    initSectionAnimations();
    setupCardClickEffects();
    
    // Événements
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Animation initiale après un court délai
    setTimeout(() => {
        handleScroll();
    }, 100);
}

// Démarrage une fois le DOM chargé
document.addEventListener('DOMContentLoaded', init);
