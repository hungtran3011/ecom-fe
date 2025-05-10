import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserContext } from '../hooks/useUserContext';
import axiosInstance from '../libs/axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser, setToken } = useUserContext();
    
    const loginMutation = useMutation({
        mutationFn: (credentials) => axiosInstance.post(`/auth/sign-in`, credentials, {
        }),
        onSuccess: (data) => {
            // Store user data and token in context
            setUser(data.user);
            setToken(data.accessToken);
            navigate('/');
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle login error (show message, etc.)
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--md-sys-color-surface)]">
            <div className="w-full max-w-md p-6 bg-[var(--md-sys-color-surface-container)] rounded-2xl shadow-md border border-[var(--md-sys-color-outline)]">
                <h1 className="text-2xl font-bold text-center text-[var(--md-sys-color-primary)] mb-6">
                    Login
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-[var(--md-sys-color-on-surface)]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                            required
                        />
                    </div>

                    {/* Password Input with Show/Hide Toggle */}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-[var(--md-sys-color-outline)] rounded-lg text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)]"
                                required
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
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full py-2 mt-4 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-70"
                    >
                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </button>
                    
                    {loginMutation.isError && (
                        <p className="text-red-500 text-sm mt-2">
                            {loginMutation.error.message || 'Login failed. Please try again.'}
                        </p>
                    )}
                </form>

                {/* Additional Links */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-[var(--md-sys-color-primary)] hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                    <p className="text-sm text-[var(--md-sys-color-on-surface-variant)] mt-2">
                        Forgot your password?{' '}
                        <Link
                            to="/forgot-password"
                            className="text-[var(--md-sys-color-primary)] hover:underline"
                        >
                            Reset it
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}