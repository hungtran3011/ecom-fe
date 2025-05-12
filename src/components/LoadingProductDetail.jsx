import React from 'react';
import Skeleton from './ui/Skeleton';

export default function LoadingProductDetail() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center mb-8">
        <Skeleton width="3rem" height="1rem" className="mr-2" />
        <Skeleton width="1rem" height="1rem" className="mx-2" />
        <Skeleton width="5rem" height="1rem" className="mx-2" />
        <Skeleton width="1rem" height="1rem" className="mx-2" />
        <Skeleton width="8rem" height="1rem" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Gallery skeleton */}
        <div>
          <Skeleton height="400px" className="mb-4" />
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} width="80px" height="80px" />
            ))}
          </div>
        </div>
        
        {/* Product Information skeleton */}
        <div className="flex flex-col gap-6">
          <Skeleton variant="title" width="80%" height="2.5rem" />
          
          {/* Price skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton width="8rem" height="2rem" />
            <Skeleton width="5rem" height="1.5rem" />
          </div>
          
          {/* Description skeleton */}
          <div>
            <Skeleton variant="text" width="100%" className="mb-2" />
            <Skeleton variant="text" width="90%" className="mb-2" />
            <Skeleton variant="text" width="95%" />
          </div>
          
          {/* SKU & Stock skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="35%" />
          </div>
          
          {/* Variation selector skeleton */}
          <div>
            <Skeleton variant="title" width="6rem" height="1.5rem" className="mb-3" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} width="2rem" height="2rem" rounded="full" />
              ))}
            </div>
          </div>
          
          {/* Quantity selector skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton width="5rem" height="1.5rem" />
            <Skeleton width="8rem" height="2.5rem" />
          </div>
          
          {/* Add to cart button skeleton */}
          <Skeleton variant="button" width="100%" height="3rem" className="mt-4" />
          
          {/* Custom fields skeleton */}
          <div className="mt-6 border-t border-[var(--md-sys-color-outline)] pt-6">
            <Skeleton variant="title" width="8rem" className="mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex">
                  <Skeleton width="30%" height="1.5rem" className="mr-4" />
                  <Skeleton width="60%" height="1.5rem" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs skeleton */}
      <div className="mt-16">
        <div className="flex border-b border-[var(--md-sys-color-outline)] mb-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} width="8rem" height="2.5rem" className="mr-4" />
          ))}
        </div>
        
        <div className="py-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="text" width={`${100 - index * 5}%`} className="mb-4" />
          ))}
        </div>
      </div>
      
      {/* Related Products skeleton */}
      <div className="mt-16">
        <Skeleton variant="title" width="12rem" className="mb-8" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}