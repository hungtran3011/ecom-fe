import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../libs/utils';

export default function BottomNavigationButton({
    icon,
    label,
    to,
    onClick,
    badge,
    className = "",
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    
    // Check if this button represents the current route
    const isActive = to && location.pathname === to;
    
    // Event handlers for the entire button
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    // Content to render inside either a button or a link
    const content = (
        <>
            <div className="relative flex items-center justify-center">
                {/* Icon container with state layer for hover effects */}
                <div 
                    className={cn(
                        "relative px-4 py-2 rounded-full transition-colors flex items-center justify-center",
                        isActive ? "bg-[var(--md-sys-color-primary-container)]" : ""
                    )}
                >
                    {/* State layer - controlled by parent hover state */}
                    <span 
                        className={cn(
                            "absolute inset-0 rounded-full transition-opacity",
                            isActive 
                                ? "bg-[var(--md-sys-layers-on-primary-container-opacity-008)]" 
                                : "bg-[var(--md-sys-layers-on-surface-opacity-008)]",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                    />
                    
                    {/* Icon */}
                    <span className={cn(
                        "mdi text-2xl relative z-10 transition-colors",
                        isActive 
                            ? "text-[var(--md-sys-color-on-primary-container)]" 
                            : "text-[var(--md-sys-color-on-surface)]"
                    )}>
                        {icon}
                    </span>
                    
                    {/* Badge */}
                    {badge > 0 && (
                        <div className="absolute -top-1 -right-1 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 z-10">
                            {badge > 99 ? '99+' : badge}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Label */}
            <span className={cn(
                "text-xs mt-1 transition-colors text-center w-full",
                isActive 
                    ? "text-[var(--md-sys-color-primary)]" 
                    : "text-[var(--md-sys-color-on-surface)]"
            )}>
                {label}
            </span>
        </>
    );

    // If 'to' prop exists, render a Link, otherwise render a button
    if (to) {
        return (
            <Link
                to={to}
                className={cn("flex flex-col items-center",className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            className={cn("flex flex-col items-center", className)}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type="button"
            {...props}
        >
            {content}
        </button>
    );
}