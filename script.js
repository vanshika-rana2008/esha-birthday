document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    const introScreen = document.getElementById('intro-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    
    const particlesContainer = document.getElementById('particles-container');
    const balloonsContainer = document.getElementById('balloons-container');
    
    const candles = document.querySelectorAll('.candle');
    const celebrateBtn = document.getElementById('celebrate-btn');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentImageIndex = 0;
    let isPlaying = false;

    // Direct Image Sources array for navigation
    const imageSources = Array.from(galleryItems).map(item => {
        return item.querySelector('img').getAttribute('src');
    });

    // ==========================================
    // MUSIC & INTRO LOGIC (TRIMS STARTING 15s)
    // ==========================================
    enterBtn.addEventListener('click', () => {
        // Cut audio starting 15 seconds
        bgMusic.currentTime = 15;
        
        bgMusic.play().then(() => {
            isPlaying = true;
            musicIcon.textContent = '🎵';
        }).catch(err => {
            console.log("Autoplay prevented or audio file missing:", err);
            isPlaying = false;
            musicIcon.textContent = '🔇';
        });

        // Hide intro, show main content
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            initAmbientEffects();
        }, 1000);
    });

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🔇';
            isPlaying = false;
        } else {
            bgMusic.play();
            musicIcon.textContent = '🎵';
            isPlaying = true;
        }
    });

    // ==========================================
    // AMBIENT PARTICLES & BALLOONS
    // ==========================================
    function initAmbientEffects() {
        createFloatingElements();
        createBalloons();
    }

    function createFloatingElements() {
        const symbols = ['💖', '✨', '🌸', '💫', '💕'];
        const count = 25;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'floating-element';
            el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            el.style.left = `${Math.random() * 100}vw`;
            el.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
            el.style.animationDuration = `${Math.random() * 10 + 8}s`;
            el.style.animationDelay = `${Math.random() * 5}s`;

            particlesContainer.appendChild(el);
        }
    }

    function createBalloons() {
        const colors = ['#ff2d75', '#ff758c', '#ffb3c6', '#f3a847', '#e0aaff'];
        const count = 12;

        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = `${Math.random() * 90 + 5}vw`;
            balloon.style.animationDuration = `${Math.random() * 12 + 10}s`;
            balloon.style.animationDelay = `${Math.random() * 8}s`;

            balloonsContainer.appendChild(balloon);
        }
    }

    // ==========================================
    // CAKE & CANDLE INTERACTION
    // ==========================================
    let blownCandlesCount = 0;

    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            if (candle.getAttribute('data-lit') === 'true') {
                candle.setAttribute('data-lit', 'false');
                blownCandlesCount++;

                if (blownCandlesCount === candles.length) {
                    celebrateBtn.classList.remove('hidden');
                    triggerConfetti();
                }
            }
        });
    });

    celebrateBtn.addEventListener('click', () => {
        triggerConfetti();
    });

    // ==========================================
    // LIGHTBOX GALLERY
    // ==========================================
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(imageSources[currentImageIndex]);
        });
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
    });

    // Keyboard controls for Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });

    // ==========================================
    // CONFETTI SYSTEM
    // ==========================================
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 5;
            this.color = ['#ff2d75', '#ff758c', '#f3a847', '#ffffff', '#e0aaff'][Math.floor(Math.random() * 5)];
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function triggerConfetti() {
        for (let i = 0; i < 150; i++) {
            particles.push(new ConfettiParticle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.y > canvas.height) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
});
