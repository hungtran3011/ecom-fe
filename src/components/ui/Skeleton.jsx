import React from 'react';
import { cn } from '../../utils/cn'; // Assuming you have a className utility

export default function Skeleton({ 
  className, 
  variant = "default", 
  width, 
  height,
  rounded = "lg",
  children,
  ...props 
}) {
  const baseClasses = "animate-pulse bg-[var(--md-sys-color-surface-variant)]";
  
  // Variants for commonly used skeleton types
  const variants = {
    default: "",
    text: "h-4",
    title: "h-6",
    avatar: "rounded-full",
    button: "h-10",
    container: "bg-[var(--md-sys-color-surface-container)] shadow-sm",
  };
  
  // Rounded variants
  const roundedVariants = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  
  // If we have children, wrap them
  if (children) {
    return (
      <div 
        className={cn(
          baseClasses, 
          variants[variant], 
          roundedVariants[rounded],
          className
        )}
        style={{ width, height }}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  // Otherwise, render a simple skeleton element
  return (
    <div 
      className={cn(
        baseClasses, 
        variants[variant], 
        roundedVariants[rounded],
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
}