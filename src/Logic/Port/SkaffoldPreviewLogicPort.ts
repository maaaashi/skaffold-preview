import * as vscode from 'vscode'

export interface SkaffoldPreviewLogicPort {
	render(panel: vscode.WebviewPanel): void
}
