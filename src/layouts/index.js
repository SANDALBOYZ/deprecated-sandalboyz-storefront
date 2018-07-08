// @flow
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import type { CheckoutType } from './App.types'
// Apollo
import { client } from 'src/api'
import { ApolloProvider } from 'react-apollo'
// Components
import Header from 'src/components/header/Header'
import BagMenu from 'src/components/bag/BagMenu'
// Styles
import { ThemeProvider } from 'emotion-theming'
import * as theme from 'src/theme'
import 'src/styles'

export const Context = React.createContext()

export const AppWrapper = styled('div')`
  &:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.45);
    z-index: 900;
    opacity: ${({ bagOpen }) => bagOpen ? 1 : 0};
    visibility: ${({ bagOpen }) => bagOpen ? 'visible' : 'hidden'};
    transition: all 0.5s ease-in-out;
  }
`

export const ChildrenContainer = styled('div')`
  padding: 1.2em;
`

type Props = {
  children: Function,
  data: any
}

type State = {
  menuOpen: boolean,
  bagOpen: boolean,
  addedToCart: boolean,
  checkout?: CheckoutType,
  toggleMenu: Function,
  closeMenu: Function,
  toggleBag: Function,
  closeBag: Function,
  setCheckout: Function,
  toggleAddedToCart: Function,
  untoggleAddedToCart: Function
}

class App extends React.Component<Props, State> {
  constructor () {
    super()

    this.state = {
      menuOpen: false,
      bagOpen: false,
      addedToCart: false,
      checkout: undefined,
      toggleMenu: this.toggleMenu,
      closeMenu: this.closeMenu,
      toggleBag: this.toggleBag,
      closeBag: this.closeBag,
      setCheckout: this.setCheckout,
      toggleAddedToCart: this.toggleAddedToCart,
      untoggleAddedToCart: this.untoggleAddedToCart
    }
  }

  toggleMenu = () => {
    const { menuOpen } = this.state

    this.setState({ menuOpen: !menuOpen })
  }

  closeMenu = () => { this.setState({ menuOpen: false }) }

  toggleBag = () => {
    const { bagOpen } = this.state

    this.setState({ bagOpen: !bagOpen })
  }

  closeBag = () => { this.setState({ bagOpen: false }) }

  setCheckout = (checkout: CheckoutType) => {
    this.setState({ checkout })
  }

  toggleAddedToCart = () => { this.setState({ addedToCart: true }) }

  untoggleAddedToCart = () => { this.setState({ addedToCart: false }) }

  render () {
    const { children, data } = this.props

    return (
      <React.Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          // meta={}
        />
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Context.Provider value={this.state}>
              <AppWrapper bagOpen={this.state.bagOpen}>
                <Header siteTitle={data.site.siteMetadata.title} />
                <BagMenu isOpen={this.state.bagOpen} />
                <ChildrenContainer>
                  {children()}
                </ChildrenContainer>
              </AppWrapper>
            </Context.Provider>
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
    )
  }
}

export default App

declare var graphql: any

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
