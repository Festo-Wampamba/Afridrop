/**
 * Afridrop Solutions - Main JavaScript
 * This file handles all interactive elements of the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTestimonialSlider();
    initContactForm();
    initNewsletterForm();
    initScrollEffects();
    initBlogSearch();
    initCounters();
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq__item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            const answer = item.querySelector('.faq__answer');
            
            // Initially hide all answers
            if (answer) {
                answer.style.display = 'none';
            }
            
            if (question) {
                question.addEventListener('click', () => {
                    // Toggle active class
                    item.classList.toggle('active');
                    
                    // Toggle answer visibility
                    if (answer) {
                        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                    }
                });
            }
        });
    }
});

/**
 * Mobile Navigation
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when pressing escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    const prevButton = document.querySelector('.testimonial-control--prev');
    const nextButton = document.querySelector('.testimonial-control--next');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentSlide = 0;
    let slideInterval;
    let isAutoPlaying = true;
    
    if (slides.length === 0) return;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // Function to start auto-rotation
    function startAutoRotation() {
        if (isAutoPlaying) {
            slideInterval = setInterval(() => {
                let index = currentSlide + 1;
                if (index >= slides.length) index = 0;
                showSlide(index);
            }, 5000);
        }
    }
    
    // Function to stop auto-rotation
    function stopAutoRotation() {
        clearInterval(slideInterval);
    }
    
    // Function to pause auto-rotation temporarily
    function pauseAutoRotation() {
        isAutoPlaying = false;
        stopAutoRotation();
        
        // Resume after 10 seconds of inactivity
        setTimeout(() => {
            isAutoPlaying = true;
            startAutoRotation();
        }, 10000);
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            pauseAutoRotation();
            showSlide(index);
        });
    });
    
    // Event listeners for prev/next buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            pauseAutoRotation();
            let index = currentSlide - 1;
            if (index < 0) index = slides.length - 1;
            showSlide(index);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            pauseAutoRotation();
            let index = currentSlide + 1;
            if (index >= slides.length) index = 0;
            showSlide(index);
        });
    }
    
    // Add hover effects to testimonial cards
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonial.style.transform = 'translateY(-5px) scale(1.02)';
            testimonial.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonial.style.transform = 'translateY(0) scale(1)';
            testimonial.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click effect
        testimonial.addEventListener('click', () => {
            pauseAutoRotation();
            testimonial.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                testimonial.style.transform = 'translateY(-5px) scale(1.02)';
            }, 150);
        });
    });
    
    // Pause auto-rotation when hovering over the slider
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            stopAutoRotation();
        });
        
        slider.addEventListener('mouseleave', () => {
            if (isAutoPlaying) {
                startAutoRotation();
            }
        });
    }
    
    // Start auto-rotation initially
    startAutoRotation();
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.querySelector('.form-response');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send form data using fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show response message
                if (formResponse) {
                    formResponse.textContent = data.message || 'Thank you for your message. We will get back to you soon.';
                    formResponse.className = 'form-response form-response--' + (data.success ? 'success' : 'error');
                    
                    // Reset form if successful
                    if (data.success) {
                        contactForm.reset();
                    }
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formResponse.className = 'form-response';
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show error message
                if (formResponse) {
                    formResponse.textContent = 'An error occurred. Please try again later.';
                    formResponse.className = 'form-response form-response--error';
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formResponse.className = 'form-response';
                    }, 5000);
                }
            });
        });
    }
}

/**
 * Newsletter Form Handling
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const formResponse = document.querySelector('.newsletter-form__response');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Collect form data
            const formData = new FormData(newsletterForm);
            
            // Send form data using fetch API
            fetch(newsletterForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show response message
                if (formResponse) {
                    formResponse.textContent = data.message || 'Thank you for subscribing to our newsletter!';
                    formResponse.className = 'newsletter-form__response newsletter-form__response--' + (data.success ? 'success' : 'error');
                    
                    // Reset form if successful
                    if (data.success) {
                        newsletterForm.reset();
                    }
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formResponse.className = 'newsletter-form__response';
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show error message
                if (formResponse) {
                    formResponse.textContent = 'An error occurred. Please try again later.';
                    formResponse.className = 'newsletter-form__response newsletter-form__response--error';
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formResponse.className = 'newsletter-form__response';
                    }, 5000);
                }
            });
        });
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const header = document.querySelector('.header');
    const backToTopButton = document.querySelector('.back-to-top__button');
    const scrollThreshold = 50;
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }
    
    // Back to top button visibility
    if (backToTopButton) {
        // Initially hide the button
        backToTopButton.parentElement.style.opacity = '0';
        backToTopButton.parentElement.style.visibility = 'hidden';
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.parentElement.style.opacity = '1';
                backToTopButton.parentElement.style.visibility = 'visible';
            } else {
                backToTopButton.parentElement.style.opacity = '0';
                backToTopButton.parentElement.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav__menu');
                const navToggle = document.querySelector('.nav__toggle');
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Blog Search Functionality
 */
