type EditorPositionType = {
  name: string
  pos: number
}

// const paddingTop = 16

const analyzeMarkdown = (markdown: string): EditorPositionType[] => {
  const lines = markdown.split('\n')
  // Regular expression
  const blankReg = /^\s*/
  const preReg1 = /^```.*/
  const preReg2 = /^ {4,}[^\-+*]+/
  const headerReg = /^[- ]*#+.*/
  // Properties
  const points: EditorPositionType[] = []
  let lineCount = 1
  let wasblank = false
  let isPreBlock = false
  let isIndentBlock = false

  points.push({ name: 'start', pos: lineCount })

  lines.forEach(li => {
    // block ```
    if (preReg1.test(li)) {
      if (isPreBlock) {
        isPreBlock = false
      } else {
        isPreBlock = true
        points.push({ name: 'PRE', pos: lineCount })
      }
      // 4 space block
    } else if (preReg2.test(li) && !isPreBlock && wasblank) {
      if (!isIndentBlock) {
        isIndentBlock = true
        points.push({ name: 'PRE', pos: lineCount })
      }
      // header
    } else if (headerReg.test(li) && !isPreBlock && !isIndentBlock) {
      points.push({ name: 'HEADER', pos: lineCount })
    } else {
      isIndentBlock = false
    }
    wasblank = false
    // blank line
    if (blankReg.test(li)) {
      wasblank = true
    }
    lineCount += 1
  })
  points.push({ name: 'end', pos: lineCount })

  return points
}

type DomPositionType = {
  name: string
  height: number
}

const analyzeDom = (dom: Node): DomPositionType[] => {
  if (!dom.hasChildNodes()) {
    return []
  }
  // Properties
  const points: DomPositionType[] = []
  const children = dom.childNodes
  const nodeName = ['PRE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']

  points.push({ name: 'start', height: 0 })

  for (let i = 0; i < children.length; i++) {
    if (nodeName.includes(children[i].nodeName)) {
      // 50 is header height
      const offset = (children[i] as HTMLElement).offsetTop - 50
      points.push({ name: children[i].nodeName, height: offset })
    }
  }
  points.push({ name: 'end', height: (dom as HTMLElement).clientHeight })

  return points
}

const e2p = (
  pos: number,
  ePoints: EditorPositionType[],
  pPoints: DomPositionType[]
): number => {
  let retain: number = ePoints.length - 1
  for (let i = 0; i < ePoints.length - 1; i++) {
    if (ePoints[i].pos <= pos && pos <= ePoints[i + 1].pos) {
      retain = i
      break
    }
  }
  let ratio: number
  if (ePoints[retain].name === 'PRE') {
    ratio = 0
  } else {
    ratio =
      (pos - ePoints[retain].pos) /
      (ePoints[retain + 1].pos - ePoints[retain].pos)
  }
  if (retain + 1 < pPoints.length) {
    const range: number = pPoints[retain + 1].height - pPoints[retain].height
    const offset: number = range * ratio
    return pPoints[retain].height + offset
  } else {
    return pPoints[pPoints.length - 1].height
  }
}

// const p2e = (
//   height: number,
//   ePoints: EditorPositionType[],
//   pPoints: DomPositionType[]
// ): number => {
//   let retain = 0
//   for (let i = 0; i < pPoints.length; i++) {
//     if (pPoints[i].height <= height && height < pPoints[i + 1].height) {
//       retain = i
//       break
//     }
//   }
//   const pRange = pPoints[retain + 1].height - pPoints[retain].height
//   const eRange = ePoints[retain + 1].pos - ePoints[retain].pos
//   const offset = Math.floor(
//     (height - pPoints[retain].height) / (pRange / eRange)
//   )
//   return ePoints[retain].pos + offset
// }

module.exports = {
  analyzeMarkdown,
  analyzeDom,
  e2p,
  // p2e,
}
