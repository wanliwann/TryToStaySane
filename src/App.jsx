import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'

// Category Pages
import BestsellersMen from './pages/BestsellersMen'
import BestsellersWomen from './pages/BestsellersWomen'
import LuxuryMen from './pages/LuxuryMen'
import LuxuryWomen from './pages/LuxuryWomen'
import ScentOfMonthMen from './pages/ScentOfMonthMen'
import ScentOfMonthWomen from './pages/ScentOfMonthWomen'

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* HOME & BASIC PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<About />} />
          <Route path="/reach-out" element={<Contact />} />
          <Route path="/bag" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* SHOP PAGES (Gender-specific) */}
          <Route path="/browse/:gender" element={<Shop />} />

          {/* BESTSELLERS */}
          <Route path="/bestsellers/men" element={<BestsellersMen />} />
          <Route path="/bestsellers/women" element={<BestsellersWomen />} />

          {/* LUXURY SCENTS */}
          <Route path="/luxury/men" element={<LuxuryMen />} />
          <Route path="/luxury/women" element={<LuxuryWomen />} />

          {/* SCENT OF THE MONTH */}
          <Route path="/scent-of-month/men" element={<ScentOfMonthMen />} />
          <Route path="/scent-of-month/women" element={<ScentOfMonthWomen />} />

          {/* PRODUCT DETAIL (works for both men & women) */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