function initBlogSearch() {
    const searchForm = document.querySelector('.blog-hero__search-form');
    const searchInput = document.querySelector('.blog-hero__search-input');
    const blogGrid = document.querySelector('.blog-grid');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredPost = document.querySelector('.featured-post');
    
    if (searchForm && searchInput && blogGrid && blogCards.length > 0 && featuredPost) {
        // Create search results container
        const searchResults = document.createElement('div');
        searchResults.className = 'blog-search-results';
        searchResults.style.display = 'none';
        blogGrid.parentNode.insertBefore(searchResults, blogGrid);
        
        // Create no results message
        const noResults = document.createElement('div');
        noResults.className = 'blog-search-no-results';
        noResults.innerHTML = '<p>No results found. Please try a different search term.</p>';
        noResults.style.display = 'none';
        blogGrid.parentNode.insertBefore(noResults, blogGrid);
        
        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'blog-search-loading';
        loadingIndicator.innerHTML = `
            <div class="blog-search-loading__spinner"></div>
            <p>Searching...</p>
        `;
        loadingIndicator.style.display = 'none';
        blogGrid.parentNode.insertBefore(loadingIndicator, blogGrid);
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            // Show loading indicator
            loadingIndicator.style.display = 'flex';
            blogGrid.style.display = 'none';
            featuredPost.style.display = 'none';
            searchResults.style.display = 'none';
            noResults.style.display = 'none';
            
            if (searchTerm.length < 2) {
                // Show all blog cards if search term is too short
                blogGrid.style.display = 'grid';
                featuredPost.style.display = 'block';
                searchResults.style.display = 'none';
                noResults.style.display = 'none';
                loadingIndicator.style.display = 'none';
                return;
            }
            
            // Simulate search delay for better UX
            setTimeout(() => {
            
            // Filter blog cards based on search term
            const matchingCards = [];
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-card__title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-card__excerpt').textContent.toLowerCase();
                const category = card.querySelector('.blog-card__category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    matchingCards.push(card.cloneNode(true));
                }
            });
            
            // Display search results
            if (matchingCards.length > 0) {
                // Clear previous results
                searchResults.innerHTML = '';
                
                // Add heading
                const heading = document.createElement('h2');
                heading.className = 'blog-search-results__heading';
                heading.textContent = `Search Results for "${searchTerm}" (${matchingCards.length})`;
                searchResults.appendChild(heading);
                
                // Create grid for results
                const resultsGrid = document.createElement('div');
                resultsGrid.className = 'blog-search-results__grid';
                searchResults.appendChild(resultsGrid);
                
                // Add matching cards to results grid
                matchingCards.forEach(card => {
                    resultsGrid.appendChild(card);
                });
                
                // Show results, hide original grid, featured post, and no results message
                blogGrid.style.display = 'none';
                featuredPost.style.display = 'none';
                searchResults.style.display = 'block';
                noResults.style.display = 'none';
                loadingIndicator.style.display = 'none';
            } else {
                // Show no results message
                blogGrid.style.display = 'none';
                featuredPost.style.display = 'none';
                searchResults.style.display = 'none';
                noResults.style.display = 'block';
                loadingIndicator.style.display = 'none';
            }
            }, 800); // 800ms delay to show loading indicator
            
            // Add clear search button
            if (!document.querySelector('.blog-search-clear')) {
                const clearButton = document.createElement('button');
                clearButton.className = 'blog-search-clear';
                clearButton.textContent = 'Clear Search';
                clearButton.addEventListener('click', function() {
                    searchInput.value = '';
                    blogGrid.style.display = 'grid';
                    featuredPost.style.display = 'block';
                    searchResults.style.display = 'none';
                    noResults.style.display = 'none';
                    loadingIndicator.style.display = 'none';
                    this.remove();
                });
                
                // Add clear button after search results or no results message
                if (matchingCards.length > 0) {
                    searchResults.appendChild(clearButton);
                } else {
                    noResults.appendChild(clearButton);
                }
            }
        });
    }
}

