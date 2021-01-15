const plantumlPlugin = require('plantuml-encoder')
const abcPlugin = require('abcjs/midi')
const flowchartPlugin = require('flowchart.js')
const mermaidPlugin = require('mermaid')

mermaidPlugin.initialize({ startOnLoad: false })

const mermaid = (el: HTMLElement) => {
  const tDom = el.firstChild as HTMLElement
  try {
    tDom.removeAttribute('data-processed')
    mermaidPlugin.init(undefined, tDom)
  } catch (error) {
    el.innerHTML = `${error}`
  }
}

const flowchart = (el: HTMLElement) => {
  const tDom = el.firstChild as HTMLElement
  try {
    const fc = tDom.innerHTML.replace(/&gt;/g, '>').replace(/&lt;/g, '<')
    const chart = flowchartPlugin.parse(fc)
    tDom.innerHTML = ''
    chart.drawSVG(tDom, require('@/scripts/markdown/flowchart.config'))
  } catch (error) {
    tDom.innerHTML = `${error}`
  }
}

const plantuml = (el: HTMLElement) => {
  const tDom = el.firstChild as HTMLElement
  try {
    const pu = tDom.innerHTML.replace(/&gt;/g, '>').replace(/&lt;/g, '<')
    const encoded = plantumlPlugin.encode(pu)
    tDom.innerHTML = ''
    const svgObject = document.createElement('object') as HTMLObjectElement
    svgObject.setAttribute(
      'data',
      'http://www.plantuml.com/plantuml/svg/' + encoded
    )
    tDom.appendChild(svgObject)
  } catch (error) {
    tDom.innerHTML = `${error}`
  }
}

const abc = (el: HTMLElement) => {
  const tDom = el.firstChild as HTMLElement
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
      tDom.appendChild(midiDom)
    }

    abcPlugin.renderMidi(midiDom, script, {
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
  const domList: Array<HTMLElement> = Array.prototype.slice
    .call((base.firstChild as HTMLElement).children)
    .filter((iEl: HTMLElement) => iEl.tagName === 'PRE')

  for (const el of domList) {
    try {
      const tagName = (el.firstChild?.firstChild as HTMLElement).tagName
      if (tagName === 'svg' || tagName === 'OBJECT') {
        continue
      }
    } catch (e) {
      continue
    }
    const r = el.firstChild as HTMLElement

    switch (r.className) {
      // Update Mermaid
      case 'language-mermaid':
        mermaid(el)
        break
      // Update flowchart
      case 'language-flowchart':
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
    case 'flowchart':
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
