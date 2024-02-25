import * as vscode from 'vscode'

export class Panel {
	constructor(public title: string) {}

	static create(title: string): vscode.WebviewPanel {
		return vscode.window.createWebviewPanel(
			'skaffold-preview',
			title,
			vscode.ViewColumn.Beside,
			{},
		)
	}
}
