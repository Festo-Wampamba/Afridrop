<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Afridrop Solutions Limited - Our Services</title> 
    <script src="https://cdn.tailwindcss.com/3.4.16"></script> 
    <script>tailwind.config={theme:{extend:{colors:{primary:'#009FE3',secondary:'#0054A6'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}</script> 
    <link rel="preconnect" href="https://fonts.googleapis.com"> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"> 
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css">
    <!-- <link rel="stylesheet" href="css/styles.css"> -->
    <link rel="stylesheet" href="css/services.css"> 
</head> 
<body class="bg-gray-50"> 
<!-- Header --> 
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
                    <li class="nav__item"><a href="services.php" class="nav__link nav__link--active">Services</a></li>
                    <li class="nav__item"><a href="gallery.php" class="nav__link">Gallery</a></li>
                    <li class="nav__item"><a href="blog.php" class="nav__link">Blog</a></li>
                    <li class="nav__item"><a href="contact.php" class="nav__link">Contact</a></li>
                </ul> 
            </nav>
            <a href="contact.php" class="quote-button">Get a Quote</a>
        </div> 
    </header> 
 
<!-- Page Header --> 
<section class="page-header w-full pt-32 pb-16"> 
    <div class="container mx-auto px-4"> 
        <div class="flex flex-col items-center text-center"> 
            <div class="inline-flex items-center mb-4"> 
                <a href="index.php" class="text-white/80 hover:text-white transition-colors">Home</a> 
                <i class="ri-arrow-right-s-line mx-2 text-white/80"></i> 
                <span class="text-white font-medium">Services</span> 
            </div> 
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1> 
            <p class="text-xl text-white/90 max-w-2xl">Professional Pool Solutions for Every Need</p> 
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

<!-- Service Categories Section --> 
<section class="py-16 bg-white"> 
    <div class="container mx-auto px-4"> 
        <div class="flex flex-col md:flex-row justify-between items-center mb-12"> 
            <h2 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Comprehensive Pool Services</h2> 
            <a href="contact.php" class="bg-[#009FE3] text-white px-6 py-3 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors">Request a Quote</a> 
        </div> 
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"> 
            <!-- Pool Construction --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="construction"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/PoolConstruction.webp" alt="Pool Construction" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Pool Construction</h3> 
                    <p class="text-gray-600 mb-4">Our expert team designs and builds custom swimming pools for residential and commercial properties.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Custom pool design</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Concrete and fiberglass options</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Infinity edge and lap pools</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Complete landscaping integration</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div> 
            
            <!-- Pool Renovation --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="renovation"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/Water_Treatment.webp" alt="Pool Renovation" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Pool Renovation</h3> 
                    <p class="text-gray-600 mb-4">Transform your existing pool with our comprehensive renovation services.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Surface resurfacing</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Tile replacement</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Deck renovation</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Equipment upgrades</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div> 
            
            <!-- Pool Maintenance --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="maintenance"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/fixingPump.webp" alt="Pool Maintenance" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Pool Maintenance</h3> 
                    <p class="text-gray-600 mb-4">Keep your pool in perfect condition with our regular maintenance services.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Water testing and balancing</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Skimming and vacuuming</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Filter cleaning</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Equipment inspection</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div> 
            
            <!-- Water Treatment --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="treatment"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/waterTreatment.png" alt="Water Treatment" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Water Treatment</h3> 
                    <p class="text-gray-600 mb-4">Our professional water treatment services ensure your pool water is clean and safe.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Chemical balancing</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Algae prevention and treatment</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Sanitization systems</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Water quality testing</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div>
            
            <!-- Equipment Installation --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="equipment"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/equipmentInstallation.webp" alt="Equipment Installation" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Equipment Installation</h3> 
                    <p class="text-gray-600 mb-4">We supply and install high-quality pool equipment from leading manufacturers.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Pump and filter installation</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Heating systems</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Automation and controls</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Lighting systems</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div> 
            
            <!-- Chemical Supply --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="chemicals"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/chemicalStore.webp" alt="Chemical Supply" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Chemical Supply</h3> 
                    <p class="text-gray-600 mb-4">We provide a full range of pool chemicals to keep your water crystal clear.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Chlorine and sanitizers</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>pH adjusters</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Algaecides</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Specialty chemicals</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div> 
            
            <!-- Pool Cleaning --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="cleaning"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/cleaning2.webp" alt="Pool Cleaning" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Pool Cleaning</h3> 
                    <p class="text-gray-600 mb-4">Our thorough cleaning services keep your pool sparkling clean and inviting.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Surface skimming</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Vacuuming and brushing</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Tile and grout cleaning</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Deck washing</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div> 
            
            <!-- Inspection Services --> 
            <div class="service-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200" id="inspection"> 
                <div class="h-48 overflow-hidden"> 
                    <img src="assets/Images/inspection.webp" alt="Inspection Services" class="w-full h-full object-cover transition-transform duration-500" loading="lazy"> 
                </div> 
                <div class="p-6 flex flex-col h-full"> 
                    <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Inspection Services</h3> 
                    <p class="text-gray-600 mb-4">Our comprehensive inspection services identify potential issues before they become major problems.</p> 
                    <ul class="mb-6 flex-grow"> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Equipment diagnostics</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Leak detection</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Structural assessment</span> 
                        </li> 
                        <li class="flex items-start mb-2"> 
                            <i class="ri-check-line text-[#009FE3] mr-2 mt-1"></i> 
                            <span>Safety compliance checks</span> 
                        </li> 
                    </ul> 
                    <a href="contact.php" class="bg-[#009FE3] text-white px-5 py-2 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors text-center">Get Started</a> 
                </div> 
            </div>
        </div> 
    </div> 
</section>

<!-- Service Team Image Section --> 
<section class="relative py-24 bg-cover bg-center my-12" style="background-image: linear-gradient(to right, rgba(0, 159, 227, 0.85), rgba(0, 84, 166, 0.85)), url('assets/Images/FixingPumpRoom.jpg');"> 
    <div class="container mx-auto px-4 relative z-10"> 
        <div class="max-w-3xl mx-auto text-center text-white"> 
            <h2 class="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md text-white" >Expert Pool Equipment Specialists</h2> 
            <p class="text-lg md:text-xl mb-8 text-white/90">Our team of certified technicians ensures your pool equipment operates at peak efficiency, extending its lifespan and reducing maintenance costs.</p> 
            <a href="contact.php" class="inline-block bg-white text-[#009FE3] px-6 py-3 rounded-button font-medium hover:bg-white/90 transition-colors shadow-md hover:shadow-lg hover:-translate-y-1 transform duration-300">Schedule a Service</a> 
        </div> 
    </div> 
</section>

<!-- Service Process Section --> 
<section class="py-16 bg-white"> 
    <div class="container mx-auto px-4"> 
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-4">Our Service Process</h2> 
        <p class="text-gray-600 text-center max-w-3xl mx-auto mb-12">We follow a structured approach to ensure quality and satisfaction with every project.</p> 
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300"> 
                <div class="w-12 h-12 bg-[#009FE3] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div> 
                <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Consultation</h3> 
                <p class="text-gray-600">We discuss your needs and provide expert recommendations</p> 
            </div> 
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300"> 
                <div class="w-12 h-12 bg-[#009FE3] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div> 
                <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Proposal</h3> 
                <p class="text-gray-600">We create a detailed plan and quote for your approval</p> 
            </div> 
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300"> 
                <div class="w-12 h-12 bg-[#009FE3] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div> 
                <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Execution</h3> 
                <p class="text-gray-600">Our team completes the work with precision and care</p> 
            </div> 
            
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:-translate-y-2 transition-transform duration-300"> 
                <div class="w-12 h-12 bg-[#009FE3] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div> 
                <h3 class="text-xl font-semibold text-[#0054A6] mb-2">Follow-up</h3> 
                <p class="text-gray-600">We ensure your complete satisfaction with the results</p> 
            </div> 
        </div> 
    </div> 
</section>

<!-- Testimonials Section --> 
<section class="testimonials py-16 bg-gray-100" id="testimonials"> 
    <div class="container mx-auto px-4"> 
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-4">Client Testimonials</h2> 
        <p class="text-gray-600 text-center max-w-3xl mx-auto mb-12">Hear what our satisfied customers have to say about our pool services.</p> 
        
        <div class="testimonial-slider relative max-w-4xl mx-auto"> 
            <!-- Testimonial Slide 1 --> 
            <div class="testimonial-slide active"> 
                <div class="testimonial bg-white p-8 rounded-lg shadow-lg text-center"> 
                    <div class="testimonial__rating mb-6"> 
                        <div class="star-rating flex justify-center gap-1"> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                        </div> 
                    </div> 
                    <p class="testimonial__text text-gray-600 italic mb-8 text-lg leading-relaxed">"Afridrop Solutions transformed our outdated pool into a modern oasis. Their attention to detail and professionalism throughout the renovation process was impressive. We couldn't be happier with the results!"</p> 
                    <div class="testimonial__author flex items-center justify-center"> 
                        <img src="assets/Images/testimonial.webp" alt="User Icon" width="48" height="48" loading="lazy" class="testimonial__author-image w-12 h-12 rounded-full mr-4"> 
                        <div class="testimonial__author-info text-left"> 
                            <h3 class="testimonial__author-name font-semibold text-[#0054A6]">Sarah Nakimuli</h3> 
                            <p class="testimonial__author-title text-sm text-gray-500">Homeowner, Kampala</p> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            
            <!-- Testimonial Slide 2 --> 
            <div class="testimonial-slide"> 
                <div class="testimonial bg-white p-8 rounded-lg shadow-lg text-center"> 
                    <div class="testimonial__rating mb-6"> 
                        <div class="star-rating flex justify-center gap-1"> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--empty w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                        </div> 
                    </div> 
                    <p class="testimonial__text text-gray-600 italic mb-8 text-lg leading-relaxed">"We've been using Afridrop's maintenance services for our hotel pool for over two years now. Their team is reliable, thorough, and always ensures our pool is in perfect condition for our guests. Highly recommended!"</p> 
                    <div class="testimonial__author flex items-center justify-center"> 
                        <img src="assets/Images/testimonial1.webp" alt="User Icon" width="48" height="48" loading="lazy" class="testimonial__author-image w-12 h-12 rounded-full mr-4"> 
                        <div class="testimonial__author-info text-left"> 
                            <h3 class="testimonial__author-name font-semibold text-[#0054A6]">David Mukasa</h3> 
                            <p class="testimonial__author-title text-sm text-gray-500">Hotel Manager, Entebbe</p> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            
            <!-- Testimonial Slide 3 --> 
            <div class="testimonial-slide"> 
                <div class="testimonial bg-white p-8 rounded-lg shadow-lg text-center"> 
                    <div class="testimonial__rating mb-6"> 
                        <div class="star-rating flex justify-center gap-1"> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--half w-5 h-5" viewBox="0 0 24 24"> 
                                <defs> 
                                    <linearGradient id="half-fill"> 
                                        <stop offset="50%" stop-color="currentColor"/> 
                                        <stop offset="50%" stop-color="transparent"/> 
                                    </linearGradient> 
                                </defs> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half-fill)" stroke="currentColor"/> 
                            </svg> 
                            <svg class="star star--empty w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                        </div> 
                    </div> 
                    <p class="testimonial__text text-gray-600 italic mb-8 text-lg leading-relaxed">"From design to completion, Afridrop Solutions exceeded our expectations with our new pool construction. Their team was knowledgeable, efficient, and delivered exactly what they promised. The pool has become the centerpiece of our home!"</p> 
                    <div class="testimonial__author flex items-center justify-center"> 
                        <img src="assets/Images/testimonial1.webp" alt="User Icon" width="48" height="48" loading="lazy" class="testimonial__author-image w-12 h-12 rounded-full mr-4"> 
                        <div class="testimonial__author-info text-left"> 
                            <h3 class="testimonial__author-name font-semibold text-[#0054A6]">Robert Kigozi</h3> 
                            <p class="testimonial__author-title text-sm text-gray-500">Resort Owner, Jinja</p> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            
            <!-- Testimonial Slide 4 --> 
            <div class="testimonial-slide"> 
                <div class="testimonial bg-white p-8 rounded-lg shadow-lg text-center"> 
                    <div class="testimonial__rating mb-6"> 
                        <div class="star-rating flex justify-center gap-1"> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                        </div> 
                    </div> 
                    <p class="testimonial__text text-gray-600 italic mb-8 text-lg leading-relaxed">"The chemical supply and water treatment services from Afridrop have kept our community pool crystal clear all season. Their expertise in water chemistry is unmatched, and their staff is always helpful with advice."</p> 
                    <div class="testimonial__author flex items-center justify-center"> 
                        <img src="assets/Images/Manger.webp" alt="User Icon" width="48" height="48" loading="lazy" class="testimonial__author-image w-12 h-12 rounded-full mr-4"> 
                        <div class="testimonial__author-info text-left"> 
                            <h3 class="testimonial__author-name font-semibold text-[#0054A6]">Grace Namutebi</h3> 
                            <p class="testimonial__author-title text-sm text-gray-500">Community Manager, Mbarara</p> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            
            <!-- Testimonial Slide 5 --> 
            <div class="testimonial-slide"> 
                <div class="testimonial bg-white p-8 rounded-lg shadow-lg text-center"> 
                    <div class="testimonial__rating mb-6"> 
                        <div class="star-rating flex justify-center gap-1"> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--filled w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                            <svg class="star star--empty w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"> 
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
                            </svg> 
                        </div> 
                    </div> 
                    <p class="testimonial__text text-gray-600 italic mb-8 text-lg leading-relaxed">"Afridrop's equipment installation service was top-notch. They upgraded our old filtration system with modern, energy-efficient equipment. The difference in water quality and operating costs has been remarkable."</p> 
                    <div class="testimonial__author flex items-center justify-center"> 
                        <img src="assets/Images/testimonial2.webp" alt="User Icon" width="48" height="48" loading="lazy" class="testimonial__author-image w-12 h-12 rounded-full mr-4"> 
                        <div class="testimonial__author-info text-left"> 
                            <h3 class="testimonial__author-name font-semibold text-[#0054A6]">Michael Ssebunya</h3> 
                            <p class="testimonial__author-title text-sm text-gray-500">Facility Manager, Mukono</p> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            
            <!-- Navigation Controls --> 
            <div class="testimonial-controls flex justify-center items-center mt-8 gap-4"> 
                <button class="testimonial-control testimonial-control--prev bg-[#009FE3] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#009FE3]/90 transition-colors" aria-label="Previous testimonial"> 
                    <i class="ri-arrow-left-s-line text-xl"></i> 
                </button> 
                <div class="testimonial-indicators flex gap-2"> 
                    <button class="testimonial-indicator active w-3 h-3 rounded-full bg-[#009FE3] transition-colors" aria-label="Go to testimonial 1" data-slide="0"></button> 
                    <button class="testimonial-indicator w-3 h-3 rounded-full bg-gray-300 hover:bg-[#009FE3] transition-colors" aria-label="Go to testimonial 2" data-slide="1"></button> 
                    <button class="testimonial-indicator w-3 h-3 rounded-full bg-gray-300 hover:bg-[#009FE3] transition-colors" aria-label="Go to testimonial 3" data-slide="2"></button> 
                    <button class="testimonial-indicator w-3 h-3 rounded-full bg-gray-300 hover:bg-[#009FE3] transition-colors" aria-label="Go to testimonial 4" data-slide="3"></button> 
                    <button class="testimonial-indicator w-3 h-3 rounded-full bg-gray-300 hover:bg-[#009FE3] transition-colors" aria-label="Go to testimonial 5" data-slide="4"></button> 
                </div> 
                <button class="testimonial-control testimonial-control--next bg-[#009FE3] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#009FE3]/90 transition-colors" aria-label="Next testimonial"> 
                    <i class="ri-arrow-right-s-line text-xl"></i> 
                </button> 
            </div> 
        </div> 
    </div> 
</section>

<!-- FAQ Section --> 
<section class="py-16 bg-white" id="faq"> 
    <div class="container mx-auto px-4"> 
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-4">Frequently Asked Questions</h2> 
        <p class="text-gray-600 text-center max-w-3xl mx-auto mb-12">Find answers to common questions about our pool services and maintenance.</p> 
        
        <div class="max-w-3xl mx-auto space-y-4"> 
            <div class="border border-gray-200 rounded-lg overflow-hidden"> 
                <button class="flex justify-between items-center w-full p-4 text-left font-semibold text-[#0054A6] hover:bg-gray-50 transition-colors" onclick="toggleFaq(this)"> 
                    <span>How often should I service my pool equipment?</span> 
                    <i class="ri-add-line text-[#009FE3] text-xl"></i> 
                </button> 
                <div class="hidden p-4 pt-0 text-gray-600"> 
                    <p>We recommend professional equipment servicing at least twice a year, ideally at the beginning and end of the swimming season. Regular maintenance checks can prevent costly repairs and extend the life of your equipment.</p> 
                </div> 
            </div> 
            
            <div class="border border-gray-200 rounded-lg overflow-hidden"> 
                <button class="flex justify-between items-center w-full p-4 text-left font-semibold text-[#0054A6] hover:bg-gray-50 transition-colors" onclick="toggleFaq(this)"> 
                    <span>What does regular pool maintenance include?</span> 
                    <i class="ri-add-line text-[#009FE3] text-xl"></i> 
                </button> 
                <div class="hidden p-4 pt-0 text-gray-600"> 
                    <p>Our regular maintenance service includes water testing and balancing, skimming the surface, vacuuming the pool floor, brushing walls and tiles, emptying skimmer and pump baskets, checking and adjusting equipment, and ensuring proper sanitizer levels.</p> 
                </div> 
            </div> 
            
            <div class="border border-gray-200 rounded-lg overflow-hidden"> 
                <button class="flex justify-between items-center w-full p-4 text-left font-semibold text-[#0054A6] hover:bg-gray-50 transition-colors" onclick="toggleFaq(this)"> 
                    <span>How long does it take to build a pool?</span> 
                    <i class="ri-add-line text-[#009FE3] text-xl"></i> 
                </button> 
                <div class="hidden p-4 pt-0 text-gray-600"> 
                    <p>The timeline for pool construction varies depending on the size, complexity, and type of pool. Generally, a standard residential pool takes between 8-12 weeks from excavation to completion. Factors like weather, permits, and customizations can affect this timeline.</p> 
                </div> 
            </div> 
            
            <div class="border border-gray-200 rounded-lg overflow-hidden"> 
                <button class="flex justify-between items-center w-full p-4 text-left font-semibold text-[#0054A6] hover:bg-gray-50 transition-colors" onclick="toggleFaq(this)"> 
                    <span>What's the best type of pool for my property?</span> 
                    <i class="ri-add-line text-[#009FE3] text-xl"></i> 
                </button> 
                <div class="hidden p-4 pt-0 text-gray-600"> 
                    <p>The best pool type depends on your budget, space, soil conditions, and intended use. Concrete pools offer unlimited customization but cost more, while fiberglass pools install quickly and require less maintenance. We provide free consultations to help determine the best option for your specific situation.</p> 
                </div> 
            </div> 
        </div> 
    </div> 
</section>

<!-- CTA Section --> 
<section class="py-16 bg-cover bg-center" style="background-image: linear-gradient(to right, rgba(0, 159, 227, 0.9), rgba(0, 84, 166, 0.9)), url('assets/Images/PoolHero.jpg');"> 
    <div class="container mx-auto px-4"> 
        <div class="text-center text-white"> 
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Pool Experience?</h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto">Contact us today for a free consultation and quote</p> 
            <div class="flex flex-col sm:flex-row justify-center gap-4"> 
                <a href="contact.php" class="bg-white text-[#009FE3] px-6 py-3 rounded-button font-medium hover:bg-white/90 transition-colors shadow-md">Get a Quote</a> 
                <a href="tel:+256784464754" class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-button font-medium hover:bg-white/10 transition-colors">Call Us: +256 7844 64754</a> 
            </div> 
        </div> 
    </div> 
</section>

<!-- Contact Us Section --> 
<section class="py-16 bg-white" id="contact"> 
    <div class="container mx-auto px-4"> 
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12"> 
            <div> 
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2> 
                <ul class="space-y-6"> 
                    <li class="flex"> 
                        <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"> 
                            <i class="ri-map-pin-line text-[#009FE3]"></i> 
                        </div> 
                        <div class="ml-4"> 
                            <span class="block text-gray-700">Plot 67b, Spring Road Bugolobi, Kisabye<br>Complex Room 112, P.O Box 72312 Kampala.</span> 
                        </div> 
                    </li> 
                    <li class="flex"> 
                        <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"> 
                            <i class="ri-phone-line text-[#009FE3]"></i> 
                        </div> 
                        <div class="ml-4"> 
                            <span class="block text-gray-700">+256 7844 64754<br>+256 7527 737779</span> 
                        </div> 
                    </li> 
                    <li class="flex"> 
                        <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"> 
                            <i class="ri-mail-line text-[#009FE3]"></i> 
                        </div> 
                        <div class="ml-4"> 
                            <span class="block text-gray-700">Support@afridropSolutions.com<br>Info@afridropSolutions.com</span> 
                        </div> 
                    </li> 
                    <li class="flex"> 
                        <div class="w-10 h-10 bg-[#009FE3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"> 
                            <i class="ri-time-line text-[#009FE3]"></i> 
                        </div> 
                        <div class="ml-4"> 
                            <span class="block text-gray-700">Mon-Fri: 8:00 AM - 6:00 PM<br>Sat: 9:00 AM - 2:00 PM<br>Sun: Closed</span> 
                        </div> 
                    </li> 
                </ul> 
            </div> 
            
            <div> 
                <h3 class="text-2xl font-semibold text-[#0054A6] mb-6">Send Us a Message</h3> 
                <form action="php/mailer.php" method="post"> 
                    <div class="mb-4"> 
                        <label for="name" class="block text-gray-700 font-medium mb-2">Your Name</label> 
                        <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 focus:border-[#009FE3]" required> 
                    </div> 
                    <div class="mb-4"> 
                        <label for="email" class="block text-gray-700 font-medium mb-2">Your Email</label> 
                        <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 focus:border-[#009FE3]" required> 
                    </div> 
                    <div class="mb-4"> 
                        <label for="phone" class="block text-gray-700 font-medium mb-2">Phone Number</label> 
                        <input type="tel" id="phone" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 focus:border-[#009FE3]"> 
                    </div> 
                    <div class="mb-6"> 
                        <label for="message" class="block text-gray-700 font-medium mb-2">Message</label> 
                        <textarea id="message" name="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 focus:border-[#009FE3]" required></textarea> 
                    </div> 
                    <button type="submit" class="bg-[#009FE3] text-white px-6 py-3 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors">Send Message</button> 
                </form> 
            </div> 
        </div> 
    </div> 
</section>

<!-- Map Section --> 
<section class="h-[450px]">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7575349598903!2d32.6167!3d0.3167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8080000001%3A0x7d0a40269ed13e49!2sBugolobi%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1636550000000!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>

<!-- Newsletter Section --> 
<section class="py-16 bg-gray-100"> 
    <div class="container mx-auto px-4"> 
        <div class="max-w-3xl mx-auto text-center"> 
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2> 
            <p class="text-gray-600 mb-8">Stay updated with our latest services, promotions, and pool care tips</p> 
            <form action="php/newsletter.php" method="post" class="flex flex-col sm:flex-row gap-4 justify-center"> 
                <input type="email" name="email" placeholder="Your email address" class="flex-grow px-4 py-3 border border-gray-300 rounded-button focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 focus:border-[#009FE3]" required> 
                <button type="submit" class="bg-[#009FE3] text-white px-6 py-3 rounded-button font-medium hover:bg-[#009FE3]/90 transition-colors whitespace-nowrap">Subscribe</button> 
            </form> 
        </div> 
    </div> 
</section>

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
    "@context": "https://schema.com", 
    "@type": "Company", 
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
        "email": "info@afridropsolutions.com" 
    }, 
    "sameAs": [ 
        "https://www.facebook.com/afridropsl", 
        "https://www.twitter.com/afridropsl", 
        "https://www.instagram.com/afridropsl", 
        "https://www.linkedin.com/company/afridropsl" 
    ] 
} 
</script>

<!-- Scripts --> 
<script>
// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// FAQ toggle function
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.remove('ri-add-line');
        icon.classList.add('ri-subtract-line');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('ri-subtract-line');
        icon.classList.add('ri-add-line');
    }
}
</script>
<script src="js/main.js" defer></script>
</body> 
</html>