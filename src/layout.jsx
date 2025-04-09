import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Outlet, Link } from 'react-router-dom';
import useWindowWidth from './hooks/useWindowWidth';
import './index.css';
import ProductsMenu from './components/ProductsMenu';

const LOGO = "/src/assets/images/logo.jpg";


export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const windowWidth = useWindowWidth();

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex px-6 py-4 items-center justify-center gap-6 w-full bg-[var(--md-sys-color-surface-container-low)]">
                    {
                        windowWidth < 1024
                            ? (
                                <>
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
                                    {isMenuOpen && (
                                        <div className="fixed inset-0 z-50 bg-[var(--md-sys-color-surface)]">
                                            <div className="flex flex-col p-4 w-full h-screen">
                                                <button
                                                    className="flex self-end p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                                        close
                                                    </span>
                                                </button>
                                                <nav className="flex flex-col gap-4 mt-4">
                                                    <Link to="/" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                        Home
                                                    </Link>
                                                    <div>
                                                        <button className="flex items-center gap-1 text-[var(--md-sys-color-on-surface) ] hover:underline">
                                                            Products
                                                            <span className="ml-1">▾</span>
                                                        </button>
                                                        <div className="flex flex-col gap-2 pl-4 mt-2">
                                                            <Link to="/products/electronics" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                                Electronics
                                                            </Link>
                                                            <Link to="/products/clothing" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                                Clothing
                                                            </Link>
                                                            <Link to="/products/accessories" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                                Accessories
                                                            </Link>
                                                            <Link to="/products/home-appliances" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                                Home Appliances
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <Link to="/about" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                        About
                                                    </Link>
                                                    <Link to="/contact" className="text-[var(--md-sys-color-on-surface)] hover:underline">
                                                        Contact
                                                    </Link>
                                                </nav>
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
                                        <NavigationMenu.Content className="absolute top-full bg-[--md-sys-color-surface] shadow-lg rounded-md min-w-[200px]">
                                            {/* <div className="flex flex-col gap-4 p-4">
                                                <NavigationMenu.Link asChild>
                                                    <Link to="/products/electronics" className="text-[--md-sys-color-on-surface] hover:underline">
                                                        Electronics
                                                    </Link>
                                                </NavigationMenu.Link>
                                                <NavigationMenu.Link asChild>
                                                    <Link to="/products/clothing" className="text-[--md-sys-color-on-surface] hover:underline">
                                                        Clothing
                                                    </Link>
                                                </NavigationMenu.Link>
                                                <NavigationMenu.Link asChild>
                                                    <Link to="/products/accessories" className="text-[--md-sys-color-on-surface] hover:underline">
                                                        Accessories
                                                    </Link>
                                                </NavigationMenu.Link>
                                                <NavigationMenu.Link asChild>
                                                    <Link to="/products/home-appliances" className="text-[--md-sys-color-on-surface] hover:underline">
                                                        Home Appliances
                                                    </Link>
                                                </NavigationMenu.Link>
                                            </div> */}
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
                        <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                            
                            <span className="mdi text-[var(--md-sys-color-on-surface)]">
                                account_circle
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <main className="min-h-[calc(100vh-180px)]">
                <Outlet />
            </main>
            <footer className="flex items-center justify-center p-4 bg-[--md-sys-color-surface-variant]">
                <p className="text-[--md-sys-color-on-surface-variant]">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </footer>
        </>
    );
}