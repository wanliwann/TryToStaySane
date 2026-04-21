import React from "react";
import ReactDOM from "react-dom/client";

// ===== GLOBAL & APP CSS =====
import "./index.css";
import "./App.css";
import "./animations.css";

// ===== COMPONENT CSS =====
import "./components/AboutPreview.css";
import "./components/Breadcrumb.css";
import "./components/Button.css";
import "./components/Footer.css";
import "./components/MembershipModal.css";
import "./components/Navbar.css";
import "./components/Newsletter.css";
import "./components/ProductCard.css";
import "./components/RatingsDistribution.css";
import "./components/SearchOverlay.css";

// ===== PAGE CSS =====
import "./pages/BestsellersMen.css";
import "./pages/Browse.css";
import "./pages/Cart.css";
import "./pages/Checkout.css";
import "./pages/Contact.css";
import "./pages/ContactConfirmation.css";
import "./pages/ContactMessages.css";
import "./pages/DeliveryTracking.css";
import "./pages/FeedbackForm.css";
import "./pages/GiftCards.css";
import "./pages/History.css";
import "./pages/OrderConfirmation.css";
import "./pages/OurStory.css";
import "./pages/Payment.css";
import "./pages/ProductDetail.css";
import "./pages/Shop.css";
import "./pages/Wishlist.css";

// ===== SECTION CSS =====
import "./sections/AboutPreview.css";
import "./sections/Categories.css";
import "./sections/FeaturedPerfumes.css";
import "./sections/Hero.css";
import "./sections/PromoSection.css";
import "./sections/Testimonials.css";

import App from "./App.jsx";

// Add Font Awesome icons
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
