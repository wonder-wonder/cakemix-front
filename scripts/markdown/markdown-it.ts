const markdownIt = require('markdown-it')
const container = require('markdown-it-container')
// Plugins
const plugins = require('./plugins.ts').default

const highlight = (code: string, lang: string) => {
  if (!lang || /no(-?)highlight|plain|text/.test(lang)) {
    return
  }
  plugins.preRender(parser, code, lang)
  return require('highlight.js').highlightAuto(code, [lang]).value
}

const parser = new markdownIt('default', {
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
  highlight,
})

parser.use(require('markdown-it-emoji'))
parser.use(require('markdown-it-task-checkbox'))
parser.use(require('markdown-it-sanitizer'))
parser.use(require('markdown-it-imsize'))
parser.use(require('markdown-it-sub'))
parser.use(require('markdown-it-ins'))
parser.use(require('markdown-it-mark'))
parser.use(require('markdown-it-abbr'))
parser.use(require('markdown-it-video'))
parser.use(require('markdown-it-pdf'), {
  showUrl: true,
})
parser.use(require('markdown-it-texmath'), {
  engine: require('katex'),
  delimiters: 'dollars',
  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
})
parser.use(container, 'info')
parser.use(container, 'success')
parser.use(container, 'warning')
parser.use(container, 'danger')

export default parser
