# BoBoParty Design System
## Apple/Google-Inspired UI/UX Specification

---

## Design Principles

### 1. **Clarity Above All**
- Clear visual hierarchy
- Generous whitespace
- Readable typography at all sizes
- Obvious interactive elements

### 2. **Consistency**
- Unified design language
- Predictable interactions
- Systematic spacing
- Coherent color usage

### 3. **Delight Through Details**
- Smooth animations (60fps)
- Thoughtful micro-interactions
- Polished transitions
- Haptic-like feedback

### 4. **Accessibility First**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Touch targets ≥44px

---

## Color System

### Primary Palette
```
Blue:
- blue-50:  #eff6ff (backgrounds)
- blue-100: #dbeafe (hover states)
- blue-500: #3b82f6 (secondary CTAs)
- blue-600: #2563eb (primary CTAs, links)
- blue-700: #1d4ed8 (active states)
- blue-900: #1e3a8a (text on blue bg)

Purple (Accent):
- purple-50:  #faf5ff (gradient accent)
- purple-100: #f3e8ff
- purple-600: #9333ea (accent elements)

Neutral:
- gray-50:  #f9fafb (page backgrounds)
- gray-100: #f3f4f6 (card backgrounds)
- gray-200: #e5e7eb (borders, dividers)
- gray-300: #d1d5db (disabled states)
- gray-400: #9ca3af (placeholder text)
- gray-500: #6b7280 (secondary text)
- gray-600: #4b5563 (body text)
- gray-700: #374151 (emphasis text)
- gray-900: #111827 (headings)
```

### Semantic Colors
```
Success: green-600 (#16a34a)
Warning: amber-600 (#d97706)
Error:   red-600 (#dc2626)
Info:    blue-600 (#2563eb)
```

### Color Usage Rules
- **Backgrounds**: gray-50 (pages), white (cards)
- **Text**: gray-900 (headings), gray-700 (body), gray-500 (secondary)
- **CTAs**: blue-600 (primary), white outlined (secondary)
- **Accents**: purple-600 (sparingly)
- **Status**: Semantic colors only for status/feedback

### Contrast Requirements
- Text contrast ratio ≥4.5:1 (normal text)
- Text contrast ratio ≥3:1 (large text ≥18px)
- Interactive elements ≥3:1 against background

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Helvetica Neue', Arial, sans-serif;
```

### Type Scale (Mobile → Desktop)
```
Heading 1: text-3xl/font-bold (30px) → text-5xl (48px)
Heading 2: text-2xl/font-bold (24px) → text-4xl (36px)
Heading 3: text-xl/font-semibold (20px) → text-2xl (24px)
Heading 4: text-lg/font-semibold (18px) → text-xl (20px)

Body Large: text-base (16px) → text-lg (18px)
Body: text-sm (14px) → text-base (16px)
Body Small: text-xs (12px) → text-sm (14px)
Caption: text-xs (12px)
```

### Font Weights
```
Regular: 400 (body text)
Medium:  500 (emphasis, labels)
Semibold: 600 (subheadings, buttons)
Bold:    700 (headings)
```

### Line Heights
```
Tight:   leading-tight (1.25) - headings
Snug:    leading-snug (1.375) - subheadings
Normal:  leading-normal (1.5) - body
Relaxed: leading-relaxed (1.625) - long-form content
```

---

## Spacing System (8px base)

```
0:  0px
1:  4px   (0.25rem)
2:  8px   (0.5rem)
3:  12px  (0.75rem)
4:  16px  (1rem)
5:  20px  (1.25rem)
6:  24px  (1.5rem)
8:  32px  (2rem)
10: 40px  (2.5rem)
12: 48px  (3rem)
16: 64px  (4rem)
20: 80px  (5rem)
24: 96px  (6rem)
```

### Component Spacing
```
Card Padding:     p-4 sm:p-6 lg:p-8
Section Spacing:  py-12 sm:py-16 lg:py-24
Element Gap:      gap-3 sm:gap-4 lg:gap-6
Grid Gap:         gap-3 sm:gap-4 lg:gap-6
```

---

## Layout Grid

### Breakpoints
```
Mobile:  < 640px  (sm)
Tablet:  640-1023px
Desktop: 1024-1279px (lg)
Wide:    1280-1535px (xl)
Ultra:   ≥1536px (2xl)
```

### Max Widths
```
Prose:    max-w-prose (65ch)
Container: max-w-7xl (1280px)
Wide:     max-w-full
```

### Grid Systems
```
Mobile:   grid-cols-1 or grid-cols-2
Tablet:   grid-cols-2 or grid-cols-3
Desktop:  grid-cols-3 or grid-cols-4
```

---

## Components Library

### Buttons

#### Primary Button
```tsx
className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold 
           text-white shadow-lg shadow-blue-600/30 
           hover:bg-blue-700 active:scale-95 
           transition-all duration-150 
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
```

#### Secondary Button
```tsx
className="rounded-xl border-2 border-gray-200 bg-white px-6 py-3 
           text-base font-semibold text-gray-900 
           hover:bg-gray-50 active:scale-95 
           transition-all duration-150 
           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
```

#### Ghost Button
```tsx
className="rounded-xl px-6 py-3 text-base font-semibold text-gray-700 
           hover:bg-gray-100 active:bg-gray-200 
           transition-colors duration-150"
```

### Cards

#### Standard Card
```tsx
className="rounded-2xl border border-gray-200 bg-white p-6 
           shadow-sm hover:shadow-lg 
           transition-shadow duration-200"
