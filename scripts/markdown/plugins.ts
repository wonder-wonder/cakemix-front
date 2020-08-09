import 'abcjs/abcjs-midi.css'
import 'font-awesome/css/font-awesome.min.css'
const plantumlPlugin = require('plantuml-encoder')
const abcPlugin = require('abcjs')
const abcMidiPlugin = require('abcjs/midi')
const flowchartPlugin = require('flowchart.js')
const mermaidPlugin = require('mermaid')

mermaidPlugin.initialize({ startOnLoad: false })

const mermaid = (el: HTMLElement) => {
  if (!el.firstChild?.firstChild) {
    return
  }
  const tDom = el.firstChild?.firstChild as HTMLElement
  try {
    tDom.removeAttribute('data-processed')
    mermaidPlugin.init(undefined, tDom)
  } catch (error) {
    tDom.innerHTML = `${error}`
  }
}

const flowchart = (el: HTMLElement) => {
  if (!el.firstChild?.firstChild) {
    return
  }
  const tDom = el.firstChild.firstChild as HTMLElement
  try {
    const chart = flowchartPlugin.parse(tDom.innerHTML.replace(/&gt;/g, '>'))
    tDom.innerHTML = ''
    chart.drawSVG(tDom, require('@/scripts/markdown/flowchart.config'))
  } catch (error) {
    tDom.innerHTML = `${error}`
  }
}

const plantuml = (el: HTMLElement) => {
  if (!el.firstChild?.firstChild) {
    return
  }
  const tDom = el.firstChild.firstChild as HTMLElement
  try {
    const encoded = plantumlPlugin.encode(tDom.innerHTML.replace(/&gt;/g, '>'))
    tDom.innerHTML = ''
    const svgObject = document.createElement('object') as HTMLObjectElement
    svgObject.setAttribute(
      'data',
      'http://www.plantuml.com/plantuml/img/' + encoded
    )
    tDom.appendChild(svgObject)
  } catch (error) {
    tDom.innerHTML = `${error}`
  }
}

const abc = (el: HTMLElement) => {
  if (!el.firstChild?.firstChild) {
    return
  }
  const tDom = el.firstChild.firstChild as HTMLElement
  const script = tDom.innerHTML
  try {
    abcPlugin.renderAbc(tDom, script, {
      responsive: 'resize',
    })

    const midiDomList: Array<HTMLElement> = Array.prototype.slice
      .call(tDom.children)
      .filter(
        (innerEl: HTMLElement) => innerEl.className === 'abcjs-midi-container'
      )

    let midiDom: HTMLElement
    if (midiDomList.length > 0) {
      midiDom = midiDomList[0]
    } else {
      midiDom = document.createElement('div') as HTMLDivElement
      midiDom.setAttribute('class', 'abcjs-midi-container')
      el.firstChild.appendChild(midiDom)
    }

    abcMidiPlugin.renderMidi(midiDom, script, {
      generateDownload: true,
    })
  } catch (error) {
    tDom.innerHTML = `${error}`
  }
}

// Update

const update = (base: HTMLElement) => {
  if (!base.firstChild?.hasChildNodes) {
    return
  }
  const tDom = base.firstChild as HTMLElement
  const domList: Array<HTMLElement> = Array.prototype.slice.call(tDom.children)
  for (const el of domList) {
    const r = el.firstChild as HTMLElement
    if (typeof (r.firstChild?.firstChild as HTMLElement) === 'undefined') {
      return
    }
    const tag = (r.firstChild?.firstChild as HTMLElement).tagName
    if (!(el.tagName !== 'PRE' && tag !== 'svg')) {
      return
    }

    switch (r.className) {
      // Update Mermaid
      case 'language-mermaid':
        mermaid(el)
        break
      // Update flowchart
      case 'language-flow':
        flowchart(el)
        break
      // Update plantuml
      case 'language-plantuml':
        plantuml(el)
        break
      // Update abc
      case 'language-abc':
        abc(el)
        break
      default:
        break
    }
  }
}

// preUpdate

const preRender = (markdownIt: any, code: string, lang: string) => {
  switch (lang) {
    // Update Mermaid
    case 'mermaid':
      return `<div class="mermaid">${markdownIt.utils.escapeHtml(code)}</div>`
    // Update flowchart
    case 'flow':
      return `<div class="flow-chart">${markdownIt.utils
        .escapeHtml(code)
        .replace(/&gt;/g, '>')}</div>`
    // Update plantuml
    case 'plantuml':
      return `<div class="plantuml">${markdownIt.utils.escapeHtml(code)}</div>`
    // Update abc
    case 'abc':
      return `<div class="abc">${markdownIt.utils.escapeHtml(code)}</div>`
    default:
      break
  }
}

export default {
  preRender,
  update,
}
