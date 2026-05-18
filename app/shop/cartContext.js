'use client'
import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const StateProvider = ({ children }) => {
  const [cart, setCart] = useState({ count: 0, items: [], shipping: 200 });

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) return;
    if (storedCart.match(/"count":0/)) {
      localStorage.removeItem('cart');
    } else {
      try {
        const parsed = JSON.parse(storedCart);
        if (parsed) setCart(parsed);
      } catch {
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);