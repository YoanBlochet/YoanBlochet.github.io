// Animation des étoiles
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Système de filtrage des projets
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterTabs.length === 0) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            filterTabs.forEach(t => t.classList.remove('active'));
            // Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Animation au scroll
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observer les cartes de projet
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Observer les sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Navigation active
function initializeNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();

    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Appel après que le DOM est prêt
document.addEventListener('DOMContentLoaded', initializeNavigation);


// Effet de parallaxe léger sur les étoiles
function initializeParallax() {
    const stars = document.querySelector('.stars');
    if (!stars) return;

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    });
}

// Animation d'apparition des sections
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
}

// Smooth scroll pour les liens d'ancrage
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initializeFilters();
    initializeScrollAnimations();
    initializeContactForm();
    initializeNavigation();
    initializeParallax();
    initializeSectionAnimations();
    initializeSmoothScroll();
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Recalculer les positions si nécessaire
});

// Fonction utilitaire pour déboguer
function debugInfo() {
    console.log('🌟 Portfolio Website Loaded');
    console.log('📄 Current page:', window.location.pathname);
    console.log('🎯 Stars created:', document.querySelectorAll('.star').length);
    console.log('🎨 Sections found:', document.querySelectorAll('.section').length);
}

// Language switching functionality
let currentLanguage = 'fr';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchLanguage('${lang}')"]`).classList.add('active');
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update all elements with data-fr and data-en attributes
    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
        if (lang === 'fr') {
            element.textContent = element.getAttribute('data-fr');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });

    // Update meta tags
    if (lang === 'en') {
        document.title = 'Yoan Blochet - Engineering Student ISAE-ENSMA';
        document.querySelector('meta[name="description"]').setAttribute('content', 
            'Portfolio of Yoan Blochet, engineering student specializing in Defense & Aeronautics at ISAE-ENSMA. Discover my projects and skills.');
        document.querySelector('meta[property="og:title"]').setAttribute('content', 
            'Yoan Blochet - Engineering Student ISAE-ENSMA');
        document.querySelector('meta[property="og:description"]').setAttribute('content', 
            'Portfolio of Yoan Blochet, engineering student specializing in Defense & Aeronautics');
    } else {
        document.title = 'Yoan Blochet - Élève Ingénieur ISAE-ENSMA';
        document.querySelector('meta[name="description"]').setAttribute('content', 
            'Portfolio de Yoan Blochet, élève ingénieur en spécialisation Défense & Aéronautique à l\'ISAE-ENSMA. Découvrez mes projets et compétences.');
        document.querySelector('meta[property="og:title"]').setAttribute('content', 
            'Yoan Blochet - Élève Ingénieur ISAE-ENSMA');
        document.querySelector('meta[property="og:description"]').setAttribute('content', 
            'Portfolio de Yoan Blochet, élève ingénieur en spécialisation Défense & Aéronautique');
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    if (savedLanguage !== 'fr') {
        switchLanguage(savedLanguage);
    }
});

// Gestion du popup
const popup = document.getElementById("cv-popup");
const cvLink = document.getElementById("cv-link");
const closeBtn = document.getElementById("close-popup");

// Ouvre popup au clic
cvLink.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
    popup.focus();
});

// Ferme popup au clic bouton fermer
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Ferme popup si clic hors popup-content
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

// Fonction de changement de langue du popup
function updatePopupLanguage(lang) {
    popup.querySelectorAll("[data-fr]").forEach(el => {
        el.textContent = (lang === "en") ? el.getAttribute("data-en") : el.getAttribute("data-fr");
    });
}

// Détecte la langue depuis l'attribut <html lang="fr"> ou "en"
function detectLanguage() {
    const lang = document.documentElement.lang || "fr";
    updatePopupLanguage(lang.startsWith("en") ? "en" : "fr");
}

// Met à jour au chargement
detectLanguage();

