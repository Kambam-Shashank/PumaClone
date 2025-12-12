# Implementation Guide & Deployment Instructions

## 🚀 Quick Start

### 1. Development Setup

```bash
# Navigate to project directory
cd c:\Users\sathw\react-projects\Puma_clone

# Install dependencies (if not already done)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### 2. Project Structure Overview

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Main navigation with mega-menu
│   │   └── Footer.jsx          # Footer with newsletter
│   ├── cart/
│   │   └── CartDrawer.jsx      # Slide-out cart
│   ├── home/
│   │   └── Hero.jsx            # Homepage hero carousel
│   └── product/
│       └── ProductCard.jsx     # Product card component
├── pages/
│   ├── HomePage.jsx            # Main landing page
│   ├── CollectionPage.jsx     # Product listing page
│   └── ProductDetailPage.jsx  # Product detail page
├── context/
│   └── CartContext.jsx         # Cart state management
├── data/
│   └── products.js             # Sample product data
└── utils/
    └── helpers.js              # Utility functions
```

## 📦 Building for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** to link your project

**Advantages:**
- Automatic HTTPS
- Global CDN
- Zero configuration
- Automatic deployments from Git
- Edge functions support

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/repo-name"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔌 Backend Integration

### Shopify Storefront API Integration

1. **Install Shopify SDK**
   ```bash
   npm install @shopify/hydrogen-react
   ```

2. **Create Shopify Client** (`src/lib/shopify.js`)
   ```javascript
   import { createStorefrontClient } from '@shopify/hydrogen-react';

   export const client = createStorefrontClient({
     storeDomain: 'your-store.myshopify.com',
     storefrontAccessToken: 'your-access-token',
     storefrontApiVersion: '2024-01',
   });
   ```

3. **Fetch Products**
   ```javascript
   const { data } = await client.query({
     query: `
       query {
         products(first: 10) {
           edges {
             node {
               id
               title
               description
               priceRange {
                 minVariantPrice {
                   amount
                   currencyCode
                 }
               }
             }
           }
         }
       }
     `,
   });
   ```

### Strapi CMS Integration

1. **Install Strapi Client**
   ```bash
   npm install @strapi/strapi
   ```

2. **Create API Client** (`src/lib/strapi.js`)
   ```javascript
   const API_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337';

   export async function fetchProducts() {
     const response = await fetch(`${API_URL}/api/products?populate=*`);
     const data = await response.json();
     return data.data;
   }
   ```

## 💳 Payment Integration

### Razorpay Setup (India)

1. **Install Razorpay**
   ```bash
   npm install razorpay
   ```

2. **Create Razorpay Instance** (`src/lib/razorpay.js`)
   ```javascript
   export const loadRazorpay = () => {
     return new Promise((resolve) => {
       const script = document.createElement('script');
       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
       script.onload = () => resolve(true);
       script.onerror = () => resolve(false);
       document.body.appendChild(script);
     });
   };

   export const initiatePayment = async (orderData) => {
     const res = await loadRazorpay();
     if (!res) {
       alert('Razorpay SDK failed to load');
       return;
     }

     const options = {
       key: process.env.VITE_RAZORPAY_KEY,
       amount: orderData.amount * 100, // Amount in paise
       currency: 'INR',
       name: 'LUXE',
       description: 'Purchase from LUXE',
       order_id: orderData.orderId,
       handler: function (response) {
         // Handle success
         console.log(response);
       },
       prefill: {
         name: orderData.customerName,
         email: orderData.customerEmail,
         contact: orderData.customerPhone,
       },
       theme: {
         color: '#171717',
       },
     };

     const paymentObject = new window.Razorpay(options);
     paymentObject.open();
   };
   ```

## 🔍 Search Integration

### Algolia Setup

1. **Install Algolia**
   ```bash
   npm install algoliasearch react-instantsearch
   ```

2. **Configure Algolia** (`src/lib/algolia.js`)
   ```javascript
   import algoliasearch from 'algoliasearch/lite';

   export const searchClient = algoliasearch(
     process.env.VITE_ALGOLIA_APP_ID,
     process.env.VITE_ALGOLIA_SEARCH_KEY
   );

   export const indexName = 'products';
   ```

## 📊 Analytics Setup

### Google Analytics 4

