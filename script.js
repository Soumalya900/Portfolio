document.addEventListener('DOMContentLoaded', () => {
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const words = ["Developer", "Designer", "Builder"];
        let wordIndex = 0;
        setInterval(() => {
            wordIndex = (wordIndex + 1) % words.length;
            animatedText.textContent = words[wordIndex];
        }, 2000);
    }

    // GSAP ScrollTrigger Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate Hero Section
    gsap.from(".hero-text h1", { duration: 1, y: 50, opacity: 0, ease: "power3.out" });
    gsap.from(".hero-text p", { duration: 1, y: 50, opacity: 0, delay: 0.3, ease: "power3.out" });
    gsap.from(".hero-buttons", { duration: 1, y: 50, opacity: 0, delay: 0.6, ease: "power3.out" });
    gsap.from(".hero-avatar", { duration: 1, scale: 0.5, opacity: 0, delay: 0.9, ease: "power3.out" });

    // Animate Sections on Scroll
    const sections = document.querySelectorAll('.about-section, .projects-section, .contact-section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Contact Form and Popup
    const contactForm = document.querySelector('.contact-form');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');

    if (contactForm && popup && closeBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const action = contactForm.getAttribute('action');

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    popup.style.display = 'flex';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('Oops! There was a problem submitting your form');
                        }
                    })
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form');
            });
        });

        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == popup) {
                popup.style.display = 'none';
            }
        });
    }
});
