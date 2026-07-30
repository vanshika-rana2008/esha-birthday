document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const letter = document.getElementById("letter");
  const gallery = document.getElementById("gallery");
  const bgm = document.getElementById("bgm");

  // Shuruat mein letter aur gallery ko hide karke rakhein
  letter.classList.add("hidden");
  gallery.classList.add("hidden");

  startBtn.addEventListener("click", () => {
    // Hidden class hatakar content dikhayein
    letter.classList.remove("hidden");
    gallery.classList.remove("hidden");
    
    // Music play karein
    if (bgm) {
      bgm.play().catch(error => console.log("Audio play error:", error));
    }

    // Button ko hide kar dein
    startBtn.style.display = "none";
  });
});
