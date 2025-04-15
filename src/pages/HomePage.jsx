import React from 'react';

import Carousel from '../components/Carousel';
import { FeaturedProducts } from '../components/FeaturedProducts';

export default function HomePage() {
    return (
        <div>
            {/* <h1 className="text-[var(--md-sys-color-on-surface)]">Welcome to the Home Page</h1> */}
            <Carousel images={['/images/banner1.webp', '/images/banner2.webp', '/images/banner3.webp']} />
            <FeaturedProducts products={[{
                id: '1',
                name: 'OPPO Find X8',
                basePrice: 22900000,
                salePrice: 20000000,
                note: 'Best product ever',
                rating: 4.5,
                imageUrl: '/images/oppo-find-x8.png',
                options: {
                    colors: [
                        { text: 'Cherry Blossom Pink', value: '#000000' },
                        { text: 'Moonlight White', value: '#FFFFFF' },
                        { text: 'Island Blue', value: '#FF0000' },
                        { text: 'Starry Black', value: '#00FF00' },
                    ],
                    sizes: {
                        text: 'Size',
                        options: ["16/256"]
                    },
                    warranty: ['2 years'],
                    others: {}
                }
            }, {
                id: '2',
                name: 'iPhone 16 Pro Max',
                basePrice: 34900000,
                salePrice: 31090000,
                note: 'Amazing product',
                rating: 4.0,
                imageUrl: '/images/iphone-16-pro-max.png',
                options: {
                    colors: [],
                    sizes: {
                        text: 'Size',
                        options: ["256 GB", "512 GB", "1 TB"]
                    },
                    warranty: ['1 year'],
                    others: {}
                }
            }, {
                id: '3',
                name: 'OPPO Find N5',
                basePrice: 44990000,
                // salePrice: 120,
                note: 'Great value for money',
                rating: 4.8,
                imageUrl: '/images/oppo-find-n5.png',
                options: {
                    colors: ['Green'],
                    sizes: {
                        text: 'Size',
                        options: ['S']
                    },
                    warranty: ['6 months'],
                    others: {}
                }
            }]} />
        </div>
    );
}