import {
  ExtensionContext,
  Disposable,
  TextDocument,
  workspace,
  window,
  StatusBarAlignment,
} from 'vscode'

export class Extension {
  constructor(private context: ExtensionContext) {}

  addSubscriptions(disposable: Disposable) {
    this.context.subscriptions.push(disposable)
  }

  addStatusBarItem(command: string, text: string) {
    const statusBarItem = window.createStatusBarItem(
      StatusBarAlignment.Right,
      100,
    )
    statusBarItem.command = command
    statusBarItem.text = text

    window.onDidChangeActiveTextEditor((editor) => {
      if (editor && editor.document.languageId === 'yaml') {
        statusBarItem.show()
      } else {
        statusBarItem.hide()
      }
    })

    if (
      window.activeTextEditor &&
      window.activeTextEditor.document.languageId === 'yaml'
    ) {
      statusBarItem.show()
    } else {
      statusBarItem.hide()
    }
  }
}
