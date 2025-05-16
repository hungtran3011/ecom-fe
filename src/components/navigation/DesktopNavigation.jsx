import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router-dom';
import ProductsMenu from '../ProductsMenu';

export default function DesktopNavigation({ logoUrl }) {
  return (
    <NavigationMenu.Root className="relative z-10">
      <NavigationMenu.List className="flex gap-4 items-center justify-center self-stretch">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link to="/">
              <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-full" />
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        
        <NavItem to="/">Home</NavItem>
        
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center gap-1 text-[var(--md-sys-color-on-surface)] px-3 py-2">
            Products
            <span className="mdi">arrow_drop_down</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-full bg-[var(--md-sys-color-surface)] shadow-lg rounded-md min-w-[200px]">
            <ProductsMenu />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        
        <NavItem to="/about">About</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </NavigationMenu.List>
      <NavigationMenu.Viewport className="absolute top-full left-0 mt-1 w-radix-navigation-menu-viewport" />
    </NavigationMenu.Root>
  );
}

function NavItem({ to, children }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild>
        <Link to={to} className="text-[var(--md-sys-color-on-surface)] px-3 py-2 block">
          {children}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}