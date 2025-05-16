import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import { ChevronRightIcon } from '@radix-ui/react-icons';

export default function CategoryBreadcrumb({ category }) {
  return (
    <NavigationMenu.Root className="mb-6" orientation="horizontal">
      <NavigationMenu.List className="flex items-center flex-wrap text-sm text-[var(--md-sys-color-on-surface-variant)]">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link 
              to="/" 
              className="hover:text-[var(--md-sys-color-primary)] transition-colors hover:underline"
            >
              Home
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        
        <span className="mx-2 mdi">chevron_right</span>
        
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link 
              to="/products" 
              className="hover:text-[var(--md-sys-color-primary)] transition-colors hover:underline"
            >
              Products
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        
        {category && (
          <>
            <span className="mdi mx-2">chevron_right</span>
            
            <NavigationMenu.Item>
              <span 
                className="font-medium text-[var(--md-sys-color-on-surface)]"
                aria-current="page"
              >
                {category}
              </span>
            </NavigationMenu.Item>
          </>
        )}
      </NavigationMenu.List>
      
      {/* Viewport for any potential dropdown submenus (not used in breadcrumbs) */}
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}