<?php
// Set HTTP response code
http_response_code(500);

// Generate CSRF token for forms
if (!isset($_SESSION)) {
    session_start();
}
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Error - Afridrop Solutions</title>
    <meta name="description" content="We're experiencing technical difficulties. Please try again later. Afridrop Solutions provides professional pool services in Uganda.">
    
    <!-- Favicon -->
    <link rel="icon" href="/assets/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="/css/styles.css" as="style">
    <link rel="preload" href="/assets/logo.png" as="image">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/css/styles.css">
    
    <!-- Open Graph / Social Media Meta Tags -->
    <meta property="og:title" content="Server Error - Afridrop Solutions">
    <meta property="og:description" content="We're experiencing technical difficulties. Please try again later. Afridrop Solutions provides professional pool services in Uganda.">
    <meta property="og:image" content="/assets/og-image.jpg">
    <meta property="og:url" content="https://www.afridrop.co.ug/500">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card data -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Server Error - Afridrop Solutions">
    <meta name="twitter:description" content="We're experiencing technical difficulties. Please try again later. Afridrop Solutions provides professional pool services in Uganda.">
    <meta name="twitter:image" content="/assets/og-image.jpg">
</head>
<body class="error-page">
    <!-- Header -->
    <header class="site-header">
        <div class="container">
            <div class="header-wrapper">
                <div class="logo">
                    <a href="/">
                        <img src="/assets/logo.png" alt="Afridrop Solutions Logo" width="180" height="60">
                    </a>
                </div>
                
                <nav class="main-nav">
                    <button class="mobile-menu-toggle" aria-label="Toggle Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <ul class="nav-list">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        <section class="error-section">
            <div class="container">
                <div class="error-content">
                    <h1>500</h1>
                    <h2>Server Error</h2>
                    <p>We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.</p>
                    <div class="error-actions">
                        <a href="/" class="btn btn-primary">Go to Homepage</a>
                        <a href="javascript:location.reload()" class="btn btn-outline">Try Again</a>
                        <a href="/contact" class="btn btn-outline">Contact Support</a>
                    </div>
                </div>
                
                <div class="error-image">
                    <img src="/assets/500-illustration.svg" alt="500 Error Illustration" width="400" height="300">
                </div>
            </div>
        </section>
        
        <section class="alternative-options">
            <div class="container">
                <h3>While we fix this issue, you can:</h3>
                <div class="options-grid">
                    <div class="option-card">
                        <svg class="icon"><use xlink:href="#icon-home"></use></svg>
                        <h4>Visit our homepage</h4>
                        <p>Our homepage may still be accessible and contains information about our services.</p>
                        <a href="/" class="btn btn-sm">Go to Homepage</a>
                    </div>
                    <div class="option-card">
                        <svg class="icon"><use xlink:href="#icon-phone"></use></svg>
                        <h4>Call us directly</h4>
                        <p>Speak with our customer service team for immediate assistance.</p>
                        <a href="tel:+256784464754" class="btn btn-sm">+256 784464754</a>
                    </div>
                    <div class="option-card">
                        <svg class="icon"><use xlink:href="#icon-email"></use></svg>
                        <h4>Send us an email</h4>
                        <p>Our support team will respond to your inquiry as soon as possible.</p>
                        <a href="mailto:info@afridrop.com" class="btn btn-sm">info@afridrop.com</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-col">
                    <div class="footer-logo">
                        <img src="/assets/logo-white.png" alt="Afridrop Solutions Logo" width="160" height="53">
                    </div>
                    <p>Professional swimming pool services in Uganda. We design, build, renovate, and maintain pools for residential and commercial properties.</p>
                    <div class="social-links">
                        <a href="https://facebook.com/afridrop" aria-label="Facebook" target="_blank" rel="noopener">
                            <svg class="icon"><use xlink:href="#icon-facebook"></use></svg>
                        </a>
                        <a href="https://twitter.com/afridrop" aria-label="Twitter" target="_blank" rel="noopener">
                            <svg class="icon"><use xlink:href="#icon-twitter"></use></svg>
                        </a>
                        <a href="https://instagram.com/afridrop" aria-label="Instagram" target="_blank" rel="noopener">
                            <svg class="icon"><use xlink:href="#icon-instagram"></use></svg>
                        </a>
                        <a href="https://linkedin.com/company/afridrop" aria-label="LinkedIn" target="_blank" rel="noopener">
                            <svg class="icon"><use xlink:href="#icon-linkedin"></use></svg>
                        </a>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-of-service">Terms of Service</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Services</h4>
                    <ul class="footer-links">
                        <li><a href="/services/pool-construction">Pool Construction</a></li>
                        <li><a href="/services/pool-renovation">Pool Renovation</a></li>
                        <li><a href="/services/pool-maintenance">Pool Maintenance</a></li>
                        <li><a href="/services/water-treatment">Water Treatment</a></li>
                        <li><a href="/services/equipment-supply">Equipment Supply</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Contact Us</h4>
                    <address class="contact-info">
                        <p>
                            <svg class="icon"><use xlink:href="#icon-location"></use></svg>
                            <span>123 Kampala Road, Kampala, Uganda</span>
                        </p>
                        <p>
                            <svg class="icon"><use xlink:href="#icon-phone"></use></svg>
                            <span><a href="tel:+256700123456">+256 700 123 456</a></span>
                        </p>
                        <p>
                            <svg class="icon"><use xlink:href="#icon-email"></use></svg>
                            <span><a href="mailto:info@afridrop.co.ug">info@afridrop.com</a></span>
                        </p>
                        <p>
                            <svg class="icon"><use xlink:href="#icon-clock"></use></svg>
                            <span>Mon-Fri: 8:00 AM - 6:00 PM</span>
                        </p>
                    </address>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> Afridrop Solutions. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <!-- SVG Icons Sprite -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <!-- Social Icons -->
        <symbol id="icon-facebook" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </symbol>
        <symbol id="icon-twitter" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </symbol>
        <symbol id="icon-instagram" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </symbol>
        <symbol id="icon-linkedin" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </symbol>
        
        <!-- Contact Icons -->
        <symbol id="icon-location" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </symbol>
        <symbol id="icon-phone" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </symbol>
        <symbol id="icon-email" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </symbol>
        <symbol id="icon-home" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </symbol>
    </svg>

    <!-- Scripts -->
    <script src="/js/main.js" defer></script>
</body>
</html>