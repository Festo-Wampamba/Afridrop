/* ===================================
   BLOG TEMPLATE JAVASCRIPT
   =================================== */

// Blog functionality initialization
document.addEventListener('DOMContentLoaded', function() {
    initBlogFilters();
    initBlogSearch();
    initPagination();
    initFAQAccordion();
    initNewsletterForm();
    initSmoothScrolling();
    initTopicCards();
    initArticleCards();
});

/* ===================================
   BLOG FILTERS FUNCTIONALITY
   =================================== */
function initBlogFilters() {
    const filterTabs = document.querySelectorAll('.blog-tab');
    const articles = document.querySelectorAll('.article-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('blog-tab--active'));
            
            // Add active class to clicked tab
            this.classList.add('blog-tab--active');
            
            // Get filter category
            const category = this.textContent.trim().toLowerCase();
            
            // Filter articles
            filterArticles(category, articles);
            
            // Update URL without page reload
            updateURL('category', category);
        });
    });
}

function filterArticles(category, articles, updateUrlFlag = true) {
    let visibleCount = 0;
    
    articles.forEach(article => {
        const articleCategory = article.dataset.category?.toLowerCase() || '';
        
        if (category === 'all posts' || articleCategory.includes(category.replace(' ', '-'))) {
            article.style.display = 'block';
            article.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    // Update article count
    updateArticleCount();
    
    if (updateUrlFlag) {
        const urlParams = getURLParams();
        const params = { category: category };
        if (urlParams.search) params.search = urlParams.search;
        if (urlParams.page && urlParams.page !== '1') params.page = urlParams.page;
        updateURL('category', category);
    }
}

/* ===================================
   SEARCH FUNCTIONALITY
   =================================== */
function initBlogSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const articles = document.querySelectorAll('.article-card');
    
    if (!searchInput) return;
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        performSearch(searchTerm, articles);
    });
    
    // Search button click
    searchBtn?.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        performSearch(searchTerm, articles);
        searchInput.focus();
    });
    
    // Enter key search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = this.value.toLowerCase().trim();
            performSearch(searchTerm, articles);
        }
    });
}

