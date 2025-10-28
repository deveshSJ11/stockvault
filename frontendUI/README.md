# 🏠 StockVault Frontend UI

> Zerodha-inspired landing page with modern design and user authentication

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)](https://vitejs.dev/)

## 📋 Overview

The marketing and authentication landing page inspired by Zerodha's design philosophy. Features a clean, modern interface with hero section, feature highlights, and seamless user onboarding through signup/login flows.

**Live Demo:** [https://main.d396oielaum726.amplifyapp.com/](https://main.d396oielaum726.amplifyapp.com/)

---

## ✨ Features

### 🎯 Hero Section
- Eye-catching headline and CTA
- Animated graphics and illustrations
- Trust indicators (user count, reviews)
- Clear value proposition

### 📝 User Authentication
- **Signup Flow**
  - Full name, email, password fields
  - Email validation
  - Password strength indicators
  - Terms & conditions acceptance
  
- **Login Flow**
  - Email/password authentication
  - "Remember me" option
  - Forgot password link
  - JWT token management

### 🌟 Features Section
- Platform capabilities overview
- Icon-based feature cards
- Benefits highlights
- Social proof elements

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly UI

### 🎨 Design Elements
- Clean, minimal aesthetic
- Zerodha-inspired color scheme
- Smooth animations
- Modern typography

---

## 🚀 Quick Start

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Backend server running

### Installation

1. **Navigate to frontendUI folder**
```bash
cd frontendUI
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
echo "VITE_API_BASE=http://localhost:5712" > .env.local
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

---

## 📂 Project Structure

```
frontendUI/
├── public/                      # Static assets
│   ├── images/                 # Images & graphics
│   │   ├── hero-banner.png
│   │   ├── feature-1.svg
│   │   └── logo.svg
│   └── favicon.ico
│
├── src/
│   ├── landing_page/           # Landing page components
│   │   ├── home/              # Home/Hero section
│   │   │   ├── Hero.jsx       # Main hero component
│   │   │   ├── Features.jsx   # Features showcase
│   │   │   ├── Stats.jsx      # Statistics section
│   │   │   └── CTA.jsx        # Call-to-action
│   │   │
│   │   ├── signup/            # User registration
│   │   │   └── Signup.jsx     # Signup form & logic
│   │   │
│   │   ├── login/             # User login
│   │   │   └── Login.jsx      # Login form & logic
│   │   │
│   │   ├── about/             # About page
│   │   │   └── About.jsx      # Company info
│   │   │
│   │   └── components/        # Shared components
│   │       ├── Navbar.jsx     # Navigation bar
│   │       ├── Footer.jsx     # Footer component
│   │       └── Button.jsx     # Reusable button
│   │
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
│
├── .env.local                  # Local environment config
├── amplify.yml                 # AWS Amplify build config
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # This file
```

---

## 🎨 Pages & Components

### Home Page (Hero Section)

**File:** `src/landing_page/home/Hero.jsx`

**Features:**
- Large headline with tagline
- Primary CTA button ("Get Started")
- Hero image/illustration
- Trust badges

```jsx
<Hero 
  title="Invest in everything"
  subtitle="Online platform to invest in stocks, derivatives, mutual funds, and more"
  ctaText="Sign up now"
  ctaLink="/signup"
/>
```

---

### Features Section

**File:** `src/landing_page/home/Features.jsx`

**Highlights:**
- 📊 Real-time market data
- 💼 Portfolio management
- 🔐 Secure trading
- 📱 Mobile-friendly
- 📈 Advanced analytics
- 🛡️ Data protection

```jsx
const features = [
  {
    icon: <TrendingUp />,
    title: "Real-time Data",
    description: "Live stock prices updated every 5 seconds"
  },
  // ... more features
];
```

---

### Signup Page

**File:** `src/landing_page/signup/Signup.jsx`

**Form Fields:**
```jsx
{
  fullName: string,
  email: string (validated),
  password: string (min 6 chars),
  confirmPassword: string
}
```

**Validation:**
- Email format check
- Password strength meter
- Matching passwords
- All fields required

**API Integration:**
```javascript
import { signup } from '../../services/ApiService';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await signup({
      fullName,
      email,
      password
    });
    // Store token
    localStorage.setItem('token', response.token);
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error) {
    setError(error.response.data.message);
  }
};
```

---

### Login Page

**File:** `src/landing_page/login/Login.jsx`

**Form Fields:**
```jsx
{
  email: string,
  password: string,
  rememberMe: boolean
}
```

**Features:**
- Email/password authentication
- "Remember me" checkbox
- Forgot password link
- Redirect after successful login

**API Integration:**
```javascript
import { login } from '../../services/ApiService';

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await login({ email, password });
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    navigate('/dashboard');
  } catch (error) {
    setError('Invalid credentials');
  }
};
```

---

### Navbar Component

**File:** `src/landing_page/components/Navbar.jsx`

**Features:**
- Logo with link to home
- Navigation links
- Login/Signup buttons
- Mobile hamburger menu
- Sticky header on scroll

```jsx
<Navbar 
  links={[
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '#features' }
  ]}
  isAuthenticated={!!token}
