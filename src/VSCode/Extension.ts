import * as vscode from 'vscode'

export class Extension {
	constructor(private context: vscode.ExtensionContext) {}

	addSubscriptions(disposable: vscode.Disposable) {
		this.context.subscriptions.push(disposable)
	}
}
