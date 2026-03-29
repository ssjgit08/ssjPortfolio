// ======================= SMOOTH SCROLL =======================
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// ======================= FADE-IN ON SCROLL =======================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// ======================= SKILL BAR ANIMATION =======================
window.addEventListener('load', () => {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = width; }, 500);
    });
});

// ======================= PROJECT CARD LINK =======================
document.querySelectorAll('.project-card[data-link]').forEach(card => {
    card.addEventListener('click', () => {
        window.open(card.getAttribute('data-link'), '_blank');
    });
});

// ======================= MODAL FUNCTIONALITY =======================
document.querySelectorAll('.modal').forEach(modal => {
    const images = modal.querySelectorAll('.slider-img');
    let index = 0;

    const prev = modal.querySelector('.prev');
    const next = modal.querySelector('.next');

    const showImage = i => {
        if (images.length === 0) return;
        images.forEach(img => img.style.display = 'none');
        images[i].style.display = 'block';
    };

    // Show arrows only if more than 1 image
    if (images.length > 1) {
        prev.style.display = 'block';
        next.style.display = 'block';
    }

    // Prev / Next button
    prev.addEventListener('click', () => {
        if (images.length <= 1) return;
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    });
    next.addEventListener('click', () => {
        if (images.length <= 1) return;
        index = (index + 1) % images.length;
        showImage(index);
    });

    // Close modal
    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Clicking outside modal
    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Open modal via trigger
    document.querySelectorAll(`.modal-trigger[data-modal="${modal.id}"]`).forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (images.length === 0) return;
            index = 0;
            showImage(index);
            modal.style.display = 'block';
        });
    });

    // Keyboard navigation
    window.addEventListener('keydown', e => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
            if (images.length > 1) {
                if (e.key === 'ArrowLeft') {
                    index = (index - 1 + images.length) % images.length;
                    showImage(index);
                } else if (e.key === 'ArrowRight') {
                    index = (index + 1) % images.length;
                    showImage(index);
                }
            }
        }
    });
});