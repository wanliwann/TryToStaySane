import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ===== LAZY LOAD ALL PAGES (Code Splitting) =====
const Home = lazy(() => import('./pages/Home'));
const Browse = lazy(() => import('./pages/Browse'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const BestsellersMen = lazy(() => import('./pages/BestsellersMen'));
const BestsellersWomen = lazy(() => import('./pages/BestsellersWomen'));
const LuxuryMen = lazy(() => import('./pages/LuxuryMen'));
const LuxuryWomen = lazy(() => import('./pages/LuxuryWomen'));
const ScentOfMonthMen = lazy(() => import('./pages/ScentOfMonthMen'));
const ScentOfMonthWomen = lazy(() => import('./pages/ScentOfMonthWomen'));
const OurStory = lazy(() => import('./pages/OurStory'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Account = lazy(() => import('./pages/Account'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const DeliveryTracking = lazy(() => import('./pages/DeliveryTracking'));
const FeedbackForm = lazy(() => import('./pages/FeedbackForm'));
const GiftCards = lazy(() => import('./pages/GiftCards'));
const ContactConfirmation = lazy(() => import('./pages/ContactConfirmation'));
const History = lazy(() => import('./pages/History'));

// ===== LOADING FALLBACK (Better UX) =====
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '16px',
    color: '#D4A848',
    fontFamily: 'Nunito, sans-serif',
    fontWeight: '600'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '24px', marginBottom: '12px' }}>✨</div>
      <p>Loading...</p>
    </div>
  </div>
);

// ===== ERROR BOUNDARY =====
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h2 style={{ color: '#B87848' }}>⚠️ Something went wrong</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#D4A848',
              color: '#302418',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Make ErrorBoundary work with React
import React from 'react';

import './App.css';
import './animations.css';

function App() {
  useEffect(() => {
    // Initialize sample data
    if (!localStorage.getItem('orderHistory')) {
      localStorage.setItem('orderHistory', JSON.stringify([{
        orderId: "ORD-12345",
        customerName: "Emily",
        email: "emily@example.com",
        location: "Phnom Penh",
        itemCount: 1,
        total: 1185.10,
        subtotal: 1185.10,
        discount: 0,
        shipping: 0,
        date: "2026-04-18",
        status: "Completed"
      }]));
      localStorage.setItem('customerFeedback', JSON.stringify([{
        name: "Emily",
        rating: 5,
        message: "Amazing perfume! Fast delivery!",
        date: "2026-04-18"
      }]));
      localStorage.setItem('membershipData', JSON.stringify({
        isMember: true,
        name: "Emily",
        email: "emily@example.com",
        joinedDate: "2026-04-18",
        totalSpent: 1185.10
      }));
    }
  }, []);

  return (
    <ErrorBoundary>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Home & Shop Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Browse />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/browse/:gender" element={<Shop />} />

                {/* Category Routes */}
                <Route path="/bestsellers/men" element={<BestsellersMen />} />
                <Route path="/bestsellers/women" element={<BestsellersWomen />} />
                <Route path="/luxury/men" element={<LuxuryMen />} />
                <Route path="/luxury/women" element={<LuxuryWomen />} />
                <Route path="/scent-of-month/men" element={<ScentOfMonthMen />} />
                <Route path="/scent-of-month/women" element={<ScentOfMonthWomen />} />

                {/* Product Routes */}
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Info Routes */}
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/reach-out" element={<Contact />} />
                <Route path="/contact-confirmation" element={<ContactConfirmation />} />

                {/* Shopping Routes */}
                <Route path="/bag" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/account" element={<Account />} />

                {/* Checkout Routes */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />

                {/* Post-Purchase Routes */}
                <Route path="/delivery" element={<DeliveryTracking />} />
                <Route path="/feedback" element={<FeedbackForm />} />
                <Route path="/gift-cards" element={<GiftCards />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </Suspense>
            <Footer />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
