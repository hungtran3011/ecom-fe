import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import BottomNavigationButton from './BottomNavigationButton';

export default function NotificationDialog() {
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

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <BottomNavigationButton 
          icon="notifications" 
          label="Notifications" 
          badge={notifications.length}
        />
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed inset-0 z-45 bg-[var(--md-sys-color-surface)] p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
              Notifications
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-[var(--md-sys-color-surface-variant)] rounded-full flex items-center">
                <span className="mdi text-[var(--md-sys-color-on-surface)]">close</span>
              </button>
            </Dialog.Close>
          </div>
          
          <div className="flex-1 overflow-auto">
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className="p-3 border border-[var(--md-sys-color-outline-variant)] rounded-lg"
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
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <span className="mdi text-5xl text-[var(--md-sys-color-on-surface-variant)] mb-2">
                  notifications_none
                </span>
                <h3 className="text-lg font-medium text-[var(--md-sys-color-on-surface)]">
                  No notifications
                </h3>
                <p className="text-[var(--md-sys-color-on-surface-variant)]">
                  You don't have any notifications at the moment.
                </p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}