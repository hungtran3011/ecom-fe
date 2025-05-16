import React from 'react'
import PropTypes from 'prop-types'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

function ProductCard(props) {
    const { product } = props;
    const hasDiscount = product.salePrice && product.salePrice < product.basePrice;

    return (
        <div 
            className="relative block rounded-2xl border border-[var(--md-sys-color-outline)] bg-[var(--md-sys-color-surface-container)] p-4 shadow-sm w-full cursor-pointer transition-shadow hover:shadow-md" 
            aria-label="Product Card" 
            onClick={props.onClick}
        >
            {/* Discount tag */}
            {hasDiscount && (
                <div className="absolute top-0 right-0">
                    <div className="bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] text-xs font-bold px-2 py-1 rounded-tr-2xl rounded-bl-md">
                        -{(Math.abs(product.basePrice - product.salePrice) / product.basePrice * 100).toFixed(0)}%
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center gap-4">
                {/* Product image */}
                <div className="aspect-square w-full max-w-[160px] flex items-center justify-center mb-2">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/placeholder.png';
                        }}
                    />
                </div>

                {/* Product name */}
                <h3 className="text-center text-base font-semibold text-[var(--md-sys-color-on-surface)] line-clamp-2 min-h-[48px] w-full">
                    {product.name}
                </h3>

                {/* Price display */}
                <div className="flex items-center justify-center gap-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-[var(--md-sys-color-on-surface-variant)] line-through text-sm">
                                {formatCurrency(product.basePrice)}
                            </span>
                            <span className="text-[var(--md-sys-color-primary)] font-medium">
                                {formatCurrency(product.salePrice)}
                            </span>
                        </>
                    ) : (
                        <span className="text-[var(--md-sys-color-primary)] font-medium">
                            {formatCurrency(product.basePrice)}
                        </span>
                    )}
                </div>

                {/* Storage options */}
                {product.options?.sizes?.options?.length > 0 && (
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[var(--md-sys-color-on-surface-variant)] text-sm">
                            {product.options.sizes.text}
                        </p>
                        <div className="flex flex-wrap justify-center w-full gap-1">
                            <ToggleGroup.Root
                                type="single"
                                defaultValue={product.options.sizes.options[0]}
                                className="flex flex-wrap justify-center gap-1 w-full"
                                aria-label="Storage options"
                            >
                                {product.options.sizes.options.slice(0, 3).map((size) => (
                                    <ToggleGroup.Item
                                        key={size}
                                        value={size}
                                        className="
                                        px-2 py-1 rounded-full border border-[var(--md-sys-color-outline)] text-xs
                                        text-[var(--md-sys-color-on-surface)]
                                        data-[state=on]:bg-[var(--md-sys-color-primary-container)]
                                        data-[state=on]:border-[var(--md-sys-color-primary)]
                                        data-[state=on]:text-[var(--md-sys-color-on-primary-container)]
                                        transition-colors duration-200"
                                    >
                                        {size}
                                    </ToggleGroup.Item>
                                ))}
                                {product.options.sizes.options.length > 3 && (
                                    <span className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                                        +{product.options.sizes.options.length - 3} more
                                    </span>
                                )}
                            </ToggleGroup.Root>
                        </div>
                    </div>
                )}

                {/* Color options */}
                {product.options?.colors?.length > 0 && (
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[var(--md-sys-color-on-surface-variant)] text-sm">Colors</p>
                        <div className="flex flex-wrap justify-center gap-1">
                            {product.options.colors.slice(0, 4).map((color) => (
                                <div
                                    key={color.value}
                                    className="w-6 h-6 rounded-full border border-[var(--md-sys-color-outline)]"
                                    style={{ backgroundColor: color.value }}
                                    title={color.text}
                                />
                            ))}
                            {product.options.colors.length > 4 && (
                                <span className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                                    +{product.options.colors.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        basePrice: PropTypes.number.isRequired,
        salePrice: PropTypes.number,
        imageUrl: PropTypes.string.isRequired,
        options: PropTypes.shape({
            sizes: PropTypes.shape({
                text: PropTypes.string,
                options: PropTypes.arrayOf(PropTypes.string),
            }),
            colors: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.string,
            }))
        })
    }).isRequired,
    onClick: PropTypes.func,
};

ProductCard.defaultProps = {
    onClick: () => {},
    product: {
        id: '',
        name: '',
        basePrice: 0,
        salePrice: null,
        imageUrl: '',
        options: {
            sizes: {
                text: '',
                options: [],
            },
            colors: [],
        },
    },
};

export default ProductCard;
