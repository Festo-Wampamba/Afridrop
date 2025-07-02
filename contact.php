<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Afridrop Solutions Limited</title>
    <meta name="description" content="Get in touch with Afridrop Solutions Limited for professional swimming pool services in Uganda. Contact us for quotes, inquiries, and consultations.">
    <script src="https://cdn.tailwindcss.com/3.4.16"></script>
    <script>tailwind.config={theme:{extend:{colors:{primary:'#009FE3',secondary:'#0054A6'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/contact.css">
    <!-- Favicon -->
    <link rel="icon" href="assets/Images/water-drop.png" type="image/png">
    <style>
        :where([class^="ri-"])::before { content: "\f3c2"; }
        body {
            font-family: 'Inter', sans-serif;
            scroll-behavior: smooth;
        }
        .page-header {
            background-image: linear-gradient(to right, rgba(0, 159, 227, 0.9), rgba(0, 84, 166, 0.85)), url('assets/Images/HeroImage1.png');
            background-size: cover;
            background-position: center;
        }
    </style>
</head>
<body class="bg-gray-50">
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
                    <li class="nav__item"><a href="blog.php" class="nav__link">Blog</a></li>
                    <li class="nav__item"><a href="contact.php" class="nav__link nav__link--active">Contact</a></li>
                </ul>
            </nav>
            <a href="contact.php" class="btn btn--primary header__cta">Get Quote</a>
        </div>
    </header>

    <!-- Page Header -->
    <section class="page-header w-full pt-32 pb-16">
        <div class="container mx-auto px-4">
            <div class="flex flex-col items-center text-center">
                <div class="inline-flex items-center mb-4">
                    <a href="index.php" class="text-white/80 hover:text-white transition-colors">Home</a>
                    <i class="ri-arrow-right-s-line mx-2 text-white/80"></i>
                    <span class="text-white font-medium">Contact Us</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
                <p class="text-xl text-white/90 max-w-2xl">We're here to answer any questions about our services</p>
            </div>
        </div>
    </section>

    <!-- Contact Info Bar -->
    <section class="bg-white shadow-md py-4 mb-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap justify-center md:justify-between items-center gap-6">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="ri-phone-line text-[#009FE3]"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-gray-500">Call Us Today</p>
                        <p class="text-base font-medium">+256 7844 64754</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="ri-mail-line text-[#009FE3]"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-gray-500">Email Us</p>
                        <p class="text-base font-medium">info@afridropsolutions.com</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="ri-time-line text-[#009FE3]"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-gray-500">Working Hours</p>
                        <p class="text-base font-medium">Mon-Fri: 8:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Contact Section -->
    <section class="contact-section" style="background-color: var(--background-alt); padding: var(--spacing-4xl) 0;">
        <div class="container contact-section__container">
            <div class="contact-section__content">
                <!-- Contact Information -->
                <div class="contact-info">
                    <h2 class="contact-info__title">Get in Touch</h2>
                    <p class="contact-info__subtitle">Have questions about our services or want to schedule a consultation? Reach out to us using any of the methods below, and our team will get back to you as soon as possible.</p>
                    
                    <!-- Contact Details -->
                    <div class="contact-details">
                        <!-- Location -->
                        <div class="contact-item">
                            <div class="contact-item__icon">
                                <i class="ri-map-pin-line"></i>
                            </div>
                            <div class="contact-item__content">
                                <h3 class="contact-item__title">Our Location</h3>
                                <p class="contact-item__text">Plot 67b, Spring Road Bugolobi, Kisabye</p>
                                <p class="contact-item__text">Complex, P.O Box 72312 Kampala</p>
                            </div>
                        </div>
                        
                        <!-- Phone -->
                        <div class="contact-item">
                            <div class="contact-item__icon">
                                <i class="ri-phone-line"></i>
                            </div>
                            <div class="contact-item__content">
                                <h3 class="contact-item__title">Phone Numbers</h3>
                                <p class="contact-item__text">+256 7844 64754</p>
                                <p class="contact-item__text">+256 7527 737779</p>
                            </div>
                        </div>
                        
                        <!-- Email -->
                        <div class="contact-item">
                            <div class="contact-item__icon">
                                <i class="ri-mail-line"></i>
                            </div>
                            <div class="contact-item__content">
                                <h3 class="contact-item__title">Email Addresses</h3>
                                <p class="contact-item__text">sales@afridropsolutions.com</p>
                                <p class="contact-item__text">Info@afridropsolutions.com</p>
                            </div>
                        </div>
                        
                        <!-- Business Hours -->
                        <div class="contact-item">
                            <div class="contact-item__icon">
                                <i class="ri-time-line"></i>
                            </div>
                            <div class="contact-item__content">
                                <h3 class="contact-item__title">Business Hours</h3>
                                <p class="contact-item__text">Mon-Fri: 8:00 AM - 6:00 PM</p>
                                <p class="contact-item__text">Sat: 9:00 AM - 2:00 PM</p>
                                <p class="contact-item__text">Sun: Closed</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Media -->
                    <div class="contact-social">
                        <h3 class="contact-social__title">Follow Us</h3>
                        <div class="contact-social__links">
                            <a href="#" class="contact-social__link" aria-label="Facebook">
                                <i class="ri-facebook-fill"></i>
                            </a>
                            <a href="#" class="contact-social__link" aria-label="Twitter">
                                <i class="ri-twitter-fill"></i>
                            </a>
                            <a href="#" class="contact-social__link" aria-label="Instagram">
                                <i class="ri-instagram-fill"></i>
                            </a>
                            <a href="#" class="contact-social__link" aria-label="LinkedIn">
                                <i class="ri-linkedin-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Contact Form -->
                <div class="contact-form">
                    <div class="contact-form__header">
                        <h3 class="contact-form__title">Send Us a Message</h3>
                        <p class="contact-form__subtitle">Fill out the form below and we'll get back to you soon</p>
                    </div>
                    
                    <form id="contactForm" action="php/mailer.php" method="POST" class="form">
                        <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
                        
                        <!-- Name -->
                        <div class="form-group">
                            <label for="name" class="form-label">Your Name</label>
                            <input type="text" id="name" name="name" required class="form-input">
                        </div>
                        
                        <!-- Email -->
                        <div class="form-group">
                            <label for="email" class="form-label">Your Email</label>
                            <input type="email" id="email" name="email" required class="form-input">
                        </div>
                        
                        <!-- Phone -->
                        <div class="form-group">
                            <label for="phone" class="form-label">Phone Number</label>
                            <input type="tel" id="phone" name="phone" class="form-input">
                        </div>
                        
                        <!-- Subject -->
                        <div class="form-group">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" id="subject" name="subject" required class="form-input">
                        </div>
                        
                        <!-- Message -->
                        <div class="form-group">
                            <label for="message" class="form-label">Message</label>
                            <textarea id="message" name="message" rows="5" required class="form-textarea"></textarea>
                        </div>
                        
                        <!-- Privacy Consent -->
                        <div class="form-checkbox">
                            <input type="checkbox" id="privacy" name="privacy_consent" required class="form-checkbox__input">
                            <label for="privacy" class="form-checkbox__label">I agree to the <a href="#" class="form-link">privacy policy</a> and consent to being contacted regarding my inquiry.</label>
                        </div>
                        
                        <!-- Submit Button -->
                        <button type="submit" class="btn btn--primary btn--full">
                            Send Message
                        </button>
                        
                        <div class="form-response" aria-live="polite"></div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="h-[450px]">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7575349598903!2d32.6167!3d0.3167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8080000001%3A0x7d0a40269ed13e49!2sBugolobi%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1636550000000!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our services and processes</p>
            </div>
            
            <div class="max-w-3xl mx-auto">
                <div class="space-y-4">
                    <!-- FAQ Item 1 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-toggle w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-[#009FE3] transition-colors focus:outline-none">
                            <span>What areas do you service in Uganda?</span>
                            <i class="ri-arrow-down-s-line text-[#009FE3] transition-transform duration-300"></i>
                        </button>
                        <div class="faq-content hidden px-4 pb-4 pt-0">
                            <p class="text-gray-600">We provide our swimming pool services throughout Kampala and surrounding areas. For clients in other regions of Uganda, we can arrange service visits with additional travel charges. Contact us for specific information about service availability in your area.</p>
                        </div>
                    </div>
                    
                    <!-- FAQ Item 2 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-toggle w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-[#009FE3] transition-colors focus:outline-none">
                            <span>How much does a swimming pool construction cost?</span>
                            <i class="ri-arrow-down-s-line text-[#009FE3] transition-transform duration-300"></i>
                        </button>
                        <div class="faq-content hidden px-4 pb-4 pt-0">
                            <p class="text-gray-600">Swimming pool construction costs vary widely depending on size, materials, features, and site conditions. Our residential pools typically start from UGX 50 million, while commercial projects have different pricing structures. We provide detailed quotes after an initial consultation and site assessment.</p>
                        </div>
                    </div>
                    
                    <!-- FAQ Item 3 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-toggle w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-[#009FE3] transition-colors focus:outline-none">
                            <span>How often should I service my swimming pool?</span>
                            <i class="ri-arrow-down-s-line text-[#009FE3] transition-transform duration-300"></i>
                        </button>
                        <div class="faq-content hidden px-4 pb-4 pt-0">
                            <p class="text-gray-600">Regular maintenance is essential for pool health. We recommend weekly chemical treatments and cleaning, monthly equipment checks, and quarterly comprehensive servicing. We offer maintenance packages tailored to your specific pool needs and usage patterns.</p>
                        </div>
                    </div>
                    
                    <!-- FAQ Item 4 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-toggle w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-[#009FE3] transition-colors focus:outline-none">
                            <span>Do you offer emergency repair services?</span>
                            <i class="ri-arrow-down-s-line text-[#009FE3] transition-transform duration-300"></i>
                        </button>
                        <div class="faq-content hidden px-4 pb-4 pt-0">
                            <p class="text-gray-600">Yes, we provide emergency repair services for critical issues like leaks, pump failures, or water quality problems. Our emergency response team is available 7 days a week. Additional charges may apply for after-hours or weekend emergency calls.</p>
                        </div>
                    </div>
                    
                    <!-- FAQ Item 5 -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button class="faq-toggle w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-[#009FE3] transition-colors focus:outline-none">
                            <span>What payment methods do you accept?</span>
                            <i class="ri-arrow-down-s-line text-[#009FE3] transition-transform duration-300"></i>
                        </button>
                        <div class="faq-content hidden px-4 pb-4 pt-0">
                            <p class="text-gray-600">We accept multiple payment methods including bank transfers, mobile money, credit/debit cards, and cash payments. For large projects, we typically work with a payment schedule tied to project milestones. Contact our office for specific payment arrangement details.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-[#009FE3] to-[#0054A6] text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="CTA-h2 text-3xl font-bold mb-4">Ready to Transform Your Swimming Pool Experience?</h2>
            <p class="CTA-p">Contact us today for a free consultation and quote</p>
            <div class="cta-button-container">
                <a href="tel:+256784464754" class="cta-btn cta-btn--primary">Call Us Now</a>
                <a href="services.php" class="cta-btn cta-btn--secondary">Explore Our Services</a>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
        <div class="container">
            <div class="newsletter__content">
                <h2 class="newsletter__title">Subscribe to Our Newsletter</h2>
                <p class="newsletter__description">Stay updated with our latest services, promotions, and pool maintenance tips</p>
                
                <form class="newsletter-form" id="newsletterForm" action="php/newsletter.php" method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
                    <div class="newsletter-form__group">
                        <input type="email" id="newsletter-email" name="email" class="newsletter-form__input" placeholder="Your email address" required>
                        <button type="submit" class="btn btn--primary newsletter-form__submit">Subscribe</button>
                    </div>
                    <div class="newsletter-form__response" aria-live="polite"></div>
                </form>
            </div>
        </div>
    </section>
    

    <!-- Footer -->
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
                    <img src="assets/Images/mobilemoney.png" alt="Credit Card Icon" width="50" height="50" loading="lazy">
                        
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


    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Afridrop Solutions Limited",
        "url": "https://www.afridrop.com",
        "logo": "https://www.afridrop.com/assets/Images/logo_Afridrop_Solutions.png",
        "description": "Uganda's premier swimming pool construction, maintenance, and water treatment provider.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot 67b, Spring Road Bugolobi, Kisabye Complex",
            "postalCode": "P.O Box 72312",
            "addressLocality": "Kampala",
            "addressRegion": "Central",
            "addressCountry": "Uganda"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+256-7844-64754",
            "contactType": "customer service",
            "email": "support@afridropsolutions.Com"
        },
        "sameAs": [
            "https://www.facebook.com/afridrop",
            "https://www.twitter.com/afridrop",
            "https://www.instagram.com/afridrop",
            "https://www.linkedin.com/company/afridrop"
        ]
    }
    </script>

    <!-- Scripts -->
    <script src="js/main.js" defer></script>
</body>
</html>