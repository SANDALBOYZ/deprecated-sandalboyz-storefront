import { keyframes } from 'react-emotion'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const fadeInLeftRight = keyframes`
  0% {
    margin-left: -10px;
    opacity: 0;
  }

  100% {
    margin-left: 0;
    opacity: 1;
  }
`
