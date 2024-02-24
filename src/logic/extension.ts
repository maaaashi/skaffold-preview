import * as vscode from 'vscode'

export class Extension {
	constructor(public context: vscode.ExtensionContext) {}

	static create(c: vscode.ExtensionContext): Extension {
		return new Extension(c)
	}

	addSubscription(subscription: vscode.Disposable): void {
		this.context.subscriptions.push(subscription)
	}
}
