// @flow
import React from 'react'
import styled from 'react-emotion'
import StyledLink from 'src/components/StyledLink'

export const normalizePrice = (priceString: string): string =>
  priceString.split('.')[0]

export const ProductContainer = styled(StyledLink)`
  text-decoration: none;
  color: #000000;
  &:hover {
    color: ${({ theme }) => theme.grayLight}
  }
`

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

type ProductProps = {
  handle: string,
  title: string,
  imageSrc: string,
  price: string
}

const Product = ({ handle, title, imageSrc, price }: ProductProps) => {
  // NOTE: This is hardcoded for now. Will need to change later.
  const currency = 'USD'

  return (
    <ProductContainer to={`/products/${handle}`}>
      <img src={imageSrc} />
      <div>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>{normalizePrice(String(price))} {currency}</ProductPrice>
      </div>
    </ProductContainer>
  )
}

export default Product