1. **Add GA4 Script** to `index.html`
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

2. **Track Events**
   ```javascript
   // Track product view
   gtag('event', 'view_item', {
     currency: 'INR',
     value: product.price,
     items: [{
       item_id: product.id,
       item_name: product.name,
       item_category: product.category,
       price: product.price,
     }]
   });

   // Track add to cart
   gtag('event', 'add_to_cart', {
     currency: 'INR',
     value: product.price,
     items: [{
       item_id: product.id,
       item_name: product.name,
       quantity: quantity,
     }]
   });
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API URLs
VITE_API_URL=https://api.yourstore.com
VITE_STRAPI_URL=http://localhost:1337

# Shopify
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-token

# Payment
VITE_RAZORPAY_KEY=rzp_test_xxxxx
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# Search
VITE_ALGOLIA_APP_ID=your-app-id
VITE_ALGOLIA_SEARCH_KEY=your-search-key

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🎨 Customization Guide

### Change Brand Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
        500: '#your-color',
        600: '#your-darker-color',
      },
    },
  },
}
```

### Update Logo

Replace the text logo in `src/components/layout/Navbar.jsx`:

```jsx
<Link to="/" className="...">
  <img src="/logo.svg" alt="Your Brand" className="h-8" />
</Link>
```

### Modify Typography

Update fonts in `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Your-Font', 'system-ui', 'sans-serif'],
  display: ['Your-Display-Font', 'sans-serif'],
},
```

## 📱 PWA Setup (Progressive Web App)

1. **Install Vite PWA Plugin**
   ```bash
   npm install vite-plugin-pwa -D
   ```

2. **Update vite.config.js**
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa';

   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate',
         manifest: {
           name: 'LUXE - Premium Clothing',
           short_name: 'LUXE',
           description: 'Premium contemporary clothing',
           theme_color: '#171717',
           icons: [
             {
               src: 'pwa-192x192.png',
               sizes: '192x192',
               type: 'image/png',
             },
             {
               src: 'pwa-512x512.png',
               sizes: '512x512',
               type: 'image/png',
             },
           ],
         },
       }),
     ],
   });
   ```

## 🧪 Testing

### Unit Tests with Vitest

1. **Install Vitest**
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom
   ```

2. **Create Test** (`src/components/__tests__/ProductCard.test.jsx`)
   ```javascript
   import { render, screen } from '@testing-library/react';
   import { describe, it, expect } from 'vitest';
   import ProductCard from '../product/ProductCard';

   describe('ProductCard', () => {
     it('renders product name', () => {
       const product = {
         id: '1',
         name: 'Test Product',
         price: 2999,
         images: [{ url: 'test.jpg', alt: 'Test' }],
       };
       render(<ProductCard product={product} />);
       expect(screen.getByText('Test Product')).toBeInTheDocument();
     });
   });
   ```

## 🔧 Troubleshooting

### Common Issues

**Issue: Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Issue: Tailwind styles not applying**
```bash
# Ensure Tailwind is properly configured
# Check that index.css imports are present
# Restart dev server
```

**Issue: Images not loading**
- Check image URLs in `src/data/products.js`
- Ensure images are accessible
- Check browser console for CORS errors

## 📈 Performance Optimization

### Image Optimization

1. **Use Cloudinary or similar CDN**
2. **Implement lazy loading** (already done)
3. **Use WebP format** with fallbacks
4. **Optimize image sizes** for different viewports

### Code Splitting

Already implemented via React Router lazy loading:

```javascript
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
```

### Bundle Analysis

```bash
npm install -D rollup-plugin-visualizer
```

Add to `vite.config.js`:

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});
```

## 🎯 Next Steps

1. **Add Backend** - Integrate with Shopify or Strapi
2. **Implement Payments** - Set up Razorpay/Stripe
3. **Add Authentication** - User accounts and orders
4. **Set up Analytics** - Track user behavior
5. **Implement Search** - Add Algolia search
6. **Add Reviews** - Product reviews and ratings
7. **Email Notifications** - Order confirmations
8. **Admin Dashboard** - Manage products and orders

## 📞 Support & Resources

- **Vite Docs**: https://vitejs.dev/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Razorpay Docs**: https://razorpay.com/docs/

---

**Happy Building! 🚀**
