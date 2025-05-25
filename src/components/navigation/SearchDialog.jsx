import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import BottomNavigationButton from './BottomNavigationButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SearchDialog({ isMobile = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const recentSearches = [
    'iPhone 16 Pro',
    'Samsung S24'
  ];
  
  // Sample categories
  const categories = [
    { name: 'Phones', icon: 'smartphone', path: '/products/phones' },
    { name: 'Laptops', icon: 'laptop', path: '/products/laptops' },
    { name: 'Tablets', icon: 'tablet_android', path: '/products/tablets' },
    { name: 'Accessories', icon: 'headphones', path: '/products/accessories' },
    { name: 'Screens', icon: 'desktop_windows', path: '/products/screens' }
  ];
  
  // Sample featured products
  const featuredProducts = [
    { id: '1', name: 'iPhone 16 Pro', price: 999, image: '/images/product1.jpg' },
    { id: '2', name: 'Samsung Galaxy S24', price: 899, image: '/images/product2.jpg' },
    { id: '3', name: 'MacBook Air M3', price: 1299, image: '/images/product3.jpg' },
    { id: '4', name: 'AirPods Pro 2', price: 249, image: '/images/product4.jpg' }
  ];

  // For mobile, just render a button that navigates to the search page
  if (isMobile) {
    return (
      <BottomNavigationButton 
        icon="search"
        label="Search"
        to="/search"
      />
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <BottomNavigationButton 
          icon="search"
          label="Search"
        />
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed inset-0 z-45 bg-[var(--md-sys-color-surface)] p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
              Search
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full flex items-center">
                <span className="mdi text-[var(--md-sys-color-on-surface)]">close</span>
              </button>
            </Dialog.Close>
          </div>
          
          {/* Search input */}
          <div className="flex h-12 px-4 justify-between items-center gap-3 w-full border border-[var(--md-sys-color-outline)] rounded-2xl mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none bg-transparent text-[var(--md-sys-color-on-surface)]"
              placeholder="Search products..."
              autoFocus
            />
            <button className="flex items-center justify-center p-2">
              <span className="mdi text-[var(--md-sys-color-on-surface)]">search</span>
            </button>
          </div>
          
          {/* Categories section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-3">
              Categories
            </h3>
            <div className="flex overflow-x-auto gap-3 pb-2">
              {categories.map((category) => (
                <Dialog.Close key={category.name} asChild>
                  <Link 
                    to={category.path}
                    className="flex flex-col items-center justify-center bg-[var(--md-sys-color-surface-container)] p-3 rounded-lg min-w-[80px] hover:bg-[var(--md-sys-color-surface-variant)] transition-colors"
                  >
                    <span className="mdi text-[var(--md-sys-color-primary)] text-2xl mb-1">
                      {category.icon}
                    </span>
                    <span className="text-xs text-[var(--md-sys-color-on-surface)]">
                      {category.name}
                    </span>
                  </Link>
                </Dialog.Close>
              ))}
            </div>
          </div>
          
          {/* Featured products section */}
          <div className="mb-6 flex-1 overflow-y-auto">
            <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-3">
              Featured Products
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((product) => (
                <Dialog.Close key={product.id} asChild>
                  <Link 
                    to={`/product/${product.id}`}
                    className="bg-[var(--md-sys-color-surface-container)] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.png';
                        }} 
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="text-sm font-medium text-[var(--md-sys-color-on-surface)] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-[var(--md-sys-color-primary)]">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </Dialog.Close>
              ))}
            </div>
          </div>
          
          {/* Recent searches section */}
          <div className="mt-auto">
            <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-2">
              Recent Searches
            </h3>
            <div className="flex flex-col gap-2">
              {recentSearches.map((search, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-md"
                >
                  <span className="text-[var(--md-sys-color-on-surface)]">{search}</span>
                  <span className="mdi text-[var(--md-sys-color-on-surface-variant)]">history</span>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

SearchDialog.propTypes = {
  isMobile: PropTypes.bool
};