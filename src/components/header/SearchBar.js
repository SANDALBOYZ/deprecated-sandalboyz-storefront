// @flow
import React from 'react'
import styled from 'react-emotion'

export const SearchBarContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 2em;
  padding: 2px 5px;
  width: 100%;
`

export const SearchBarInput = styled('input')`
  border: 0;
  outline: 0;
  background: none;
  padding: 0;
  font-family: serif;
  font-style: italic;
  font-size: 1.6em;
  width: 100%;
`

export const SearchArrow = styled('button')`
  &:after {
    content: ">>"
  }
`

const SearchBar = () => (
  <SearchBarContainer>
    <SearchBarInput placeholder='Search' />
    <SearchArrow />
  </SearchBarContainer>
)

export default SearchBar