// Initialize navigation when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle functionality is handled by main.js
            // This ensures the hamburger menu works properly
        });
        
        // FAQ toggles
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Toggle content visibility
                content.classList.toggle('hidden');
                
                // Rotate icon
                if (content.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
        
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        const formResponse = document.querySelector('.form-response');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Collect form data
                const formData = new FormData(contactForm);
                
                // Send form data using fetch API
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Show response message
                    if (formResponse) {
                        formResponse.textContent = data.message || 'Thank you for your message. We will get back to you soon.';
                        formResponse.className = 'form-response ' + (data.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') + ' p-4 rounded mt-4';
                        formResponse.style.display = 'block';
                        
                        // Reset form if successful
                        if (data.success) {
                            contactForm.reset();
                        }
                        
                        // Hide message after 5 seconds
                        setTimeout(() => {
                            formResponse.style.display = 'none';
                        }, 5000);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Show error message
                    if (formResponse) {
                        formResponse.textContent = 'An error occurred. Please try again later.';
                        formResponse.className = 'form-response bg-red-100 text-red-800 p-4 rounded mt-4';
                        formResponse.style.display = 'block';
                        
                        // Hide message after 5 seconds
                        setTimeout(() => {
                            formResponse.style.display = 'none';
                        }, 5000);
                    }
                });
            });
        }
        
        // Newsletter form handling
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Show loading state
                const submitButton = newsletterForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                // Collect form data
                const formData = new FormData(newsletterForm);
                
                // Send form data using fetch API
                fetch(newsletterForm.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Show response as alert
                    alert(data.message || 'Thank you for subscribing to our newsletter!');
                    
                    // Reset form if successful
                    if (data.success) {
                        newsletterForm.reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Show error message
                    alert('An error occurred. Please try again later.');
                });
            });
        }

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter__button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;

    // Filter gallery items based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('gallery-filter__button--active'));
            
            // Add active class to clicked button
            this.classList.add('gallery-filter__button--active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter with animation
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                        });
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// Modal Functionality
function initGalleryModal() {
    const modalLinks = document.querySelectorAll('.gallery-card__link');
    const modalCloseButtons = document.querySelectorAll('.project-modal__close');
    
    if (!modalLinks.length) return;

    // Handle modal open
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModal = document.querySelector(this.getAttribute('href'));
            if (!targetModal) return;
            
            targetModal.classList.add('project-modal--active');
            document.body.style.overflow = 'hidden';
            
            // Add escape key listener
            document.addEventListener('keydown', handleEscapeKey);
        });
    });

    // Handle modal close via button
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Handle modal close via outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-modal')) {
            closeModal(e);
        }
    });
}

// Helper function to close modal
function closeModal(e) {
    const modal = e.target.closest('.project-modal');
    if (!modal) return;
    
    modal.classList.remove('project-modal--active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);
}

// Helper function to handle escape key
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.project-modal--active');
        if (activeModal) {
            closeModal({ target: activeModal });
        }
    }
}

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilter();
    initGalleryModal();
});
/**
 * Counter Animation
 */
function initCounters() {
    // Support both .stat-card__number and .stat__number selectors
    const counters = document.querySelectorAll('.stat-card__number[data-target], .stat__number[data-target]');
    
    if (counters.length === 0) return;
    
    // Function to animate a single counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        counter.classList.add('counting');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                setTimeout(() => {
                    counter.classList.remove('counting');
                }, 600);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Function to reset counters to zero
    function resetCounters() {
        counters.forEach(counter => {
            const suffix = counter.getAttribute('data-suffix') || '';
            counter.textContent = '0' + suffix;
            counter.classList.remove('animated', 'counting');
        });
    }
    
    // Function to start counter animations
    function startCounters() {
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Reset counters immediately on page load
    resetCounters();
    
    // Always start animation after a short delay on page load
    setTimeout(() => {
        startCounters();
    }, 1000);
    
    // Also set up intersection observer for scroll-triggered animations
    // Support both .stats and .why-us__stats selectors
    const statsSection = document.querySelector('.stats, .why-us__stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset and restart animation each time it comes into view
                    resetCounters();
                    setTimeout(() => {
                        startCounters();
                    }, 200);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });
        
        observer.observe(statsSection);
    }
}