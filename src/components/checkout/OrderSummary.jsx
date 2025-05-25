import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/formatCurrency';

export default function OrderSummary({
  totalItems,
  subtotal,
  shippingMethod,
  shippingCost,
  tax,
  total
}) {
  return (
    <div className="sticky top-24 bg-[var(--md-sys-color-surface-container)] rounded-lg p-6">
      <h2 className="font-bold text-lg mb-4 text-[var(--md-sys-color-on-surface)]">Order Summary</h2>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-[var(--md-sys-color-on-surface-variant)]">Subtotal ({totalItems} items)</span>
          <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--md-sys-color-on-surface-variant)]">Shipping</span>
          <span className="text-[var(--md-sys-color-on-surface)]">
            {shippingCost[shippingMethod] === 0 ? 'Free' : formatCurrency(shippingCost[shippingMethod])}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--md-sys-color-on-surface-variant)]">Tax (10%)</span>
          <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(tax)}</span>
        </div>
      </div>
      
      <div className="pt-3 border-t border-[var(--md-sys-color-outline-variant)]">
        <div className="flex justify-between">
          <span className="font-bold text-[var(--md-sys-color-on-surface)]">Total</span>
          <span className="font-bold text-[var(--md-sys-color-on-surface)]">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  totalItems: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  shippingCost: PropTypes.object.isRequired,
  tax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};