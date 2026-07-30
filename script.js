const button = document.getElementById("startBtn");
const letter = document.getElementById("letter");
const music = document.getElementById("bgm");

button.addEventListener("click", () => {
    letter.hidden = false;
    letter.scrollIntoView({ behavior: "smooth" });

    music.play().catch(() => {
        console.log("Music will play after user interaction.");
    });

    button.textContent = "Happy Birthday Esha ❤️";
    button.disabled = true;
});