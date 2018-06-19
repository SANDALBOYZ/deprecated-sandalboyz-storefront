// @flow
import React from 'react'
import styled from 'react-emotion'
import StyledLink from 'src/components/StyledLink'
import { truncatePrice } from 'src/helpers'

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

type ProductListProps = {
  handle: string,
  title: string,
  imageSrc: string,
  price: string
}

const ProductList = ({ handle, title, imageSrc, price }: ProductListProps) => {
  // NOTE: This is hardcoded for now. Will need to change later.
  const currency = 'USD'

  return (
    <ProductContainer to={`/products/${handle}`}>
      <img src={imageSrc} />
      <div>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>{truncatePrice(String(price))} {currency}</ProductPrice>
      </div>
    </ProductContainer>
  )
}

export default ProductList
