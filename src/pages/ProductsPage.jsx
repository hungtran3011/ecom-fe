import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../libs/axios';
import LoadingCategoryGrid from '../components/LoadingCategoryGrid';
import ErrorDisplay from '../components/ErrorDisplay';

export default function ProductsPage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    
    // Fetch all categories
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosInstance.get('/product/category');
            return response.data;
        },
        onError: (error) => {
            console.error('Error fetching categories:', error);
            // Handle error (e.g., show a message)
        }
    });
    
    // Fetch featured products
    useQuery({
        queryKey: ['featuredProducts'],
        queryFn: async () => {
            const response = await axiosInstance.get('/product?limit=4&sortBy=-createdAt');
            setFeaturedProducts(response.data.products || []);
            return response.data;
        },
        onError: (error) => {
            console.error('Error fetching featured products:', error);
            // Handle error (e.g., show a message)
        }
    });
    
    if (isLoading) {
        return <LoadingCategoryGrid />;
    }
    
    if (error) {
        return <ErrorDisplay error={error} />;
    }
    
    return (
        <div className="container mx-auto py-8 px-4">
            {/* Hero section */}
            <div className="mb-12 bg-gradient-to-r from-[var(--md-sys-color-primary-container)] to-[var(--md-sys-color-secondary-container)] rounded-2xl p-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-[var(--md-sys-color-on-primary-container)]">
                    Product Categories
                </h1>
                <p className="text-xl mb-6 text-[var(--md-sys-color-on-secondary-container)]">
                    Browse our wide range of products across multiple categories
                </p>
            </div>
            
            {/* Categories grid */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
                    All Categories
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <Link
                            key={category._id}
                            to={`/products/${category.name}`}
                            className="block group"
                        >
                            <div className="bg-[var(--md-sys-color-surface-container)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="h-40 bg-[var(--md-sys-color-surface-variant)] flex items-center justify-center">
                                    <span className="text-5xl text-[var(--md-sys-color-on-surface-variant)]">
                                        📱
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-[var(--md-sys-color-on-surface)] group-hover:text-[var(--md-sys-color-primary)]">
                                        {category.name}
                                    </h3>
                                    
                                    {category.description && (
                                        <p className="text-[var(--md-sys-color-on-surface-variant)] mb-4">
                                            {category.description.length > 100
                                                ? category.description.substring(0, 100) + '...'
                                                : category.description}
                                        </p>
                                    )}
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[var(--md-sys-color-on-surface-variant)]">
                                            {category.fields?.length || 0} specifications
                                        </span>
                                        <span className="text-[var(--md-sys-color-primary)] font-medium">
                                            Browse &rarr;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            
            {/* Featured products */}
            {featuredProducts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
                        Featured Products
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                className="block group"
                            >
                                <div className="bg-[var(--md-sys-color-surface-container)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div className="h-40 bg-white p-4 flex items-center justify-center">
                                        <img 
                                            src={product.productImages?.[0] || '/images/placeholder.png'} 
                                            alt={product.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2 text-[var(--md-sys-color-on-surface)] line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="font-bold text-[var(--md-sys-color-primary)]">
                                            {product.price?.toLocaleString()} đ
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}