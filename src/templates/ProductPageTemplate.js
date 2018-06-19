// @flow
import React from 'react'
import styled from 'react-emotion'
import { truncatePrice } from 'src/helpers'
// Components
import Select from 'react-select'
// Styles
import { gray, grayLight, grayDark } from 'src/theme'

export const ProductTitle = styled('h3')`
  margin: 0;
`

const selectStyles = {
  control: (base, { isFocused }) => ({
    display: 'flex',
    backgroundColor: 'white',
    height: '30px',
    width: '200px',
    border: '1px solid',
    borderColor: isFocused ? 'black' : grayLight,
    borderRadius: 0,
    outline: 0,
    boxShadow: 'gray'
  }),
  menu: () => ({
    width: '200px',
    border: '1px solid black',
    borderTop: 0
  }),
  option: (_, { isDisabled, isFocused, isSelected }) => ({
    backgroundColor: isDisabled
      ? null
      : isSelected ? gray : isFocused ? grayLight : null,
    padding: '0 5px',
    color: isDisabled ? grayLight : 'black'
  })
}

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
          <ProductTitle>{pathContext.title}</ProductTitle>
          <span>{truncatePrice(pathContext.variants[0].price)} {currency}</span>
          <div>
            <Select
              options={pathContext.variants.map(variant => ({
                value: variant.id,
                label: variant.title,
                isDisabled: !variant.availableForSale
              }))}
              // menuIsOpen
              isSearchable={false}
              styles={selectStyles}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPageTemplate
