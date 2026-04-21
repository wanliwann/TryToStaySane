import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('✓ Cart saved to localStorage:', cartItems);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoading]);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item with same product + size already exists
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        // Update quantity if exists
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Add new item
      return [...prevItems, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce((sum, item) => {
    const sizeData = item.sizes?.find((s) => s.oz === item.size);
    return sum + (sizeData?.price || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
