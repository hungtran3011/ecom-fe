import React from 'react'
import PropTypes from 'prop-types'

function ProductCard(props    ) {
  return (
    <div className="block rounded-2xl border-[var(--md-sys-color-outline)] border-[1px] bg-[var(--md-sys-color-surface-container-lowest)]">
        <div className="flex flex-col gap-3 items-center">
            <img src={props.product.imageUrl} alt={props.product.name} className="w-full h-28 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold text-[var(--md-sys-color-on-surface)]">{props.product.name}</h3>
            <div className="flex flex-col p-1">
                <p className="text-sm text-[var(--md-sys-color-on-surface)]">{props.product.note}</p>
                <div className="flex items-center gap-2">
                    {props.product.salePrice ? (
                        <>
                            <span className="text-red-500 line-through">${props.product.basePrice.toFixed(2)}</span>
                            <span className="text-green-500">${props.product.salePrice.toFixed(2)}</span>
                        </>
                    ) : ( 
                        <span>${props.product.basePrice.toFixed(2)}</span>
                    )}     
                </div>
            </div>
            <button onClick={() => props.onClick(props.product.id)} className="px-4 py-2 bg-[var(--md-sys-color-primary)] text-white rounded">Buy Now</button>
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
        salePercentage: PropTypes.number,
        note: PropTypes.string,
        rating: PropTypes.number,
        imageUrl: PropTypes.string.isRequired,
        options: PropTypes.shape({
            color: PropTypes.string,
            size: PropTypes.string,
            warranty: PropTypes.string,
            others: PropTypes.objectOf(PropTypes.any)
        })
    }).isRequired,
    onClick: PropTypes.func,
}

ProductCard.defaultProps = {
    onClick: () => {},
    options: {
        color: '',
        size: '',
        warranty: '',
    },
}

export default ProductCard
