// @flow
import React from 'react'
import styled, { css } from 'react-emotion'
import { get } from 'lodash'
import { extractIdFromGatsbyId, truncatePrice } from 'src/helpers'
import type {
  PathContextType,
  VariantType
} from './ProductPageTemplate.types'
// Apollo
import { graphql as graphqlConnect } from 'react-apollo'
import { checkoutLineItemsAdd } from 'src/api'
// Components
import Slider from 'react-slick'
import Select from 'react-select'
import { Context } from 'src/layouts/index'
// Styles
import { gray, grayLight } from 'src/theme'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const sliderContainer = css`
  margin-bottom: 50px;
`

export const container = css`
  padding: 0 5px;
`

export const ProductTitleContainer = styled('div')`
  margin-bottom: 15px;
`

export const ProductTitle = styled('h3')`
  margin: 0;
  text-transform: uppercase;
`

export const ProductPrice = styled('span')`
  font-size: 1.1rem;
`

type SelectStylesType = {
  [string]: any
}

const selectStyles = (injectedData: SelectStylesType): Object => ({
  container: () => ({
    width: '60%',
    height: '30px'
  }),
  control: (_, { isFocused }) => ({
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
  margin-bottom: 15px;
`

export const AddToCartButton = styled('button')`
  background-color: black;
  color: white;
  border: 1px solid black;
  border-left: 0;
  height: 30px;
  width: 40%;
  &:hover {
    border-color: ${({ theme }) => theme.grayDark};
    background-color: ${({ theme }) => theme.grayDark};
  }
  &:active {
    border-color: ${({ theme }) => theme.gray};
    background-color: ${({ theme }) => theme.gray};
  }
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'}
`

export const ProductDescription = styled('article')`
  padding: 0 1em;
  margin-bottom: 10px;
  p {
    margin-bottom: 1rem;
  }
`

export const SizeChartButton = styled('button')`
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`

type Props = {
  context: any,
  pathContext: PathContextType,
  checkoutLineItemsAdd: Function
}

type State = {
  variant?: VariantType
}

class ProductPageTemplate extends React.Component<Props, State> {
  state = {
    variant: undefined
  }

  selectControlWidth = () => (
    get(document.getElementsByClassName('react-select__control'), '[0].offsetWidth')
  )

  setVariant = (variant: VariantType) => { this.setState({ variant }) }

  addItemToCart = () => {
    const { context } = this.props

    const variantId = extractIdFromGatsbyId(get(this.state.variant, 'value'), 'ProductVariant')

    this.props.checkoutLineItemsAdd({
      variables: {
        checkoutId: context.checkout.id,
        lineItems: [{ variantId, quantity: 1 }]
      }
    }).then((res) => {
      context.setCheckout(res.data.checkoutLineItemsAdd.checkout)
      context.toggleAddedToCart()
    })
  }

  render () {
    // TODO: Have dynamic currency.
    const currency = 'USD'
    const { pathContext } = this.props

    return (
      <div>
        <Slider
          className={sliderContainer}
          dots
          infinite
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {
            pathContext.images.map(image => (
              <img key={image.originalSrc} src={image.originalSrc} />
            ))
          }
        </Slider>
        <div className={container}>
          <ProductTitleContainer>
            <ProductTitle>{pathContext.title}</ProductTitle>
            <ProductPrice>{truncatePrice(pathContext.variants[0].price)} {currency}</ProductPrice>
          </ProductTitleContainer>
          <AddToCartContainer>
            <Select
              options={pathContext.variants.map(variant => ({
                value: variant.id,
                label: variant.title,
                isDisabled: !variant.availableForSale
              }))}
              // NOTE: `classNamePrefix` is needed for `this.selectControlWidth`.
              classNamePrefix='react-select'
              onChange={this.setVariant}
              value={this.state.variant}
              isSearchable={false}
              styles={selectStyles({
                selectControlWidth: this.selectControlWidth()
              })}
            />
            <AddToCartButton
              onClick={this.addItemToCart}
              disabled={Boolean(!this.state.variant)}
            >
              Add To Cart
            </AddToCartButton>
          </AddToCartContainer>
          <ProductDescription dangerouslySetInnerHTML={{ __html: pathContext.descriptionHtml }} />
          <SizeChartButton>Size Chart</SizeChartButton>
        </div>
      </div>
    )
  }
}

export default graphqlConnect(
  checkoutLineItemsAdd, { name: 'checkoutLineItemsAdd' }
)(props => (
  <Context.Consumer>
    {context => <ProductPageTemplate {...props} context={context} />}
  </Context.Consumer>
))
