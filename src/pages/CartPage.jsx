import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../hooks/useCartContext';
import { useToast } from '../hooks/useToast';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

export default function CartPage() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCartContext();
  const { toast } = useToast();
  
  const handleRemoveItem = (index) => {
    const itemName = cart[index].name;
    removeFromCart(index);
    
    toast({
      title: "Item Removed",
      description: `${itemName} has been removed from your cart.`,
      action: {
        label: "Undo",
        onClick: () => {
          // This functionality would require additional implementation
          // to keep track of removed items for undo capability
        }
      }
    });
  };
  
  const handleClearCart = () => {
    clearCart();
    
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  if (cart.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
        Shopping Cart
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-[var(--md-sys-color-surface-container)] rounded-lg overflow-hidden">
            {/* Cart Header
            <div className="hidden sm:flex items-center p-4 border-b border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-variant)]">
              <div className="w-20"></div>
              <div className="flex-1">Product</div>
              <div className="w-32 text-center">Quantity</div>
              <div className="w-24 text-right">Price</div>
              <div className="w-24 text-right">Subtotal</div>
              <div className="w-10"></div>
            </div> */}
            
            {/* Cart Items */}
            <div>
              {cart.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.variationId || '0'}`}
                  item={item}
                  index={index}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
            
            {/* Cart Actions */}
            <div className="p-4 flex justify-between items-center">
              <button
                onClick={handleClearCart}
                className="text-[var(--md-sys-color-error)] hover:text-[var(--md-sys-color-on-error-container)] transition-colors flex items-center"
              >
                <span className="mdi mr-1">delete</span>
                Clear Cart
              </button>
              <Link
                to="/products"
                className="text-[var(--md-sys-color-primary)] hover:text-[var(--md-sys-color-on-surface)] flex items-center"
              >
                <span className="mdi mr-1">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <CartSummary 
            totalItems={totalItems} 
            subtotal={totalPrice} 
          />
        </div>
      </div>
    </div>
  );
}