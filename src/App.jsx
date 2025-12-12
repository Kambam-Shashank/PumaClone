import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections/:category" element={<CollectionPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="*" element={
                <div className="container-custom py-20 text-center">
                  <h1 className="text-4xl font-display font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-neutral-600 mb-8">The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn btn-primary">Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
