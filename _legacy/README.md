# Afridrop Solutions Website

This repository contains the source code for the Afridrop Solutions website, a professional swimming pool services company in Uganda.

## Project Structure

```
├── assets/                # Images and other static assets
├── css/                  # CSS stylesheets
│   └── styles.css        # Main stylesheet
├── js/                   # JavaScript files
│   └── main.js           # Main JavaScript file
├── php/                  # PHP scripts
│   ├── mailer.php        # Contact form handler
│   └── newsletter.php    # Newsletter subscription handler
├── .htaccess             # Apache configuration file
├── 403.php               # 403 error page
├── 404.php               # 404 error page
├── 500.php               # 500 error page
├── index.php             # Homepage
├── robots.txt            # Search engine instructions
└── sitemap.xml           # XML sitemap for search engines
```

## Features

- Responsive design optimized for all device sizes
- Modern, clean UI with a water-themed color palette
- Interactive elements including:
  - Mobile-friendly navigation
  - Testimonial slider
  - Contact form with validation
  - Newsletter subscription
  - Smooth scroll effects
- SEO optimized with structured data
- Performance optimized with:
  - Asset preloading
  - Minified CSS and JavaScript
  - Optimized images
  - Browser caching

## Color Palette

### Marine Deep Blue
- Darker Shade (Base -20%): #002B4A
- Original (Base): #00477A
- Tint 20% (Light Tint): #1A5F8A
- Tint 40% (Medium Tint): #33779A
- Tint 60% (Lighter Tint): #668FAA
- Tint 80% (Very Light): #99A7BA

### Aqua Core
- Darker Shade (Base -20%): #007FA5
- Original (Base): #009FCE
- Tint 20% (Light Tint): #1AAFD4
- Tint 40% (Medium Tint): #33BFDA
- Tint 60% (Lighter Tint): #66CFE0
- Tint 80% (Very Light): #99DFE6

### Sea-Foam Mist
- Darker Shade (Base -20%): #92BABC
- Original (Base): #B6E9F4
- Tint 20% (Light Tint): #C4EDF6
- Tint 40% (Medium Tint): #D2F1F8
- Tint 60% (Lighter Tint): #E0F5FA
- Tint 80% (Very Light): #EEF9FC

### Slate Stone
- Darker Shade (Base -20%): #2A3238
- Original (Base): #42505C
- Tint 20% (Light Tint): #5B6770
- Tint 40% (Medium Tint): #747E84
- Tint 60% (Lighter Tint): #8D9598
- Tint 80% (Very Light): #A6ACAC

### Ice White
- Darker Shade (Base -20%): #C4C5C9
- Original (Base): #F5FBFC
- Tint 20% (Light Tint): #F7FCFD
- Tint 40% (Medium Tint): #F9FDFE
- Tint 60% (Lighter Tint): #FBFEFE
- Tint 80% (Very Light): #FDFFFF

## Setup Instructions

1. Clone this repository to your web server's document root
2. Ensure PHP 7.4+ is installed and configured
3. Set appropriate permissions:
   ```
   chmod 755 -R /path/to/website
   chmod 777 -R /path/to/website/assets/uploads (if applicable)
   ```
4. Configure your web server (Apache/Nginx) to serve the site
5. Update contact information in the PHP files with your actual email addresses

## Development

To modify or extend this website:

1. Edit CSS in `css/styles.css`
2. Edit JavaScript in `js/main.js`
3. Modify page content in the respective PHP files
4. Add new assets to the `assets` directory

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Credits

- Design and Development: Afridrop Solutions
- Icons: SVG custom icons
- Images: Afridrop Solutions portfolio

## License

All rights reserved. This code is proprietary to Afridrop Solutions.