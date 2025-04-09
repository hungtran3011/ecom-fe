import { createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './layout.jsx';

// Import your page components
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductCategoryPage from './pages/ProductCategoryPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export const routes = createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="products/:category" element={<ProductCategoryPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);