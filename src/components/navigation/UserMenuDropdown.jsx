import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import BottomNavigationButton from './BottomNavigationButton';

export default function UserMenuDropdown({ isMobile = false }) {
  const { user, isLoggedIn, logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {isMobile ? (
          <BottomNavigationButton
            icon={isLoggedIn ? 'account_circle' : 'person'}
            label="Account"
          />
        ) : (
          <button             
            className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
            aria-label="User menu"
          >
            <span className="mdi text-[var(--md-sys-color-on-surface)]">
              {isLoggedIn ? 'account_circle' : 'person'}
            </span>
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-[var(--md-sys-color-surface)] rounded-lg shadow-lg p-2 z-50"
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

              <UserMenuItem to="/profile" icon="person">My Profile</UserMenuItem>
              <UserMenuItem to="/orders" icon="receipt_long">My Orders</UserMenuItem>
              <UserMenuItem to="/settings" icon="settings">Settings</UserMenuItem>

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
              <UserMenuItem to="/login" icon="login">Login</UserMenuItem>
              <UserMenuItem to="/register" icon="person_add">Sign Up</UserMenuItem>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function UserMenuItem({ to, icon, children }) {
  return (
    <DropdownMenu.Item className="outline-none" asChild>
      <Link 
        to={to} 
        className="flex items-center gap-2 px-4 py-2 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] rounded-md cursor-pointer"
      >
        <span className="mdi">{icon}</span>
        {children}
      </Link>
    </DropdownMenu.Item>
  );
}