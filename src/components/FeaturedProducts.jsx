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
  onClick: () => {},
}
FeaturedProducts.displayName = 'FeaturedProducts'
FeaturedProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
        others: PropTypes.objectOf(PropTypes.any),
      }),
    })
  ).isRequired,
  onClick: PropTypes.func,
}

export {FeaturedProducts}