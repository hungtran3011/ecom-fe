import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../libs/axios';
import { formatCurrency } from '../utils/formatCurrency';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      const response = await axiosInstance.get('/search', {
        params: {
          query: searchQuery,
          page: pagination.page,
          limit: pagination.limit
        }
      });
      
      setSearchResults(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search products. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };
  
  // When page changes, perform the search again
  useEffect(() => {
    if (searchPerformed && searchQuery) {
      const fetchPageResults = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await axiosInstance.get('/search', {
            params: {
              query: searchQuery,
              page: pagination.page,
              limit: pagination.limit
            }
          });
          
          setSearchResults(response.data.products);
          setPagination(response.data.pagination);
        } catch (err) {
          console.error('Search error:', err);
          setError('Failed to search products. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchPageResults();
    }
  }, [pagination.page, searchPerformed]);
  
  // Generate array of page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto py-4 px-4 flex flex-col min-h-screen">
      {/* Search input */}
      <form 
        onSubmit={handleSearch}
        className="flex h-12 px-4 justify-between items-center gap-3 w-full border border-[var(--md-sys-color-outline)] rounded-2xl mb-6"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none bg-transparent text-[var(--md-sys-color-on-surface)]"
          placeholder="Search products..."
          autoFocus
        />
        <button 
          type="submit"
          className="flex items-center justify-center p-2"
          disabled={isLoading}
        >
          <span className="mdi text-[var(--md-sys-color-on-surface)]">
            {isLoading ? 'hourglass_empty' : 'search'}
          </span>
        </button>
      </form>
      
      {/* Error message */}
      {error && (
        <div className="bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)] p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {/* Search results */}
      {searchPerformed ? (
        <div className="flex-1">
          <h2 className="text-xl font-medium text-[var(--md-sys-color-on-surface)] mb-4">
            {isLoading ? 'Searching...' : 
             `Search Results ${searchResults.length > 0 ? `(${pagination.total} found)` : ''}`}
          </h2>
          
          {/* Results */}
          {!isLoading && searchResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {searchResults.map(product => (
                  <Link 
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="bg-[var(--md-sys-color-surface-container)] rounded-lg overflow-hidden hover:shadow-md transition-shadow flex"
                  >
                    <div className="h-24 w-24 bg-[var(--md-sys-color-surface-container-high)] flex items-center justify-center">
                      {product.productImages && product.productImages.length > 0 ? (
                        <img 
                          src={product.productImages[0]} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder.png';
                          }}
                        />
                      ) : (
                        <span className="mdi text-4xl text-[var(--md-sys-color-on-surface-variant)]">
                          photo
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex-1">
                      <h4 className="font-medium text-[var(--md-sys-color-on-surface)] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] mb-2 line-clamp-1">
                        {product.description || 'No description'}
                      </p>
                      <div className="flex items-center justify-between gap-12">
                        <p className="text-[var(--md-sys-color-primary)] font-medium">
                          {formatCurrency(product.price)}
                        </p>
                        {product.hasVariations && (
                          <span className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                            Multiple variations
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 my-6">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                    disabled={pagination.page === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--md-sys-color-outline)] disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    <span className="mdi">chevron_left</span>
                  </button>
                  
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full 
                        ${pagination.page === number 
                          ? 'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]'
                          : 'border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)]'
                        }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
                    disabled={pagination.page === pagination.pages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--md-sys-color-outline)] disabled:opacity-50"
                    aria-label="Next page"
                  >
                    <span className="mdi">chevron_right</span>
                  </button>
                </div>
              )}
            </>
          ) : !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="mdi text-6xl text-[var(--md-sys-color-on-surface-variant)] mb-4">
                search_off
              </span>
              <h3 className="text-xl font-medium text-[var(--md-sys-color-on-surface)] mb-2">
                No products found
              </h3>
              <p className="text-[var(--md-sys-color-on-surface-variant)] mb-6">
                We couldn't find any products matching "{searchQuery}"
              </p>
              <button 
                onClick={() => {
                  setSearchPerformed(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
              >
                Browse Featured Products
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Categories section - only show when no search performed */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-3">
              Categories
            </h3>
            <div className="flex overflow-x-auto gap-3 pb-2">
              {categories.map((category) => (
                <Link 
                  key={category.name}
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
              ))}
            </div>
          </div>
          
          {/* Featured products section - only show when no search performed */}
          <div className="mb-6 flex-1">
            <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-3">
              Featured Products
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.id}
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
              ))}
            </div>
          </div>
          
          {/* Recent searches section - only show when no search performed */}
          <div className="mt-auto">
            <h3 className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] mb-2">
              Recent Searches
            </h3>
            <div className="flex flex-col gap-2">
              {recentSearches.map((search, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    // Trigger search immediately
                    setTimeout(() => {
                      document.querySelector('form').dispatchEvent(
                        new Event('submit', { cancelable: true, bubbles: true })
                      );
                    }, 0);
                  }}
                  className="flex items-center justify-between p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-md w-full text-left"
                >
                  <span className="text-[var(--md-sys-color-on-surface)]">{search}</span>
                  <span className="mdi text-[var(--md-sys-color-on-surface-variant)]">history</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}