// @flow
import React from 'react'
import styled from 'react-emotion'
import { get } from 'lodash'
import { truncatePrice } from 'src/helpers'
// Components
import Select from 'react-select'
// Styles
import { gray, grayLight, grayDark } from 'src/theme'

export const ProductTitleContainer = styled('div')`
  margin-bottom: 15px;
`

export const ProductTitle = styled('h3')`
  margin: 0;
`

const selectStyles = injectedData => ({
  container: () => ({
    width: '60%',
    height: '30px'
  }),
  control: (base, { isFocused }) => ({
    display: 'flex',
    backgroundColor: 'white',
    height: '30px',
    border: '1px solid',
    borderColor: isFocused ? 'black' : grayLight,
    borderRadius: 0,
    outline: 0,
    boxShadow: 'gray'
  }),
  menu: () => ({
    background: 'white',
    position: 'absolute',
    width: `${injectedData.selectControlWidth}px`,
    height: '200px',
    border: '1px solid black',
    borderTop: 0,
    overflowY: 'scroll'
  }),
  option: (_, { isDisabled, isFocused, isSelected }) => ({
    backgroundColor: isDisabled
      ? null
      : isSelected ? gray : isFocused ? grayLight : null,
    padding: '2px 6px',
    color: isDisabled ? grayLight : 'black'
  })
})

export const AddToCartContainer = styled('div')`
  display: flex;
  margin-bottom: 30px;
`

export const AddToCartButton = styled('button')`
  background-color: black;
  color: white;
  border: 1px solid black;
  border-left: 0;
  height: 30px;
  width: 40%;
`

export const ProductDescription = styled('article')`
  padding-left: 1em;
`

// `pathContext` comes from `gatsby-node.js`.
type PathContextType ={
  id: string,
  handle: string,
  title: string,
  images: Array<Object>,
  variants: Array<Object>
}

type ProductPageTemplateProps = {
  pathContext: PathContextType
}

class ProductPageTemplate extends React.Component<ProductPageTemplateProps> {
  selectControlWidth = () => (
    get(document.getElementsByClassName('react-select__control'), '[0].offsetWidth')
  )

  render () {
    // TODO: Have dynamic currency.
    const currency = 'USD'
    const { pathContext } = this.props

    return (
      <div>
        {
          pathContext.images.map(image => (
            <img key={image.originalSrc} src={image.originalSrc} />
          ))
        }
        <div>
          <ProductTitleContainer>
            <ProductTitle>{pathContext.title}</ProductTitle>
            <span>{truncatePrice(pathContext.variants[0].price)} {currency}</span>
          </ProductTitleContainer>
          <AddToCartContainer>
            <Select
              options={pathContext.variants.map(variant => ({
                value: variant.id,
                label: variant.title,
                isDisabled: !variant.availableForSale
              }))}
              // NOTE: `classNamePrefix` for debugging.
              classNamePrefix='react-select'
              // menuIsOpen
              isSearchable={false}
              styles={selectStyles({
                selectControlWidth: this.selectControlWidth()
              })}
            />
            <AddToCartButton>Add To Cart</AddToCartButton>
          </AddToCartContainer>
          <ProductDescription>{pathContext.description}</ProductDescription>
        </div>
      </div>
    )
  }
}

export default ProductPageTemplate
