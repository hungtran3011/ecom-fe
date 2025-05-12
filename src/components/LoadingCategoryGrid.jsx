import React from 'react';
import Skeleton from './ui/Skeleton';

export default function LoadingCategoryGrid() {
  // Create an array of 8 items for skeleton placeholders
  const skeletons = Array(8).fill(null);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero section skeleton */}
      <Skeleton className="mb-12 rounded-2xl p-12">
        <Skeleton 
          height="2.5rem" 
          width="66%" 
          className="mx-auto mb-4 bg-[var(--md-sys-color-outline)]" 
        />
        <Skeleton 
          height="1.5rem" 
          width="50%" 
          className="mx-auto bg-[var(--md-sys-color-outline)]" 
        />
      </Skeleton>

      {/* Categories section skeleton */}
      <div className="mb-16">
        <Skeleton variant="title" width="12rem" className="mb-6" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skeletons.map((_, index) => (
            <Skeleton key={index} variant="container" className="rounded-lg overflow-hidden">
              <Skeleton height="10rem" className="rounded-none" />
              <div className="p-6 space-y-3">
                <Skeleton variant="title" width="75%" className="bg-[var(--md-sys-color-outline)]" />
                <Skeleton variant="text" className="bg-[var(--md-sys-color-outline)]" />
                <Skeleton variant="text" width="50%" className="bg-[var(--md-sys-color-outline)]" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton variant="text" width="33%" className="bg-[var(--md-sys-color-outline)]" />
                  <Skeleton variant="text" width="25%" className="bg-[var(--md-sys-color-outline)]" />
                </div>
              </div>
            </Skeleton>
          ))}
        </div>
      </div>

      {/* Featured products section skeleton */}
      <div className="mb-12">
        <Skeleton variant="title" width="12rem" className="mb-6" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(null).map((_, index) => (
            <Skeleton key={index} variant="container" className="rounded-lg overflow-hidden">
              <Skeleton height="10rem" className="rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton variant="text" width="75%" className="bg-[var(--md-sys-color-outline)]" />
                <Skeleton height="1.5rem" width="33%" className="bg-[var(--md-sys-color-outline)]" />
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}