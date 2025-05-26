import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserContext } from '../hooks/useUserContext';
import { useToast } from '../hooks/useToast';
import axiosInstance from '../libs/axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Vietnam'
        }
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showAddressFields, setShowAddressFields] = useState(false);
    
    const navigate = useNavigate();
    const { setUser, setToken, isLoggedIn } = useUserContext();
    const { toast } = useToast();
    
    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);
    
    const registerMutation = useMutation({
        mutationFn: (userData) => axiosInstance.post('/auth/sign-up', userData),
        onSuccess: (data) => {
            // Store user data and token in context
            setUser(data.data.user);
            setToken(data.data.accessToken);
            
            toast({
                title: "Registration Successful",
                description: "Welcome to our store!",
                type: "success"
            });
            
            navigate('/');
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            
            const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
            
            toast({
                title: "Registration Failed",
                description: errorMsg,
                type: "error"
            });
        }
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            // Handle nested address fields
            const [parent, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [field]: value
                }
            }));
        } else {
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
            phoneNumber: formattedValue
        }));
        
        if (formErrors.phoneNumber) {
            setFormErrors(prev => ({
                ...prev,
                phoneNumber: null
            }));
        }
    };
    
    const validateForm = () => {
        const errors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            errors.name = "Full name is required";
        }
        
        // Email validation
        if (!formData.email && !formData.phoneNumber) {
            errors.email = "Either email or phone number is required";
        } else if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = "Invalid email address";
        }
        
        // Phone validation
        if (formData.phoneNumber) {
            const cleanedPhone = formData.phoneNumber.replace(/\s/g, '');
            
            // Vietnamese phone numbers are typically 10 digits, starting with 0
            if (!/^0\d{9}$/.test(cleanedPhone)) {
                errors.phoneNumber = "Please enter a valid Vietnamese phone number (10 digits)";
            }
        }
        
        // Password validation
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        
        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        
        // Address validation (only if showing address fields)
        if (showAddressFields) {
            if (!formData.address.street) {
                errors['address.street'] = "Street address is required";
            }
            if (!formData.address.city) {
                errors['address.city'] = "City is required";
            }
            if (!formData.address.state) {
                errors['address.state'] = "State/Province is required";
            }
            if (!formData.address.zipCode) {
                errors['address.zipCode'] = "ZIP/Postal code is required";
            }
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const { confirmPassword: _, ...userData } = formData;
        
        // Remove address fields if not showing
        const dataToSubmit = !showAddressFields
            ? { ...userData, address: null }
            : userData;
        
        registerMutation.mutate(dataToSubmit);
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--md-sys-color-surface)] p-4">
            <div className="w-full max-w-xl p-8 bg-[var(--md-sys-color-surface-container)] rounded-2xl shadow-md border border-[var(--md-sys-color-outline)]">
                <h1 className="text-2xl font-bold text-center text-[var(--md-sys-color-primary)] mb-6">
                    Create an Account
                </h1>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
                            Personal Information
                        </h2>
                        
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                            />
                            {formErrors.name && (
                                <p className="text-[var(--md-sys-color-error)] text-sm">
                                    {formErrors.name}
                                </p>
                            )}
                        </div>
                        
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                            />
                            {formErrors.email && (
                                <p className="text-[var(--md-sys-color-error)] text-sm">
                                    {formErrors.email}
                                </p>
                            )}
                        </div>
                        
                        {/* Phone Number */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="phoneNumber"
                                className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                            />
                            {formErrors.phoneNumber && (
                                <p className="text-[var(--md-sys-color-error)] text-sm">
                                    {formErrors.phoneNumber}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* Password Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
                            Create Password
                        </h2>
                        
                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <span className="mdi text-[var(--md-sys-color-on-surface-variant)]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            {formErrors.password && (
                                <p className="text-[var(--md-sys-color-error)] text-sm">
                                    {formErrors.password}
                                </p>
                            )}
                        </div>
                        
                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <span className="mdi text-[var(--md-sys-color-on-surface-variant)]">
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            {formErrors.confirmPassword && (
                                <p className="text-[var(--md-sys-color-error)] text-sm">
                                    {formErrors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* Address Toggle */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="showAddress"
                            checked={showAddressFields}
                            onChange={() => setShowAddressFields(!showAddressFields)}
                            className="w-4 h-4 text-[var(--md-sys-color-primary)]"
                        />
                        <label htmlFor="showAddress" className="text-[var(--md-sys-color-on-surface)]">
                            Add shipping address now
                        </label>
                    </div>
                    
                    {/* Address Fields (conditional) */}
                    {showAddressFields && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
                                Shipping Address
                            </h2>
                            
                            {/* Street Address */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="address.street"
                                    className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                                >
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    id="address.street"
                                    name="address.street"
                                    value={formData.address.street}
                                    onChange={handleInputChange}
                                    placeholder="Enter your street address"
                                    className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                />
                                {formErrors['address.street'] && (
                                    <p className="text-[var(--md-sys-color-error)] text-sm">
                                        {formErrors['address.street']}
                                    </p>
                                )}
                            </div>
                            
                            {/* City and State Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="address.city"
                                        className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="address.city"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter your city"
                                        className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                    />
                                    {formErrors['address.city'] && (
                                        <p className="text-[var(--md-sys-color-error)] text-sm">
                                            {formErrors['address.city']}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="address.state"
                                        className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                                    >
                                        State/Province
                                    </label>
                                    <input
                                        type="text"
                                        id="address.state"
                                        name="address.state"
                                        value={formData.address.state}
                                        onChange={handleInputChange}
                                        placeholder="Enter your state/province"
                                        className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                    />
                                    {formErrors['address.state'] && (
                                        <p className="text-[var(--md-sys-color-error)] text-sm">
                                            {formErrors['address.state']}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            {/* Zip Code and Country Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="address.zipCode"
                                        className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                                    >
                                        ZIP/Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        id="address.zipCode"
                                        name="address.zipCode"
                                        value={formData.address.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="Enter your ZIP/postal code"
                                        className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                    />
                                    {formErrors['address.zipCode'] && (
                                        <p className="text-[var(--md-sys-color-error)] text-sm">
                                            {formErrors['address.zipCode']}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="address.country"
                                        className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="address.country"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleInputChange}
                                        placeholder="Enter your country"
                                        className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full py-3 mt-6 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-70"
                    >
                        {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    </button>
                    
                    {registerMutation.isError && (
                        <p className="text-[var(--md-sys-color-error)] text-sm mt-2">
                            {registerMutation.error.message || 'Registration failed. Please try again.'}
                        </p>
                    )}
                </form>
                
                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-[var(--md-sys-color-on-surface-variant)]">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-[var(--md-sys-color-primary)] hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}