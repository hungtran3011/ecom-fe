import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../libs/axios';
import { useCartContext } from '../hooks/useCartContext';
import ProductGallery from '../components/ProductGallery';
import ProductVariationSelector from '../components/ProductVariationSelector';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import LoadingProductDetail from '../components/LoadingProductDetail';
import ErrorDisplay from '../components/ErrorDisplay';

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const [selectedVariation, setSelectedVariation] = useState(null);
    const { addToCart } = useCartContext();
    const [quantity, setQuantity] = useState(1);
    
    // Fetch product details
    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/product/${productId}`);
            return response.data;
        }
    });
    
    // Fetch product variations
    const { data: variations } = useQuery({
        queryKey: ['variations', productId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/product/${productId}/variations`);
            return response.data;
        },
        enabled: !!product?.hasVariations
    });
    
    // Set default variation when data is loaded
    useState(() => {
        if (variations && variations.length > 0) {
            const defaultVariation = variations.find(v => v.isDefault) || variations[0];
            setSelectedVariation(defaultVariation);
        }
    }, [variations]);
    
    // Handle variation change
    const handleVariationChange = (variation) => {
        setSelectedVariation(variation);
    };
    
    // Handle add to cart
    const handleAddToCart = () => {
        if (product.hasVariations && !selectedVariation) {
            alert('Please select a product variation');
            return;
        }
        
        addToCart({
            id: productId,
            name: product.name,
            price: selectedVariation?.price || product.price,
            image: product.productImages?.[0] || '/images/placeholder.png',
            variationId: selectedVariation?._id,
            quantity: quantity
        });
    };
    
    if (isLoading) {
        return <LoadingProductDetail />;
    }
    
    if (error) {
        return <ErrorDisplay error={error} />;
    }
    
    // Determine current price (from variation or base product)
    const currentPrice = selectedVariation?.price || product.price;
    const salePrice = product.salePrice;
    const hasDiscount = salePrice && salePrice < currentPrice;
    
    return (
        <div className="container mx-auto py-8 px-4">
            {/* Breadcrumbs */}
            <div className="flex items-center mb-8 text-sm text-[var(--md-sys-color-on-surface-variant)]">
                <Link to="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:underline">Products</Link>
                {product.category && (
                    <>
                        <span className="mx-2">/</span>
                        <Link 
                            to={`/products/${product.category.name || product.category}`}
                            className="hover:underline"
                        >
                            {product.category.name || product.category}
                        </Link>
                    </>
                )}
                <span className="mx-2">/</span>
                <span className="font-medium text-[var(--md-sys-color-on-surface)]">
                    {product.name}
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Gallery */}
                <div>
                    <ProductGallery images={product.productImages || []} />
                </div>
                
                {/* Product Information */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-[var(--md-sys-color-on-surface)]">
                        {product.name}
                    </h1>
                    
                    {/* Price */}
                    <div className="flex items-center gap-4">
                        {hasDiscount ? (
                            <>
                                <span className="text-3xl font-bold text-[var(--md-sys-color-primary)]">
                                    {salePrice.toLocaleString()} đ
                                </span>
                                <span className="text-xl line-through text-[var(--md-sys-color-on-surface-variant)]">
                                    {currentPrice.toLocaleString()} đ
                                </span>
                                <span className="bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] px-2 py-1 rounded text-sm">
                                    -{Math.round((currentPrice - salePrice) / currentPrice * 100)}%
                                </span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-[var(--md-sys-color-primary)]">
                                {currentPrice.toLocaleString()} đ
                            </span>
                        )}
                    </div>
                    
                    {/* Short description */}
                    <p className="text-[var(--md-sys-color-on-surface-variant)]">
                        {product.description?.substring(0, 150)}
                        {product.description?.length > 150 ? '...' : ''}
                    </p>
                    
                    {/* SKU & Stock */}
                    <div className="flex flex-col gap-2">
                        <p className="text-[var(--md-sys-color-on-surface-variant)]">
                            <span className="font-medium">SKU:</span> {selectedVariation?.sku || product.sku || 'N/A'}
                        </p>
                        <p className="text-[var(--md-sys-color-on-surface-variant)]">
                            <span className="font-medium">Availability:</span> {' '}
                            {(selectedVariation?.stock > 0 || product.stock > 0) ? (
                                <span className="text-green-600">In Stock</span>
                            ) : (
                                <span className="text-red-600">Out of Stock</span>
                            )}
                        </p>
                    </div>
                    
                    {/* Variation selector */}
                    {product.hasVariations && variations && (
                        <ProductVariationSelector 
                            variations={variations}
                            selectedVariation={selectedVariation}
                            onVariationChange={handleVariationChange}
                        />
                    )}
                    
                    {/* Quantity selector */}
                    <div className="flex items-center gap-4">
                        <span className="font-medium text-[var(--md-sys-color-on-surface)]">Quantity:</span>
                        <div className="flex border border-[var(--md-sys-color-outline)] rounded">
                            <button 
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-3 py-1 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)]"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-16 text-center border-x border-[var(--md-sys-color-outline)] bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                            />
                            <button 
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-3 py-1 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)]"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    {/* Add to cart button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={selectedVariation?.stock === 0 || product.stock === 0}
                        className="mt-4 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add to Cart
                    </button>
                    
                    {/* Custom fields */}
                    {product.fields && Object.keys(product.fields).length > 0 && (
                        <div className="mt-6 border-t border-[var(--md-sys-color-outline)] pt-6">
                            <h3 className="text-lg font-medium mb-4 text-[var(--md-sys-color-on-surface)]">
                                Specifications
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.entries(product.fields).map(([key, value]) => (
                                    <div key={key} className="flex">
                                        <span className="w-1/3 font-medium text-[var(--md-sys-color-on-surface)]">
                                            {key}:
                                        </span>
                                        <span className="w-2/3 text-[var(--md-sys-color-on-surface-variant)]">
                                            {typeof value === 'object' ? JSON.stringify(value) : value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Product tabs (Description, Specifications, Reviews) */}
            <ProductTabs 
                product={product}
                fields={product.fields}
            />
            
            {/* Related products */}
            <RelatedProducts 
                categoryId={product.category._id || product.category}
                currentProductId={productId}
            />
        </div>
    );
}