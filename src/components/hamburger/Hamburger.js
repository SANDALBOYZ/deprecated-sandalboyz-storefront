// @flow
import React from 'react'
import styled, { css } from 'react-emotion'
import { Context } from 'src/layouts/index'

export const Buns = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
  height: 20px;
  width: 20px;
`

export const Patties = styled('div')`
  position: relative;
  display: flex;
  top: 50%;
  transform: ${props => props.active ? 'rotate(45deg)' : 'none'};
  transition: ${props => props.active
    ? 'transform 0.075s 0.12s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    : 'transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
  };
  &, &:before, &:after {
    content: '';
    height: 3px;
    width: 100%;
    background-color: #000000;
    border-radius: 5px;
  }
  &:before {
    position: absolute;
    top: ${props => props.active ? 0 : '-6px'};
    opacity: ${props => props.active ? 0 : 1};
    transition: ${props => props.active
      ? 'top 0.075s ease, opacity 0.075s 0.12s ease'
      : 'top 0.075s 0.12s ease, opacity 0.075s ease'
    };
  }
  &:after {
    position: absolute;
    top: ${props => props.active ? 0 : '6px'};
    transform: ${props => props.active ? 'rotate(-90deg)' : 'none'};
    transition: ${props => props.active
      ? 'top 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
      : 'top 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    };
  }
`

const Hamburger = () => (
  <Context.Consumer>
    {context => (
      <Buns onClick={context.toggleMenu}>
        <Patties active={context.menuOpen} />
      </Buns>
    )}
  </Context.Consumer>
)

export default Hamburger
