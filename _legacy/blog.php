<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Afridrop Solutions Blog - Stay updated with the latest pool maintenance tips, industry insights, and expert advice.">
    <title>Our Blog | Afridrop Solutions Limited</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/blog.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <!-- Favicon -->
    <link rel="icon" href="assets/Images/water-drop.png" type="image/png">
</head>
<body>
    <header class="header">
        <div class="container header__container">
            <div class="logo">
                <a href="index.php">
                    <img src="assets/Images/logo_Afridrop_Solutions.png" alt="Afridrop Solutions Logo" width="147" height="75" loading="eager">
                </a>
            </div>
            <nav class="nav" aria-label="Main navigation">
                <button class="nav__toggle" aria-expanded="false" aria-controls="primary-menu">
                    <span class="sr-only">Menu</span>
                    <span class="nav__toggle-bar"></span>
                    <span class="nav__toggle-bar"></span>
                    <span class="nav__toggle-bar"></span>
                </button>
                <ul id="primary-menu" class="nav__menu">
                    <li class="nav__item"><a href="index.php" class="nav__link">Home</a></li>
                    <li class="nav__item"><a href="about.php" class="nav__link">About Us</a></li>
                    <li class="nav__item"><a href="services.php" class="nav__link">Services</a></li>
                    <li class="nav__item"><a href="gallery.php" class="nav__link">Gallery</a></li>
                    <li class="nav__item"><a href="blog.php" class="nav__link nav__link--active">Blog</a></li>
                    <li class="nav__item"><a href="contact.php" class="nav__link">Contact</a></li>
                </ul>
            </nav>
            <a href="contact.php" class="btn btn--primary header__cta">Get Quote</a>
        </div>
    </header>

    <main>
        <!-- Hero Section -->
        <section class="blog-hero">
            <div class="blog-hero__overlay"></div>
            <div class="container">
                <div class="blog-hero__content">
                    <h1 class="blog-hero__title">Our Blog</h1>
                    <p class="blog-hero__subtitle">Stay updated with the latest pool maintenance tips, industry insights, and expert advice</p>
                </div>
            </div>
        </section>

        <!-- Interactive Filters & Search -->
        <section class="blog-filters">
            <div class="container">
                <div class="blog-filters__wrapper">
                    <div class="blog-tabs">
                        <button class="blog-tab blog-tab--active" data-filter="all">All Posts</button>
                        <button class="blog-tab" data-filter="company-news">Company News</button>
                        <button class="blog-tab" data-filter="industry-insights">Industry Insights</button>
                        <button class="blog-tab" data-filter="tips-tutorials">Tips & Tutorials</button>
                        <button class="blog-tab" data-filter="case-studies">Case Studies</button>
                    </div>
                    <div class="blog-search">
                        <div class="search-box">
                            <input type="text" class="search-input" placeholder="Search articles..." id="blogSearch">
                            <button class="search-btn" type="button">
                                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Article -->
        <section class="featured-article">
            <div class="container">
                <article class="featured-card">
                    <div class="featured-card__image">
                        <img src="assets/Images/testingpool.webp" alt="Man testing pool water" loading="lazy">
                    </div>
                    <div class="featured-card__content">
                        <div class="featured-card__badges">
                            <span class="badge badge--featured">Featured Article</span>
                            <span class="badge badge--date">June 13, 2025</span>
                        </div>
                        <h2 class="featured-card__title">The Complete Guide to Year-Round Pool Maintenance in Uganda</h2>
                        <p class="featured-card__summary">Discover essential tips and techniques for maintaining your swimming pool throughout Uganda's diverse climate conditions. From rainy season preparations to dry season care, learn how to keep your pool crystal clear and safe for swimming all year long.</p>
                        <div class="featured-card__footer">
                            <a href="blog-detail.php?id=featured-article" class="btn btn--primary featured-card__btn">Read Article</a>
                            <span class="featured-card__views">1,245 views</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>

        <!-- Latest Articles Grid -->
        <section class="latest-articles">
            <div class="container">
                <h2 class="section-title">Latest Articles</h2>
                <div class="articles-grid" id="articlesGrid">
                    <!-- Article 1 -->
                    <article class="article-card" data-category="tips-tutorials">
                        <div class="article-card__image">
                            <img src="assets/Images/cleaning2.webp" alt="Pool maintenance tips" loading="lazy">
                        </div>
                        <div class="article-card__content">
                            <div class="article-card__meta">
                                <span class="badge badge--category">Tips & Tutorials</span>
                                <time class="article-card__date" datetime="2025-01-15">January 15, 2025</time>
                            </div>
                            <h3 class="article-card__title">Top 5 Weekly Pool Maintenance Tasks for Ugandan Homes</h3>
                            <p class="article-card__summary">Essential weekly maintenance routines to keep your pool sparkling clean and safe for family enjoyment.</p>
                            <div class="article-card__footer">
                                <a href="blog-detail.php?id=weekly-maintenance-tasks" class="article-card__link">Read More →</a>
                                <span class="article-card__read-time">5 min read</span>
                            </div>
                        </div>
                    </article>

                    <!-- Article 2 -->
                    <article class="article-card" data-category="industry-insights">
                        <div class="article-card__image">
                            <img src="assets/Images/poolSafety.webp" alt="Pool construction trends" loading="lazy">
                        </div>
                        <div class="article-card__content">
                            <div class="article-card__meta">
                                <span class="badge badge--category">Industry Insights</span>
                                <time class="article-card__date" datetime="2025-01-12">January 12, 2025</time>
                            </div>
                            <h3 class="article-card__title">Eco-Friendly Pool Solutions: Sustainability Trends in Uganda</h3>
                            <p class="article-card__summary">Exploring environmentally conscious pool technologies and practices gaining popularity in East Africa.</p>
                            <div class="article-card__footer">
                                <a href="blog-detail.php?id=eco-friendly-pool-solutions" class="article-card__link">Read More →</a>
                                <span class="article-card__read-time">7 min read</span>
                            </div>
                        </div>
                    </article>

                    <!-- Article 3 -->
                    <article class="article-card" data-category="case-studies">
                        <div class="article-card__image">
                            <img src="assets/Images/Backyard.webp" alt="Luxury pool design" loading="lazy">
                        </div>
                        <div class="article-card__content">
                            <div class="article-card__meta">
                                <span class="badge badge--category">Case Studies</span>
                                <time class="article-card__date" datetime="2025-01-10">January 10, 2025</time>
                            </div>
                            <h3 class="article-card__title">Transforming a Backyard: Luxury Pool Installation in Kampala</h3>
                            <p class="article-card__summary">A detailed look at our recent residential pool project featuring modern design and smart technology integration.</p>
                            <div class="article-card__footer">
                                <a href="blog-detail.php?id=luxury-pool-kampala" class="article-card__link">Read More →</a>
                                <span class="article-card__read-time">6 min read</span>
                            </div>
                        </div>
                    </article>

                    <!-- Article 4 -->
                    <article class="article-card" data-category="tips-tutorials">
                        <div class="article-card__image">
                            <img src="assets/Images/chemicalTest.webp" alt="Pool water testing" loading="lazy">
                        </div>
                        <div class="article-card__content">
                            <div class="article-card__meta">
                                <span class="badge badge--category">Tips & Tutorials</span>
                                <time class="article-card__date" datetime="2025-01-08">January 8, 2025</time>
                            </div>
                            <h3 class="article-card__title">Understanding Pool Water Chemistry: A Beginner's Guide</h3>
                            <p class="article-card__summary">Learn the basics of pool water testing and chemical balancing for crystal-clear, safe swimming water.</p>
                            <div class="article-card__footer">
                                <a href="blog-detail.php?id=pool-water-chemistry" class="article-card__link">Read More →</a>
                                <span class="article-card__read-time">8 min read</span>
                            </div>
                        </div>
                    </article>

                    <!-- Article 5 -->
                    <article class="article-card" data-category="company-news">
                        <div class="article-card__image">
                            <img src="assets/Images/AfridropTeamProfile.webp" alt="Company expansion" loading="lazy">
                        </div>
                        <div class="article-card__content">
                            <div class="article-card__meta">
                                <span class="badge badge--category">Company News</span>
                                <time class="article-card__date" datetime="2025-01-05">January 5, 2025</time>
                            </div>
                            <h3 class="article-card__title">Afridrop Solutions Expands Services to Northern Uganda</h3>
                            <p class="article-card__summary">We're excited to announce our expansion into Gulu and surrounding areas, bringing professional pool services closer to you.</p>
                            <div class="article-card__footer">
                                <a href="blog-detail.php?id=northern-uganda-expansion" class="article-card__link">Read More →</a>
                                <span class="article-card__read-time">4 min read</span>
                            </div>
                        </div>
                    </article>

                    <!-- Article 6 -->
                    <article class="article-card" data-category="industry-insights">
                        <div class="article-card__image">
                            <img src="assets/Images/poolSafety.webp" alt="Pool safety features" loading="lazy">
                        </div>
                        <div class="article-card__content">
                            <div class="article-card__meta">
                                <span class="badge badge--category">Safety</span>
                                <time class="article-card__date" datetime="2025-01-03">January 3, 2025</time>
                            </div>
                            <h3 class="article-card__title">Essential Safety Features Every Pool Should Have</h3>
                            <p class="article-card__summary">Comprehensive guide to pool safety equipment and features that protect your family and guests.</p>
                            <div class="article-card__footer">
                                <a href="blog-detail.php?id=pool-safety-features" class="article-card__link">Read More →</a>
                                <span class="article-card__read-time">6 min read</span>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Pagination -->
                <nav class="pagination" aria-label="Blog pagination">
                    <button class="pagination__btn pagination__btn--prev" data-direction="prev" disabled>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Previous
                    </button>
                    <div class="pagination__numbers">
                        <button class="pagination__number pagination__number--active">1</button>
                        <button class="pagination__number">2</button>
                        <button class="pagination__number">3</button>
                        <button class="pagination__number">4</button>
                        <span class="pagination__ellipsis">…</span>
                        <button class="pagination__number">8</button>
                    </div>
                    <button class="pagination__btn pagination__btn--next" data-direction="next">
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </nav>
            </div>
        </section>

        <!-- Popular Topics -->
        <section class="popular-topics">
            <div class="container">
                <h2 class="section-title">Popular Topics</h2>
                <div class="topics-grid">
                    <div class="topic-card">
                        <div class="topic-card__icon">
                            <svg class="topic-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                                <path d="M19 15L20.09 18.26L24 19L20.09 19.74L19 23L17.91 19.74L14 19L17.91 18.26L19 15Z" fill="currentColor"/>
                                <path d="M5 15L6.09 18.26L10 19L6.09 19.74L5 23L3.91 19.74L0 19L3.91 18.26L5 15Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 class="topic-card__title">Water Treatment</h3>
                        <p class="topic-card__count">15 articles</p>
                    </div>

                    <div class="topic-card">
                        <div class="topic-card__icon">
                            <svg class="topic-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9C14.3 4.5 13.7 4.5 13.3 4.9L8.7 9.5C8.3 9.9 8.3 10.5 8.7 10.9L13.3 15.5C13.7 15.9 14.3 15.9 14.7 15.5C15.1 15.1 15.1 14.5 14.7 14.1L11.4 10.8H20C20.6 10.8 21 10.4 21 9.8C21 9.2 20.6 8.8 20 8.8H11.4L14.7 6.3Z" fill="currentColor"/>
                                <path d="M3 3H21V21H3V3Z" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <h3 class="topic-card__title">Maintenance</h3>
                        <p class="topic-card__count">23 articles</p>
                    </div>

                    <div class="topic-card">
                        <div class="topic-card__icon">
                            <svg class="topic-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3 class="topic-card__title">Construction</h3>
                        <p class="topic-card__count">18 articles</p>
                    </div>

                    <div class="topic-card">
                        <div class="topic-card__icon">
                            <svg class="topic-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                <path d="M3 7L12 12L21 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3 class="topic-card__title">Design</h3>
                        <p class="topic-card__count">12 articles</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup -->
        <section class="newsletter">
            <div class="container">
                <div class="newsletter__content">
                    <h2 class="newsletter__title">Subscribe to Our Newsletter</h2>
                    <p class="newsletter__subtitle">Get the latest pool maintenance tips and industry insights delivered to your inbox</p>
                    <form class="newsletter__form" id="newsletterForm">
                        <div class="newsletter__input-group">
                            <input type="email" class="newsletter__input" placeholder="Enter your email address" required>
                            <button type="submit" class="btn btn--primary newsletter__btn">Subscribe Now</button>
                        </div>
                        <p class="newsletter__privacy">We respect your privacy and will never share your information with third parties.</p>
                    </form>
                </div>
            </div>
        </section>

        <!-- FAQ Accordion -->
        <section class="faq">
            <div class="container">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <div class="faq__list">
                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span>How often should I test my pool water?</span>
                            <svg class="faq__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p>We recommend testing your pool water at least 2-3 times per week during regular use, and daily during heavy usage or extreme weather conditions. Key parameters to monitor include pH levels, chlorine content, alkalinity, and calcium hardness.</p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span>What are the signs my pool needs professional service?</span>
                            <svg class="faq__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p>Contact us if you notice persistent cloudiness, algae growth, unusual odors, equipment malfunctions, or if you're unable to maintain proper chemical balance despite regular testing and treatment.</p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span>How long does a typical pool construction project take?</span>
                            <svg class="faq__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p>Construction timelines vary based on pool size, complexity, and weather conditions. Typically, residential pools take 6-12 weeks from excavation to completion, while commercial projects may require 3-6 months.</p>
                        </div>
                    </div>

                    <div class="faq__item">
                        <button class="faq__question" aria-expanded="false">
                            <span>What maintenance tasks can I handle myself vs. hiring professionals?</span>
                            <svg class="faq__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="faq__answer">
                            <p>DIY tasks include skimming debris, brushing walls, emptying skimmer baskets, and basic chemical testing. Professional services are recommended for equipment repairs, major chemical imbalances, deep cleaning, and seasonal opening/closing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer Section -->
    <footer class="footer">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__column footer__column--about">
                    <div class="footer__logo">
                        <img src="assets/Images/logo_Afridrop_Solutions.png" alt="Afridrop Solutions Logo" width="147" height="75" loading="lazy">
                    </div>
                    <p class="footer__description">Afridrop Solutions Limited is Uganda's premier swimming pool construction, maintenance, and water treatment provider, delivering exceptional quality and service.</p>
                    <div class="footer__social">
                        <a href="https://facebook.com" class="footer__social-link" aria-label="Follow us on Facebook" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                        </a>
                        <a href="https://twitter.com" class="footer__social-link" aria-label="Follow us on Twitter" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
                        </a>
                        <a href="https://instagram.com" class="footer__social-link" aria-label="Follow us on Instagram" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                        <a href="https://linkedin.com" class="footer__social-link" aria-label="Follow us on LinkedIn" target="_blank" rel="noopener">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"/></svg>
                        </a>
                    </div>
                </div>
                
                <div class="footer__column footer__column--links">
                    <h3 class="footer__heading">Quick Links</h3>
                    <ul class="footer__links">
                        <li><a href="index.php" class="footer__link">Home</a></li>
                        <li><a href="about.php" class="footer__link">About Us</a></li>
                        <li><a href="services.php" class="footer__link">Services</a></li>
                        <li><a href="gallery.php" class="footer__link">Project Gallery</a></li>
                        <li><a href="blog.php" class="footer__link">Blog</a></li>
                        <li><a href="contact.php" class="footer__link">Contact Us</a></li>
                    </ul>
                </div>
                
                <div class="footer__column footer__column--services">
                    <h3 class="footer__heading">Our Services</h3>
                    <ul class="footer__links">
                        <li><a href="services.php#construction" class="footer__link">Pool Construction</a></li>
                        <li><a href="services.php#renovation" class="footer__link">Pool Renovation</a></li>
                        <li><a href="services.php#maintenance" class="footer__link">Pool Maintenance</a></li>
                        <li><a href="services.php#treatment" class="footer__link">Water Treatment</a></li>
                        <li><a href="services.php#equipment" class="footer__link">Equipment Installation</a></li>
                        <li><a href="services.php#inspection" class="footer__link">Inspection Services</a></li>
                    </ul>
                </div>
                
                <div class="footer__column footer__column--contact">
                    <h3 class="footer__heading">Contact Information</h3>
                    <ul class="footer__contact-list">
                        <li class="footer__contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>Plot 67b, Spring Road Bugolobi, Kisakye<br>Complex, P.O Box 72312 Kampala.</span>
                        </li>
                        <li class="footer__contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path></svg>
                            <span>+256 7844 64754<br>+256 7527 737779</span>
                        </li>
                        <li class="footer__contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <span>sales@afridropsolutions.com<br>info@afridropsolutions.com</span>
                        </li>
                        <li class="footer__contact-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span>Mon-Fri: 8:00 AM - 6:00 PM<br>Sat: 9:00 AM - 2:00 PM<br>Sun: Closed</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="footer__bottom">
                <div class="footer__payment">
                    <span class="footer__payment-label">Payment Methods </span>
                    <div class="footer__payment-icons">
                        <!-- Visa -->
                    <img src="assets/Images/mobilemoney.png" alt="Credit Card Icon" width="50" height="50" loading="lazy" class="payment-icon animate-bounce">
                        
                        <!-- Airtel Money -->
                        <img src="assets/Images/airtel.png" alt="Credit Card Icon" width="40" height="40" loading="lazy">

                        <!-- MTN Mobile Money -->
                        <img src="assets/Images/visa.png" alt="Credit Card Icon" width="50" height="50" loading="lazy">

                        <!-- Mastercard -->
                        <img src="assets/Images/card1.png" alt="Credit Card Icon" width="50" height="50" loading="lazy">
                    </div>
                </div>
                
                <div class="footer__copyright">
                    <p>&copy; <?php echo date('Y'); ?> Afridrop Solutions Limited. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
    <script src="js/blog.js"></script>
</body>
</html>