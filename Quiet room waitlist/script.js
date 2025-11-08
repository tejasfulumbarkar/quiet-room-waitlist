// EmailJS Configuration removed - using Google Apps Script for email notifications

// Background Music
let backgroundMusic = null;
let musicControl = null;

// Hand Tap Animation
let handTap = null;



// Initialize background music when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get music control element
    musicControl = document.getElementById('musicControl');
    
    // Get hand tap element
    handTap = document.getElementById('handTap');
    

    
    // Create and configure background music
    try {
        backgroundMusic = new Audio('voice/backmusic.mp3');
        backgroundMusic.volume = 0.8; // Low volume (30%)
        backgroundMusic.loop = true; // Loop the music
        backgroundMusic.preload = 'auto';
        
        // Try to play background music immediately
        backgroundMusic.play().then(() => {
            updateMusicStatus(true);
            console.log('Background music started automatically');
        }).catch(() => {
            console.log('Background music blocked by browser - will start on any interaction');
            updateMusicStatus(false);
            
            // Start music on ANY user interaction
            const startMusicOnInteraction = () => {
                if (backgroundMusic && backgroundMusic.paused) {
                    backgroundMusic.play().then(() => {
                        updateMusicStatus(true);
                        console.log('Background music started on user interaction');
                    }).catch(() => {
                        console.log('Failed to start music even with user interaction');
                    });
                }
            };
            
            // Listen for ANY user interaction - more aggressive approach
            const events = ['click', 'touchstart', 'keydown', 'mousedown', 'mouseup', 'scroll'];
            events.forEach(event => {
                document.addEventListener(event, startMusicOnInteraction, { once: true });
            });
            
            // Also try to start on window focus
            window.addEventListener('focus', startMusicOnInteraction, { once: true });
        });
        
        // Add music control click event and hover effects
        if (musicControl) {
            musicControl.addEventListener('click', function() {
                if (backgroundMusic) {
                    if (backgroundMusic.paused) {
                        backgroundMusic.play().then(() => {
                            updateMusicStatus(true);
                        });
                    } else {
                        backgroundMusic.pause();
                        updateMusicStatus(false);
                    }
                }
            });
            
            // Remove hover events - keep floating continuously
            // musicControl.addEventListener('mouseenter', function() {
            //     isFloating = false;
            //     stopFloating();
            //     console.log('Music control hovered - floating paused');
            //     console.log('isFloating:', isFloating, 'floatingInterval:', floatingInterval);
            // });
            
            // musicControl.addEventListener('mouseleave', function() {
            //     isFloating = true;
            //     startFloating();
            //     console.log('Music control unhovered - floating resumed');
            //     console.log('isFloating:', isFloating, 'floatingInterval:', floatingInterval);
            // });
            
            // Start floating animation immediately
            setTimeout(() => {
                animateMusicControl();
                startFloating();
            }, 1000); // Reduced delay to 1 second
        }
        

        
    } catch (error) {
        console.log('Background music not supported or file not found');
        updateMusicStatus(false);
    }
});

// Function to update music status display
function updateMusicStatus(isPlaying) {
    if (musicControl) {
        if (isPlaying) {
            musicControl.classList.add('playing');
        } else {
            musicControl.classList.remove('playing');
        }
    }
}

// Function to get random position on left side only
function getRandomPosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Define left side area (only 20% of screen width)
    const leftSideWidth = viewportWidth * 0.2;
    
    // Generate position only on left side
    const x = Math.random() * (leftSideWidth - 60); // 60px is music control width
    const y = Math.random() * (viewportHeight - 60); // 60px is music control height
    
    return { x, y };
}

// Variables to control floating animation
let isFloating = true;
let floatingInterval = null;

// Function to animate music control floating
function animateMusicControl() {
    if (musicControl) {
        const position = getRandomPosition();
        
        // Use absolute positioning for smooth movement
        musicControl.style.left = position.x + 'px';
        musicControl.style.top = position.y + 'px';
        
        // Add subtle rotation
        const rotation = (Math.random() - 0.5) * 10;
        musicControl.style.transform = `rotate(${rotation}deg)`;
        
        console.log('Music control moved to:', position.x, position.y);
    }
}

// Function to start floating animation
function startFloating() {
    if (!floatingInterval) {
        // Start immediate movement
        animateMusicControl();
        
        // Continue with continuous movement
        floatingInterval = setInterval(() => {
            animateMusicControl();
        }, 3000); // Continuous movement every 3 seconds
        console.log('Floating animation started');
    }
}

// Function to stop floating animation
function stopFloating() {
    if (floatingInterval) {
        clearInterval(floatingInterval);
        floatingInterval = null;
    }
}

