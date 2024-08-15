
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('https://formspree.io/YOUR_EMAIL', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Thank you for reaching out! I will get back to you soon.');
            event.target.reset();
        } else {
            alert('Oops! Something went wrong. Please try again later.');
        }
    });
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


