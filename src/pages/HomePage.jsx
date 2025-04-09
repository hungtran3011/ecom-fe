import React from 'react';

import Carousel from '../components/Carousel';
import { FeaturedProducts } from '../components/FeaturedProducts';

export default function HomePage() {
    return (
        <div>
            <h1 className="text-[var(--md-sys-color-on-surface)]">Welcome to the Home Page</h1>
            <Carousel images={['src/assets/images/banner1.webp', 'src/assets/images/banner2.webp', 'src/assets/images/banner3.webp']} />
            <FeaturedProducts products={[{
                id: '1',
                name: 'Product 1',
                basePrice: 100,
                salePrice: 80,
                note: 'Best product ever',
                rating: 4.5,
                imageUrl: 'src/assets/images/product1.webp',
                options: {
                    color: 'Red',
                    size: 'M',
                    warranty: '2 years',
                    others: {}
                }
            }, {
                id: '2',
                name: 'Product 2',
                basePrice: 200,
                salePrice: null,
                note: 'Amazing product',
                rating: 4.0,
                imageUrl: 'src/assets/images/product2.webp',
                options: {
                    color: 'Blue',
                    size: 'L',
                    warranty: '1 year',
                    others: {}
                }
            }, {
                id: '3',
                name: 'Product 3',
                basePrice: 150,
                salePrice: 120,
                note: 'Great value for money',
                rating: 4.8,
                imageUrl: 'src/assets/images/product3.webp',
                options: {
                    color: 'Green',
                    size: 'S',
                    warranty: '6 months',
                    others: {}
                }
            }]} />
            {/* <section className="mt-8">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-primary)]">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
                        <img src="src/assets/images/laptop.webp" alt="Laptop" className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">High-Performance Laptop</h3>
                        <p className="text-sm text-gray-600">Powerful and portable for all your needs.</p>
                        <button className="mt-2 px-4 py-2 bg-[var(--md-sys-color-primary)] text-white rounded">Buy Now</button>
                    </div>
                    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
                        <img src="src/assets/images/smartphone.webp" alt="Smartphone" className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">Latest Smartphone</h3>
                        <p className="text-sm text-gray-600">Stay connected with cutting-edge technology.</p>
                        <button className="mt-2 px-4 py-2 bg-[var(--md-sys-color-primary)] text-white rounded">Buy Now</button>
                    </div>
                    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
                        <img src="src/assets/images/headphones.webp" alt="Headphones" className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">Noise-Cancelling Headphones</h3>
                        <p className="text-sm text-gray-600">Immerse yourself in high-quality sound.</p>
                        <button className="mt-2 px-4 py-2 bg-[var(--md-sys-color-primary)] text-white rounded">Buy Now</button>
                    </div>
                    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
                        <img src="src/assets/images/smartwatch.webp" alt="Smartwatch" className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">Smartwatch</h3>
                        <p className="text-sm text-gray-600">Track your fitness and stay organized.</p>
                        <button className="mt-2 px-4 py-2 bg-[var(--md-sys-color-primary)] text-white rounded">Buy Now</button>
                    </div>
                </div>
            </section>
            <section className="mt-12">
                <h2 className="text-xl font-bold text-[var(--md-sys-color-primary)]">Why Shop With Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div className="flex items-center">
                        <img src="src/assets/icons/fast-delivery.svg" alt="Fast Delivery" className="w-12 h-12 mr-4" />
                        <p className="text-sm text-gray-600">Fast and reliable delivery to your doorstep.</p>
                    </div>
                    <div className="flex items-center">
                        <img src="src/assets/icons/secure-payment.svg" alt="Secure Payment" className="w-12 h-12 mr-4" />
                        <p className="text-sm text-gray-600">Secure payment options for peace of mind.</p>
                    </div>
                    <div className="flex items-center">
                        <img src="src/assets/icons/customer-support.svg" alt="Customer Support" className="w-12 h-12 mr-4" />
                        <p className="text-sm text-gray-600">24/7 customer support to assist you anytime.</p>
                    </div>
                </div>
            </section> */}
        </div>
    );
}