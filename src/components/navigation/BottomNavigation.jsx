import { Link } from 'react-router-dom';
import SearchDialog from './SearchDialog';
import UserMenuDropdown from './UserMenuDropdown';
import CartIcon from '../cart/CartIcon';
import BottomNavigationButton from './BottomNavigationButton';
import { useCartContext } from '../../hooks/useCartContext';
import NotificationDialog from './NotificationDialog';

export default function BottomNavigation() {
  const { totalItems } = useCartContext();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--md-sys-color-surface)] border-t border-[var(--md-sys-color-outline-variant)] flex items-center justify-around py-2 z-40">
      <BottomNavigationButton
        icon="home"
        label="Home"
        to="/"
      />
      <SearchDialog isMobile={true} />
      
      <NotificationDialog isMobile={true} />
      
      <BottomNavigationButton
        icon="shopping_cart"
        label="Cart"
        to="/cart"
        badge={totalItems}
      />
      
      <UserMenuDropdown isMobile={true} />
    </div>
  );
}