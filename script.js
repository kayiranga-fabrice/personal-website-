// --- Set Current Year in Footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed to animate only once
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Trigger once on load for elements already in view
window.dispatchEvent(new Event('scroll'));

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// --- Form Submission Handling ---
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Normally, you would handle the form submission with Fetch/Ajax here.
        // For demonstration, we simulate a successful submission.
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
            btn.style.background = '#10B981'; // Success Green
            btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ''; // Revert to defined linear gradient
                btn.style.boxShadow = '';
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
