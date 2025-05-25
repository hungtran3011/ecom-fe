import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../hooks/useUserContext';
import { useToast } from '../hooks/useToast';
import axiosInstance from '../libs/axios';
import { formatCurrency } from '../utils/formatCurrency';
import Pagination from '../components/Pagination';

// Order item component to display in the expanded view
function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-[var(--md-sys-color-outline-variant)]">
      <div className="w-16 h-16 flex-shrink-0">
        <img 
          src={item.image || '/images/placeholder.png'} 
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <p className="font-medium text-[var(--md-sys-color-on-surface)]">
          {item.name}
        </p>
        {item.variationName && (
          <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
            Variation: {item.variationName}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className="text-[var(--md-sys-color-on-surface)]">
          {item.quantity} × {formatCurrency(item.price)}
        </p>
        <p className="font-medium text-[var(--md-sys-color-on-surface)]">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}

// Component to display an individual order
function OrderCard({ order, isExpanded, onToggleExpand }) {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const getStatusClass = (status) => {
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-[var(--md-sys-color-surface-container)] rounded-lg shadow-sm overflow-hidden">
      {/* Order Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-[var(--md-sys-color-surface-container-high)] transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[var(--md-sys-color-on-surface)]">
                Order #{order.orderNumber}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          
          <div className="sm:text-right">
            <p className="font-bold text-[var(--md-sys-color-on-surface)]">
              {formatCurrency(order.total)}
            </p>
            <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
            {order.paymentMethod}
          </span>
          <span className="text-[var(--md-sys-color-primary)] flex items-center">
            {isExpanded ? 'Hide Details ' : 'View Details '}
            <span className="mdi ml-1">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </span>
        </div>
      </div>
      
      {/* Order Details (expanded view) */}
      {isExpanded && (
        <div className="border-t border-[var(--md-sys-color-outline-variant)] p-4">
          {/* Order Items */}
          <div className="mb-6">
            <h4 className="font-medium mb-2 text-[var(--md-sys-color-on-surface)]">Items</h4>
            <div className="rounded border border-[var(--md-sys-color-outline-variant)]">
              {order.items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Info */}
            <div>
              <h4 className="font-medium mb-2 text-[var(--md-sys-color-on-surface)]">
                Shipping Information
              </h4>
              <div className="bg-[var(--md-sys-color-surface)] p-3 rounded border border-[var(--md-sys-color-outline-variant)]">
                <p className="text-[var(--md-sys-color-on-surface)]">{order.shippingAddress.fullName}</p>
                <p className="text-[var(--md-sys-color-on-surface)]">{order.shippingAddress.street}</p>
                <p className="text-[var(--md-sys-color-on-surface)]">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-[var(--md-sys-color-on-surface)]">{order.shippingAddress.country}</p>
                <p className="text-[var(--md-sys-color-on-surface)]">{order.shippingAddress.phone}</p>
              </div>
            </div>
            
            {/* Order Totals */}
            <div>
              <h4 className="font-medium mb-2 text-[var(--md-sys-color-on-surface)]">
                Order Summary
              </h4>
              <div className="bg-[var(--md-sys-color-surface)] p-3 rounded border border-[var(--md-sys-color-outline-variant)]">
                <div className="flex justify-between py-1">
                  <span className="text-[var(--md-sys-color-on-surface)]">Subtotal</span>
                  <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--md-sys-color-on-surface)]">Shipping</span>
                  <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--md-sys-color-on-surface)]">Tax</span>
                  <span className="text-[var(--md-sys-color-on-surface)]">{formatCurrency(order.tax)}</span>
                </div>
                <div className="border-t border-[var(--md-sys-color-outline-variant)] my-1"></div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-[var(--md-sys-color-on-surface)]">Total</span>
                  <span className="font-bold text-[var(--md-sys-color-on-surface)]">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="px-4 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
              onClick={() => window.open(`/orders/${order.id}/invoice`, '_blank')}
            >
              Download Invoice
            </button>
            
            {['pending', 'processing'].includes(order.status.toLowerCase()) && (
              <button
                className="px-4 py-2 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full"
                onClick={() => {/* Handle cancellation */}}
              >
                Cancel Order
              </button>
            )}
            
            {order.status.toLowerCase() === 'delivered' && !order.isReviewed && (
              <Link
                to={`/review/order/${order.id}`}
                className="px-4 py-2 bg-[var(--md-sys-color-secondary)] text-[var(--md-sys-color-on-secondary)] rounded-full"
              >
                Write a Review
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Empty state component
function EmptyOrders() {
  return (
    <div className="text-center py-16">
      <span className="mdi text-6xl text-[var(--md-sys-color-on-surface-variant)]">receipt_long</span>
      <h2 className="text-xl font-bold mt-4 text-[var(--md-sys-color-on-surface)]">
        No orders yet
      </h2>
      <p className="text-[var(--md-sys-color-on-surface-variant)] mt-2">
        When you place orders, they will appear here
      </p>
      <Link
        to="/products"
        className="mt-6 inline-block px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
      >
        Start Shopping
      </Link>
    </div>
  );
}

// Main component
export default function OrdersPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();
  const { toast } = useToast();
  
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Orders per page
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  // Fetch orders
  const {
    data: ordersData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['orders', currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(`/order?page=${currentPage}&limit=${limit}`);
      setTotalPages(Math.ceil(response.data.total / limit));
      return response.data;
    },
    enabled: isLoggedIn
  });
  
  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        type: "error"
      });
    }
  }, [error, toast]);
  
  // Toggle expanded order
  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">My Orders</h1>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--md-sys-color-primary)]"></div>
        </div>
      ) : ordersData?.orders?.length > 0 ? (
        <div className="space-y-6">
          {ordersData.orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggleExpand={() => toggleOrderExpand(order.id)}
            />
          ))}
          
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}