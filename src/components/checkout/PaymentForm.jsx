import React from 'react';
import PropTypes from 'prop-types';

export default function PaymentForm({
  formData,
  formErrors,
  paymentMethod,
  isLoggedIn,
  onInputChange,
  onPaymentMethodChange,
  onBack,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface)]">Payment Method</h2>
      
      <div className="space-y-3">
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
            <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
              Pay with cash when your order arrives
            </p>
          </div>
        </label>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-6 mt-6 p-6 border border-[var(--md-sys-color-outline)] rounded-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="cardNumber" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
              Card Number
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={onInputChange}
              className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
              placeholder="0000 0000 0000 0000"
            />
            {formErrors.cardNumber && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.cardNumber}</span>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="cardHolder" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                Cardholder Name
              </label>
              <input
                id="cardHolder"
                name="cardHolder"
                type="text"
                value={formData.cardHolder}
                onChange={onInputChange}
                className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                placeholder="Name on card"
              />
              {formErrors.cardHolder && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.cardHolder}</span>}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="expiryDate" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  value={formData.expiryDate}
                  onChange={onInputChange}
                  className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                  placeholder="MM/YY"
                />
                {formErrors.expiryDate && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.expiryDate}</span>}
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="cvv" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  value={formData.cvv}
                  onChange={onInputChange}
                  className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                  placeholder="123"
                />
                {formErrors.cvv && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.cvv}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="p-6 border border-[var(--md-sys-color-outline)] rounded-lg text-center">
          <p className="text-[var(--md-sys-color-on-surface-variant)] mb-4">
            You will be redirected to PayPal to complete your payment after reviewing your order.
          </p>
        </div>
      )}
      
      {paymentMethod === 'cod' && (
        <div className="p-6 border border-[var(--md-sys-color-outline)] rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <span className="mdi text-3xl text-[var(--md-sys-color-on-surface-variant)]">payments</span>
            <div>
              <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">Cash on Delivery</h4>
              <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                Pay when your order arrives
              </p>
            </div>
          </div>
          <p className="text-[var(--md-sys-color-on-surface-variant)]">
            Have the exact amount ready when your package arrives. Our delivery person will collect the payment.
          </p>
        </div>
      )}

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
          className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
        >
          Review Order
        </button>
      </div>
    </form>
  );
}

PaymentForm.propTypes = {
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPaymentMethodChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};