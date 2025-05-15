import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import * as Collapsible from '@radix-ui/react-collapsible';

export default function MainMenuDialog() {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn, logout } = useUserContext();
  const [productsOpen, setProductsOpen] = useState(false);
  const LOGO = "/images/logo.jpg";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
          aria-label="Open main menu"
        >
          <span className="mdi text-[var(--md-sys-color-on-surface)]">menu</span>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed inset-0 z-50 bg-[var(--md-sys-color-surface)] overflow-y-auto">
          <div className="flex flex-col w-full min-h-screen pb-16">
            {/* Menu header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--md-sys-color-outline-variant)]">
              <Link to="/" className="w-12 h-12" onClick={() => setOpen(false)}>
                <img src={LOGO} alt="Logo" className="w-12 h-12 rounded-full" />
              </Link>
              <Dialog.Close asChild>
                <button className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors">
                  <span className="mdi text-[var(--md-sys-color-on-surface)]">close</span>
                </button>
              </Dialog.Close>
            </div>
            
            {/* Navigation links */}
            <nav className="flex flex-col p-4">
              <NavItem to="/" icon="home" onClick={() => setOpen(false)}>Home</NavItem>
              
              {/* Products dropdown */}
              <Collapsible.Root 
                open={productsOpen} 
                onOpenChange={setProductsOpen}
                className="py-1"
              >
                <Collapsible.Trigger asChild>
                  <button className="flex items-center justify-between w-full py-3 px-2 text-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors">
                    <div className="flex items-center">
                      <span className="mdi mr-3">devices</span>
                      Products
                    </div>
                    <span className="mdi">{productsOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
                  </button>
                </Collapsible.Trigger>
                
                <Collapsible.Content>
                  <div className="flex flex-col gap-1 pl-10 mt-1">
                    <SubNavItem to="/products/phones" onClick={() => setOpen(false)}>Phones</SubNavItem>
                    <SubNavItem to="/products/laptops" onClick={() => setOpen(false)}>Laptops</SubNavItem>
                    <SubNavItem to="/products/tablets" onClick={() => setOpen(false)}>Tablets</SubNavItem>
                    <SubNavItem to="/products/accessories" onClick={() => setOpen(false)}>Accessories</SubNavItem>
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
              
              <NavItem to="/about" icon="info" onClick={() => setOpen(false)}>About</NavItem>
              <NavItem to="/contact" icon="mail" onClick={() => setOpen(false)}>Contact</NavItem>
            </nav>
            
            {/* User section */}
            <UserSection isLoggedIn={isLoggedIn} user={user} closeMenu={() => setOpen(false)} logout={logout} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NavItem({ to, icon, children, onClick }) {
  return (
    <Link 
      to={to} 
      className="flex items-center py-3 px-2 text-lg text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
      onClick={onClick}
    >
      <span className="mdi mr-3">{icon}</span>
      {children}
    </Link>
  );
}

function SubNavItem({ to, children, onClick }) {
  return (
    <Link 
      to={to} 
      className="py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function UserSection({ isLoggedIn, user, closeMenu, logout }) {
  return (
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
            onClick={closeMenu}
          >
            <span className="mdi mr-2">person</span>
            My Profile
          </Link>
          
          <Link 
            to="/orders" 
            className="flex items-center py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
            onClick={closeMenu}
          >
            <span className="mdi mr-2">receipt_long</span>
            My Orders
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center py-2 px-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
            onClick={closeMenu}
          >
            <span className="mdi mr-2">settings</span>
            Settings
          </Link>
          
          <button 
            className="flex items-center w-full py-2 px-2 text-[var(--md-sys-color-error)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md transition-colors"
            onClick={() => {
              closeMenu();
              logout();
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
            onClick={closeMenu}
          >
            <span className="mdi mr-2">login</span>
            Sign In
          </Link>
          
          <Link 
            to="/register" 
            className="flex items-center justify-center w-full py-3 px-4 border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-on-surface)] rounded-full mb-3 transition-colors"
            onClick={closeMenu}
          >
            <span className="mdi mr-2">person_add</span>
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}