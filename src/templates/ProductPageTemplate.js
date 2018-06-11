// @flow
import React from 'react'

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
    const { pathContext } = this.props

    return (
      <div>
        {
          pathContext.images.map(image => (
            <img key={image.originalSrc} src={image.originalSrc} />
          ))
        }
        <div>{pathContext.title}</div>
      </div>
    )
  }
}

export default ProductPageTemplate
