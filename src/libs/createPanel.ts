import * as vscode from 'vscode'

export const createPanel = (title: string): vscode.WebviewPanel => {
	return vscode.window.createWebviewPanel(
		'skaffold-preview',
		title,
		vscode.ViewColumn.Beside,
		{},
	)
}
