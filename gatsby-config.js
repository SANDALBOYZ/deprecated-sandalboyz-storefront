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
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        verbose: true
      }
    }
  ]
}
