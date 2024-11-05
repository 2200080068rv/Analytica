// Slider functionality
let sliderImages = document.querySelectorAll(".slide"),
    arrowLeft = document.querySelector("#arrow-left"),
    arrowRight = document.querySelector("#arrow-right"),
    current = 0;

// Clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
    }
}

// Initial slide
function startSlide() {
    reset();
    sliderImages[0].style.display = "block";
}

// Show previous slide
function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = "block";
    current--;
}

// Show next slide
function slideRight() {
    reset();
    sliderImages[current + 1].style.display = "block";
    current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function () {
    if (current === 0) {
        current = sliderImages.length;
    }
    slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});

startSlide();

// Event grid circular positioning
const eventGrid = document.querySelector('.event-grid');
const eventItems = document.querySelectorAll('.event-item');

const radius = 150; // Distance from the center
const itemCount = eventItems.length;
const angleIncrement = (2 * Math.PI) / itemCount;

// Position each event item in a circle
eventItems.forEach((item, index) => {
    const angle = angleIncrement * index;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    item.style.transform = `translate(${x}px, ${y}px)`;
});

// Rotate the grid based on mouse movement
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    const rotationX = (deltaY / centerY) * 10; // Adjust sensitivity
    const rotationY = (deltaX / centerX) * -10; // Adjust sensitivity
    
    eventGrid.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});

// Item rotation on button click
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

nextBtn.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".box").appendChild(items[0]);
});

prevBtn.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".box").prepend(items[items.length - 1]);
});

// Menu close button functionality
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('check').checked = false; // Uncheck the checkbox to close the menu
});

// Security features: disabling specific keys and actions
document.onkeydown = function (e) {
    // Check for F12 or common dev tools key combinations
    if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key.toUpperCase())) || // Ctrl+Shift+I/C/J
        (e.ctrlKey && e.key.toUpperCase() === "U") // Ctrl+U
    ) {
        e.preventDefault();
        return false;
    }
};

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable drag actions
document.addEventListener("dragstart", (e) => e.preventDefault());

// Disable PrintScreen key functionality
document.addEventListener("keyup", (e) => {
    if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("").then(() => {
            alert("Screenshot disabled.");
        });
    }
});

// Disable printing with Ctrl+P
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toUpperCase() === "P") {
        e.preventDefault();
        e.stopImmediatePropagation();
        alert("Printing is disabled.");
    }
});


// Wait for the DOM content to load before running the script
window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo'); // Video element
    const videoContainer = document.getElementById('videoContainer'); // Video container element

    // Check if the video has already played using sessionStorage
    const hasPlayed = sessionStorage.getItem('videoPlayed');

    if (!hasPlayed) {
        // If video hasn't played yet, play it on first load
        video.play();

        // When the video ends, mark it as played and redirect to main page
        video.onended = () => {
            sessionStorage.setItem('videoPlayed', 'true'); // Save play status
            window.location.href = "intelligentsia.html"; // Redirect to main page
        };
    } else {
        // If the video has already played, skip directly to the main page
        window.location.href = "intelligentsia.html";
    }
});