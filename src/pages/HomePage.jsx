import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../libs/axios';
import Carousel from '../components/Carousel';
import { FeaturedProducts } from '../components/FeaturedProducts';
import Skeleton from '../components/ui/Skeleton';

export default function HomePage() {
    // Fetch featured products
    const { data: featuredProducts, isLoading: featuredLoading, error: featuredError } = useQuery({
        queryKey: ['featuredProducts'],
        queryFn: async () => {
            const response = await axiosInstance.get('/product?featured=true&limit=4');
            return response.data.products || [];
        }
    });
    
    // Fetch latest products
    const { data: latestProducts, isLoading: latestLoading, error: latestError } = useQuery({
        queryKey: ['latestProducts'],
        queryFn: async () => {
            const response = await axiosInstance.get('/product?sortBy=-createdAt&limit=4');
            return response.data.products || [];
        }
    });
    
    // // Fetch top categories
    // const { data: categories } = useQuery({
    //     queryKey: ['homeCategories'],
    //     queryFn: async () => {
    //         const response = await axiosInstance.get('/product/categories?limit=4');
    //         return response.data.categories || [];
    //     }
    // });
    
    // Format products for the FeaturedProducts component
    const formatProducts = (products) => {
        if (!products) return [];
        
        return products.map(product => ({
            id: product._id || product.id,
            name: product.name,
            basePrice: product.price,
            salePrice: product.salePrice || null,
            note: product.shortDescription || '',
            rating: product.rating || 0,
            imageUrl: product.productImages?.[0] || '/images/placeholder.png',
            options: {
                colors: Array.isArray(product.variations) ?
                    product.variations
                        .filter(v => v.attributes?.some(a => 
                            a.type === 'Color' || Object.keys(a).includes('Color')
                        ))
                        .map(v => {
                            // Find color attribute - handle both attribute formats
                            const colorAttr = v.attributes.find(a => 
                                a.type === 'Color' || Object.keys(a).includes('Color')
                            );
                            
                            if (!colorAttr) return null;
                            
                            // Handle different attribute structures
                            const colorValue = colorAttr.type === 'Color' 
                                ? colorAttr.value 
                                : colorAttr.Color;
                                
                            return {
                                text: typeof colorValue === 'object' ? colorValue.name : colorValue,
                                value: typeof colorValue === 'object' ? colorValue.hex : colorValue
                            };
                        }).filter(Boolean) : [],
                sizes: {
                    text: 'Size',
                    options: Array.isArray(product.variations) ?
                        product.variations
                            .filter(v => v.attributes?.some(a => 
                                a.type === 'Size' || Object.keys(a).includes('Size')
                            ))
                            .map(v => {
                                const sizeAttr = v.attributes.find(a => 
                                    a.type === 'Size' || Object.keys(a).includes('Size')
                                );
                                
                                if (!sizeAttr) return null;
                                
                                return sizeAttr.type === 'Size' ? sizeAttr.value : sizeAttr.Size;
                            }).filter(Boolean) : []
                }
            }
        }));
    };

    return (
        <div className="pb-12">
            {/* Hero Banner */}
            <Carousel 
                images={['/images/banner1.webp', '/images/banner2.webp', '/images/banner3.webp']} 
                autoplay={true}
                interval={5000}
            />
            
            {/* Category Highlights */}
            {/* <section className="bg-[var(--md-sys-color-surface-variant)] py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--md-sys-color-on-surface)]">
                        Shop by Category
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories ? (
                            categories.map(category => (
                                <Link 
                                    key={category._id} 
                                    to={`/products?category=${category._id}`}
                                    className="bg-[var(--md-sys-color-surface)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="aspect-square relative">
                                        <img 
                                            src={category.image || '/images/category-placeholder.png'} 
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                            <h3 className="text-white text-lg md:text-xl font-medium px-2 text-center">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            Array(4).fill(0).map((_, i) => (
                                <Skeleton key={i} variant="container" className="aspect-square rounded-lg" />
                            ))
                        )}
                    </div>
                </div>
            </section> */}
            
            {/* Featured Products Section */}
            <section className="py-12">
                {/* <div className="container mx-auto px-4"> */}
                    {featuredLoading ? (
                        <>
                            <Skeleton variant="title" width="200px" className="mb-6 mx-auto" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <Skeleton key={i} variant="container" className="h-80 rounded-lg" />
                                ))}
                            </div>
                        </>
                    ) : featuredError ? (
                        <div className="text-center">
                            <p className="text-[var(--md-sys-color-error)]">
                                Unable to load featured products. Please try again later.
                            </p>
                        </div>
                    ) : (
                        <>
                            <FeaturedProducts 
                                headerText="Featured Products" 
                                products={formatProducts(featuredProducts)} 
                            />
                            <div className="text-center mt-8">
                                <Link 
                                    to="/products?featured=true" 
                                    className="inline-block px-6 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
                                >
                                    View All Featured Products
                                </Link>
                            </div>
                        </>
                    )}
                {/* </div> */}
            </section>
            
            {/* Promotional Banner */}
            <section className="bg-[var(--md-sys-color-primary-container)] py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-2xl md:text-4xl font-bold text-[var(--md-sys-color-on-primary-container)] mb-4">
                                Special Offer
                            </h2>
                            <p className="text-[var(--md-sys-color-on-primary-container)] opacity-90 mb-6">
                                Get up to 40% off on selected items. Limited time offer.
                            </p>
                            <Link 
                                to="/products?discount=true" 
                                className="inline-block px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
                            >
                                Shop Now
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <img 
                                src="/images/special-offer.webp" 
                                alt="Special Offer" 
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Latest Products Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {latestLoading ? (
                        <>
                            <Skeleton variant="title" width="200px" className="mb-6 mx-auto" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <Skeleton key={i} variant="container" className="h-80 rounded-lg" />
                                ))}
                            </div>
                        </>
                    ) : latestError ? (
                        <div className="text-center">
                            <p className="text-[var(--md-sys-color-error)]">
                                Unable to load latest products. Please try again later.
                            </p>
                        </div>
                    ) : (
                        <>
                            <FeaturedProducts 
                                headerText="Latest Arrivals" 
                                products={formatProducts(latestProducts)} 
                            />
                            <div className="text-center mt-8">
                                <Link 
                                    to="/products?sortBy=newest" 
                                    className="inline-block px-6 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
                                >
                                    View All New Arrivals
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
            
            {/* Newsletter Signup */}
            <section className="bg-[var(--md-sys-color-surface-variant)] py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--md-sys-color-on-surface)]">
                        Stay Updated
                    </h2>
                    <p className="text-[var(--md-sys-color-on-surface-variant)] mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter to receive updates on new products, special offers, and exclusive deals.
                    </p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="flex-1 px-4 py-3 rounded-lg border border-[var(--md-sys-color-outline)] bg-[var(--md-sys-color-surface)]"
                        />
                        <button className="px-6 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-lg hover:opacity-90 transition-opacity">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}