function performSearch(searchTerm, articles, updateUrlFlag = true) {
    let visibleCount = 0;
    
    articles.forEach(article => {
        const title = article.querySelector('.article-card__title')?.textContent.toLowerCase() || '';
        const summary = article.querySelector('.article-card__summary')?.textContent.toLowerCase() || '';
        const category = article.dataset.category?.toLowerCase() || '';
        
        const isMatch = title.includes(searchTerm) || 
                       summary.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        if (searchTerm === '' || isMatch) {
            article.style.display = 'block';
            article.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    // Show no results message
    showSearchResults(visibleCount, searchTerm);
    
    if (updateUrlFlag) {
        const urlParams = getURLParams();
        const params = { search: searchTerm };
        if (urlParams.category) params.category = urlParams.category;
        if (urlParams.page && urlParams.page !== '1') params.page = urlParams.page;
        updateURL('search', searchTerm);
    }
}

function showSearchResults(count, searchTerm) {
    const articlesGrid = document.querySelector('.articles-grid');
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (count === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--color-slate-stone-600);">
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or browse our categories.</p>
                </div>
            `;
            articlesGrid.parentNode.insertBefore(noResultsMsg, articlesGrid.nextSibling);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

/* ===================================
   PAGINATION FUNCTIONALITY
   =================================== */
function initPagination() {
    const paginationBtns = document.querySelectorAll('.pagination__btn');
    const paginationNumbers = document.querySelectorAll('.pagination__number');
    
    // Previous/Next buttons
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const direction = this.dataset.direction;
            const currentPage = getCurrentPage();
            
            if (direction === 'prev' && currentPage > 1) {
                goToPage(currentPage - 1);
            } else if (direction === 'next') {
                goToPage(currentPage + 1);
            }
        });
    });
    
    // Number buttons
    paginationNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageNum = parseInt(this.textContent);
            goToPage(pageNum);
        });
    });
}

function getCurrentPage() {
    const activePage = document.querySelector('.pagination__number--active');
    return activePage ? parseInt(activePage.textContent) : 1;
}

function getTotalPages() {
    return document.querySelectorAll('.pagination__number').length;
}

function goToPage(pageNum) {
    // Update active page styling
    document.querySelectorAll('.pagination__number').forEach(btn => {
        btn.classList.remove('pagination__number--active');
        if (parseInt(btn.textContent) === pageNum) {
            btn.classList.add('pagination__number--active');
        }
    });
    
    // Update prev/next button states
    updatePaginationButtons(pageNum);
    
    // Scroll to top of articles
    document.querySelector('.latest-articles')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Update URL
    updateURL('page', pageNum);
}

function updatePaginationButtons(currentPage) {
    const prevBtn = document.querySelector('[data-direction="prev"]');
    const nextBtn = document.querySelector('[data-direction="next"]');
    const totalPages = document.querySelectorAll('.pagination__number').length;
    
    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages;
    }
}

/* ===================================
   FAQ ACCORDION FUNCTIONALITY
   =================================== */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq__item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq__item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq__question');
                btn.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/* ===================================
   NEWSLETTER FORM FUNCTIONALITY
   =================================== */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter__form');
    const newsletterInput = document.querySelector('.newsletter__input');
    const newsletterBtn = document.querySelector('.newsletter__btn');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate subscription
            showNewsletterSuccess();
            newsletterInput.value = '';
        } else {
            showNewsletterError('Please enter a valid email address.');
        }
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNewsletterSuccess() {
    const btn = document.querySelector('.newsletter__btn');
    const originalText = btn.textContent;
    
    btn.textContent = 'Subscribed!';
    btn.style.backgroundColor = 'var(--color-success)';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
    }, 3000);
}

function showNewsletterError(message) {
    const input = document.querySelector('.newsletter__input');
    input.style.borderColor = 'var(--color-error)';
    
    // Create or update error message
    let errorMsg = document.querySelector('.newsletter-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'newsletter-error';
        errorMsg.style.cssText = 'color: var(--color-error); font-size: var(--font-size-xs); margin-top: var(--spacing-xs);';
        input.parentNode.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    
    // Clear error after input
    input.addEventListener('input', function() {
        this.style.borderColor = '';
        if (errorMsg) errorMsg.remove();
    }, { once: true });
}

/* ===================================
   SMOOTH SCROLLING FUNCTIONALITY
   =================================== */
function initSmoothScrolling() {
    // Smooth scroll for "Read More" links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===================================
   TOPIC CARDS FUNCTIONALITY
   =================================== */
function initTopicCards() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.querySelector('.topic-card__title').textContent.toLowerCase();
            
            // Filter articles by topic
            const articles = document.querySelectorAll('.article-card');
            filterArticles(topic, articles);
            
            // Update active tab
            const tabs = document.querySelectorAll('.blog-tab');
            tabs.forEach(tab => {
                tab.classList.remove('blog-tab--active');
                if (tab.textContent.toLowerCase().includes(topic)) {
                    tab.classList.add('blog-tab--active');
                }
            });
            
            // Scroll to articles section
            document.querySelector('.latest-articles')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

/* ===================================
   ARTICLE CARDS FUNCTIONALITY
   =================================== */
function initArticleCards() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;
            
            const link = this.querySelector('.article-card__link');
            if (link) {
                // Simulate click tracking
                console.log('Article clicked:', this.querySelector('.article-card__title').textContent);
                
                // Navigate to article (in a real app, this would be a proper URL)
                window.location.href = link.href;
            }
        });
        
        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */
function updateURL(paramOrParams, value) {
    if (history.pushState) {
        const url = new URL(window.location);
        
        if (typeof paramOrParams === 'object') {
            // Handle multiple parameters
            Object.entries(paramOrParams).forEach(([param, val]) => {
                if (val && val !== 'all posts' && val !== '') {
                    url.searchParams.set(param, val);
                } else {
                    url.searchParams.delete(param);
                }
            });
        } else {
            // Handle single parameter (backward compatibility)
            if (value && value !== 'all posts' && value !== '') {
                url.searchParams.set(paramOrParams, value);
            } else {
                url.searchParams.delete(paramOrParams);
            }
        }
        
        history.pushState(null, '', url);
    }
}

function updateArticleCount() {
    const visibleArticles = document.querySelectorAll('.article-card[style*="display: block"], .article-card:not([style*="display: none"])');
    const countElement = document.querySelector('.articles-count');
    
    if (countElement) {
        countElement.textContent = `Showing ${visibleArticles.length} articles`;
    }
}

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category') || 'all posts',
        search: params.get('search') || '',
        page: parseInt(params.get('page')) || 1
    };
}

// Initialize page based on URL parameters
function initFromURL() {
    const params = getURLParams();
    
    // Set active tab
    if (params.category !== 'all posts') {
        const tabs = document.querySelectorAll('.blog-tab');
        tabs.forEach(tab => {
            tab.classList.remove('blog-tab--active');
            if (tab.textContent.toLowerCase().includes(params.category)) {
                tab.classList.add('blog-tab--active');
            }
        });
        
        // Filter articles without updating URL
        const articles = document.querySelectorAll('.article-card');
        filterArticles(params.category, articles, false);
    }
    
    // Set search term
    if (params.search) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = params.search;
            const articles = document.querySelectorAll('.article-card');
            performSearch(params.search, articles, false);
        }
    }
    
    // Set page
    if (params.page > 1) {
        goToPage(params.page);
    }
}

// Initialize from URL on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initFromURL, 100); // Small delay to ensure DOM is ready
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    initFromURL();
});

/* ===================================
   ANIMATIONS
   =================================== */

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .loading {
        animation: pulse 1.5s infinite;
    }
`;
document.head.appendChild(style);

/* ===================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   =================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe article cards
    document.querySelectorAll('.article-card, .topic-card, .featured-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollAnimations, 500);
});