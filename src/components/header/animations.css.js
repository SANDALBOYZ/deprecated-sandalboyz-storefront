import { keyframes } from 'react-emotion'

export const fadeIn = keyframes`
  from, 0%, to {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const fadeInLeftRight = keyframes`
  from, 0%, to {
    margin-left: -10px;
    opacity: 0;
  }

  100% {
    margin-left: 0;
    opacity: 1;
  }
`
