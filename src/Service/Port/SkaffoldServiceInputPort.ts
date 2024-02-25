import * as vscode from 'vscode'

export interface SkaffoldPreviewServiceInputPort {
	render(panel: vscode.WebviewPanel): void
}
