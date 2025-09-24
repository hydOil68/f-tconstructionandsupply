// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.textContent = '☰';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Carousel functionality
const carouselTrack = document.getElementById('carousel-track');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
const prevButton = document.getElementById('carousel-prev');
const nextButton = document.getElementById('carousel-next');

let currentSlide = 0;
const slideCount = carouselSlides.length;

function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    carouselTrack.style.transform = `translateX(-${index * 100}%)`;

    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[index].classList.add('active');

    currentSlide = index;
}

prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));

carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
    });
});

setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Form validation and security
const contactForm = document.getElementById('contact-form');

function sanitizeInput(input) {
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/[&<>"']/g, '')
        .trim();
}

function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.length >= 5 && subject.length <= 100;
}

function validateService(service) {
    return service !== "";
}

function validateMessage(message) {
    return message.length >= 10 && message.length <= 1000;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = sanitizeInput(document.getElementById('name').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const subject = sanitizeInput(document.getElementById('subject').value);
    const service = document.getElementById('service').value;
    const message = sanitizeInput(document.getElementById('message').value);

    hideError('name-error');
    hideError('email-error');
    hideError('subject-error');
    hideError('service-error');
    hideError('message-error');

    let isValid = true;

    if (!validateName(name)) {
        showError('name-error', 'Please enter a valid name (2-50 characters, letters and spaces only)');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }

    if (!validateSubject(subject)) {
        showError('subject-error', 'Subject must be between 5 and 100 characters');
        isValid = false;
    }

    if (!validateService(service)) {
        showError('service-error', 'Please select a service');
        isValid = false;
    }

    if (!validateMessage(message)) {
        showError('message-error', 'Message must be between 10 and 1000 characters');
        isValid = false;
    }

    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
});

// Real-time validation
document.getElementById('name').addEventListener('input', function() {
    const name = sanitizeInput(this.value);
    if (validateName(name) || name === '') {
        hideError('name-error');
    } else {
        showError('name-error', 'Please enter a valid name (2-50 characters, letters and spaces only)');
    }
});

document.getElementById('email').addEventListener('input', function() {
    const email = sanitizeInput(this.value);
    if (validateEmail(email) || email === '') {
        hideError('email-error');
    } else {
        showError('email-error', 'Please enter a valid email address');
    }
});

document.getElementById('subject').addEventListener('input', function() {
    const subject = sanitizeInput(this.value);
    if (validateSubject(subject) || subject === '') {
        hideError('subject-error');
    } else {
        showError('subject-error', 'Subject must be between 5 and 100 characters');
    }
});

document.getElementById('service').addEventListener('change', function() {
    if (validateService(this.value)) {
        hideError('service-error');
    } else {
        showError('service-error', 'Please select a service');
    }
});

document.getElementById('message').addEventListener('input', function() {
    const message = sanitizeInput(this.value);
    if (validateMessage(message) || message === '') {
        hideError('message-error');
    } else {
        showError('message-error', 'Message must be between 10 and 1000 characters');
    }
});

// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();