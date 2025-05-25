import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ShippingForm({ 
  formData,
  formErrors, 
  shippingMethod,
  paymentMethod,
  shippingCost,
  isLoggedIn,
  onInputChange,
  onShippingMethodChange,
  onPaymentMethodChange,
  onSubmit 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface)]">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={onInputChange}
            className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
            placeholder="Your full name"
          />
          {formErrors.fullName && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.fullName}</span>}
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
            placeholder="Your email address"
          />
          {formErrors.email && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.email}</span>}
        </div>
      </div>
      
      {/* Address Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-[var(--md-sys-color-on-surface)]">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="address" // Keep as "address" for backward compatibility
              value={formData.address}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md border ${formErrors.address ? 'border-[var(--md-sys-color-error)]' : 'border-[var(--md-sys-color-outline)]'} p-3 bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]`}
              placeholder="123 Main Street"
            />
            {formErrors.address && <p className="mt-1 text-sm text-[var(--md-sys-color-error)]">{formErrors.address}</p>}
          </div>
          
          <div>
            <label htmlFor="home" className="block text-sm font-medium text-[var(--md-sys-color-on-surface)]">
              Apartment/Suite/Unit
            </label>
            <input
              type="text"
              id="home"
              name="home"
              value={formData.home || ''} // Use separate field
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md border ${formErrors.home ? 'border-[var(--md-sys-color-error)]' : 'border-[var(--md-sys-color-outline)]'} p-3 bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]`}
              placeholder="Apt 4B, Floor 3, etc."
            />
            {formErrors.home && <p className="mt-1 text-sm text-[var(--md-sys-color-error)]">{formErrors.home}</p>}
          </div>
        </div>
        
        {/* Rest of address fields */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={onInputChange}
            className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
            placeholder="City"
          />
          {formErrors.city && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.city}</span>}
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="state" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
            State/Province
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={onInputChange}
            className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
            placeholder="State/Province"
          />
          {formErrors.state && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.state}</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="zipCode" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
            ZIP/Postal Code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={onInputChange}
            className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
            placeholder="ZIP/Postal Code"
          />
          {formErrors.zipCode && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.zipCode}</span>}
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={onInputChange}
            className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
            placeholder="Country"
          />
          {formErrors.country && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.country}</span>}
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
          placeholder="Phone number for delivery updates"
        />
        {formErrors.phone && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.phone}</span>}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)] mb-4">Shipping Method</h3>
        
        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-[var(--md-sys-color-primary)]' : 'border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)]'}`}>
            <input
              type="radio"
              value="standard"
              checked={shippingMethod === 'standard'}
              onChange={() => onShippingMethodChange('standard')}
              className="form-radio text-[var(--md-sys-color-primary)]"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">Standard Shipping</h4>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">5-7 business days</p>
            </div>
            <span className="font-medium text-[var(--md-sys-color-on-surface)]">
              {shippingCost.standard === 0 ? 'Free' : formatCurrency(shippingCost.standard)}
            </span>
          </label>
          
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === 'express' ? 'border-[var(--md-sys-color-primary)]' : 'border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)]'}`}>
            <input
              type="radio"
              value="express"
              checked={shippingMethod === 'express'}
              onChange={() => onShippingMethodChange('express')}
              className="form-radio text-[var(--md-sys-color-primary)]"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">Express Shipping</h4>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">2-3 business days</p>
            </div>
            <span className="font-medium text-[var(--md-sys-color-on-surface)]">{formatCurrency(shippingCost.express)}</span>
          </label>
          
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === 'overnight' ? 'border-[var(--md-sys-color-primary)]' : 'border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)]'}`}>
            <input
              type="radio"
              value="overnight"
              checked={shippingMethod === 'overnight'}
              onChange={() => onShippingMethodChange('overnight')}
              className="form-radio text-[var(--md-sys-color-primary)]"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">Overnight Delivery</h4>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">Next business day</p>
            </div>
            <span className="font-medium text-[var(--md-sys-color-on-surface)]">{formatCurrency(shippingCost.overnight)}</span>
          </label>
        </div>
      </div>

      {/* Payment Method Selection - Added to shipping form */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)] mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[var(--md-sys-color-primary)]' : 'border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)]'}`}>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => onPaymentMethodChange('cod')}
              className="form-radio text-[var(--md-sys-color-primary)]"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">Cash on Delivery</h4>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                Pay with cash when your order arrives
              </p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[var(--md-sys-color-primary)]' : 'border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)]'}`}>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => onPaymentMethodChange('card')}
              className="form-radio text-[var(--md-sys-color-primary)]"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">Credit/Debit Card</h4>
              {!isLoggedIn && (
                <p className="text-xs text-[var(--md-sys-color-error)]">
                  Sign-in required for this payment method
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <span className="mdi text-[var(--md-sys-color-on-surface-variant)]">credit_card</span>
            </div>
          </label>
          
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-[var(--md-sys-color-primary)]' : 'border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)]'}`}>
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => onPaymentMethodChange('paypal')}
              className="form-radio text-[var(--md-sys-color-primary)]"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">PayPal</h4>
              {!isLoggedIn && (
                <p className="text-xs text-[var(--md-sys-color-error)]">
                  Sign-in required for this payment method
                </p>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button 
          type="submit" 
          className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
        >
          {paymentMethod === 'cod' ? 'Continue to Review' : 'Continue to Payment'}
        </button>
      </div>
    </form>
  );
}

ShippingForm.propTypes = {
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  shippingCost: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onShippingMethodChange: PropTypes.func.isRequired,
  onPaymentMethodChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};