```

#### Interactive Card
```tsx
className="rounded-2xl border border-gray-200 bg-white p-6 
           shadow-sm hover:shadow-lg active:scale-98 
           transition-all duration-200 
           cursor-pointer"
```

### Form Elements

#### Input Field
```tsx
className="w-full rounded-xl border border-gray-300 bg-white 
           px-4 py-3 text-base text-gray-900 
           placeholder:text-gray-400 
           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
           transition-all duration-150"
```

#### Checkbox/Radio
```tsx
className="h-5 w-5 rounded border-gray-300 text-blue-600 
           focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
```

---

## Motion & Animation

### Timing Functions
```
Ease Out:    cubic-bezier(0, 0, 0.2, 1) - default
Ease In Out: cubic-bezier(0.4, 0, 0.2, 1) - modals
Spring:      cubic-bezier(0.34, 1.56, 0.64, 1) - playful
```

### Duration Scale
```
Instant: 75ms  - micro-interactions
Fast:    150ms - hover, focus states
Base:    200ms - transitions, fades
Slow:    300ms - modals, sheets
Delayed: 500ms - page transitions
```

### Animation Principles
- **Reduce Motion**: Respect `prefers-reduced-motion`
- **Purposeful**: Every animation has a reason
- **Subtle**: Don't distract from content
- **Fast**: Complete within 300ms for interactions
- **Native Feel**: Match platform conventions

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color & Contrast
- [ ] All text meets 4.5:1 contrast ratio
- [ ] Large text meets 3:1 contrast ratio
- [ ] Interactive elements meet 3:1 contrast
- [ ] Don't rely on color alone for meaning

#### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Skip links for navigation

#### Screen Readers
- [ ] Semantic HTML (nav, main, article, etc.)
- [ ] ARIA labels for interactive elements
- [ ] Alt text for all images
- [ ] Descriptive link text
- [ ] Form labels associated with inputs

#### Touch Targets
- [ ] Minimum 44x44px touch targets
- [ ] Adequate spacing between targets (8px)
- [ ] No overlapping interactive areas

#### Responsive Text
- [ ] Text scales with user font size
- [ ] Line length ≤75 characters
- [ ] Adequate line height (1.5+)

---

## Responsive Design Strategy

### Mobile-First Approach
1. Design for 375px width first
2. Add complexity as screen size increases
3. Never hide essential features on mobile

### Breakpoint Guidelines
```
Mobile:
- Single column layouts
- Stacked navigation
- Full-width cards
- Bottom sheets for filters/menus
- Sticky CTAs

Tablet:
- 2-column grids
- Horizontal scrolling where appropriate
- Sidebar navigation possible
- More generous spacing

Desktop:
- Multi-column layouts
- Sticky sidebars
- Hover states
- Keyboard shortcuts
- Larger hit areas acceptable
```

---

## Page-Specific Designs

### Homepage
- Hero with gradient (blue-50 to purple-50)
- Featured categories carousel
- Product showcase grid
- Instagram feed
- Store locations with map
- WhatsApp CTA sticky on mobile

### Products Catalog
- Hero with breadcrumbs
- Sticky search/filter bar (mobile)
- Sidebar filters (desktop)
- 2-col mobile / 3-4 col desktop grid
- Quick add to cart
- Infinite scroll or pagination

### Product Detail
- Image gallery with zoom
- Sticky purchase box (mobile)
- Breadcrumb navigation
- Related products
- Reviews section
- Share buttons

### Cart
- 2-col layout (items | summary)
- Quantity steppers
- Remove animations
- Continue shopping CTA
- Sticky checkout button
- Estimated delivery info

### Checkout
- Redirect to Shopify hosted
- Clear "Powered by Shopify" badge
- Return to store link

---

## Implementation Checklist

### Global
- [ ] Design tokens defined
- [ ] Typography system implemented
- [ ] Color system applied
- [ ] Spacing system consistent
- [ ] Component library created
- [ ] Animation library setup

### Navigation
- [ ] Mobile hamburger menu
- [ ] Desktop horizontal nav
- [ ] Sticky header on scroll
- [ ] Search prominent
- [ ] Cart icon with count
- [ ] Language switcher

### Performance
- [ ] Images optimized (WebP)
- [ ] Lazy loading below fold
- [ ] Critical CSS inline
- [ ] Minimize CLS (Cumulative Layout Shift)
- [ ] Fast interaction (≤100ms)

### Testing
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Color contrast validation
- [ ] Mobile device testing
- [ ] Cross-browser testing

---

## Brand Voice

### Visual Tone
- **Friendly**: Approachable, warm colors
- **Professional**: Clean, organized
- **Playful**: Balloons, celebrations, emojis
- **Trustworthy**: Clear pricing, real photos

### Interaction Personality
- **Helpful**: Clear labels, tooltips
- **Encouraging**: Positive feedback
- **Efficient**: Fast, smooth interactions
- **Forgiving**: Easy undo, clear errors

---

## Resources & Tools

### Design References
- Apple Human Interface Guidelines
- Google Material Design 3
- Shopify Polaris
- Stripe Dashboard
- Airbnb

### Validation Tools
- WebAIM Contrast Checker
- WAVE (Web Accessibility Evaluation Tool)
- Lighthouse (Chrome DevTools)
- axe DevTools
- Stark (Figma plugin)

---

**This design system provides the foundation for a world-class e-commerce experience that rivals Apple and Google's attention to detail.**
