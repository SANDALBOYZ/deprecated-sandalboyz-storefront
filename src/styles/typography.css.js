import { injectGlobal } from 'emotion'
import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '12px',
  baseLineHeight: 1.5,
  headerFontFamily: ['pragmatica', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
  bodyFontFamily: ['pragmatica', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
  includeNormalize: false
})

injectGlobal`
  @import url("https://use.typekit.net/zua1bpy.css");
`

injectGlobal(typography.toString())
