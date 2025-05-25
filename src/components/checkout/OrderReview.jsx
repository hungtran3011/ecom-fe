import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/formatCurrency';

export default function OrderReview({
  formData,
  shippingMethod,
  shippingCost,
  paymentMethod,
  cart,
  subtotal,
  shipping,
  tax,
  total,
  isSubmitting,
  onBack,
  onShippingEdit,
  onPaymentEdit,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface)]">Review Order</h2>
      
      {/* Shipping Information Review */}
      <div className="border border-[var(--md-sys-color-outline)] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Shipping Information</h3>
          <button
            type="button"
            onClick={onShippingEdit}
            className="text-[var(--md-sys-color-primary)] text-sm"
          >
            Edit
          </button>
        </div>
        
        <div className="space-y-2 text-[var(--md-sys-color-on-surface)]">
          <p>{formData.fullName}</p>
          <p>{formData.address}</p>
          <p>
            {formData.city}, {formData.state} {formData.zipCode}
          </p>
          <p>{formData.country}</p>
          <p>Phone: {formData.phone}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-[var(--md-sys-color-outline-variant)]">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">
                {shippingMethod === 'standard' && 'Standard Shipping'}
                {shippingMethod === 'express' && 'Express Shipping'}
                {shippingMethod === 'overnight' && 'Overnight Delivery'}
              </h4>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                {shippingMethod === 'standard' && '5-7 business days'}
                {shippingMethod === 'express' && '2-3 business days'}
                {shippingMethod === 'overnight' && 'Next business day'}
              </p>
            </div>
            <span className="font-medium text-[var(--md-sys-color-on-surface)]">
              {shippingCost[shippingMethod] === 0 ? 'Free' : formatCurrency(shippingCost[shippingMethod])}
            </span>
          </div>
        </div>
      </div>
      
      {/* Payment Information Review */}
      <div className="border border-[var(--md-sys-color-outline)] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Payment Information</h3>
          <button
            type="button"
            onClick={onPaymentEdit}
            className="text-[var(--md-sys-color-primary)] text-sm"
          >
            Edit
          </button>
        </div>
        
        {paymentMethod === 'card' ? (
          <div className="flex items-center gap-4">
            <span className="mdi text-2xl text-[var(--md-sys-color-on-surface)]">credit_card</span>
            <div>
              <p className="font-medium text-[var(--md-sys-color-on-surface)]">
                Card ending in <span id="cardNumber-last4"></span>
              </p>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                {formData.cardHolder}
              </p>
            </div>
          </div>
        ) : paymentMethod === 'paypal' ? (
          <div className="flex items-center gap-4">
            <span className="text-[var(--md-sys-color-on-surface)]">PayPal</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="mdi text-2xl text-[var(--md-sys-color-on-surface)]">payments</span>
            <div>
              <p className="font-medium text-[var(--md-sys-color-on-surface)]">Cash on Delivery</p>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                Pay when your order arrives
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Order Summary */}
      <div className="border border-[var(--md-sys-color-outline)] rounded-lg p-6">
        <h3 className="font-medium text-[var(--md-sys-color-on-surface)] mb-4">Order Summary</h3>
        
        {/* Cart items */}
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.variationId || ''}`} className="flex gap-4">
              <div className="w-16 h-16 shrink-0 bg-[var(--md-sys-color-surface-variant)] rounded-md overflow-hidden">
                <img 
                  src={item.image || '/images/placeholder.png'} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--md-sys-color-on-surface)]">{item.name}</p>
                {item.variationName && (
                  <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                    {item.variationName}
                  </p>
                )}
                <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                  {formatCurrency(item.price)} x {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[var(--md-sys-color-on-surface)]">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Total */}
        <div className="space-y-2 border-t border-[var(--md-sys-color-outline-variant)] pt-4">
          <div className="flex justify-between">
            <span className="text-[var(--md-sys-color-on-surface-variant)]">Subtotal</span>
            <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--md-sys-color-on-surface-variant)]">Shipping</span>
            <span className="text-[var(--md-sys-color-on-surface)]">
              {shippingCost[shippingMethod] === 0 ? 'Free' : formatCurrency(shipping)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--md-sys-color-on-surface-variant)]">Tax</span>
            <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[var(--md-sys-color-outline-variant)]">
            <span className="font-bold text-[var(--md-sys-color-on-surface)]">Total</span>
            <span className="font-bold text-[var(--md-sys-color-on-surface)]">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-6 flex justify-between">
        <button 
          type="button" 
          onClick={onBack}
          className="px-6 py-3 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full hover:bg-[var(--md-sys-color-surface-variant)] transition-colors"
        >
          Back
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}

OrderReview.propTypes = {
  formData: PropTypes.object.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  shippingCost: PropTypes.object.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  cart: PropTypes.array.isRequired,
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onShippingEdit: PropTypes.func.isRequired,
  onPaymentEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};