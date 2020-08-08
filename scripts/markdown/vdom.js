// VDOM
const htmlToVdom = require('html-to-vdom')({
  VNode: require('virtual-dom/vnode/vnode'),
  VText: require('virtual-dom/vnode/vtext'),
})
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')
const vdomToHtml = require('virtual-dom/create-element')
// Plugins
const markdownIt = require('./markdown-it')
const plugins = require('./plugins')

/*
dTree: DOM Tree
pTree: previous VDOM Tree
*/
let dTree = null
let pTree = null

export default {
  update: (base, markdown) => {
    if (dTree == null) {
      pTree = htmlToVdom('<div>' + markdownIt.render(markdown) + '</div>')
      dTree = vdomToHtml(pTree)
      base.appendChild(dTree)
    } else {
      const lTree = htmlToVdom('<div>' + markdownIt.render(markdown) + '</div>')
      dTree = patch(dTree, diff(pTree, lTree))
      pTree = lTree
    }
    plugins.update(base)
  },
}
