import { ExtensionContext, Disposable, TextDocument, workspace } from 'vscode'

export class Extension {
  constructor(private context: ExtensionContext) {}

  addSubscriptions(disposable: Disposable) {
    this.context.subscriptions.push(disposable)
  }
}
