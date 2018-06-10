// @flow
import React from 'react'

const Product = ({ title, imageSrc }) => (
  <div>
    <img src={imageSrc} />
    <div>{title}</div>
  </div>
)

export default Product
