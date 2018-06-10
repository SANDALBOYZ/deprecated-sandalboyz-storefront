module.exports = {
  siteMetadata: {
    title: 'SANDALBOYZ'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'sandalboyz-2',
        accessToken: 'a6a2961ca8f4beaf87aedf3d74c38114',
        verbose: true
      }
    }
  ]
}
