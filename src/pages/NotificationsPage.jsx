import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotificationsPage() {
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">Notifications</h1>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="p-4 border border-[var(--md-sys-color-outline-variant)] rounded-lg bg-[var(--md-sys-color-surface-container)]"
            >
              <h4 className="font-medium text-lg text-[var(--md-sys-color-on-surface)]">
                {notification.title}
              </h4>
              <p className="text-[var(--md-sys-color-on-surface-variant)] my-2">
                {notification.message}
              </p>
              <span className="text-xs text-[var(--md-sys-color-on-surface-variant)] block">
                {notification.date}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[var(--md-sys-color-surface-container)] rounded-lg">
          <span className="mdi text-6xl text-[var(--md-sys-color-on-surface-variant)] mb-3 block">
            notifications_none
          </span>
          <h3 className="text-xl font-medium mb-2 text-[var(--md-sys-color-on-surface)]">
            No notifications
          </h3>
          <p className="text-[var(--md-sys-color-on-surface-variant)]">
            You don't have any notifications right now
          </p>
        </div>
      )}
    </div>
  );
}