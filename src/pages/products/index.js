// @flow
import React from 'react'
import Product from 'src/components/products/Product'

const ProductsPage = ({ data }) => {
  console.log(data)

  return (
    <React.Fragment>
      <section>
        <h2>All</h2>
        <p>Anything and everything under the SANDALBOYZ sun.</p>
      </section>
      <section className='productsContainer'>
        {
          data.allShopifyProduct.edges.map(({ node: product }) => (
            <Product
              key={product.id}
              title={product.title}
              imageSrc={product.images[0].originalSrc}
            />
          ))
        }
      </section>
    </React.Fragment>
  )
}

export default ProductsPage

export const query = graphql`
  query ProductsQuery {
    allShopifyProduct {
      edges {
        node {
          id
          title
          images {
            originalSrc
          }
        }
      }
    }
  }
`
