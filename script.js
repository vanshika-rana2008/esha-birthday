document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.getElementById('main-content');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const particlesContainer = document.getElementById('particles-container');
  const flame = document.getElementById('flame');
  const confettiBtn = document.getElementById('confetti-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item img');

  let isMusicPlaying = false;

  // 1. Intro Tap to Open & Music Initialization
  function startExperience() {
    introScreen.style.transition = 'opacity 0.8s ease, visibility 0.8s';
    introScreen.style.opacity = '0';
    
    setTimeout(() => {
      introScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
      musicToggle.classList.remove('hidden');
    }, 800);

    // Play Music
    playAudio();
    
    // Spawn Background Floating Elements
    initFloatingParticles();
  }

  introScreen.addEventListener('click', startExperience, { once: true });

  // Music Toggle Functionality
  function playAudio() {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicToggle.querySelector('.music-icon').textContent = '🎵';
    }).catch(err => {
      console.log('Autoplay restricted:', err);
      isMusicPlaying = false;
      musicToggle.querySelector('.music-icon').textContent = '🔇';
    });
  }

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.querySelector('.music-icon').textContent = '🔇';
      isMusicPlaying = false;
    } else {
      bgMusic.play();
      musicToggle.querySelector('.music-icon').textContent = '🎵';
      isMusicPlaying = true;
    }
  });

  // 2. Floating Hearts, Balloons, and Sparkles Generator
  function initFloatingParticles() {
    const symbols = ['💖', '🌸', '✨', '🎈', '💖', '👑', '🎉'];
    
    setInterval(() => {
      createParticle(symbols);
    }, 400);

    // Create fixed sparkles
    for (let i = 0; i < 30; i++) {
      createSparkle();
    }
  }

  function createParticle(symbols) {
    const particle = document.createElement('div');
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    particle.className = 'floating-heart';
    particle.innerText = symbol;
    
    const size = Math.random() * 1.5 + 1; // scale factor
    const left = Math.random() * 100; // horizontal percentage
    const duration = Math.random() * 6 + 6; // seconds
    
    particle.style.left = `${left}vw`;
    particle.style.fontSize = `${size}rem`;
    particle.style.animation = `floatUp ${duration}s linear forwards`;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    particlesContainer.appendChild(sparkle);
  }

  // 3. Interactive Birthday Cake Candle
  flame.addEventListener('click', () => {
    if (!flame.classList.contains('out')) {
      flame.classList.add('out');
      triggerConfetti();
    }
  });

  confettiBtn.addEventListener('click', () => {
    triggerConfetti();
  });

  // 4. Custom Canvas-Free DOM Confetti System
  function triggerConfetti() {
    const colors = ['#f72585', '#7209b7', '#3f37c9', '#4cc9f0', '#ff85a1', '#ffe6a7'];
    const confettiCount = 80;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = `${Math.random() * 8 + 6}px`;
      confetti.style.height = `${Math.random() * 12 + 8}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = '50vw';
      confetti.style.top = '50vh';
      confetti.style.zIndex = '1500';
      confetti.style.borderRadius = '2px';
      confetti.style.pointerEvents = 'none';

      document.body.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 30 + 15;
      const vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity - 10;
      let opacity = 1;

      let posX = window.innerWidth / 2;
      let posY = window.innerHeight / 2;

      const anim = setInterval(() => {
        posX += vx * 0.5;
        posY += vy * 0.5;
        vy += 0.8; // gravity
        opacity -= 0.015;

        confetti.style.left = `${posX}px`;
        confetti.style.top = `${posY}px`;
        confetti.style.opacity = opacity;
        confetti.style.transform = `rotate(${posX * 2}deg)`;

        if (opacity <= 0 || posY > window.innerHeight) {
          clearInterval(anim);
          confetti.remove();
        }
      }, 16);
    }
  }

  // 5. Fullscreen Lightbox Gallery
  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
});
