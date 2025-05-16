import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, variationId } = action.payload;
      const itemKey = variationId ? `${id}-${variationId}` : id;
      const existingItemIndex = state.items.findIndex(item => 
        (item.variationId ? `${item.id}-${item.variationId}` : item.id) === itemKey
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // New item, add to cart
        newItems = [...state.items, action.payload];
      }
      
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    }
    
    case REMOVE_FROM_CART: {
      const newItems = state.items.filter((_, index) => index !== action.payload);
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    }
    
    case UPDATE_QUANTITY: {
      const { index, quantity } = action.payload;
      
      const newItems = state.items.map((item, i) => 
        i === index ? { ...item, quantity: quantity } : item
      );
      
      const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
    }
    
    case CLEAR_CART: {
      return initialState;
    }
    
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // Load cart from localStorage if available
  const loadInitialState = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return initialState;
  };
  
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());
  
  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);
  
  // Cart actions
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };
  
  const removeFromCart = (index) => {
    dispatch({ type: REMOVE_FROM_CART, payload: index });
  };
  
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) {
      return removeFromCart(index);
    }
    dispatch({ type: UPDATE_QUANTITY, payload: { index, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;