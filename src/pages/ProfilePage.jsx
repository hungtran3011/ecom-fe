import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import { useToast } from '../hooks/useToast';
import axiosInstance from '../libs/axios';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, updateUser } = useUserContext();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [formErrors, setFormErrors] = useState({});

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (address fields)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Handle regular fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Format Vietnamese phone number
  const formatPhoneNumber = (value) => {
    // Strip all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length <= 4) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    } else {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    
    setFormData(prev => ({
      ...prev,
      phone: formattedValue
    }));
    
    if (formErrors.phone) {
      setFormErrors(prev => ({
        ...prev,
        phone: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) errors.name = "Full name is required";
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (formData.phone) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // API call to update user profile
      const response = await axiosInstance.put('/user/profile', formData);
      
      // Update user context with new data
      updateUser(response.data);
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        type: "success"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update your profile. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="container mx-auto py-8 px-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">My Profile</h1>
      
      <div className="max-w-2xl mx-auto bg-[var(--md-sys-color-surface-container)] p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-primary)] flex items-center justify-center text-[var(--md-sys-color-on-primary)] text-2xl">
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--md-sys-color-on-surface)]">
                  {formData.name}
                </h2>
                <p className="text-[var(--md-sys-color-on-surface-variant)]">
                  {formData.email}
                </p>
              </div>
            </div>
            
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                Full Name
              </label>
              {isEditing ? (
                <>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.name}</span>
                  )}
                </>
              ) : (
                <p className="p-3 text-[var(--md-sys-color-on-surface)]">{formData.name}</p>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                Email Address
              </label>
              {isEditing ? (
                <>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="Your email address"
                  />
                  {formErrors.email && (
                    <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.email}</span>
                  )}
                </>
              ) : (
                <p className="p-3 text-[var(--md-sys-color-on-surface)]">{formData.email}</p>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                Phone Number
              </label>
              {isEditing ? (
                <>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="0912 345 678"
                  />
                  {formErrors.phone && (
                    <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.phone}</span>
                  )}
                </>
              ) : (
                <p className="p-3 text-[var(--md-sys-color-on-surface)]">
                  {formData.phone || "Not provided"}
                </p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)] mb-4">
              Shipping Address
            </h3>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                  Street Address
                </label>
                {isEditing ? (
                  <input
                    name="address.street"
                    type="text"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="Street address"
                  />
                ) : (
                  <p className="p-3 text-[var(--md-sys-color-on-surface)]">
                    {formData.address.street || "Not provided"}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      name="address.city"
                      type="text"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                      placeholder="City"
                    />
                  ) : (
                    <p className="p-3 text-[var(--md-sys-color-on-surface)]">
                      {formData.address.city || "Not provided"}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    State/Province
                  </label>
                  {isEditing ? (
                    <input
                      name="address.state"
                      type="text"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                      placeholder="State/Province"
                    />
                  ) : (
                    <p className="p-3 text-[var(--md-sys-color-on-surface)]">
                      {formData.address.state || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    ZIP/Postal Code
                  </label>
                  {isEditing ? (
                    <input
                      name="address.zipCode"
                      type="text"
                      value={formData.address.zipCode}
                      onChange={handleInputChange}
                      className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                      placeholder="ZIP/Postal Code"
                    />
                  ) : (
                    <p className="p-3 text-[var(--md-sys-color-on-surface)]">
                      {formData.address.zipCode || "Not provided"}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      name="address.country"
                      type="text"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                      placeholder="Country"
                    />
                  ) : (
                    <p className="p-3 text-[var(--md-sys-color-on-surface)]">
                      {formData.address.country || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}