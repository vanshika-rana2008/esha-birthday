/* ==========================================================================
  1. AUDIO & INTRO MANAGEMENT
  ========================================================================== */
const introOverlay = document.getElementById('intro-overlay');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;

// Tap intro screen to unlock sound and start experience
introOverlay.addEventListener('click', () => {
 introOverlay.classList.add('hidden');
 playAudio();
 triggerConfettiBurst();
 spawnBalloons();
});

function playAudio() {
 bgMusic.play().then(() => {
   isPlaying = true;
   musicToggle.classList.add('playing');
 }).catch(err => {
   console.log("Audio playback blocked:", err);
 });
}

musicToggle.addEventListener('click', () => {
 if (isPlaying) {
   bgMusic.pause();
   isPlaying = false;
   musicToggle.classList.remove('playing');
 } else {
   playAudio();
 }
});

/* ==========================================================================
  2. CANVAS FLOATING HEARTS & SPARKLES
  ========================================================================== */
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
 constructor() {
   this.reset();
 }

 reset() {
   this.x = Math.random() * canvas.width;
   this.y = canvas.height + Math.random() * 100;
   this.size = Math.random() * 12 + 8;
   this.speedY = Math.random() * 1.5 + 0.5;
   this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
   this.opacity = Math.random() * 0.6 + 0.3;
   this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
   this.color = `hsla(${Math.random() * 40 + 330}, 100%, 75%, ${this.opacity})`;
 }

 update() {
   this.y -= this.speedY;
   this.x += this.speedX;
   if (this.y < -20) {
     this.reset();
   }
 }

 draw() {
   ctx.save();
   ctx.translate(this.x, this.y);
   if (this.type === 'heart') {
     ctx.fillStyle = this.color;
     ctx.beginPath();
     ctx.moveTo(0, 0);
     ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
     ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
     ctx.fill();
   } else {
     ctx.fillStyle = "#fff";
     ctx.shadowBlur = 10;
     ctx.shadowColor = "#ffd700";
     ctx.beginPath();
     ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
     ctx.fill();
   }
   ctx.restore();
 }
}

function initParticles() {
 particles = [];
 const count = Math.floor(window.innerWidth / 25);
 for (let i = 0; i < count; i++) {
   particles.push(new Particle());
 }
}

function animateParticles() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 particles.forEach(p => {
   p.update();
   p.draw();
 });
 requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ==========================================================================
  3. BALLOON GENERATOR
  ========================================================================== */
function spawnBalloons() {
 const container = document.getElementById('balloons');
 const colors = ['#ff758c', '#ff7eb3', '#fbc2eb', '#a6c1ee', '#fddb92'];
 
 for (let i = 0; i < 15; i++) {
   const balloon = document.createElement('div');
   balloon.className = 'balloon';
   balloon.style.left = `${Math.random() * 95}%`;
   balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
   balloon.style.animationDelay = `${Math.random() * 8}s`;
   balloon.style.animationDuration = `${10 + Math.random() * 6}s`;
   container.appendChild(balloon);
 }
}

/* ==========================================================================
  4. INTERACTIVE CAKE & CANDLE BLOWING
  ========================================================================== */
let candleBlown = false;
function blowCandle() {
 const flame = document.getElementById('flame');
 if (!candleBlown) {
   flame.classList.add('off');
   candleBlown = true;
   triggerConfettiBurst();
 } else {
   flame.classList.remove('off');
   candleBlown = false;
 }
}

function triggerConfettiBurst() {
 if (typeof confetti === 'function') {
   confetti({
     particleCount: 100,
     spread: 70,
     origin: { y: 0.6 }
   });
 }
}

/* ==========================================================================
  5. LIGHTBOX FUNCTIONALITY
  ========================================================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
 lightboxImg.src = src;
 lightbox.classList.add('active');
}

function closeLightbox() {
 lightbox.classList.remove('active');
}

/* ==========================================================================
  6. SCROLL REVEAL ANIMATIONS
  ========================================================================== */
function revealOnScroll() {
 const reveals = document.querySelectorAll('.reveal');
 const windowHeight = window.innerHeight;

 reveals.forEach(el => {
   const elementTop = el.getBoundingClientRect().top;
   const elementVisible = 100;

   if (elementTop < windowHeight - elementVisible) {
     el.classList.add('active');
   }
 });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger initial check