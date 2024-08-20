
// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     fetch('https://formspree.io/YOUR_EMAIL', {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then(response => {
//         if (response.ok) {
//             alert('Thank you for reaching out! I will get back to you soon.');
//             event.target.reset();
//         } else {
//             alert('Oops! Something went wrong. Please try again later.');
//         }
//     });
// });

document.getElementById('hireMeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('thankYouPopup').style.display = 'flex';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('thankYouPopup').style.display = 'none';
});

// Hamburger menu toggle
document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('nav-links').classList.toggle('active');
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙'; // Moon icon for dark mode
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = '☀️'; // Sun icon for light mode
    }
}

// Initial theme application
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
});

window.onload = function() {
    const textElement = document.getElementById("typed-text");
    const texts = ["Java Backend Developer", "Full Stack Developer"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Fixed typing speed
    const deletingSpeed = 100; // Fixed deleting speed
    const pauseDuration = 1000; // Pause after typing the whole text

    function type() {
        const currentText = texts[currentTextIndex];
        textElement.innerHTML = currentText.substring(0, currentCharIndex+1);

        if (isDeleting) {
            currentCharIndex--;
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(type, deletingSpeed);
            }
        } else {
            currentCharIndex++;
            if (currentCharIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration); // Wait before deleting
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }

    // Start the typing effect
    setTimeout(type, 300); // Short delay after page load
};






