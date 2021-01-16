const CodeMirror = require('@/scripts/editor/codemirror.js')

export const newEditor = (taDom: HTMLTextAreaElement) => {
  const cMirror = new CodeMirror.fromTextArea(taDom, {
    mode: 'markdown',
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 2,
    smartIndent: true,
    dragDrop: true,
    autocapitalize: true,
    styleActiveLine: true,
    showCursorWhenSelecting: true,
    highlightSelectionMatches: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    matchTags: {
      bothTags: true,
    },
    autoCloseTags: true,
    flattenSpans: true,
    cursorScrollMargin: 20,
    singleCursorHeightPerLine: false,
  })

  cMirror.setOption('extraKeys', {
    'Cmd-S'() {
      return false
    },
    'Ctrl-S'() {
      return false
    },
    'Cmd-Q': (cm: any) => {
      cm.foldCode(cm.getCursor())
    },
    'Ctrl-Q': (cm: any) => {
      cm.foldCode(cm.getCursor())
    },
    // Enter: cm => utils.newlineAndIndentContinueMarkdownList(cm),
    Tab: (cm: any) => {
      const tab = '\t'
      const spaces = Array(parseInt(cm.getOption('indentUnit')) + 1).join(' ')
      const cursor = cm.getCursor()
      const line = cm.getLine(cursor.line)
      const regex = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))/

      let match
      const multiple =
        cm.getSelection().split('\n').length > 1 ||
        cm.getSelections().length > 1

      if (multiple) {
        cm.execCommand('defaultTab')
      } else if ((match = regex.exec(line)) !== null) {
        const ch = match[1].length
        const pos = {
          line: cursor.line,
          ch,
        }
        if (cm.getOption('indentWithTabs')) {
          cm.replaceRange(tab, pos, pos, '+input')
        } else {
          cm.replaceRange(spaces, pos, pos, '+input')
        }
      } else if (cm.getOption('indentWithTabs')) {
        cm.execCommand('defaultTab')
      } else {
        cm.replaceSelection(spaces)
      }
    },
    'Cmd-Left': 'goLineLeftSmart',
    'Cmd-Right': 'goLineRight',
    Home: 'goLineLeftSmart',
    End: 'goLineRight',
    'Ctrl-C'(cm: any) {
      if (cm.getOption('keyMap').substr(0, 3) === 'vim') {
        document.execCommand('copy')
      } else {
        return CodeMirror.Pass
      }
    },
  })

  // autocomplete
  // utils.autocomplete(cMirror);

  return cMirror as CodeMirror.Editor
}

export default {
  newEditor,
  // utils
}
