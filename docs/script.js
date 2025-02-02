
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

    // Submit the form via Getform
    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showPopup();
            this.reset(); // Reset form fields after successful submission
        } else {
            console.error('Failed to send email:', response);
        }
    }).catch(error => {
        console.error('An error occurred:', error);
    });

    function showPopup() {
        const popup = document.getElementById('thankYouPopup');
        popup.style.display = 'flex';

        document.getElementById('closePopup').addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }
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

// async function sendMessage() {
//     const userInput = document.getElementById("user-input").value;
//     if (!userInput) return;

//     const chatContainer = document.getElementById("chat-container");

//     // Display user message
//     const userMessage = document.createElement("div");
//     userMessage.classList.add("message", "user-message");
//     userMessage.innerText = userInput;
//     chatContainer.appendChild(userMessage);

//     document.getElementById("user-input").value = ""; // Clear input

    
//     const backendUrl = "https://myportfolio-1-edn7.onrender.com/ask";

//     const response = await fetch(backendUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userInput })
//     });

//     const data = await response.json();

//     // Display bot response
//     const botMessage = document.createElement("div");
//     botMessage.classList.add("message", "bot-message");
//     botMessage.innerText = data.reply;
//     chatContainer.appendChild(botMessage);

//     chatContainer.scrollTop = chatContainer.scrollHeight;
// }
function toggleChat() {
    const chatContainer = document.getElementById("chat-container-wrapper");
    const chatButton = document.getElementById("chat-button");

    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "flex";
        chatButton.style.display = "none"; // Hide chat icon
    } else {
        chatContainer.style.display = "none";
        chatButton.style.display = "flex"; // Show chat icon again
    }
}

async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatContainer = document.getElementById("chat-container");

    // Display user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerText = userInput;
    chatContainer.appendChild(userMessage);

    document.getElementById("user-input").value = ""; // Clear input

    const backendUrl = "http://localhost:8000/ask";

    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput })  
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Display bot response
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.innerText = data.answer;  
        chatContainer.appendChild(botMessage);

    } catch (error) {
        console.error("Error:", error);
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot-message");
        errorMessage.innerText = "An error occurred. Please try again.";
        chatContainer.appendChild(errorMessage);
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
}







