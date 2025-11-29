# Pageant Wagon Website Components

## Overview
This document provides details about all the React components created for the Pageant Wagon website.

## Components Created

### 1. Navbar.tsx
**Location:** `/src/components/Navbar.tsx`

**Features:**
- Sticky navigation bar that changes appearance on scroll
- Transparent background at top, solid dark background when scrolled
- Desktop navigation with links to all sections
- Responsive mobile hamburger menu with slide-in animation
- "Book a Visit" CTA button
- Smooth scroll to sections
- Uses Framer Motion for animations

**Navigation Links:**
- The Experience
- Technology
- How It Works
- Contact

### 2. Hero.tsx
**Location:** `/src/components/Hero.tsx`

**Features:**
- Full-screen hero section with background image
- Dark gradient overlay for text readability
- Animated headline: "History Comes Alive"
- Descriptive subheadline
- Two CTA buttons: "Book a Visit" (primary gold) and "Watch Demo" (secondary outline)
- Animated scroll indicator at bottom
- Responsive typography scaling
- Staggered entrance animations

**Required Assets:**
- `/public/images/hero-trailer.png` (fallback included)

### 3. Experience.tsx
**Location:** `/src/components/Experience.tsx`

**Features:**
- Section showcasing three key features
- Feature cards with icons, titles, and descriptions
- Large showcase image of interior with overlay text
- Hover effects on cards
- Glow effects on icons
- Responsive grid layout

**Features Highlighted:**
1. Immersive 360° Theater
2. AI-Powered Conversations
3. Mobile Accessibility

**Required Assets:**
- `/public/images/interior-showcase.png` (fallback included)

### 4. Technology.tsx
**Location:** `/src/components/Technology.tsx`

**Features:**
- Four tech specification cards
- Comparison section with The Sphere
- Gradient backgrounds and borders
- Interactive hover effects
- Custom Sparkles icon component
- Technology badges

**Tech Specs Covered:**
1. Display Technology (COB LED/8K projection)
2. Audio System (beamforming)
3. AI MetaHumans (Unreal Engine 5)
4. Mobile Platform (53ft trailer)

### 5. HowItWorks.tsx
**Location:** `/src/components/HowItWorks.tsx`

**Features:**
- Three-step process visualization
- Numbered badges for each step
- Connection line between steps (desktop)
- Arrow indicators between steps
- Icons for each step
- Bottom CTA to get started

**Process Steps:**
1. Book Your Visit
2. We Set Up
3. Experience History

### 6. HistoricalFigures.tsx
**Location:** `/src/components/HistoricalFigures.tsx`

**Features:**
- Showcase cards for AI historical figures
- Portrait images with gradient overlays
- Name, era, period, and iconic quotes
- "Coming Soon" banner with future figures
- Hover scale effects
- Responsive two-column grid

**Current Figures:**
1. Abraham Lincoln
2. Martin Luther King Jr.

**Future Figures Listed:**
- Frederick Douglass
- Harriet Tubman
- Susan B. Anthony
- Eleanor Roosevelt
- Benjamin Franklin

**Required Assets:**
- `/public/images/lincoln-metahuman.png` (fallback included)
- `/public/images/mlk-metahuman.png` (fallback included)

### 7. Contact.tsx
**Location:** `/src/components/Contact.tsx`

**Features:**
- Two-column layout (form + contact info)
- Contact form with validation
- Form fields: School Name, Contact Name, Email, Message
- Submit animation and success message
- Phone contact card
- Email contact card
- "What to Expect" information box
- Background trailer image with low opacity

**Form Handling:**
- Client-side validation
- Loading state during submission
- Success confirmation message
- Form reset on successful submit

### 8. Footer.tsx
**Location:** `/src/components/Footer.tsx`

**Features:**
- Four-column responsive grid
- Brand section with logo and description
- Quick links to all sections
- Social media icons (Facebook, Twitter, Instagram, LinkedIn)
- Contact information (email and phone)
- Copyright notice
- Privacy Policy and Terms of Service links
- Smooth scroll navigation

## Styling & Theme

### Colors
All components use the color theme defined in `src/index.css`:

- **Primary Colors:** Purple/Indigo shades (`primary-50` through `primary-900`)
- **Accent Colors:** Gold shades (`gold-400`, `gold-500`, `gold-600`)
- **Dark Backgrounds:** Dark navy shades (`dark-900`, `dark-800`, `dark-700`)

### Special CSS Classes
- `.gradient-text` - Purple gradient text
- `.gradient-gold` - Gold gradient text
- `.glow-effect` - Purple glow shadow
- `.trailer-glow` - Multi-layer glow effect
- `.font-display` - Playfair Display font for headings

### Fonts
- **Headings:** Playfair Display (serif, elegant)
- **Body:** Inter (sans-serif, clean)

## Animations

All components use Framer Motion for animations:

- **Scroll-triggered animations:** `whileInView` with `viewport={{ once: true }}`
- **Staggered children:** Container/item variants for sequential animations
- **Hover effects:** Scale, color, and shadow transitions
- **Mobile menu:** Slide-in animation with height/opacity
- **Scroll indicator:** Bouncing animation loop

## Responsive Design

All components are fully responsive with breakpoints:
- Mobile: Default (< 640px)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)
- Wide: `xl:` (1280px+)

### Mobile Optimizations
- Hamburger menu in Navbar
- Stacked layouts instead of grids
- Adjusted font sizes
- Single-column contact form
- Simplified animations

## Missing Assets

The website will work without images (using fallbacks), but for the best experience, add these images to `/public/images/`:

1. **hero-trailer.png** - Main hero background
2. **interior-showcase.png** - Theater interior
3. **lincoln-metahuman.png** - Abraham Lincoln AI render
4. **mlk-metahuman.png** - MLK AI render

All images have fallback placeholders in the code.

## Usage

To use the website:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## File Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── Technology.tsx
│   ├── HowItWorks.tsx
│   ├── HistoricalFigures.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── App.tsx
├── index.css
└── main.tsx

public/
├── images/
│   └── README.md (image requirements)
└── vite.svg
```

## Accessibility

All components follow accessibility best practices:
- Semantic HTML elements
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for images
- Sufficient color contrast

## Performance

- Lazy loading images with error handling
- Optimized animations (GPU-accelerated)
- Minimal re-renders with proper React patterns
- CSS-based animations where possible
- Smooth scroll behavior

## Future Enhancements

Potential improvements:
- Add video background support
- Implement actual form submission (API integration)
- Add more historical figures
- Create admin panel for content management
- Add testimonials section
- Implement booking calendar
- Add photo gallery
- Create blog/news section
