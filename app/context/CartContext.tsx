'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem } from '@/app/lib/definitions';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateCartTotals({ ...state, items: updatedItems });
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return calculateCartTotals({ ...state, items: newItems });
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return calculateCartTotals({ ...state, items: updatedItems });
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const updatedItems = state.items.filter(item => item.id !== id);
        return calculateCartTotals({ ...state, items: updatedItems });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return calculateCartTotals({ ...state, items: updatedItems });
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

const calculateCartTotals = (cart: Cart): Cart => {
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return {
    ...cart,
    total: Math.round(total * 100) / 100, // Round to 2 decimal places
    itemCount
  };
};

const loadCartFromStorage = (): Cart => {
  if (typeof window === 'undefined') return { items: [], total: 0, itemCount: 0 };
  
  try {
    const savedCart = localStorage.getItem('handcrafted-haven-cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0, itemCount: 0 };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [], total: 0, itemCount: 0 };
  }
};

const saveCartToStorage = (cart: Cart): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('handcrafted-haven-cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
