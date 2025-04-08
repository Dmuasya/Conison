import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Calculate total
    const newTotal = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      return sum + price;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (service, price) => {
    setCart(prevCart => {
      // Check if the service is already in the cart
      const isAlreadyInCart = prevCart.some(item => item.service === service);
      
      if (isAlreadyInCart) {
        // If the service is already in the cart, return the current cart without changes
        return prevCart;
      }
      
      // If the service is not in the cart, add it
      return [...prevCart, { service, price }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 