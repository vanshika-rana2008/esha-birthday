document.addEventListener('DOMContentLoaded', () => {
    // 1. Audio & Intro Handling
    const bgMusic = document.getElementById('bg-music');
    const enterBtn = document.getElementById('enter-btn');
    const introOverlay = document.getElementById('intro-overlay');
    const musicWidget = document.getElementById('music-widget');
    const musicStatus = document.getElementById('music-status');
    let isPlaying = false;

    enterBtn.addEventListener('click', () => {
        // Auto-skip starting 15 seconds
        bgMusic.currentTime = 15;
        
        bgMusic.play().then(() => {
            isPlaying = true;
            musicWidget.classList.remove('paused');
            musicStatus.textContent = "Sound On";
        }).catch(() => {
            isPlaying = false;
            musicWidget.classList.add('paused');
            musicStatus.textContent = "Sound Off";
        });

        introOverlay.classList.add('fade-out');
    });

    musicWidget.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicWidget.classList.add('paused');
            musicStatus.textContent = "Sound Off";
            isPlaying = false;
        } else {
            bgMusic.play();
            musicWidget.classList.remove('paused');
            musicStatus.textContent = "Sound On";
            isPlaying = true;
        }
    });

    // 2. Interactive Candles
    const candles = document.querySelectorAll('.compact-candle');
    const cakeStatus = document.getElementById('cake-status');
    let extinguishedCount = 0;

    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('extinguished')) {
                candle.classList.add('extinguished');
                extinguishedCount++;

                if (extinguishedCount === candles.length) {
                    cakeStatus.textContent = "✨ Wishes Sent! Happy Birthday Esha! ✨";
                    cakeStatus.style.color = "var(--gold-light)";
                    triggerGoldConfetti();
                }
            }
        });
    });

    // 3. Lightbox Navigation
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbClose = document.getElementById('lb-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');

    const sources = Array.from(galleryCards).map(card => card.querySelector('img').src);
    let currentIndex = 0;

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            currentIndex = parseInt(card.dataset.index);
            lbImg.src = sources[currentIndex];
            lightbox.classList.add('active');
        });
    });

    const closeLB = () => lightbox.classList.remove('active');
    lbClose.addEventListener('click', closeLB);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });

    lbPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + sources.length) % sources.length;
        lbImg.src = sources[currentIndex];
    });

    lbNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % sources.length;
        lbImg.src = sources[currentIndex];
    });

    // 4. Ambient Sparkles Animation
    const sCanvas = document.getElementById('sparkles-canvas');
    const sCtx = sCanvas.getContext('2d');
    let sparkles = [];

    function resizeSparkles() {
        sCanvas.width = window.innerWidth;
        sCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeSparkles);
    resizeSparkles();

    class Sparkle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * sCanvas.width;
            this.y = Math.random() * sCanvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random();
            this.speed = Math.random() * 0.01 + 0.005;
        }
        update() {
            this.alpha += this.speed;
            if (this.alpha > 1 || this.alpha < 0) this.speed = -this.speed;
        }
        draw() {
            sCtx.fillStyle = `rgba(212, 175, 55, ${Math.abs(this.alpha) * 0.6})`;
            sCtx.beginPath();
            sCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            sCtx.fill();
        }
    }

    for (let i = 0; i < 60; i++) sparkles.push(new Sparkle());

    function animateSparkles() {
        sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
        sparkles.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animateSparkles);
    }
    animateSparkles();

    // 5. Champagne Confetti Particle System
    const cCanvas = document.getElementById('confetti-canvas');
    const cCtx = cCanvas.getContext('2d');
    let confetti = [];

    function resizeConfetti() {
        cCanvas.width = window.innerWidth;
        cCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfetti);
    resizeConfetti();

    class Confetti {
        constructor() {
            this.x = Math.random() * cCanvas.width;
            this.y = -10;
            this.size = Math.random() * 6 + 4;
            this.color = ['#D4AF37', '#F7E7CE', '#ffffff', '#e05286'][Math.floor(Math.random() * 4)];
            this.speedY = Math.random() * 2.5 + 1.5;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.rotation = Math.random() * 360;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += 2;
        }
        draw() {
            cCtx.save();
            cCtx.translate(this.x, this.y);
            cCtx.rotate((this.rotation * Math.PI) / 180);
            cCtx.fillStyle = this.color;
            cCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            cCtx.restore();
        }
    }

    function triggerGoldConfetti() {
        for (let i = 0; i < 100; i++) confetti.push(new Confetti());
    }

    function animateConfetti() {
        cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
        confetti.forEach((c, idx) => {
            c.update();
            c.draw();
            if (c.y > cCanvas.height) confetti.splice(idx, 1);
        });
        requestAnimationFrame(animateConfetti);
    }
    animateConfetti();
});