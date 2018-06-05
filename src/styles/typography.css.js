import { injectGlobal } from 'emotion'
import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '12px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  includeNormalize: false
})

injectGlobal(typography.toString())
