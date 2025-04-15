import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useWindowWidth from './hooks/useWindowWidth';
import { useUserContext } from './hooks/useUserContext';
import './index.css';
import ProductsMenu from './components/ProductsMenu';

const LOGO = "/images/logo.jpg";

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const windowWidth = useWindowWidth();
    const { user, isLoggedIn, logout } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // User menu component for desktop view
    const UserMenu = () => (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                    <span className="mdi text-[var(--md-sys-color-on-surface)]">
                        {isLoggedIn ? 'account_circle' : 'person'}
                    </span>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] bg-[var(--md-sys-color-surface)] rounded-lg shadow-lg p-2 z-50"
                    sideOffset={5}
                    align="end"
                >
                    {isLoggedIn ? (
                        <>
                            <div className="px-4 py-2 border-b border-[var(--md-sys-color-outline-variant)]">
                                <div className="font-medium text-[var(--md-sys-color-on-surface)]">
                                    {user?.name || 'User'}
                                </div>
                                <div className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                                    {user?.email || ''}
                                </div>
                            </div>

                            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md outline-none cursor-pointer" asChild>
                                <Link to="/profile">
                                    <span className="mdi">person</span>
                                    My Profile
                                </Link>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md outline-none cursor-pointer" asChild>
                                <Link to="/orders">
                                    <span className="mdi">receipt_long</span>
                                    My Orders
                                </Link>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md outline-none cursor-pointer" asChild>
                                <Link to="/settings">
                                    <span className="mdi">settings</span>
                                    Settings
                                </Link>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className="h-px my-1 bg-[var(--md-sys-color-outline-variant)]" />

                            <DropdownMenu.Item 
                                className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-error)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md outline-none cursor-pointer"
                                onClick={handleLogout}
                            >
                                <span className="mdi">logout</span>
                                Logout
                            </DropdownMenu.Item>
                        </>
                    ) : (
                        <>
                            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md outline-none cursor-pointer" asChild>
                                <Link to="/login">
                                    <span className="mdi">login</span>
                                    Login
                                </Link>
                            </DropdownMenu.Item>

                            <DropdownMenu.Item className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md outline-none cursor-pointer" asChild>
                                <Link to="/register">
                                    <span className="mdi">person_add</span>
                                    Sign Up
                                </Link>
                            </DropdownMenu.Item>
                        </>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex px-6 py-4 items-center justify-between gap-6 w-full bg-[var(--md-sys-color-surface-container-low)]">
                    {
                        windowWidth < 1024
                            ? (
                                <>
                                    {/* Left side: hamburger menu and logo */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
                                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        >
                                            <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                menu
                                            </span>
                                        </button>
                                        <Link to="/" className='w-12 h-12'>
                                            <img src={LOGO} alt="Logo" className='w-12 h-12 rounded-full' />
                                        </Link>
                                    </div>
                                    
                                    {/* Right side: search and account buttons */}
                                    {/* <div className="flex items-center gap-4">
                                        <button className="flex hover:bg-[var(--md-sys-color-surface-variant)] items-center justify-center p-2 rounded-full transition-colors">
                                            <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                search
                                            </span>
                                        </button>
                                        <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                                            <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                notifications
                                            </span>
                                        </button>
                                        <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                                            <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                shopping_bag
                                            </span>
                                        </button>
                                        <UserMenu />
                                    </div> */}
                                    
                                    {/* Mobile menu overlay */}
                                    {isMenuOpen && (
                                        <div className="fixed inset-0 z-50 bg-[var(--md-sys-color-surface)] overflow-y-auto">
                                            <div className="flex flex-col w-full min-h-screen">
                                                {/* Menu header with logo and close button */}
                                                <div className="flex items-center justify-between p-4 border-b border-[var(--md-sys-color-outline-variant)]">
                                                    <Link to="/" className='w-12 h-12' onClick={() => setIsMenuOpen(false)}>
                                                        <img src={LOGO} alt="Logo" className='w-12 h-12 rounded-full' />
                                                    </Link>
                                                    <button
                                                        className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                            close
                                                        </span>
                                                    </button>
                                                </div>
                                                
                                                {/* Search bar */}
                                                <div className="p-4 border-b border-[var(--md-sys-color-outline-variant)]">
                                                    <div className="flex h-12 px-4 justify-between items-center gap-3 w-full border border-[var(--md-sys-color-outline)] rounded-2xl">
                                                        <input
                                                            type="text"
                                                            className="flex-1 outline-none bg-transparent text-[var(--md-sys-color-on-surface)]"
                                                            placeholder="Search..."
                                                        />
                                                        <button className="flex hover:bg-[var(--md-sys-color-surface-variant)] items-center justify-center p-2 rounded-full transition-colors">
                                                            <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                                search
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {/* Navigation links */}
                                                <nav className="flex flex-col p-4">
                                                    <Link 
                                                        to="/" 
                                                        className="flex items-center py-3 px-2 text-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <span className="mdi mr-3">home</span>
                                                        Home
                                                    </Link>
                                                    
                                                    {/* Products dropdown */}
                                                    <div className="py-1">
                                                        <button className="flex items-center justify-between w-full py-3 px-2 text-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors">
                                                            <div className="flex items-center">
                                                                <span className="mdi mr-3">devices</span>
                                                                Products
                                                            </div>
                                                            <span className="mdi">arrow_drop_down</span>
                                                        </button>
                                                        <div className="flex flex-col gap-1 pl-10 mt-1">
                                                            <Link 
                                                                to="/products/phones" 
                                                                className="py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                Phones
                                                            </Link>
                                                            <Link 
                                                                to="/products/laptops" 
                                                                className="py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                Laptops
                                                            </Link>
                                                            <Link 
                                                                to="/products/tablets" 
                                                                className="py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                Tablets
                                                            </Link>
                                                            <Link 
                                                                to="/products/accessories" 
                                                                className="py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                Accessories
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    
                                                    <Link 
                                                        to="/about" 
                                                        className="flex items-center py-3 px-2 text-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <span className="mdi mr-3">info</span>
                                                        About
                                                    </Link>
                                                    
                                                    <Link 
                                                        to="/contact" 
                                                        className="flex items-center py-3 px-2 text-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <span className="mdi mr-3">mail</span>
                                                        Contact
                                                    </Link>
                                                </nav>
                                                
                                                {/* User actions section */}
                                                <div className="mt-auto border-t border-[var(--md-sys-color-outline-variant)] p-4">
                                                    {isLoggedIn ? (
                                                        <>
                                                            <div className="mb-3 px-2">
                                                                <div className="font-medium text-[var(--md-sys-color-on-surface)]">
                                                                    {user?.name || 'User'}
                                                                </div>
                                                                <div className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                                                                    {user?.email || ''}
                                                                </div>
                                                            </div>
                                                            
                                                            <Link 
                                                                to="/profile" 
                                                                className="flex items-center py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <span className="mdi mr-2">person</span>
                                                                My Profile
                                                            </Link>
                                                            
                                                            <Link 
                                                                to="/orders" 
                                                                className="flex items-center py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <span className="mdi mr-2">receipt_long</span>
                                                                My Orders
                                                            </Link>
                                                            
                                                            <Link 
                                                                to="/settings" 
                                                                className="flex items-center py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <span className="mdi mr-2">settings</span>
                                                                Settings
                                                            </Link>
                                                            
                                                            <button 
                                                                className="flex items-center w-full py-2 px-2 text-[var(--md-sys-color-error)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
                                                                onClick={() => {
                                                                    setIsMenuOpen(false);
                                                                    handleLogout();
                                                                }}
                                                            >
                                                                <span className="mdi mr-2">logout</span>
                                                                Logout
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Link 
                                                                to="/login" 
                                                                className="flex items-center justify-center w-full py-3 px-4 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full mb-3 transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <span className="mdi mr-2">login</span>
                                                                Sign In
                                                            </Link>
                                                            
                                                            <Link 
                                                                to="/register" 
                                                                className="flex items-center justify-center w-full py-3 px-4 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full mb-3 transition-colors"
                                                                onClick={() => setIsMenuOpen(false)}
                                                            >
                                                                <span className="mdi mr-2">person_add</span>
                                                                Sign Up
                                                            </Link>
                                                        </>
                                                    )}
                                                    
                                                    {/* Action buttons */}
                                                    <div className="flex justify-around mt-4">
                                                        <button className="flex flex-col items-center p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-lg transition-colors">
                                                            <span className="mdi text-[var(--md-sys-color-on-surface)] text-2xl">notifications</span>
                                                            <span className="text-xs mt-1 text-[var(--md-sys-color-on-surface)]">Notifications</span>
                                                        </button>
                                                        <button className="flex flex-col items-center p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-lg transition-colors">
                                                            <span className="mdi text-[var(--md-sys-color-on-surface)] text-2xl">shopping_bag</span>
                                                            <span className="text-xs mt-1 text-[var(--md-sys-color-on-surface)]">Cart</span>
                                                        </button>
                                                        <button className="flex flex-col items-center p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-lg transition-colors">
                                                            <span className="mdi text-[var(--md-sys-color-on-surface)] text-2xl">favorite</span>
                                                            <span className="text-xs mt-1 text-[var(--md-sys-color-on-surface)]">Wishlist</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                            : <NavigationMenu.Root className="relative z-10">
                                <NavigationMenu.List className="flex gap-4 items-center justify-center self-stretch">
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link asChild>
                                            <Link to="/">
                                                <img src={LOGO} className='w-12 h-12 rounded-full' />
                                            </Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link asChild>
                                            <Link to="/" className="text-[var(--md-sys-color-on-surface)] px-3 py-2 block">
                                                Home
                                            </Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Trigger className="flex items-center gap-1 text-[var(--md-sys-color-on-surface)] px-3 py-2">
                                            Products
                                            <span className="mdi">arrow_drop_down</span>
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className="absolute top-full bg-[var(--md-sys-color-surface)] shadow-lg rounded-md min-w-[200px]">
                                            <ProductsMenu />
                                        </NavigationMenu.Content>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link asChild>
                                            <Link to="/about" className="text-[var(--md-sys-color-on-surface)] px-3 py-2 block">
                                                About
                                            </Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link asChild>
                                            <Link to="/contact" className="text-[var(--md-sys-color-on-surface)] px-3 py-2 block">
                                                Contact
                                            </Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                </NavigationMenu.List>
                                <NavigationMenu.Viewport className="absolute top-full left-0 mt-1 w-radix-navigation-menu-viewport" />
                            </NavigationMenu.Root>
                    }
                    
                    {/* Desktop search box */}
                    {windowWidth >= 1024 && (
                        <div className="flex h-12 px-4 justify-between items-center gap-3 flex-1 border border-[var(--md-sys-color-outline)] rounded-2xl">
                            <input
                                type="text"
                                className="flex-1 outline-none bg-transparent text-[var(--md-sys-color-on-surface)]"
                                placeholder="Search..."
                            />
                            <button className="flex hover:bg-[var(--md-sys-color-surface-variant)] items-center justify-center p-2 rounded-full transition-colors">
                                <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                    search
                                </span>
                            </button>
                        </div>
                    )}
                    
                    {/* Desktop action buttons */}
                    {windowWidth >= 1024 && (
                        <div className="flex items-center justify-center gap-6">
                            <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                                <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                    notifications
                                </span>
                            </button>
                            <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                                <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                    shopping_bag
                                </span>
                            </button>
                            <UserMenu />
                        </div>
                    )}
                </div>
            </div>
            <main className="min-h-[calc(100vh-180px)]">
                <Outlet />
            </main>
            <footer className="flex items-center justify-center p-4 bg-[var(--md-sys-color-surface-variant)]">
                <p className="text-[var(--md-sys-color-on-surface-variant)]">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </footer>
        </>
    );
}