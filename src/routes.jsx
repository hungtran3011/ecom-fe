import { Routes, Route } from 'react-router-dom';
import Layout from './layout.jsx';

// Import your page components  
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductCategoryPage from './pages/ProductCategoryPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      {/* Login route outside of layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Routes with shared layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:category" element={<ProductCategoryPage />} />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="checkout" element={<CheckoutPage />} />   
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="settings" element={<SettingsPage />} />     
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}