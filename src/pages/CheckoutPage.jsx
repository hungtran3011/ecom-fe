import React, { useState, useEffect, useCallback } from 'react';
import crypto from 'crypto';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../hooks/useCartContext';
import { useUserContext } from '../hooks/useUserContext';
import { useToast } from '../hooks/useToast';
import axiosInstance from '../libs/axios';
import * as Tabs from '@radix-ui/react-tabs';

import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderReview from '../components/checkout/OrderReview';
import OrderSummary from '../components/checkout/OrderSummary';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import LoginRequired from '../components/checkout/LoginRequired';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart } = useCartContext();
  const { isLoggedIn, user, token } = useUserContext();
  const { toast } = useToast();
  
  // Change the initial states to get values from localStorage if available
  const getInitialValue = (key, defaultValue) => {
    try {
      const savedData = localStorage.getItem('checkoutFormData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData[key] || defaultValue;
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return defaultValue;
  };
  
  const getInitialFormData = () => {
    try {
      const savedData = localStorage.getItem('checkoutFormData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData.formData || {
          fullName: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          phone: '',
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: ''
        };
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
    }
    return {
      fullName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    };
  };
  
  const [activeStep, setActiveStep] = useState('shipping');
  const [shippingMethod, setShippingMethod] = useState(
    getInitialValue('shippingMethod', 'standard')
  );
  const [paymentMethod, setPaymentMethod] = useState(
    getInitialValue('paymentMethod', 'cod')
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState(getInitialFormData);
  const [formErrors, setFormErrors] = useState({});
  
  const shippingCost = {
    standard: 0,
    express: 15000,
    overnight: 30000
  };
  
  const taxRate = 0.1; // 10% tax
  const subtotal = totalPrice;
  const shipping = shippingCost[shippingMethod];
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shipping + tax;

  // Save to localStorage whenever relevant data changes
  const saveToLocalStorage = useCallback(() => {
    try {
      const dataToSave = {
        formData,
        shippingMethod,
        paymentMethod
      };
      const encryptedData = encryptData(JSON.stringify(dataToSave));
      localStorage.setItem('checkoutFormData', encryptedData);
      console.log('Encrypted data saved to localStorage:', encryptedData);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [formData, shippingMethod, paymentMethod]);

  // Redirect to cart if cart is empty (do this after localStorage check)
  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [cart, navigate, orderPlaced]);

  // Override with user data if user is logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData(prevData => {
        // Map user data to form fields with better fallbacks
        const newData = {
          ...prevData,
          fullName: user.name || user.fullName || prevData.fullName,
          email: user.email || prevData.email,
          // Handle different address structures
          address: user.address?.street || user.street || user.addressLine1 || prevData.address,
          home: user.address?.home || user.home || user.apartment || prevData.home || '',
          city: user.address?.city || user.city || prevData.city,
          state: user.address?.state || user.state || user.province || prevData.state,
          zipCode: user.address?.zipCode || user.address?.zip || user.zipCode || user.zip || prevData.zipCode,
          country: user.address?.country || user.country || prevData.country,
          phone: user.phone || user.phoneNumber || user.contactNumber || prevData.phone
        };
        
        // Update form errors to clear any errors for fields that now have values
        setFormErrors(prevErrors => {
          const updatedErrors = { ...prevErrors };
          Object.keys(newData).forEach(key => {
            if (newData[key] && updatedErrors[key]) {
              delete updatedErrors[key];
            }
          });
          return updatedErrors;
        });
        
        // Save the updated data with user information
        const encryptedData = encryptData(JSON.stringify({
          formData: newData,
          shippingMethod,
          paymentMethod
        }));
        localStorage.setItem('checkoutFormData', encryptedData);
        
        console.log('Form data auto-filled with user information');
        return newData;
      });
    }
  }, [isLoggedIn, user]); // Remove shippingMethod and paymentMethod from dependencies

  // Update localStorage whenever form data changes
  useEffect(() => {
    saveToLocalStorage();
  }, [formData, shippingMethod, paymentMethod, saveToLocalStorage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validateShippingForm = () => {
    const errors = {};
    
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.zipCode) errors.zipCode = "ZIP/Postal code is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else {
      // Strip spaces for validation
      const cleanedPhone = formData.phone.replace(/\s/g, '');
      
      // Vietnamese phone numbers are typically 10 digits, starting with 0
      if (!/^0\d{9}$/.test(cleanedPhone)) {
        errors.phone = "Please enter a valid Vietnamese phone number (10 digits)";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePaymentForm = () => {
    const errors = {};
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber) {
        errors.cardNumber = "Card number is required";
      } else if (!/^[0-9]{16}$/.test(formData.cardNumber)) {
        errors.cardNumber = "Please enter a valid 16-digit card number";
      }
      
      if (!formData.cardHolder) errors.cardHolder = "Cardholder name is required";
      
      if (!formData.expiryDate) {
        errors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
        errors.expiryDate = "Format: MM/YY";
      }
      
      if (!formData.cvv) {
        errors.cvv = "CVV is required";
      } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
        errors.cvv = "3-4 digits";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      if (paymentMethod === 'cod') {
        setActiveStep('review');
      } else {
        // Fix the flow for non-COD payments
        if (!isLoggedIn) {
          // Just need to set activeStep to 'payment' once
          // The conditional render logic will handle showing the login screen
          setActiveStep('payment');
        } else {
          setActiveStep('payment');
        }
      }
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setActiveStep('review');
      
      // For displaying the last 4 digits of the card
      if (paymentMethod === 'card' && formData.cardNumber) {
        document.getElementById('cardNumber-last4').textContent = 
          formData.cardNumber.slice(-4);
      }
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Ensure all numerical values are proper numbers to avoid NaN
      const subTotal = cart.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0);
      const shippingFee = Number(shippingCost[shippingMethod]);
      const taxAmount = Math.round(subTotal * taxRate);
      const totalAmount = subTotal + shippingFee + taxAmount;
      
      // Verify totalAmount is not NaN before proceeding
      if (isNaN(totalAmount)) {
        throw new Error("Order calculation error: Invalid price or quantity values");
      }
      
      // Calculate delivery date (7 days from now for standard shipping)
      const deliveryDate = new Date();
      if (shippingMethod === 'express') {
        deliveryDate.setDate(deliveryDate.getDate() + 3);
      } else if (shippingMethod === 'overnight') {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 7);
      }
      
      // Map items with all required fields and proper type conversions
      const orderItems = cart.map(item => ({
        product: item.id,
        variationId: item.variationId || null,
        quantity: Number(item.quantity),
        unitPrice: Number(item.price),
        deliveryFee: Math.round(shippingFee / cart.length), // Round to avoid decimal issues
        deliveryDate: deliveryDate.toISOString()
      }));
      
      // Ensure all required address fields are present with the correct names
      const shippingAddressData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        street: formData.address,
        home: formData.home || formData.address, // Use dedicated home field if available
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        country: formData.country
      };
      
      // Prepare payment details with conditional fields
      const paymentDetailsData = {
        method: paymentMethod
      };
      
      // Only include card details if payment method is card
      if (paymentMethod === 'card') {
        paymentDetailsData.cardNumber = formData.cardNumber;
        paymentDetailsData.cardHolder = formData.cardHolder;
        paymentDetailsData.expiryDate = formData.expiryDate;
        // Don't send CVV to backend for security reasons
      }
      
      // Create the complete order object with all required fields
      const orderData = {
        items: orderItems,
        shippingAddress: shippingAddressData,
        paymentDetails: paymentDetailsData,
        shipping: {
          method: shippingMethod,
          cost: shippingCost[shippingMethod]
        },
        subTotal,
        shippingFee,
        taxAmount,
        totalAmount
      };

      // Set up request options based on authentication status
      const config = {};
      if (isLoggedIn && token) {
        config.headers = {
          'Authorization': `Bearer ${token}`
        };
      }

      // Send to appropriate endpoint
      const endpoint = isLoggedIn && token ? '/order' : '/order/guest-checkout';
      const response = await axiosInstance.post(endpoint, orderData, config);
      
      // Extract order ID from response with fallbacks
      const orderId = response.data.order?._id || 
                      response.data.orderId || 
                      response.data.order?.id || 
                      'ORD-' + Date.now();
      
      // Update application state
      setOrderId(orderId);
      setOrderPlaced(true);
      clearCart();
      setActiveStep('confirmation');
      
      // Clean up localStorage
      localStorage.removeItem('checkoutFormData');
      
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${orderId} has been confirmed.`,
        type: "success"
      });
    } catch (error) {
      console.error('Error placing order:', error);
      
      // Extract error message from response if available
      let errorMessage = "There was an error processing your order.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Show specific validation errors if available
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const errorFields = Object.keys(validationErrors).join(', ');
        errorMessage += ` Please check these fields: ${errorFields}`;
      }
      
      toast({
        title: "Order Failed",
        description: errorMessage,
        type: "error",
        duration: 6000 // Give users more time to read error message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only require login if payment method is not COD
  if (isLoggedIn === false && paymentMethod !== 'cod' && activeStep !== 'shipping') {
    return (
      <LoginRequired 
        onContinueAsGuest={() => {
          setPaymentMethod('cod');
          setActiveStep('shipping');
        }}
      />
    );
  }

  if (orderPlaced) {
    return (
      <OrderConfirmation 
        orderId={orderId}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main checkout flow */}
        <div className="flex-1">
          <Tabs.Root value={activeStep} onValueChange={setActiveStep}>
            <Tabs.List className="flex border-b border-[var(--md-sys-color-outline-variant)] mb-6">
              <Tabs.Trigger 
                value="shipping" 
                className={`px-6 py-3 ${activeStep === 'shipping' ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]' : 'text-[var(--md-sys-color-on-surface-variant)]'}`}
                disabled={activeStep !== 'shipping'}
              >
                1. Delivery & Payment Method
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="payment" 
                className={`px-6 py-3 ${activeStep === 'payment' ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]' : 'text-[var(--md-sys-color-on-surface-variant)]'}`}
                disabled={activeStep !== 'payment' && activeStep !== 'review'}
              >
                2. Payment Details
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="review" 
                className={`px-6 py-3 ${activeStep === 'review' ? 'text-[var(--md-sys-color-primary)] border-b-2 border-[var(--md-sys-color-primary)]' : 'text-[var(--md-sys-color-on-surface-variant)]'}`}
                disabled={activeStep !== 'review'}
              >
                3. Review
              </Tabs.Trigger>
            </Tabs.List>

            {/* Shipping Form with Payment Method Selection */}
            <Tabs.Content value="shipping">
              <ShippingForm 
                formData={formData}
                formErrors={formErrors}
                shippingMethod={shippingMethod}
                paymentMethod={paymentMethod}
                shippingCost={shippingCost}
                isLoggedIn={isLoggedIn}
                onInputChange={handleInputChange}
                onShippingMethodChange={setShippingMethod}
                onPaymentMethodChange={setPaymentMethod}
                onSubmit={handleShippingSubmit}
              />
            </Tabs.Content>

            {/* Payment Details Form (only for online payment methods) */}
            <Tabs.Content value="payment">
              <PaymentForm 
                formData={formData}
                formErrors={formErrors}
                paymentMethod={paymentMethod}
                onInputChange={handleInputChange}
                onBack={() => setActiveStep('shipping')}
                onSubmit={handlePaymentSubmit}
              />
            </Tabs.Content>

            {/* Order Review */}
            <Tabs.Content value="review">
              <OrderReview 
                formData={formData}
                shippingMethod={shippingMethod}
                shippingCost={shippingCost}
                paymentMethod={paymentMethod}
                cart={cart}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                isSubmitting={isSubmitting}
                onBack={() => setActiveStep(paymentMethod === 'cod' ? 'shipping' : 'payment')}
                onShippingEdit={() => setActiveStep('shipping')}
                onPaymentEdit={() => setActiveStep(paymentMethod === 'cod' ? 'shipping' : 'payment')}
                onSubmit={handlePlaceOrder}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
        
        {/* Order summary sidebar */}
        <div className="w-full lg:w-80">
          <OrderSummary 
            totalItems={totalItems}
            subtotal={subtotal}
            shippingMethod={shippingMethod}
            shippingCost={shippingCost}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
// Utility function to encrypt data
function encryptData(data) {
  const algorithm = 'aes-256-ctr';
  const secretKey = process.env.REACT_APP_ENCRYPTION_KEY; // Use a secure key from environment variables
  const cipher = crypto.createCipher(algorithm, secretKey);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}
}