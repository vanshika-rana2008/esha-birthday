const button = document.getElementById("startBtn");
const letter = document.getElementById("letter");
const music = document.getElementById("bgm");

button.addEventListener("click", () => {
    // Letter ko show karein
    letter.hidden = false;
    
    // Smooth scroll karke letter tak le jayein
    letter.scrollIntoView({ behavior: "smooth" });

    // Background music play karein
    if (music) {
        music.play().catch((error) => {
            console.log("Music play blocked by browser, user needs to click play manually.", error);
        });
    }

    // Button text aur style update karein
    button.textContent = "Happy Birthday Esha ❤️";
    button.style.backgroundColor = "#ff759d";
    button.disabled = true;
});