// Waitlist Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');
    const emailInput = document.getElementById('emailInput');
    const waitlistBtn = document.querySelector('.waitlist-btn');
    const successMessage = document.getElementById('successMessage');
    
    // Hide hand tap when user interacts with form
    if (handTap) {
        const hideHandTap = () => {
            handTap.style.display = 'none';
            console.log('Hand tap hidden after user interaction');
        };
        
        // Hide on form interaction
        emailInput.addEventListener('focus', hideHandTap);
        emailInput.addEventListener('input', hideHandTap);
        waitlistBtn.addEventListener('click', hideHandTap);
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show loading state
    function showLoading() {
        waitlistBtn.classList.add('loading');
        waitlistBtn.disabled = true;
        emailInput.disabled = true;
    }

    // Hide loading state
    function hideLoading() {
        waitlistBtn.classList.remove('loading');
        waitlistBtn.disabled = false;
        emailInput.disabled = false;
    }

    // Show success message
    function showSuccess() {
        successMessage.classList.add('show');
        emailInput.value = '';
        
        // Trigger celebration animation
        triggerCelebration();
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 10000);
    }
    
    // Celebration animation function
    function triggerCelebration() {
        // Create confetti container
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);
        
        // Create confetti pieces
        const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            confettiContainer.appendChild(confetti);
        }
        
        // Add celebration sound effect (optional)
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        audio.volume = 0.1;
        audio.play().catch(() => {}); // Ignore if audio fails
        
        // Remove confetti after animation
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 5000);
    }

    // Show error message
    function showError(message) {
        // Create error message element if it doesn't exist
        let errorMessage = document.getElementById('errorMessage');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.id = 'errorMessage';
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <div class="error-icon">⚠</div>
                <span>${message}</span>
            `;
            waitlistForm.appendChild(errorMessage);
        } else {
            errorMessage.querySelector('span').textContent = message;
        }
        
        errorMessage.classList.add('show');
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }

    // Handle form submission with EmailJS
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!email) {
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            // Add error styling
            emailInput.style.borderColor = '#dc3545';
            emailInput.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            
            // Remove error styling after 3 seconds
            setTimeout(() => {
                emailInput.style.borderColor = '#e0e0e0';
                emailInput.style.boxShadow = '';
            }, 3000);
            return;
        }

        // Play join audio and fade out background music
        try {
            const joinAudio = new Audio('voice/join.mp3');
            joinAudio.volume = 0.7;
            
            // Fade out background music if it's playing
            if (backgroundMusic && !backgroundMusic.paused) {
                const wasPlaying = true;
                const originalVolume = backgroundMusic.volume;
                const fadeDuration = 1000; // 1 second fade
                const fadeSteps = 20;
                const volumeStep = originalVolume / fadeSteps;
                const stepDuration = fadeDuration / fadeSteps;
                
                console.log('Fading out background music');
                
                // Fade out
                let currentStep = 0;
                const fadeOut = setInterval(() => {
                    currentStep++;
                    backgroundMusic.volume = originalVolume - (volumeStep * currentStep);
                    
                    if (currentStep >= fadeSteps) {
                        clearInterval(fadeOut);
                        backgroundMusic.pause();
                        backgroundMusic.volume = originalVolume; // Reset volume
                        updateMusicStatus(false);
                        console.log('Background music faded out');
                        
                        // Start fade in after 15 seconds
                        setTimeout(() => {
                            if (wasPlaying) {
                                console.log('Starting background music fade in');
                                backgroundMusic.play().then(() => {
                                    updateMusicStatus(true);
                                    
                                    // Fade in
                                    let fadeInStep = 0;
                                    const fadeIn = setInterval(() => {
                                        fadeInStep++;
                                        backgroundMusic.volume = (volumeStep * fadeInStep);
                                        
                                        if (fadeInStep >= fadeSteps) {
                                            clearInterval(fadeIn);
                                            backgroundMusic.volume = originalVolume;
                                            console.log('Background music faded in');
                                        }
                                    }, stepDuration);
                                }).catch(() => {
                                    console.log('Failed to restart background music');
                                });
                            }
                                                 }, 9000); // 8 seconds
                    }
                }, stepDuration);
            }
            
            joinAudio.play().catch(() => {
                console.log('Audio playback failed or was blocked');
            });
        } catch (error) {
            console.log('Audio not supported or file not found');
        }

        // Show loading state
        showLoading();

        try {
            // Send data to Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbxXa8XI5RKczi8bcJL_FJPE69FZMS9fIqIoKh5drpaqQ3SQ02II12bfs2D8qGHo9lLr/exec', {
                method: 'POST',
                mode: 'no-cors', // Important for cross-origin requests
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    timestamp: new Date().toISOString(),
                    source: 'Quiet Room Waitlist'
                })
            });
            
            console.log('Data sent to spreadsheet successfully');
            
            // Show success message
            showSuccess();
            
        } catch (error) {
            console.error('Error sending data to spreadsheet:', error);
            showError('Failed to join waitlist. Please try again.');
        } finally {
            hideLoading();
        }
    });

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#ffc107';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });

    // Focus effects
    emailInput.addEventListener('focus', function() {
        this.style.borderColor = '#6366f1';
        this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });

    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (!email || isValidEmail(email)) {
            this.style.borderColor = '#e0e0e0';
        }
        this.style.boxShadow = '';
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Login button animation
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // You can add login functionality here
        console.log('Login button clicked');
    });
});

// CTA buttons animation
document.addEventListener('DOMContentLoaded', function() {
    const ctaBtns = document.querySelectorAll('.cta-btn');
    
    ctaBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add navigation or modal functionality here
            console.log('CTA button clicked:', this.textContent);
        });
    });
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.hero-title, .tagline, .cta-container, .waitlist-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for the meditation illustration
document.addEventListener('DOMContentLoaded', function() {
    const meditationIllustration = document.querySelector('.meditation-illustration');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (meditationIllustration) {
            meditationIllustration.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to the character
    const characterImage = document.querySelector('.character-image');
    
    if (characterImage) {
        characterImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        characterImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add hover effect to tags
    const tags = document.querySelectorAll('.free-tag, .new-tools-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(0)', 'translateY(-5px)');
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('translateY(-5px)', 'translateY(0)');
        });
    });
}); 

