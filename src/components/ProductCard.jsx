import React from 'react'
import PropTypes from 'prop-types'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

function ProductCard(props) {
    const { product } = props;
    const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
    
    return (
        <div className="relative block rounded-2xl border border-[var(--md-sys-color-outline)] bg-[var(--md-sys-color-surface-container)] p-4 shadow-sm">
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
                <div className="w-32 h-32 flex items-center justify-center">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain" 
                    />
                </div>
                
                {/* Product name */}
                <h3 className="text-center text-base font-semibold text-[var(--md-sys-color-on-surface)]">
                    {product.name}
                </h3>
                
                {/* Price display */}
                <div className="flex items-center justify-center gap-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-[var(--md-sys-color-on-surface)] line-through text-sm">
                                {product.basePrice.toLocaleString()}
                            </span>
                            <span className="text-[var(--md-sys-color-primary)] font-medium">
                                {product.salePrice.toLocaleString()}
                            </span>
                        </>
                    ) : (
                        <span className="text-[var(--md-sys-color-primary)] font-medium">
                            {product.basePrice.toLocaleString()}
                        </span>
                    )}
                </div>
                
                {/* Storage options */}
                {product.options.sizes && (
                    <div className="flex flex-col gap-3 w-full">
                        <p className='text-[var(--md-sys-color-on-surface)]'>{product.options.sizes.text}</p>
                        <div className="justify-center items-center flex w-full">
                            <ToggleGroup.Root
                                type="single"
                                defaultValue={product.options.sizes.options[0]}
                                className="flex flex-wrap justify-center gap-2 w-full"
                                aria-label="Storage options"
                            >
                                {product.options.sizes.options.map((size) => (
                                    <ToggleGroup.Item
                                        key={size}
                                        value={size}
                                        className="px-3 py-1.5 rounded-full border border-[var(--md-sys-color-outline)] text-sm
                                        text-[var(--md-sys-color-on-surface)]
                                                  data-[state=on]:bg-[var(--md-sys-color-primary-container)]
                                                  data-[state=on]:border-[var(--md-sys-color-primary)]
                                                  data-[state=on]:text-[var(--md-sys-color-on-primary-container)]
                                                  transition-colors duration-200"
                                    >
                                        {size}
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup.Root>
                        </div>
                    </div>
                )}
                
                {/* Color options */}
                {product.options.colors && (
                    <div className="flex gap-3 items-center">
                        {/* <p>{product.options.colors.text}</p> */}
                        <ToggleGroup.Root
                            type="single"
                            defaultValue={product.options.colors[0]}
                            className="flex flex-wrap justify-center gap-2 w-full"
                            aria-label="Color options"
                        >
                            {product.options.colors.map((color) => (
                                <ToggleGroup.Item
                                    key={color.text}
                                    value={color.value}
                                    className="px-3 py-1.5 rounded-full border border-[var(--md-sys-color-outline)] 
                                    text-[var(--md-sys-color-on-surface)]
                                              data-[state=on]:bg-[var(--md-sys-color-primary-container)]
                                              data-[state=on]:border-[var(--md-sys-color-primary)]
                                              data-[state=on]:text-[var(--md-sys-color-on-primary-container)]
                                              transition-colors duration-200"
                                    // style={{ backgroundColor: color }}
                                >
                                    {color.text}
                                </ToggleGroup.Item>
                            ))}
                        </ToggleGroup.Root>
                    </div>
                )}
            </div>
        </div>
    )
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
}

ProductCard.defaultProps = {
    onClick: () => { },
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
            colors: []
        },
    },
}

export default ProductCard
