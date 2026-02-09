<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Gallery - Afridrop Solutions Limited</title>
    <meta name="description" content="Explore our portfolio of swimming pool projects including construction, renovation, and maintenance work across Uganda.">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/gallery.css">
    <!-- Preload critical assets -->
    <link rel="preload" href="assets/Images/logo_Afridrop_Solutions.png" as="image">
    <link rel="preload" href="assets/Images/PoolHero.jpg" as="image">
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
                    <li class="nav__item"><a href="gallery.php" class="nav__link nav__link--active">Gallery</a></li>
                    <li class="nav__item"><a href="blog.php" class="nav__link">Blog</a></li>
                    <li class="nav__item"><a href="contact.php" class="nav__link">Contact</a></li>
                </ul>
            </nav>
            <a href="contact.php" class="btn btn--primary header__cta">Get a Quote</a>
        </div>
    </header>

    <main>
        <!-- Page Hero -->
        <section class="page-hero gallery-hero">
            <div class="container">
                <div class="breadcrumb">
                    <a class="breadcrumb__link" href="index.php">Home</a>
                    <i class="ri-arrow-right-s-line"> > </i>
                    <span>Gallery</span>
                </div>
                <div class="page-hero__content">
                    <h1 class="page-hero__title">Our Project Gallery</h1>
                    <p class="page-hero__subtitle">Explore our portfolio of exceptional swimming pool projects</p>
                </div>
            </div>
        </section>

        <!-- Gallery Filter -->
        <section class="gallery-filter">
            <div class="container">
                <div class="gallery-filter__wrapper">
                    <button class="gallery-filter__button gallery-filter__button--active" data-filter="all">All Projects</button>
                    <button class="gallery-filter__button" data-filter="residential">Residential</button>
                    <button class="gallery-filter__button" data-filter="commercial">Commercial</button>
                    <button class="gallery-filter__button" data-filter="renovation">Renovation</button>
                    <button class="gallery-filter__button" data-filter="specialty">Specialty</button>
                </div>
            </div>
        </section>

        <!-- Gallery Grid -->
        <section class="gallery">
            <div class="container">
                <div class="gallery__grid">
                    <!-- Project 1 -->
                    <div class="gallery-item" data-category="residential">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/HomePool.webp" alt="Residential Family Pool" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-1" class="gallery-card__link" aria-label="View Residential Family Pool details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Residential Family Pool</h3>
                                <p class="gallery-card__location">Kampala, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-1" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Residential Family Pool</h2>
                                    <p class="project-modal__location">Kampala, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/HomePool.webp" alt="Residential Family Pool" class="project-modal__image">
                                    <!-- <img src="assets/Images/HeroPool_1.webp" alt="Residential Family Pool Additional View" class="project-modal__image"> -->
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Residential</li>
                                            <li><strong>Size:</strong> 8m x 4m</li>
                                            <li><strong>Depth:</strong> 1.2m - 1.8m</li>
                                            <li><strong>Features:</strong> LED lighting, heating system, salt chlorination</li>
                                            <li><strong>Completion:</strong> 2022</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This family-friendly swimming pool was designed for a residential property in Kampala. The client wanted a versatile pool that would be suitable for both family recreation and exercise.</p>
                                        <p>We incorporated gentle entry steps, energy-efficient LED lighting, and a state-of-the-art salt chlorination system that reduces chemical usage while providing crystal-clear water. The surrounding deck area was finished with non-slip natural stone pavers that complement the home's architecture.</p>
                                        <p>The project was completed in just 8 weeks, and the family has been enjoying their backyard oasis ever since.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 2 -->
                    <div class="gallery-item" data-category="commercial">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/CommercialResortPool.webp" alt="Commercial Resort Pool" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-2" class="gallery-card__link" aria-label="View Commercial Resort Pool details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Commercial Resort Pool</h3>
                                <p class="gallery-card__location">Entebbe, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-2" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Commercial Resort Pool</h2>
                                    <p class="project-modal__location">Entebbe, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/CommercialResortPool.webp" alt="Commercial Resort Pool" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Commercial</li>
                                            <li><strong>Size:</strong> 15m x 8m</li>
                                            <li><strong>Depth:</strong> 1.2m - 2.2m</li>
                                            <li><strong>Features:</strong> Beach entry, waterfall feature, underwater lighting, commercial filtration system</li>
                                            <li><strong>Completion:</strong> 2021</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This stunning resort pool was designed for a luxury hotel in Entebbe. The client required a centerpiece water feature that would impress guests while providing ample swimming space for multiple users.</p>
                                        <p>We designed a large freeform pool with a gentle beach entry, making it accessible for all guests. The natural stone waterfall creates a relaxing ambiance, while the commercial-grade filtration system ensures the water remains pristine despite heavy usage.</p>
                                        <p>The pool has become a signature attraction for the resort, with many guests specifically booking their stay to enjoy this exceptional amenity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 3 -->
                    <div class="gallery-item" data-category="specialty">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/InfintyLuxryPool.webp" alt="Infinity Luxury Pool" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-3" class="gallery-card__link" aria-label="View Infinity Luxury Pool details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Infinity Luxury Pool</h3>
                                <p class="gallery-card__location">Jinja, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-3" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Infinity Luxury Pool</h2>
                                    <p class="project-modal__location">Jinja, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/InfintyLuxryPool.webp" alt="Infinity Luxury Pool" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Specialty</li>
                                            <li><strong>Size:</strong> 12m x 5m</li>
                                            <li><strong>Depth:</strong> 1.4m - 1.8m</li>
                                            <li><strong>Features:</strong> Infinity edge, panoramic views, premium tiling, automated cover</li>
                                            <li><strong>Completion:</strong> 2023</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This breathtaking infinity pool was built for a luxury private residence overlooking the Nile River in Jinja. The client wanted a sophisticated swimming pool that would maximize the stunning views while providing a seamless visual connection with the river below.</p>
                                        <p>The infinity edge creates the illusion that the pool water extends to the horizon, blending with the river in the distance. We used premium Italian glass mosaic tiles that shimmer in various shades of blue, reflecting the changing colors of the sky throughout the day.</p>
                                        <p>The automated cover system ensures safety and reduces evaporation when the pool is not in use, while the advanced filtration and sanitation systems maintain exceptional water quality with minimal maintenance requirements.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 4 -->
                    <div class="gallery-item" data-category="residential">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/LapPoolInstallation1.webp" alt="Lap Pool Installation" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-4" class="gallery-card__link" aria-label="View Lap Pool Installation details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Lap Pool Installation</h3>
                                <p class="gallery-card__location">Mbarara, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-4" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Lap Pool Installation</h2>
                                    <p class="project-modal__location">Mbarara, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/LapPoolInstallation1.webp" alt="Lap Pool Installation" class="project-modal__image">
                                    <img src="assets/Images/LapPoolInstallation.webp" alt="Lap Pool Installation Additional View" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Residential</li>
                                            <li><strong>Size:</strong> 15m x 2.5m</li>
                                            <li><strong>Depth:</strong> 1.5m (constant)</li>
                                            <li><strong>Features:</strong> Lane markings, counter-current system, heating, automatic cover</li>
                                            <li><strong>Completion:</strong> 2022</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This specialized lap pool was designed for a client in Mbarara who is a competitive swimmer requiring a training facility at home. The narrow, elongated design optimizes the available space in the client's yard while providing the perfect environment for swim training.</p>
                                        <p>We installed a powerful counter-current system that allows the swimmer to swim in place against an adjustable current, effectively creating an "endless pool" experience. The constant depth and lane markings replicate competition conditions, while the heating system extends the swimming season throughout the year.</p>
                                        <p>The automatic cover system helps maintain water temperature and reduces maintenance when the pool is not in use. This project demonstrates our ability to create specialized swimming facilities tailored to specific athletic requirements.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 5 -->
                    <div class="gallery-item" data-category="specialty">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/NaturalBioPool.webp" alt="Natural Bio Pool" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-5" class="gallery-card__link" aria-label="View Natural Bio Pool details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Natural Bio Pool</h3>
                                <p class="gallery-card__location">Fort Portal, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-5" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Natural Bio Pool</h2>
                                    <p class="project-modal__location">Fort Portal, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/NaturalBioPool.webp" alt="Natural Bio Pool" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Specialty</li>
                                            <li><strong>Size:</strong> 10m x 8m (swimming zone) + 6m x 8m (regeneration zone)</li>
                                            <li><strong>Depth:</strong> 0.3m - 2.0m</li>
                                            <li><strong>Features:</strong> Natural filtration, aquatic plants, stone borders, wooden deck</li>
                                            <li><strong>Completion:</strong> 2023</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This innovative natural swimming pool was created for an eco-conscious client in Fort Portal. Unlike conventional pools that rely on chemicals for water purification, this bio pool uses a carefully designed ecosystem of aquatic plants and beneficial microorganisms to naturally filter and clean the water.</p>
                                        <p>The pool is divided into two zones: a swimming area with clear water and a regeneration zone filled with carefully selected aquatic plants that filter the water naturally. Water circulates between these zones through a subtle pump system, maintaining crystal clear water without chemicals.</p>
                                        <p>The natural stone borders and wooden deck integrate the pool seamlessly with the surrounding landscape, creating a truly organic water feature that supports local biodiversity while providing a chemical-free swimming experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 6 -->
                    <div class="gallery-item" data-category="residential">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/IndoorLuxuryPool.webp" alt="Indoor Luxury Pool" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-6" class="gallery-card__link" aria-label="View Indoor Luxury Pool details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Indoor Luxury Pool</h3>
                                <p class="gallery-card__location">Kampala, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-6" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Indoor Luxury Pool</h2>
                                    <p class="project-modal__location">Kampala, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/IndoorLuxuryPool.webp" alt="Indoor Luxury Pool" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Residential</li>
                                            <li><strong>Size:</strong> 9m x 4m</li>
                                            <li><strong>Depth:</strong> 1.3m - 1.7m</li>
                                            <li><strong>Features:</strong> Climate control, dehumidification system, underwater lighting, integrated spa</li>
                                            <li><strong>Completion:</strong> 2022</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This sophisticated indoor swimming pool was designed for a luxury residence in Kampala. The client wanted a year-round swimming facility that would provide privacy and comfort regardless of weather conditions.</p>
                                        <p>The project required careful engineering to manage humidity and air quality within the enclosed space. We installed a state-of-the-art dehumidification system and climate controls that maintain optimal conditions while being energy efficient.</p>
                                        <p>The pool features an integrated spa section with hydrotherapy jets, underwater LED lighting that can be programmed to change colors, and a sophisticated water purification system that minimizes chlorine usage while maintaining exceptional water clarity.</p>
                                        <p>The surrounding area includes non-slip marble decking, comfortable seating areas, and large windows that allow natural light while maintaining privacy. This project showcases our ability to create complex indoor aquatic environments that function flawlessly year-round.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 7 -->
                    <div class="gallery-item" data-category="renovation">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/Water_Treatment.webp" alt="Complete Pool Renovation" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-7" class="gallery-card__link" aria-label="View Complete Pool Renovation details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Complete Pool Renovation</h3>
                                <p class="gallery-card__location">Kampala, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-7" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Complete Pool Renovation</h2>
                                    <p class="project-modal__location">Kampala, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/Water_Treatment.webp" alt="Complete Pool Renovation" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Renovation</li>
                                            <li><strong>Size:</strong> 10m x 5m</li>
                                            <li><strong>Depth:</strong> 1.2m - 2.0m</li>
                                            <li><strong>Features:</strong> New tiling, updated filtration system, LED lighting, redesigned deck area</li>
                                            <li><strong>Completion:</strong> 2023</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This comprehensive renovation project transformed an aging, problematic swimming pool into a modern aquatic retreat. The original pool, built in the early 2000s, had developed significant leaks, outdated equipment, and worn finishes.</p>
                                        <p>Our renovation included repairing structural cracks, replacing the entire plumbing system, installing a modern filtration and sanitation system, and applying new waterproof membranes. We replaced the dated ceramic tiles with premium porcelain tiles in a contemporary blue gradient pattern.</p>
                                        <p>The surrounding deck area was completely redesigned with slip-resistant pavers, integrated drainage, and modern landscaping. New LED lighting was installed to enhance nighttime use and create ambiance.</p>
                                        <p>This project demonstrates our ability to breathe new life into existing pools, solving structural problems while updating aesthetics and functionality to modern standards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 8 -->
                    <div class="gallery-item" data-category="commercial">
                        <div class="gallery-card">
                            <div class="gallery-card__image-container">
                                <img src="assets/Images/HeroPool_1.webp" alt="Hotel Swimming Pool" class="gallery-card__image" loading="lazy">
                                <div class="gallery-card__overlay">
                                    <a href="#project-8" class="gallery-card__link" aria-label="View Hotel Swimming Pool details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                    </a>
                                </div>
                            </div>
                            <div class="gallery-card__content">
                                <h3 class="gallery-card__title">Hotel Swimming Pool</h3>
                                <p class="gallery-card__location">Entebbe, Uganda</p>
                            </div>
                        </div>
                        
                        <!-- Project Details Modal -->
                        <div id="project-8" class="project-modal">
                            <div class="project-modal__content">
                                <button class="project-modal__close" aria-label="Close modal">&times;</button>
                                <div class="project-modal__header">
                                    <h2 class="project-modal__title">Hotel Swimming Pool</h2>
                                    <p class="project-modal__location">Entebbe, Uganda</p>
                                </div>
                                <div class="project-modal__gallery">
                                    <img src="assets/Images/HeroPool_1.webp" alt="Hotel Swimming Pool" class="project-modal__image">
                                </div>
                                <div class="project-modal__details">
                                    <div class="project-modal__info">
                                        <h3>Project Details</h3>
                                        <ul class="project-modal__specs">
                                            <li><strong>Type:</strong> Commercial</li>
                                            <li><strong>Size:</strong> 18m x 10m</li>
                                            <li><strong>Depth:</strong> 1.0m - 2.2m</li>
                                            <li><strong>Features:</strong> Children's section, swim-up bar, commercial filtration, night lighting</li>
                                            <li><strong>Completion:</strong> 2021</li>
                                        </ul>
                                    </div>
                                    <div class="project-modal__description">
                                        <h3>About This Project</h3>
                                        <p>This large-scale commercial pool was designed for a boutique hotel in Entebbe. The client needed a versatile aquatic facility that would appeal to all guests, from families with children to adults seeking relaxation.</p>
                                        <p>We created a multi-zone pool with a shallow children's area separated by a safety barrier, a main swimming section with comfortable depths for casual swimmers, and a deeper end for more confident swimmers. The integrated swim-up bar allows guests to enjoy refreshments without leaving the water.</p>
                                        <p>The commercial-grade filtration and sanitation systems are designed to handle high bather loads while maintaining water quality with minimal chemical usage. The entire pool area is illuminated with programmable LED lighting that creates different moods for evening events.</p>
                                        <p>This project showcases our ability to create commercial aquatic facilities that balance aesthetic appeal with practical considerations like safety, durability, and ease of maintenance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta">
            <div class="container">
                <div class="cta__content">
                    <h2 class="cta__title">Ready to Start Your Dream Pool Project?</h2>
                    <p class="cta__text">Contact our team today for a consultation and free quote</p>
                    <div class="cta__buttons">
                        <a href="contact.php" class="cta__button cta__button--primary" onmouseover="this.style.color='white'" onmouseout="this.style.color=''">Get a Quote</a>
                        <a href="services.php" class="cta__button cta__button--secondary">Explore Our Services</a>
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
</body>
</html>