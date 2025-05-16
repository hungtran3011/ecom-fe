import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartQuantitySelector from './CartQuantitySelector';
import { formatCurrency } from '../../utils/formatCurrency';

export default function CartItem({ item, index, onRemove, onUpdateQuantity }) {
  const { id, name, price, image, quantity, variationId, variationName } = item;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-[var(--md-sys-color-outline-variant)]">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="w-10 sm:w-20 h-full shrink-0">
        <img 
          src={image || '/images/placeholder.png'} 
          alt={name}
          className="w-full object-cover rounded-md"
        />
      </Link>
      
      {/* <div className="flex flex-col w-full"> */}
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link
              to={`/product/${id}`}
              className="text-lg font-medium text-[var(--md-sys-color-on-surface)] hover:text-[var(--md-sys-color-primary)] transition-colors"
            >
              {name}
            </Link>
          
            <div className="flex flex-col">
                {variationName && (
                  <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                    Variation: {variationName}
                  </p>
                )}
                <div className="mt-1 sm:hidden">
                  <p className="font-medium text-[var(--md-sys-color-on-surface)]">
                    {formatCurrency(price)}
                  </p>
                </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            {/* Quantity Selector - Mobile: Below product info, Desktop: Next to product info */}
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              <CartQuantitySelector
                quantity={quantity}
                onChange={(newQuantity) => onUpdateQuantity(index, newQuantity)}
                min={1}
              />
            </div>
            
            {/* Subtotal */}
            <div className="text-right">
              <p className="font-medium text-[var(--md-sys-color-on-surface)]">
                {formatCurrency(price * quantity)}
              </p>
            </div>
          </div>
      {/* </div> */}
      
      {/* Remove Button */}
      <button
        onClick={() => onRemove(index)}
        className="text-[var(--md-sys-color-error)] hover:text-[var(--md-sys-color-on-error-container)] transition-colors"
        aria-label={`Remove ${name} from cart`}
      >
        <span className="mdi">delete</span>
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    variationId: PropTypes.string,
    variationName: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};
