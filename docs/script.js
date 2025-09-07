// ===== INNOVATIVE PORTFOLIO JAVASCRIPT WITH ENHANCED PERFORMANCE =====

class InnovativePortfolio {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.socialLinksOriginal = true;
        this.lastScrollY = 0;
        this.scrollDirection = 'down';
        
        this.init();
    }

    init() {
        this.initTheme();
        this.initNavigation();
        this.initTypingAnimation();
        this.initInnovativeScrollEffects();
        this.initSocialLinksInnovation();
        this.initContactForm();
        this.initAnimations();
        this.initSmoothScrolling();
        this.initScrollProgress();
        this.initMobileMenu();
        this.initChatbot();
    }

    // ===== THEME MANAGEMENT =====
    initTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // ===== OPTIMIZED NAVIGATION WITH SMOOTH SCROLL EFFECTS =====
    initNavigation() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.lastScrollY = window.scrollY;
        this.ticking = false;

        // Throttled scroll handler for better performance
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.requestTick.bind(this), { passive: true });
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(this.handleScroll);
            this.ticking = true;
        }
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > this.lastScrollY;
        
        // Navigation effects
        if (currentScrollY > 100) {
            this.navbar.classList.add('scrolled');
            
            // Hide navbar when scrolling down, show when scrolling up
            if (scrollingDown && currentScrollY > 200) {
                this.navbar.classList.add('hidden');
            } else {
                this.navbar.classList.remove('hidden');
            }
        } else {
            this.navbar.classList.remove('scrolled', 'hidden');
        }

        // Active link highlighting
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (currentScrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Update social links and other scroll effects
        this.updateSocialLinksPosition(currentScrollY);
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }

    // ===== INNOVATIVE SOCIAL LINKS SOLUTION =====
    initSocialLinksInnovation() {
        this.socialLinks = document.querySelector('.hero-social-links');
        this.aboutSection = document.querySelector('#about');
        this.heroSection = document.querySelector('#hero');
        
        if (!this.socialLinks || !this.aboutSection || !this.heroSection) return;
        
        // Cache elements for better performance
        this.viewportHeight = window.innerHeight;
        
        // Update viewport height on resize
        window.addEventListener('resize', () => {
            this.viewportHeight = window.innerHeight;
        }, { passive: true });
    }

    updateSocialLinksPosition(scrollY) {
        if (!this.socialLinks || !this.aboutSection || !this.heroSection) return;
        
        const heroRect = this.heroSection.getBoundingClientRect();
        const aboutRect = this.aboutSection.getBoundingClientRect();
        
        // Calculate when hero section is out of view with smoother transition
        const heroOutOfView = heroRect.bottom < this.viewportHeight * 0.4;
        
        // Smooth floating transition
        if (heroOutOfView && window.innerWidth > 768) {
            if (!this.socialLinks.classList.contains('floating')) {
                this.activateFloatingSocial(this.socialLinks);
                this.adjustAboutSpacing(this.aboutSection, true);
            }
        } else {
            if (this.socialLinks.classList.contains('floating')) {
                this.deactivateFloatingSocial(this.socialLinks);
                this.adjustAboutSpacing(this.aboutSection, false);
            }
        }
        
        // Smoother dynamic spacing without constant updates
        this.updateDynamicSpacing(this.aboutSection, heroRect, aboutRect);
    }

    activateFloatingSocial(socialLinks) {
        if (!socialLinks.classList.contains('floating')) {
            socialLinks.classList.add('floating');
            // Smooth transition animation
            socialLinks.style.animation = 'fadeInFloat 0.5s ease forwards';
        }
    }

    deactivateFloatingSocial(socialLinks) {
        if (socialLinks.classList.contains('floating')) {
            socialLinks.classList.remove('floating');
            socialLinks.style.animation = '';
        }
    }

    adjustAboutSpacing(aboutSection, expanded) {
        if (expanded) {
            aboutSection.classList.add('expanded-spacing');
        } else {
            aboutSection.classList.remove('expanded-spacing');
        }
    }

    updateDynamicSpacing(aboutSection, heroRect, aboutRect) {
        // Smoother dynamic spacing calculation with less aggressive updates
        const currentMargin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--about-margin-dynamic')) || 2;
        const targetMargin = 2; // Fixed margin for smoother scrolling
        
        // Only update if there's a significant difference to prevent layout thrashing
        if (Math.abs(currentMargin - targetMargin) > 0.1) {
            document.documentElement.style.setProperty('--about-margin-dynamic', `${targetMargin}rem`);
        }
    }

    // ===== ENHANCED SCROLL EFFECTS =====
    initInnovativeScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Stagger animations for child elements
                    const children = entry.target.querySelectorAll('.stat-item, .skill-category, .project-card, .timeline-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements for animations
        const elementsToAnimate = document.querySelectorAll(
            '.section-title, .about-description, .stat-item, .skill-category, .project-card, .timeline-item'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));

        // Note: Parallax effect moved to main scroll handler for better performance
    }

    // ===== TYPING ANIMATION =====
    initTypingAnimation() {
        const textElement = document.getElementById("typed-text");
        if (!textElement) return;

        const texts = [
            "Java Backend Developer",
            "Spring Boot Expert", 
            "Full Stack Developer",
            "AI & ML Enthusiast"
        ];
        
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 80;
        const deletingSpeed = 50;
        const pauseDuration = 2000;

        const type = () => {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                textElement.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(type, deletingSpeed);
                }
            } else {
                textElement.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, pauseDuration);
                } else {
                    setTimeout(type, typingSpeed);
                }
            }
        };

        setTimeout(type, 1000);
    }

    // ===== CONTACT FORM =====
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                this.showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 1001;
            transition: width 0.25s ease-out;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        }, { passive: true });
    }

    // ===== MOBILE MENU =====
    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger bars
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            });
        });
    }

    // ===== SMOOTH SCROLLING =====
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== ADDITIONAL ANIMATIONS =====
    initAnimations() {
        // Add CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification {
                animation: slideInRight 0.3s ease;
            }
        `;
        document.head.appendChild(style);

        // Hover effects for interactive elements
        document.querySelectorAll('.btn, .skill-tag, .tech-tag').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ===== ENHANCED AI CHATBOT FUNCTIONALITY =====
    initChatbot() {
        this.chatbotState = {
            isOpen: false,
            isWelcomeShown: false,
            isTyping: false,
            messageCount: 0
        };

        this.chatElements = {
            button: document.getElementById('chat-button'),
            window: document.getElementById('chat-window'),
            close: document.getElementById('chat-close'),
            messages: document.getElementById('chat-messages'),
            input: document.getElementById('chat-input'),
            sendBtn: document.getElementById('chat-send-btn'),
            suggestions: document.getElementById('chat-suggestions')
        };

        this.backendUrl = 'https://myportfolio-1-edn7.onrender.com/ask';
        
        this.bindChatEvents();
        this.initWelcomeMessage();
        this.initSuggestions();
    }

    bindChatEvents() {
        // Toggle chatbot
        this.chatElements.button.addEventListener('click', () => this.toggleChatbot());
        this.chatElements.close.addEventListener('click', () => this.closeChatbot());

        // Send message events
        this.chatElements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatElements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Input handling
        this.chatElements.input.addEventListener('input', (e) => {
            const isEmpty = e.target.value.trim() === '';
            this.chatElements.sendBtn.disabled = isEmpty;
            this.chatElements.sendBtn.style.opacity = isEmpty ? '0.6' : '1';
        });
    }

    initWelcomeMessage() {
        // Show welcome message with typing effect after a delay
        setTimeout(() => {
            this.showWelcomeTyping();
        }, 1000);
    }

    showWelcomeTyping() {
        const welcomeTyping = document.getElementById('welcome-typing');
        const welcomeText = document.getElementById('welcome-text');
        
        if (!welcomeTyping || !welcomeText) return;

        // Show typing indicator for 2 seconds
        setTimeout(() => {
            welcomeTyping.style.display = 'none';
            welcomeText.style.display = 'block';
            this.chatbotState.isWelcomeShown = true;
            
            // Add bounce animation to chat button
            this.chatElements.button.style.animation = 'chatBounce 0.5s ease';
        }, 2000);
    }

    initSuggestions() {
        const suggestionBtns = document.querySelectorAll('.suggestion-btn');
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.textContent.trim();
                this.chatElements.input.value = question;
                this.sendMessage();
                this.hideSuggestions();
            });
        });
    }

    toggleChatbot() {
        if (this.chatbotState.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.chatbotState.isOpen = true;
        this.chatElements.button.classList.add('active');
        this.chatElements.window.classList.add('active');
        
        // Focus input field
        setTimeout(() => {
            this.chatElements.input.focus();
        }, 300);
        
        // Hide suggestions after first interaction
        if (this.chatbotState.messageCount > 0) {
            this.hideSuggestions();
        }
    }

    closeChatbot() {
        this.chatbotState.isOpen = false;
        this.chatElements.button.classList.remove('active');
        this.chatElements.window.classList.remove('active');
    }

    hideSuggestions() {
        this.chatElements.suggestions.style.opacity = '0';
        setTimeout(() => {
            this.chatElements.suggestions.style.display = 'none';
        }, 300);
    }

    async sendMessage() {
        const message = this.chatElements.input.value.trim();
        if (!message || this.chatbotState.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input and update state
        this.chatElements.input.value = '';
        this.chatElements.sendBtn.disabled = true;
        this.chatElements.sendBtn.style.opacity = '0.6';
        this.chatbotState.messageCount++;
        
        // Hide suggestions after first message
        if (this.chatbotState.messageCount === 1) {
            this.hideSuggestions();
        }

        // Show typing indicator
        const typingElement = this.showTypingIndicator();
        
        try {
            // Send to backend
            const response = await this.callBackendAPI(message);
            
            // Remove typing indicator
            this.removeTypingIndicator(typingElement);
            
            // Add bot response with typing animation
            await this.addBotMessageWithTyping(response);
            
        } catch (error) {
            console.error('Chatbot error:', error);
            
            // Remove typing indicator
            this.removeTypingIndicator(typingElement);
            
            // Add error message
            await this.addBotMessageWithTyping(
                "I'm having some trouble right now. Please try asking again in a moment! 😅"
            );
        }
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const avatar = sender === 'user' 
            ? '<i class="fas fa-user"></i>' 
            : '<i class="fas fa-robot"></i>';

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="message-text">${message}</div>
                </div>
            </div>
        `;

        this.chatElements.messages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add success animation
        messageDiv.classList.add('message-sent');
        setTimeout(() => messageDiv.classList.remove('message-sent'), 300);
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;

        this.chatElements.messages.appendChild(typingDiv);
        this.scrollToBottom();
        this.chatbotState.isTyping = true;
        
        return typingDiv;
    }

    removeTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.remove();
        }
        this.chatbotState.isTyping = false;
    }

    async addBotMessageWithTyping(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="message-text"></div>
                </div>
            </div>
        `;

        this.chatElements.messages.appendChild(messageDiv);
        
        // Type out message character by character
        const textElement = messageDiv.querySelector('.message-text');
        await this.typeMessage(textElement, message);
        
        this.scrollToBottom();
    }

    async typeMessage(element, message) {
        return new Promise((resolve) => {
            let i = 0;
            const speed = 30; // Typing speed in milliseconds
            
            const timer = setInterval(() => {
                if (i < message.length) {
                    element.textContent += message.charAt(i);
                    i++;
                    this.scrollToBottom();
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    async callBackendAPI(message) {
        try {
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message }),
                timeout: 15000 // 15 second timeout
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.answer || "I'm not sure how to respond to that. Could you try rephrasing your question?";
            
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }

    scrollToBottom() {
        this.chatElements.messages.scrollTop = this.chatElements.messages.scrollHeight;
    }

    // Add scroll-based chat button behavior
    initChatbotScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const chatButton = this.chatElements.button;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - slightly hide
                chatButton.style.transform = 'scale(0.9) translateY(5px)';
                chatButton.style.opacity = '0.8';
            } else {
                // Scrolling up or at top - show fully
                chatButton.style.transform = 'scale(1) translateY(0)';
                chatButton.style.opacity = '1';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InnovativePortfolio();
});

// Add CSS for mobile menu animation
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(mobileMenuStyles);