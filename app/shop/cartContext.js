'use client'
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const StateProvider = ({ children }) => {
  const [cart, setCart] = useState({ count: 0, items: [] });

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
