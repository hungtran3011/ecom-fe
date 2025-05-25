import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import BottomNavigationButton from './BottomNavigationButton';
import PropTypes from 'prop-types';

export default function NotificationDialog({ isMobile }) {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped!',
      date: '2 hours ago'
    },
    {
      id: 2,
      title: 'Price Drop',
      message: 'iPhone 16 Pro is now on sale!',
      date: 'Yesterday'
    }
  ]);

  if (isMobile) {
    return (
      <BottomNavigationButton
        icon="notifications"
        label="Notifications"
        badge={notifications.length}
        // onClick={() => navigate('/notifications')}
        to="/notifications"
      />
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button 
          className="flex p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full transition-colors"
          aria-label="Notifications"
        >
          <span className="mdi text-[var(--md-sys-color-on-surface)]">notifications</span>
          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
              {notifications.length > 99 ? '99+' : notifications.length}
            </div>
          )}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-[var(--md-sys-color-surface)] rounded-lg shadow-lg p-2 z-50"
          sideOffset={5}
          align="end"
        >
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div
                key={notification.id}
                className="p-3 border border-[var(--md-sys-color-outline-variant)] rounded-lg mb-2"
              >
                <h4 className="font-medium text-[var(--md-sys-color-on-surface)]">
                  {notification.title}
                </h4>
                <p className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                  {notification.message}
                </p>
                <span className="text-xs text-[var(--md-sys-color-on-surface-variant)] block mt-2">
                  {notification.date}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center p-4">
              <span className="mdi text-5xl text-[var(--md-sys-color-on-surface-variant)] mb-2">
                notifications_none
              </span>
              <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
                No notifications
              </h3>
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

NotificationDialog.propTypes = {
  isMobile: PropTypes.bool
};
