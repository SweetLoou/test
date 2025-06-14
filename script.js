document.addEventListener('DOMContentLoaded', () => {

    // --- Counter Animations ---
    const animateCounter = (element, start, end, duration, isMoney = false) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue = Math.floor(progress * (end - start) + start);
            
            if (isMoney) {
                element.textContent = `$${currentValue.toLocaleString()}`;
            } else {
                element.textContent = currentValue.toLocaleString();
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const moneyCounter = document.getElementById('money-counter');
    const petitionCounter = document.getElementById('petition-counter');
    const victimCounter = document.getElementById('victim-counter');
    
    if (moneyCounter) animateCounter(moneyCounter, 15000, 15328, 2000, true);
    if (petitionCounter) animateCounter(petitionCounter, 0, 147, 2500);
    if (victimCounter) animateCounter(victimCounter, 0, 12, 1500);
    

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Petition Form Submission ---
    const form = document.getElementById('signature-form');
    const formMessage = document.getElementById('form-message');
    let currentSignatures = 147; // Starting value from animation

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;

        if (fullName && document.getElementById('email').value) {
            formMessage.textContent = `Thank you, ${fullName}! Your voice has been added.`;
            formMessage.style.color = 'var(--color-primary)';
            
            // Increment the counter visually
            currentSignatures++;
            petitionCounter.textContent = currentSignatures.toLocaleString();

            form.reset();
        } else {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = 'var(--color-secondary)';
        }
    });


    // --- Evidence Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');

            lightboxImg.src = src;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.style.display = 'flex';
        });
    });

    const close = () => {
        lightbox.style.display = 'none';
    };

    closeLightbox.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            close();
        }
    });

});