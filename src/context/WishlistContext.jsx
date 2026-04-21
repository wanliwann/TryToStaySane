import { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlistItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) return prevItems;

      // Normalise: extract only what Wishlist.jsx needs,
      // so it never matters which page the product came from
      const normalised = {
        id: product.id,
        name: product.name,
        brand: product.brand || '',
        mainImage: product.mainImage || product.image || product.img || '',
        image:     product.image || product.mainImage || product.img || '',
        sizes:     product.sizes || [],
        // fallback flat price for products without sizes array
        price:     product.price
                   || product.sizes?.[0]?.price
                   || null,
      };

      return [...prevItems, normalised];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.find((item) => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
