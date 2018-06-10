// @flow
import React from 'react'
import styled from 'react-emotion'

export const normalizePrice = (priceString: string): string =>
  priceString.split('.')[0]

export const ProductContainer = styled('div')``

export const ProductDescription = styled('div')``

export const ProductTitle = styled('h3')`
  text-transform: uppercase;
  font-size: 1.2em;
  margin-bottom: 0;
`

export const ProductPrice = styled('span')`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: bold;
`

const Product = ({ title, imageSrc, price }) => {
  // NOTE: This is hardcoded for now. Will need to change later.
  const currency = 'USD'

  return (
    <div>
      <img src={imageSrc} />
      <div>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>{normalizePrice(String(price))} {currency}</ProductPrice>
      </div>
    </div>
  )
}

export default Product