/>
```

---

### Footer Component

**File:** `src/landing_page/components/Footer.jsx`

**Sections:**
- Company info
- Quick links
- Social media icons
- Contact information
- Copyright notice

---

## 🎨 Styling & Design

### Color Palette (Zerodha-inspired)

```css
:root {
  --primary: #387ED1;      /* Primary blue */
  --secondary: #5CB3FD;    /* Light blue */
  --accent: #FF6B6B;       /* Accent red */
  --success: #4CAF50;      /* Success green */
  --text-dark: #424242;    /* Dark text */
  --text-light: #666666;   /* Light text */
  --bg-light: #F8F9FA;     /* Light background */
  --border: #E0E0E0;       /* Border color */
}
```

### Typography

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Headings */
h1: 2.5rem / 600
h2: 2rem / 600
h3: 1.5rem / 500

/* Body */
p: 1rem / 400
small: 0.875rem / 400
```

### Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Slide In:**
```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

---

## 🔧 Configuration

### Environment Variables

**`.env.local`**
```env
VITE_API_BASE=http://localhost:5712
VITE_DASHBOARD_URL=http://localhost:3000
```

**`.env.production`**
```env
VITE_API_BASE=https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com
VITE_DASHBOARD_URL=https://main.d31wkgvjp4a2zm.amplifyapp.com
```

### Tailwind Configuration

**`tailwind.config.js`**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#387ED1',
          dark: '#2C5FA3',
          light: '#5CB3FD'
        },
        accent: '#FF6B6B',
        success: '#4CAF50'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out'
      }
    }
  },
  plugins: []
}
```

---

## 🌐 Routing

**React Router Setup:**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🔐 Authentication Flow

```
User visits landing page
    ↓
Clicks "Sign Up"
    ↓
Fills signup form
    ↓
POST /api/auth/signup
    ↓
Receives JWT token
    ↓
Token stored in localStorage
    ↓
Redirects to Dashboard
    ↓
Dashboard checks for token
    ↓
If valid → Show dashboard
If invalid → Redirect to login
```

---

## 🚀 Deployment (AWS Amplify)

### amplify.yml Configuration

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
env:
  variables:
    VITE_API_BASE: "https://stockvault-backend-env.eba-f37mvakq.ap-south-1.elasticbeanstalk.com"
    VITE_DASHBOARD_URL: "https://main.d31wkgvjp4a2zm.amplifyapp.com"
```

### Deployment Steps

1. **Connect Repository to Amplify**
   - Go to AWS Amplify Console
   - Add new app → Connect GitHub
   - Select repository
   - Choose `frontendUI` as root directory

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Base directory: frontendUI
   Output directory: frontendUI/dist
   ```

3. **Set Environment Variables**
   - App Settings → Environment variables
   - Add `VITE_API_BASE` and `VITE_DASHBOARD_URL`

4. **Deploy**
   - Push to `main` branch
   - Auto-deployment triggered

5. **Custom Domain** (Optional)
   - Domain Management → Add domain
   - Configure DNS records

---

## 🧪 Testing

### Component Tests
```bash
npm test
```

### E2E Tests (Cypress - if configured)
```bash
npm run test:e2e
```

### Manual Testing Checklist

**Landing Page:**
- [ ] Hero section loads correctly
- [ ] Features display properly
- [ ] CTA buttons work
- [ ] Navigation menu functions
- [ ] Responsive on mobile
- [ ] Images load correctly

**Signup:**
- [ ] Form validation works
- [ ] Email format validated
- [ ] Password strength shown
- [ ] Successful signup redirects
- [ ] Error messages display
- [ ] Token stored correctly

**Login:**
- [ ] Credentials validated
- [ ] Successful login redirects
- [ ] Remember me works
- [ ] Error handling correct
- [ ] Forgot password link works

---

## 🎨 UI/UX Best Practices

### Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios (WCAG AA)

### Performance
- Lazy loading images
- Code splitting per route
- Optimized bundle size
- Fast page load (<3s)

### Mobile Experience
- Touch-friendly buttons (44x44px minimum)
- Responsive typography
- Mobile menu optimization
- Swipe gestures support

---

## 📝 Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext js,jsx",
  "format": "prettier --write src/**/*.{js,jsx,css}"
}
```

---

## 📚 Dependencies

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "lucide-react": "^0.294.0"
}
```

### Development
```json
{
  "@vitejs/plugin-react": "^4.2.0",
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.6",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

---

## 🐛 Common Issues

### Issue: "Cannot find module"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```


### Issue: API calls failing
**Solution:**
- Verify `VITE_API_BASE` is correct
- Check backend is running
- Inspect network tab in DevTools

---

## 🔗 Related Documentation

- [Main README](../README.md)
- [Backend README](../backend/README.md)
- [Dashboard README](../dashboard/README.md)

---

## 📞 Support

For landing page issues:
- 🐛 [Report Issues](https://github.com/deveshSJ11/stockvault/issues)
- 📧 Email: deveshjaiswal1212@gmail.com

---

<div align="center">

**Built with ❤️ by [Devesh Jaiswal](https://github.com/deveshSJ11)**

</div>
