// ===========================
// NAVIGATION ACTIVE STATE
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Mettre en évidence le lien actif dans la navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ===========================
// SMOOTH SCROLL
// ===========================
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

// ===========================
// CAROUSEL FUNCTIONALITY
// ===========================
function scrollCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const scrollAmount = 370; // largeur d'un item (350px) + gap (20px)
    
    if (direction === 'left') {
        track.scrollLeft -= scrollAmount;
    } else {
        track.scrollLeft += scrollAmount;
    }
    
    // Mettre à jour les dots après un court délai
    setTimeout(updateCarouselDots, 300);
}

// Mettre à jour les dots du carrousel selon la position
function updateCarouselDots() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || dots.length === 0) return;
    
    const scrollPercentage = track.scrollLeft / (track.scrollWidth - track.clientWidth);
    const activeIndex = Math.round(scrollPercentage * (dots.length - 1));
    
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Ajouter des événements sur les dots
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.carousel-dot');
    const track = document.getElementById('carouselTrack');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!track) return;
            const scrollAmount = 370;
            track.scrollLeft = scrollAmount * index;
            
            setTimeout(updateCarouselDots, 300);
        });
    });
    
    // Mettre à jour les dots au scroll
    if (track) {
        track.addEventListener('scroll', updateCarouselDots);
    }
});

// ===========================
// CONTACT FORM HANDLING
// ===========================
function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nom = form.querySelector('#nom').value;
    const email = form.querySelector('#email').value;
    const sujet = form.querySelector('#sujet')?.value || '';
    const message = form.querySelector('#message').value;
    
    // Validation basique
    if (!nom || !email || !message) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    console.log('Message envoyé:', { nom, email, sujet, message });
    
    // Afficher le message de succès
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        // Réinitialiser après 5 secondes
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.classList.remove('show');
            form.reset();
        }, 5000);
    } else {
        // Fallback si pas de message de succès
        alert(`Message envoyé avec succès!\n\nNom: ${nom}\nEmail: ${email}\nMessage: ${message}`);
        form.reset();
    }
}

// ===========================
// ANIMATIONS ON SCROLL
// ===========================
// Observer pour animer les éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de projets
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Style initial pour l'animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        
        // Observer la carte
        observer.observe(card);
    });
    
    // Observer les items du carrousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll vers le bas - masquer la nav
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut - afficher la nav
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    // Ajouter une ombre à la nav après un certain scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Ajouter une transition à la nav
if (nav) {
    nav.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}

// ===========================
// LOADING ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// UTILITY FUNCTIONS
// ===========================
// Fonction pour détecter si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fonction de debounce pour optimiser les performances
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