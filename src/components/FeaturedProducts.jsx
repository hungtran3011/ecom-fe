import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'

const FeaturedProducts = props => {
  const navigate = useNavigate()

  const handleClick = (productId) => {
    navigate(
      `/product/${productId}`,
    )
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="col-span-3 text-xl font-bold text-[var(--md-sys-color-primary)]">
        {props.headerText}
      </h2>
      <div className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-4 p-4" aria-label="Featured Products">
        {props.products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => handleClick(product.id)}
            />
        ))}
      </div>
    </section>
  )
}

FeaturedProducts.defaultProps = {
  onClick: () => { },
  headerText: '',
}
FeaturedProducts.displayName = 'FeaturedProducts'
FeaturedProducts.propTypes = {
  headerText: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape(ProductCard.propTypes)
  ).isRequired
}

export { FeaturedProducts }