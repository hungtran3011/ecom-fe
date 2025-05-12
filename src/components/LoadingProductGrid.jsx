import React from 'react';
import Skeleton from './ui/Skeleton';

export default function LoadingProductGrid() {
  // Create skeleton placeholders for product grid
  const productSkeletons = Array(12).fill(null);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center">
        <Skeleton width="3rem" height="1rem" className="mr-2" />
        <Skeleton width="1rem" height="1rem" rounded="full" className="mx-2" />
        <Skeleton width="5rem" height="1rem" className="mx-2" />
        <Skeleton width="1rem" height="1rem" rounded="full" className="mx-2" />
        <Skeleton width="6rem" height="1rem" />
      </div>
      
      {/* Category Header skeleton */}
      <div className="mb-8">
        <Skeleton variant="title" width="16rem" className="mb-2" />
        <Skeleton variant="text" width="50%" />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel skeleton */}
        <div className="md:w-1/4">
          <Skeleton variant="container" className="p-6 rounded-lg h-[500px]">
            <Skeleton variant="title" width="6rem" className="mb-6" />
            
            {/* Price filter skeleton */}
            <div className="mb-6 border-b border-[var(--md-sys-color-outline-variant)] pb-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton variant="title" width="4rem" />
                <Skeleton width="1.5rem" height="1.5rem" rounded="full" />
              </div>
              <div className="flex gap-4 items-center">
                <Skeleton variant="button" className="w-full" />
                <Skeleton width="1rem" height="1rem" />
                <Skeleton variant="button" className="w-full" />
              </div>
            </div>
            
            {/* Availability skeleton */}
            <div className="mb-6 border-b border-[var(--md-sys-color-outline-variant)] pb-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton variant="title" width="7rem" />
                <Skeleton width="1.5rem" height="1.5rem" rounded="full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton width="1.25rem" height="1.25rem" />
                <Skeleton width="6rem" height="1.25rem" />
              </div>
            </div>
            
            {/* Fields skeleton */}
            <div className="mb-6">
              <Skeleton variant="title" width="8rem" className="mb-4" />
              <div className="space-y-6">
                {Array(3).fill(null).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton variant="text" width="5rem" />
                    <Skeleton variant="button" className="w-full" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Clear filters button skeleton */}
            <Skeleton variant="button" className="w-full" />
          </Skeleton>
        </div>
        
        {/* Products Section skeleton */}
        <div className="md:w-3/4">
          {/* Sort & Results Count skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <Skeleton variant="text" width="8rem" className="mb-2 sm:mb-0" />
            <Skeleton variant="button" width="10rem" />
          </div>
          
          {/* Product Grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productSkeletons.map((_, index) => (
              <Skeleton key={index} variant="container" className="rounded-lg overflow-hidden">
                <Skeleton height="12rem" className="rounded-none" />
                <div className="p-4">
                  <Skeleton variant="title" width="75%" className="mb-2" />
                  <Skeleton variant="text" width="50%" className="mb-3" />
                  <div className="flex gap-1">
                    {Array(3).fill(null).map((_, i) => (
                      <Skeleton key={i} width="1rem" height="1rem" rounded="full" />
                    ))}
                  </div>
                </div>
              </Skeleton>
            ))}
          </div>
          
          {/* Pagination skeleton */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1">
              {Array(5).fill(null).map((_, index) => (
                <Skeleton
                  key={index}
                  width="2rem"
                  height="2rem"
                  className={index === 2 ? 'bg-[var(--md-sys-color-primary)]' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}