// @flow
import React from 'react'
import styled from 'react-emotion'
// Components
import ProductListItem from './ProductListItem'

export const ProductsListContainer = styled('div')`
  @keyframes fadeInTopBottom {
    0% {
      margin-top: -10px;
      opacity: 0;
    }

    100% {
      margin-top: 0;
      opacity: 1;
    }
  }

  animation: fadeInTopBottom 1s ease;
`

const ProductsList = ({ data }) => (
  <ProductsListContainer>
    {
      data.allShopifyProduct.edges.map(({ node: product }) => (
        <ProductListItem
          key={product.id}
          handle={product.handle}
          title={product.title}
          imageSrc={product.images[0].originalSrc}
          price={product.variants[0].price}
        />
      ))
    }
  </ProductsListContainer>
)

export default ProductsList
