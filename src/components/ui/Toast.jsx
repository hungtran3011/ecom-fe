import React, { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { ToastContext } from '../../hooks/useToast';


export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  // Function to add a new toast
  const toast = ({ title, description, action, type = 'foreground', duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, title, description, action, type, duration }]);
    
    // Auto-remove toast after duration (unless action is present)
    if (!action) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, duration);
    }
    
    return id;
  };
  
  // Remove a toast by ID
  const dismiss = (id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      <Toast.Provider swipeDirection="right">
        {children}
        
        {toasts.map(({ id, title, description, action, type, duration }) => (
          <Toast.Root 
            key={id}
            type={type}
            duration={duration}
            className="bg-[var(--md-sys-color-surface-container)] border border-[var(--md-sys-color-outline)] rounded-lg shadow-lg p-4 flex items-start gap-3 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            onOpenChange={(open) => {
              if (!open) dismiss(id);
            }}
          >
            <div className="flex-1 flex flex-col gap-1">
              {title && (
                <Toast.Title className="font-medium text-[var(--md-sys-color-on-surface)]">
                  {title}
                </Toast.Title>
              )}
              
              {description && (
                <Toast.Description className="text-[var(--md-sys-color-on-surface-variant)]">
                  {description}
                </Toast.Description>
              )}
            </div>
            
            {action && (
              <Toast.Action className="shrink-0" asChild altText={action.altText || 'Action'}>
                <button 
                  className="inline-flex h-8 items-center justify-center rounded-md bg-[var(--md-sys-color-primary)] px-3 text-xs font-medium text-[var(--md-sys-color-on-primary)]"
                  onClick={() => {
                    if (typeof action.onClick === 'function') action.onClick();
                    dismiss(id);
                  }}
                >
                  {action.label}
                </button>
              </Toast.Action>
            )}
            
            <Toast.Close className="shrink-0 rounded-full h-6 w-6 inline-flex items-center justify-center text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)]">
              <span className="mdi">close</span>
            </Toast.Close>
          </Toast.Root>
        ))}
        
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-full md:max-w-[420px] max-h-screen z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}