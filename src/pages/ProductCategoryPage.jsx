import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axiosInstance from '../libs/axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import CategoryBreadcrumb from '../components/CategoryBreadcrumb';
import LoadingProductGrid from '../components/LoadingProductGrid';
import ErrorDisplay from '../components/ErrorDisplay';

export default function ProductCategoryPage() {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const brand = searchParams.get('brand');
    const criteria = searchParams.get('criteria');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sort = searchParams.get('sort') || 'newest';

    const [filters, setFilters] = useState({
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        inStock: searchParams.get('inStock') === 'true',
        fields: {}
    });

    // Get category details
    const { data: categoryData } = useQuery({
        queryKey: ['category', category],
        queryFn: async () => {
            if (!category) return null;
            const response = await axiosInstance.get(`/product/category/name/${category}`);
            return response.data;
        },
        enabled: !!category
    });

    // Create a query function that includes the filters
    const fetchProducts = async () => {
        // Build query parameters
        const params = new URLSearchParams();

        // Remove category from query params since it's now in the path
        // if (category) params.append('category', category);

        if (brand) params.append('brand', brand);
        if (criteria) params.append('criteria', criteria);

        // Pagination
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        // Sorting
        if (sort === 'price-asc') params.append('sortBy', 'price');
        if (sort === 'price-desc') params.append('sortBy', '-price');
        if (sort === 'newest') params.append('sortBy', '-createdAt');
        if (sort === 'rating') params.append('sortBy', '-rating');

        // Price filters
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        // Stock filter
        if (filters.inStock) params.append('inStock', 'true');

        // Dynamic field filters
        if (categoryData?.fields) {
            Object.entries(filters.fields).forEach(([key, value]) => {
                if (value) params.append(`field[${key}]`, value);
            });
        }

        // Use the correct URL structure with category in the path
        const response = await axiosInstance.get(
            `/product/category/name/${category}?${params.toString()}`
        );
        return response.data;
    };

    // Use React Query to fetch and cache the data
    const { data, isLoading, error, isPreviousData } = useQuery({
        queryKey: ['products', category, brand, criteria, page, limit, sort, filters],
        queryFn: fetchProducts,
        keepPreviousData: true
    });

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(prev => {
            const updated = { ...prev, ...newFilters };

            // Update search params
            setSearchParams(currentParams => {
                const params = new URLSearchParams(currentParams);

                // Update price filters
                if (updated.minPrice) params.set('minPrice', updated.minPrice);
                else params.delete('minPrice');

                if (updated.maxPrice) params.set('maxPrice', updated.maxPrice);
                else params.delete('maxPrice');

                // Update stock filter
                if (updated.inStock) params.set('inStock', 'true');
                else params.delete('inStock');

                // Update field filters
                Object.entries(updated.fields || {}).forEach(([key, value]) => {
                    if (value) params.set(`field[${key}]`, value);
                    else params.delete(`field[${key}]`);
                });

                // Reset to first page
                params.set('page', '1');

                return params;
            });

            return updated;
        });
    };

    // Handle sort changes
    const handleSortChange = (newSort) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('sort', newSort);
            return params;
        });
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('page', newPage.toString());
            return params;
        });
    };

    // Initialize field filters when category data loads
    useEffect(() => {
        if (categoryData?.fields) {
            const fieldFilters = {};

            // Extract any existing field filters from URL
            searchParams.forEach((value, key) => {
                if (key.startsWith('field[') && key.endsWith(']')) {
                    const fieldName = key.slice(6, -1);
                    fieldFilters[fieldName] = value;
                }
            });

            // Update filters with field values
            setFilters(prev => ({
                ...prev,
                fields: { ...fieldFilters }
            }));
        }
    }, [categoryData, searchParams]);

    if (isLoading) {
        return <LoadingProductGrid />;
    }

    if (error) {
        return <ErrorDisplay error={error} />;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Breadcrumb */}
            <CategoryBreadcrumb category={categoryData?.name || category} />

            {/* Category Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-[var(--md-sys-color-on-surface)]">
                    {categoryData?.name || category}
                </h1>
                {categoryData?.description && (
                    <p className="text-[var(--md-sys-color-on-surface-variant)]">
                        {categoryData.description}
                    </p>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filter Panel */}
                <div className="md:w-1/4">
                    <FilterPanel
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        categoryFields={categoryData?.fields || []}
                    />
                </div>

                {/* Products Section */}
                <div className="md:w-3/4">
                    {/* Sort & Results Count */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <p className="text-[var(--md-sys-color-on-surface-variant)] mb-2 sm:mb-0">
                            {data?.products?.length || 0} results found
                        </p>

                        <SortDropdown
                            value={sort}
                            onChange={handleSortChange}
                            options={[
                                { value: 'newest', label: 'Newest First' },
                                { value: 'price-asc', label: 'Price: Low to High' },
                                { value: 'price-desc', label: 'Price: High to Low' },
                                { value: 'rating', label: 'Best Rating' }
                            ]}
                        />
                    </div>

                    {/* Product Grid */}
                    {data?.products?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {data.products.map((product) => (
                                    <div key={product._id || product.id} className="flex">
                                        <ProductCard
                                            product={{
                                                id: product._id || product.id,
                                                name: product.name,
                                                basePrice: product.price,
                                                salePrice: product.salePrice || null,
                                                imageUrl: product.productImages?.[0] || '/images/placeholder.png',
                                                options: {
                                                    colors: Array.isArray(product.variations) ?
                                                        product.variations
                                                            .filter(v => v.attributes?.some(a => a.type === 'Color'))
                                                            .map(v => {
                                                                const colorAttr = v.attributes.find(a => a.type === 'Color');
                                                                return {
                                                                    text: colorAttr.value.name || colorAttr.value,
                                                                    value: colorAttr.value.hex || colorAttr.value
                                                                };
                                                            }) : [],
                                                    sizes: {
                                                        text: 'Size',
                                                        options: Array.isArray(product.variations) ?
                                                            product.variations
                                                                .filter(v => v.attributes?.some(a => a.type === 'Size'))
                                                                .map(v => {
                                                                    const sizeAttr = v.attributes.find(a => a.type === 'Size');
                                                                    return sizeAttr.value;
                                                                }) : []
                                                    }
                                                }
                                            }}
                                            onClick={() => {
                                                window.location.href = `/product/${product._id || product.id}`;
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {data.total > limit && (
                                <div className="mt-8 flex justify-center">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={Math.ceil(data.total / limit)}
                                        onPageChange={handlePageChange}
                                        isDisabled={isPreviousData}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12 bg-[var(--md-sys-color-surface-container)] rounded-lg">
                            <p className="text-lg text-[var(--md-sys-color-on-surface-variant)]">
                                No products found matching your criteria.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchParams({}); // clear all search parameters
                                    setFilters({
                                        minPrice: '',
                                        maxPrice: '',
                                        inStock: false,
                                        fields: {}
                                    });
                                }}
                                className="mt-4 px-4 py-2 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}