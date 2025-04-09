import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import "../index.css";

export default function NavItem({
    icon, label, className, ...props
}) {
    return (
        <NavigationMenu.Item 
            className={`text-center ${className} list-none`} 
        >
            <NavigationMenu.Link 
                className="flex items-center justify-center gap-1 text-[--md-sys-color-on-surface] rounded-lg p-2 transition-colors duration-200 hover:bg-[--md-sys-color-surface-variant]" 
                {...props}
            >
                {icon && (
                    <div className="flex items-center justify-center w-8 h-8">
                        <span className="mdi">{icon}</span>
                    </div>
                )}
                {label}
            </NavigationMenu.Link>
        </NavigationMenu.Item>
    );
}