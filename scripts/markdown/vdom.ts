// VDOM
const htmlToVdom = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext'),
})
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')
const vdomToHtml = require('virtual-dom/create-element')
// Plugins
const markdownIt = require('./markdown-it.ts').default
const plugins = require('./plugins.ts').default

/*
dTree: DOM Tree
pTree: previous VDOM Tree
*/
let dTree: HTMLElement | null = null
let pTree: object | null = null

const update = (base: HTMLElement, markdown: string) => {
  if (dTree === null) {
    pTree = htmlToVdom('<div>' + markdownIt.render(markdown) + '</div>')
    dTree = vdomToHtml(pTree)
    base.appendChild(dTree!)
  } else {
    const lTree: HTMLElement = htmlToVdom(
      '<div>' + markdownIt.render(markdown) + '</div>'
    )
    dTree = patch(dTree, diff(pTree, lTree))
    pTree = lTree
  }
  plugins.update(base)
}

const init = () => {
  dTree = null
  pTree = null
}

export default {
  update,
  init,
}
