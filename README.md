# ForgeYantra — Modern Internship Landing Page

A modern, responsive, and student-focused landing page built for **ForgeYantra** as a technical internship assignment.

---

## 🚀 Live Local Execution

No complex build steps or node package installations are required. You can run the project in any of the following ways:

### Option 1: Direct Browser Launch
Simply double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using VS Code Live Server
1. Open the `ForgeYantra` folder in Visual Studio Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Using Python Local Server
Run the following in the project directory:
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 4: Using Node `npx serve`
```bash
npx serve .
```

---

## 🛠️ Technology Stack

* **HTML5**: Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`), ARIA accessibility tags, SEO OpenGraph meta tags.
* **CSS3**: CSS custom properties (design tokens), glassmorphism backdrops, dark/light theme variables, flexbox & CSS grid, smooth animations, responsive media queries.
* **Vanilla JavaScript (ES6+)**: Pure JS DOM manipulation, `IntersectionObserver` scroll reveals, dark/light mode toggle with `localStorage` persistence, mobile hamburger menu, interactive role filtering, auto-fill actions, and real-time form validation.
* **Zero Bloat**: No heavy frameworks, zero runtime dependencies, fast loading speed.

---

## 📐 Project Structure

```
ForgeYantra/
├── index.html          # Semantic HTML5 markup, accessible forms & SEO tags
├── style.css           # Modern design tokens, dark/light themes, animations & responsive layouts
├── script.js           # Vanilla JavaScript for theme, mobile menu, filtering & validation
├── README.md           # Documentation and run instructions
└── assets/
    └── favicon.svg     # Brand vector favicon
```

---

## ✨ Features & Sections

1. **Responsive Navbar**:
   - Modern brand logo monogram.
   - Desktop navigation with active scroll indicators.
   - Dark/Light mode theme switch button.
   - "Apply Now" quick action CTA button.
   - Mobile hamburger menu with smooth animated drawer & backdrop.

2. **Hero Section**:
   - Headline: *"Build Skills. Gain Experience. Launch Your Career."*
   - Supporting narrative on practical learning and mentorship.
   - Dual CTAs: *"Explore Internships"* & *"Apply Now"*.
   - Simulated developer terminal with live syntax highlighting, active cohort indicator, and floating skill badges.

3. **About ForgeYantra**:
   - Overview of the student-focused internship platform.
   - Mission statement card.
   - 4 Core Pillars: Practical Learning, Industry Exposure, Mentorship & Feedback, Career Development.

4. **Internship Roles (6 Open Tracks)**:
   - Full Stack Development
   - Web Development
   - Graphic Design
   - UI/UX Design
   - Marketing & Business Development
   - Video Editing
   - Domain filtering tabs (All Domains, Engineering, Design, Growth & Media).
   - "Apply for this Role" trigger that smoothly scrolls and pre-selects the domain in the application form.

5. **Why Join Us (6 Key Benefits)**:
   - Real-World Projects
   - Practical Skill Development
   - Mentorship & Guidance
   - Industry Exposure
   - Portfolio Building
   - Career Growth

6. **Internship Process (4 Connected Steps)**:
   - Step 1: Apply
   - Step 2: Complete Task
   - Step 3: Interview
   - Step 4: Start Internship

7. **Call to Action (CTA) Banner**:
   - High-impact banner encouraging students to take the next step.

8. **Contact & Application Form**:
   - Frontend-only form with client-side validation.
   - Real-time and on-submit validation for Full Name, Email, Phone, Role, and Message.
   - Interactive loading spinner simulation.
   - Submission confirmation card with personalized applicant feedback and form reset.
   - Explicit disclaimer indicating frontend-only status.

9. **Footer**:
   - Brand overview, navigation links, track directory, inquiries contact, placeholder social links, and copyright notice.

10. **Back-to-Top Button**:
    - Floating action button appearing dynamically on scroll.

---

## 📱 Responsive Testing Viewports

The design is tested and optimized across:
* **1440px+**: Wide desktop screen
* **1024px**: Laptop & large tablet
* **768px**: Tablet portrait
* **425px**: Large mobile
* **375px**: Standard mobile

---

## 🔒 Authenticity & Compliance
* **No Invented Information**: Avoids unverified client claims, revenue stats, or fake office addresses.
* **Stipend Clarity**: Accurately avoids quoting specific stipend numbers as the structure is finalized per cohort.
* **Frontend-Only**: No backend mock deception; form clearly states client-side simulation.
