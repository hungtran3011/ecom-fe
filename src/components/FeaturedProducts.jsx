import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

const FeaturedProducts = props => {
  return (
    <section className="grid grid-cols-3 gap-4 p-4">

      {props.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

FeaturedProducts.defaultProps = {
  onClick: () => { },
}
FeaturedProducts.displayName = 'FeaturedProducts'
FeaturedProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape(ProductCard.propTypes)
  ).isRequired
}

export { FeaturedProducts }