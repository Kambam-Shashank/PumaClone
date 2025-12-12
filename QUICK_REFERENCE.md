# 🚀 Quick Reference Guide

## Essential Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install --legacy-peer-deps
```

### Access
- **Local URL**: http://localhost:5173
- **Project Path**: `c:\Users\sathw\react-projects\Puma_clone`

---

## 📁 Key Files

### Configuration
- `tailwind.config.js` - Design system (colors, fonts, spacing)
- `package.json` - Dependencies
- `index.html` - SEO meta tags

### Components
- `src/components/layout/Navbar.jsx` - Main navigation
- `src/components/layout/Footer.jsx` - Footer
- `src/components/cart/CartDrawer.jsx` - Shopping cart
- `src/components/home/Hero.jsx` - Homepage carousel
- `src/components/product/ProductCard.jsx` - Product cards

### Pages
- `src/pages/HomePage.jsx` - Landing page
- `src/pages/CollectionPage.jsx` - Product listing
- `src/pages/ProductDetailPage.jsx` - Product details

### Data & Utils
- `src/data/products.js` - Sample products (edit here)
- `src/utils/helpers.js` - Utility functions
- `src/context/CartContext.jsx` - Cart state

---

## 🎨 Customization Quick Tips

### Change Brand Name
**File**: `src/components/layout/Navbar.jsx`
```jsx
// Line ~70
<Link to="/" className="...">
  YOUR BRAND NAME
</Link>
```

### Change Colors
**File**: `tailwind.config.js`
```javascript
colors: {
  primary: {
    500: '#your-color',
  },
}
```

### Add Products
**File**: `src/data/products.js`
```javascript
export const products = [
  {
    id: '9',
    name: 'Your Product',
    price: 2999,
    // ... rest of product data
  },
];
```

### Update Hero Slides
**File**: `src/components/home/Hero.jsx`
```javascript
const slides = [
  {
    title: 'Your Title',
    image: 'your-image-url',
    // ... rest of slide data
  },
];
```

---

## 📊 Design System Quick Reference

### Colors
```css
/* Primary */
bg-neutral-900    /* Black (#171717) */
bg-neutral-50     /* Light gray (#fafafa) */
bg-white          /* White */

/* Badges */
badge-new         /* Blue */
badge-sale        /* Red */
badge-limited     /* Purple */
badge-bestseller  /* Yellow */
```

### Typography
```css
/* Headings */
font-display      /* Outfit font */
text-display-lg   /* 56px */
text-heading-lg   /* 36px */

/* Body */
font-sans         /* Inter font */
text-body-lg      /* 18px */
text-body-md      /* 16px */
```

### Spacing
```css
/* Container */
container-custom  /* Max-width 1280px */
container-wide    /* Max-width 1536px */

/* Padding */
p-4, p-6, p-8     /* 16px, 24px, 32px */
py-12, py-16      /* Vertical padding */
```

### Components
```css
/* Buttons */
btn btn-primary   /* Black button */
btn btn-secondary /* Outlined button */
btn btn-lg        /* Large button */

/* Cards */
card              /* White card */
card-hover        /* Hover effect */

/* Grid */
product-grid      /* Responsive product grid */
```

---

## 🔌 Integration Snippets

### Shopify
```javascript
// src/lib/shopify.js
import { createStorefrontClient } from '@shopify/hydrogen-react';

export const client = createStorefrontClient({
  storeDomain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-token',
});
```

### Razorpay
```javascript
// src/lib/razorpay.js
export const initiatePayment = async (orderData) => {
  const options = {
    key: process.env.VITE_RAZORPAY_KEY,
    amount: orderData.amount * 100,
    currency: 'INR',
    // ...
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
```

### Google Analytics
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🐛 Troubleshooting

### Issue: Module not found
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue: Tailwind not working
```bash
# Restart dev server
Ctrl+C
npm run dev
```

### Issue: Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Issue: Images not loading
- Check URLs in `src/data/products.js`
- Ensure internet connection for Unsplash images
- Check browser console for errors

---

## 📚 Documentation Files

1. **README.md** - Main documentation
2. **DESIGN_COMPARISON_REPORT.md** - Detailed analysis
3. **COMPARISON_TABLE.md** - Section comparison
4. **IMPLEMENTATION_GUIDE.md** - Deployment guide
5. **PROJECT_SUMMARY.md** - Completion summary
6. **QUICK_REFERENCE.md** - This file

---

## 🎯 Common Tasks

### Add a New Page
1. Create file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `Navbar.jsx`

### Add a New Component
1. Create file in `src/components/`
2. Import and use in parent component
3. Style with Tailwind classes

### Modify Product Data
1. Edit `src/data/products.js`
2. Follow existing product structure
3. Save and refresh browser

### Change Fonts
1. Update `tailwind.config.js` fontFamily
2. Import fonts in `src/index.css`
3. Rebuild project

---

## 🚀 Deployment Checklist

- [ ] Update brand name and logo
- [ ] Add real product data
- [ ] Configure environment variables
- [ ] Test all pages and features
- [ ] Check mobile responsiveness
- [ ] Run production build
- [ ] Test production build locally
- [ ] Deploy to hosting platform
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Test live site

---

## 📞 Support Resources

- **Vite**: https://vitejs.dev/
- **React**: https://react.dev/
- **Tailwind**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com/

---

## 💡 Pro Tips

1. **Use the browser DevTools** to inspect and debug
2. **Check the console** for errors
3. **Test on real devices** for mobile
4. **Use Lighthouse** for performance audits
5. **Keep dependencies updated** regularly
6. **Back up your code** with Git
7. **Document your changes** in comments
8. **Test before deploying** to production

---

**Happy Building! 🎉**
