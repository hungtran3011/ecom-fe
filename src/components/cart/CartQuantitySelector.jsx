import React from 'react';

export default function CartQuantitySelector({ quantity, onChange, min = 1, max }) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (!max || quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    
    if (value < min) {
      onChange(min);
    } else if (max && value > max) {
      onChange(max);
    } else {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center h-10 w-40 border border-[var(--md-sys-color-outline)] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="w-10 h-full flex items-center justify-center text-[var(--md-sys-color-on-surface)] disabled:text-[var(--md-sys-color-on-surface-variant)] disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <span className="mdi">remove</span>
      </button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleChange}
        className="w-20 h-full border-x border-[var(--md-sys-color-outline)] text-center bg-transparent text-[var(--md-sys-color-on-surface)]"
        aria-label="Quantity"
      />
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={max && quantity >= max}
        className="w-10 h-full flex items-center justify-center text-[var(--md-sys-color-on-surface)] disabled:text-[var(--md-sys-color-on-surface-variant)] disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <span className="mdi">add</span>
      </button>
    </div>
  );
}