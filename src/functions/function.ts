import * as vscode from 'vscode'

export abstract class Function {
	protected editor: vscode.TextEditor | undefined

	constructor(protected command: string) {
		this.editor = vscode.window.activeTextEditor
	}

	abstract disposable(): vscode.Disposable
}