// ======================= SMOOTH SCROLL =======================
document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav a');
    if (!link) return;

    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});

// ======================= FADE-IN ON SCROLL =======================
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('show');
        obs.unobserve(entry.target);
    });
}, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
});

faders.forEach(el => observer.observe(el));

// ======================= PROJECT CARD LINK =======================
document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card[data-link]');
    if (!card) return;

    const link = card.getAttribute('data-link');
    if (link) {
        window.open(link, '_blank');
    }
});

// ======================= MODAL SYSTEM =======================

// Global state
let activeModal = null;
let currentIndex = 0;

// Cache modal data
const modalData = new Map();

document.querySelectorAll('.modal').forEach(modal => {
    modalData.set(modal.id, {
        element: modal,
        images: modal.querySelectorAll('.slider-img'),
        prev: modal.querySelector('.prev'),
        next: modal.querySelector('.next'),
        close: modal.querySelector('.close')
    });
});

// Show image
function showImage(modalObj, index) {
    const { images } = modalObj;
    if (images.length === 0) return;

    images.forEach(img => img.style.display = 'none');
    images[index].style.display = 'block';
}

// Open modal
function openModal(modalId) {
    const modalObj = modalData.get(modalId);
    if (!modalObj) return;

    activeModal = modalObj;
    currentIndex = 0;

    showImage(modalObj, currentIndex);
    modalObj.element.style.display = 'block';
}

// Close modal
function closeModal() {
    if (!activeModal) return;

    activeModal.element.style.display = 'none';
    activeModal = null;
}

// ======================= EVENT DELEGATION =======================

// Open modal
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.modal-trigger');
    if (!trigger) return;

    const modalId = trigger.dataset.modal;
    openModal(modalId);
});

// Close modal
document.addEventListener('click', (e) => {

    // Close button
    if (e.target.closest('.close')) {
        closeModal();
        return;
    }

    // Outside click
    if (activeModal && e.target === activeModal.element) {
        closeModal();
    }
});

// Prev, Next buttons
document.addEventListener('click', (e) => {
    if (!activeModal) return;

    const { images } = activeModal;

    if (e.target.closest('.prev') && images.length > 1) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(activeModal, currentIndex);
    }

    if (e.target.closest('.next') && images.length > 1) {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(activeModal, currentIndex);
    }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!activeModal) return;

    const { images } = activeModal;

    switch (e.key) {
        case 'Escape':
            closeModal();
            break;

        case 'ArrowLeft':
            if (images.length > 1) {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(activeModal, currentIndex);
            }
            break;

        case 'ArrowRight':
            if (images.length > 1) {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(activeModal, currentIndex);
            }
            break;
    }
});