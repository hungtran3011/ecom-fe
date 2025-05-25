import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import useWindowWidth from './hooks/useWindowWidth';
import MainMenuDialog from './components/navigation/MainMenuDialog';
import UserMenuDropdown from './components/navigation/UserMenuDropdown';
import BottomNavigation from './components/navigation/BottomNavigation';
import DesktopNavigation from './components/navigation/DesktopNavigation';
import SearchBar from './components/navigation/SearchBar';
import Footer from './components/navigation/Footer';
import CartIcon from './components/cart/CartIcon';
import NotificationDialog from './components/navigation/NotificationDialog';

const LOGO = "/images/logo.jpg";

export default function Layout() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center sticky top-0 z-30 bg-[var(--md-sys-color-surface-container-low)] shadow-sm">
        <div className="flex px-6 py-4 items-center justify-between gap-6 w-full">
          {isMobile ? (
            <>
              {/* Mobile header */}
              <div className="flex items-center gap-4 w-full justify-between">
                <div className="flex items-center gap-4">
                  <MainMenuDialog />
                  <Link to="/" className="w-12 h-12">
                    <img src={LOGO} alt="Logo" className="w-12 h-12 rounded-full" />
                  </Link>
                </div>
                
                <h1 className="text-lg font-medium text-[var(--md-sys-color-on-surface)] text-center">
                  EcomApp
                </h1>
                
                <div className="w-10"></div>
              </div>
            </>
          ) : (
            <>
              {/* Desktop header */}
              <DesktopNavigation logoUrl={LOGO} />
              <SearchBar />
              <div className="flex items-center justify-center gap-6">
                <NotificationDialog/>
                <CartIcon />
                <UserMenuDropdown />
              </div>
            </>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
        
        {/* Add spacer only on mobile to prevent content from being hidden behind bottom navigation */}
        {isMobile && <div className="h-20"></div>}
      </main>
      
      {!isMobile && <Footer />}

      {isMobile && <BottomNavigation />}
    </div>
  );
}