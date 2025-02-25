'use client'
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const StateProvider = ({ children }) => {
  const [cart, setCart] = useState({ count: 0, items: [] });

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart.match(/"count":0/)) {
      localStorage.removeItem('cart');
    } else {
      setCart(JSON.parse(storedCart));
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
