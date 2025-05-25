import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../libs/axios';
import { useCartContext } from '../hooks/useCartContext';
import { useToast } from '../hooks/useToast';
import ProductGallery from '../components/ProductGallery';
import ProductVariantSelector from '../components/ProductVariantSelector';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import LoadingProductDetail from '../components/LoadingProductDetail';
import ErrorDisplay from '../components/ErrorDisplay';
import { formatCurrency } from '../utils/formatCurrency';

export default function ProductDetailsPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { addToCart } = useCartContext();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);

    // Fetch product details
    const { data: product, isLoading: productLoading, error: productError } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/product/${productId}`);
            return response.data;
        },
    });

    // Fetch product variations
    const { data: variants, isLoading: variantsLoading, error: variantsError } = useQuery({
        queryKey: ['variations', productId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/product/${productId}/variations`);
            return response.data;
        },
        enabled: !!product?.hasVariations, // Only fetch if product has variations
    });

    // Set default variation when variants are loaded
    useEffect(() => {
        if (variants && variants.length > 0) {
            // Find default variant, or use first one
            const defaultVariant = variants.find(v => v.isDefault) || variants[0];
            setSelectedVariant(defaultVariant);
        }
    }, [variants]);

    // Handle variation change
    const handleVariantChange = (variant) => {
        setSelectedVariant(variant);
    };

    // Handle add to cart
    const handleAddToCart = () => {
        // Check if we need a variant selection but none is selected
        if (product.hasVariations && !selectedVariant) {
            toast({
                title: "Selection Required",
                description: "Please select a product variation.",
                type: "error"
            });
            return;
        }

        // Check if selected variant is out of stock
        if (selectedVariant && selectedVariant.stock === 0) {
            toast({
                title: "Out of Stock",
                description: "This product variant is currently out of stock.",
                type: "error"
            });
            return;
        }

        // Add to cart with variant information if applicable
        addToCart({
            id: productId,
            name: product.name,
            price: selectedVariant?.price || product.price,
            image: product.productImages?.[0] || '/images/placeholder.png',
            variationId: selectedVariant?._id,
            variationName: selectedVariant?.name || '', // Just use the variant name directly
            quantity: quantity
        });

        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
            action: {
                label: "View Cart",
                onClick: () => navigate("/cart"),
            },
            duration: 5000
        });
    };

    if (productLoading || (product?.hasVariations && variantsLoading)) {
        return <LoadingProductDetail />;
    }

    if (productError || variantsError) {
        return <ErrorDisplay error={productError || variantsError} />;
    }

    // Determine current price (from variant or base product)
    const currentPrice = selectedVariant?.price || product.price;
    const hasDiscount = product.salePrice && product.salePrice < currentPrice;
    const displayPrice = hasDiscount ? product.salePrice : currentPrice;

    // Determine stock availability
    const inStock = product.hasVariations 
        ? (selectedVariant?.stock > 0) 
        : (product.stock > 0);

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
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-3xl font-bold text-[var(--md-sys-color-on-surface)]">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-center gap-4">
                                {hasDiscount ? (
                                    <>
                                        <span className="text-3xl font-bold text-[var(--md-sys-color-primary)]">
                                            {formatCurrency(product.salePrice)}
                                        </span>
                                        <span className="text-xl line-through text-[var(--md-sys-color-on-surface-variant)]">
                                            {formatCurrency(currentPrice)}
                                        </span>
                                        <span className="bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] px-2 py-1 rounded text-sm">
                                            -{Math.round((currentPrice - product.salePrice) / currentPrice * 100)}%
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-[var(--md-sys-color-primary)]">
                                        {formatCurrency(currentPrice)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Mobile Add to Cart Button (simplified for mobile screens) */}
                        <div className="flex flex-row items-center justify-center gap-4 w-full md:hidden">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.hasVariations && !selectedVariant || !inStock}
                                className="py-3 w-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Short description */}
                        <p className="text-[var(--md-sys-color-on-surface-variant)]">
                            {product.description?.substring(0, 150)}
                            {product.description?.length > 150 ? '...' : ''}
                        </p>

                        {/* SKU & Stock */}
                        <div className="flex flex-col gap-2">
                            <p className="text-[var(--md-sys-color-on-surface-variant)]">
                                <span className="font-medium">SKU:</span> {selectedVariant?.sku || product.sku || 'N/A'}
                            </p>
                            <p className="text-[var(--md-sys-color-on-surface-variant)]">
                                <span className="font-medium">Availability:</span> {' '}
                                {inStock ? (
                                    <span className="text-green-600">In Stock</span>
                                ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                )}
                            </p>
                        </div>

                        {/* Variation selector */}
                        {product.hasVariations && variants && variants.length > 0 && (
                            <ProductVariantSelector
                                variants={variants}
                                selectedVariant={selectedVariant}
                                onVariantChange={handleVariantChange}
                                disabled={!inStock}
                            />
                        )}

                        {/* Quantity selector */}
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-[var(--md-sys-color-on-surface)]">Quantity:</span>
                            <div className="flex border border-[var(--md-sys-color-outline)] rounded-lg">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={!inStock}
                                    className="px-3 py-1 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] disabled:opacity-50"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={selectedVariant?.stock || 99}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    disabled={!inStock}
                                    className="w-16 text-center border-x border-[var(--md-sys-color-outline)] bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] disabled:opacity-50"
                                />
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    disabled={!inStock || (selectedVariant && quantity >= selectedVariant.stock)}
                                    className="px-3 py-1 text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-variant)] disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to cart button - desktop only */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.hasVariations && !selectedVariant || !inStock}
                            className="mt-4 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
                        >
                            {!inStock ? 'Out of Stock' : 'Add to Cart'}
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