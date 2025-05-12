import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../libs/axios';
import ProductCard from './ProductCard';
import Skeleton from './ui/Skeleton';

export default function RelatedProducts({ categoryId, currentProductId }) {
  // Fetch related products
  const { data, isLoading, error } = useQuery({
    queryKey: ['relatedProducts', categoryId, currentProductId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/product?category=${categoryId}&limit=4&exclude=${currentProductId}`
      );
      return response.data;
    },
    enabled: !!categoryId && !!currentProductId,
  });
  
  if (error) return null; // Silently fail if there's an error
  
  // Don't render if no related products
  if (!isLoading && (!data?.products || data.products.length === 0)) return null;
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">
        Related Products
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading skeletons
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="container" className="rounded-lg overflow-hidden">
              <Skeleton height="12rem" className="rounded-none" />
              <div className="p-4">
                <Skeleton variant="title" width="75%" className="mb-2" />
                <Skeleton variant="text" width="50%" className="mb-3" />
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} width="1rem" height="1rem" rounded="full" />
                  ))}
                </div>
              </div>
            </Skeleton>
          ))
        ) : (
          // Actual products
          data.products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              onClick={() => {window.location.href = `/product/${product._id || product.id}`;}}
              product={{
                id: product._id || product.id,
                name: product.name,
                basePrice: product.price,
                salePrice: product.salePrice || null,
                imageUrl: product.productImages?.[0] || '/images/placeholder.png',
                options: {
                  colors: Array.isArray(product.variations)
                    ? product.variations
                        .filter((v) => v.attributes?.some((a) => a.type === 'Color'))
                        .map((v) => {
                          const colorAttr = v.attributes.find((a) => a.type === 'Color');
                          return { name: colorAttr?.value || 'Default', value: colorAttr?.value || '#000000' };
                        })
                    : [],
                  sizes: {
                    text: 'Size',
                    options: Array.isArray(product.variations)
                      ? product.variations
                          .filter((v) => v.attributes?.some((a) => a.type === 'Size'))
                          .map((v) => {
                            const sizeAttr = v.attributes.find((a) => a.type === 'Size');
                            return { name: sizeAttr?.value || 'Default', value: sizeAttr?.value || 'One Size' };
                          })
                      : [],
                  },
                },
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}