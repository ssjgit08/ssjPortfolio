// ======================= SMOOTH SCROLL =======================
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
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

        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});

// ======================= PROJECT CARD LINK =======================
document.querySelectorAll('.project-card[data-link]').forEach(card => {
    card.addEventListener('click', () => {
        window.open(card.getAttribute('data-link'), '_blank');
    });
});

// ======================= TOUCH HOVER =======================
const touchCards = document.querySelectorAll('.project-card, .exp-item');
touchCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.add('touch-active');
    }, { passive: true });
    card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('touch-active'), 400);
    }, { passive: true });
});

// ======================= MODAL FUNCTIONALITY =======================
document.querySelectorAll('.modal').forEach(modal => {
    const images = modal.querySelectorAll('.slider-img');
    let index = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const prev = modal.querySelector('.prev');
    const next = modal.querySelector('.next');
    const closeBtn = modal.querySelector('.close');
    const slider = modal.querySelector('.modal-slider');

    // --- Dot indicators ---
    let dotsContainer = null;
    if (images.length > 1) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => { index = i; showImage(index); });
            dotsContainer.appendChild(dot);
        }
        slider.appendChild(dotsContainer);
    }

    const updateDots = i => {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, di) => {
            dot.classList.toggle('active', di === i);
        });
    };

    const showImage = i => {
        if (images.length === 0) return;
        images.forEach(img => img.style.display = 'none');
        images[i].style.display = 'block';
        updateDots(i);
    };

    // Show arrows only if more than 1 image
    if (images.length > 1) {
        prev.style.display = 'block';
        next.style.display = 'block';
    }

    // Prev button
    prev.addEventListener('click', () => {
        if (images.length <= 1) return;
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    });

    // Next button
    next.addEventListener('click', () => {
        if (images.length <= 1) return;
        index = (index + 1) % images.length;
        showImage(index);
    });

    // Close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Clicking outside modal
    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Touch swipe left/right
    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    modal.addEventListener('touchend', e => {
        if (images.length <= 1) return;
        const dx = touchStartX - e.changedTouches[0].screenX;
        const dy = touchStartY - e.changedTouches[0].screenY;
        // Only trigger if horizontal swipe is dominant
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            index = dx > 0
                ? (index + 1) % images.length
                : (index - 1 + images.length) % images.length;
            showImage(index);
        }
    }, { passive: true });

    // Open modal via trigger
    document.querySelectorAll(`.modal-trigger[data-modal="${modal.id}"]`)
        .forEach(trigger => {
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
                e.preventDefault();
                closeBtn.click();
            }
            if (images.length > 1) {
                if (e.key === 'ArrowLeft') {
                    index = (index - 1 + images.length) % images.length;
                    showImage(index);
                } 
                else if (e.key === 'ArrowRight') {
                    index = (index + 1) % images.length;
                    showImage(index);
                }
            }
        }
    });
});