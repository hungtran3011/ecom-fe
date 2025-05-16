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

const LOGO = "/images/logo.jpg";

export default function Layout() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex px-6 py-4 items-center justify-between gap-6 w-full bg-[var(--md-sys-color-surface-container-low)]">
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
                <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                  <span className="mdi text-[var(--md-sys-color-on-surface)]">
                    notifications
                  </span>
                </button>
                <CartIcon />
                <UserMenuDropdown />
              </div>
            </>
          )}
        </div>
      </div>

      <main className="min-h-[calc(100vh-180px)] pb-16 md:pb-0">
        <Outlet />
      </main>
      
      <Footer />

      {isMobile && <BottomNavigation />}
    </>
  );
}