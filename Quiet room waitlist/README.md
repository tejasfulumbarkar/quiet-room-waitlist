# Quiet Room - Waitlist Website

A modern, animated waitlist signup page for your "Quiet Room" digital dojo platform. This website features a clean, minimalist design with smooth animations and a functional email collection form.

## Features

- **Hero Section**: Matches the design from your image with "Quiet" and "Room" titles
- **Meditation Illustration**: Animated character in the center with breathing and floating animations
- **Waitlist Form**: Email collection with validation and loading states
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Fade-in effects, hover animations, and interactive elements
- **Modern UI**: Clean design with purple accent colors and dotted background

## Files Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## How to Use

1. **Open the website**: Simply open `index.html` in your web browser
2. **Test the waitlist form**: Enter an email address and click "Join Waitlist"
3. **View animations**: Scroll and hover over elements to see the animations

## Customization

### Colors
The main color scheme uses purple (`#6366f1`) as the primary accent. You can change this in `styles.css`:

```css
/* Primary purple color */
.cta-btn, .login-btn, .waitlist-btn {
    background: #6366f1; /* Change this color */
}
```

### Content
- **Title**: Change "Quiet" and "Room" in the HTML
- **Taglines**: Update the taglines in the hero section
- **Waitlist text**: Modify the waitlist section title and subtitle

### Backend Integration
To connect the waitlist form to your backend:

1. Replace the simulated API call in `script.js` (around line 50):
```javascript
// Replace this with your actual API endpoint
const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email })
});
```

2. Handle the response appropriately in your backend

## Animations Included

- **Fade-in animations**: Elements appear as you scroll
- **Floating meditation character**: Gentle up-and-down movement
- **Breathing animation**: The character's head scales slightly
- **Button hover effects**: Scale and shadow effects
- **Loading spinner**: For the waitlist form submission
- **Success message**: Slides up when email is submitted
- **Parallax effect**: The meditation illustration moves on scroll

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

The website is optimized for performance with:
- CSS animations (hardware accelerated)
- Minimal JavaScript
- Optimized images (CSS-based illustration)
- Responsive design

## Next Steps

1. **Add your logo**: Replace the CSS-based logo with your actual logo image
2. **Connect to backend**: Implement the actual email collection API
3. **Add analytics**: Track form submissions and user interactions
4. **SEO optimization**: Add meta tags and structured data
5. **Deploy**: Host on your preferred platform (Netlify, Vercel, etc.)

## License

This project is open source and available under the MIT License. 