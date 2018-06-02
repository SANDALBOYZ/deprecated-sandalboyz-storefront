import React from 'react'
import { css } from 'react-emotion'
// import Link from 'gatsby-link'

const className = css({
  height: '1000px',
  backgroundColor: 'lightgray'
})

const IndexPage = () => (
  <div className={className}>
    <h1>Hi people</h1>
    <p>Welcome to the new SANDALBOYZ storefront.</p>
    <p>It's still under construction if you couldn't tell.</p>
  </div>
)

export default IndexPage
