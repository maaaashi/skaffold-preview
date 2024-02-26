import * as vscode from 'vscode'
import { Extension } from './VSCode/Extension'
import { SkaffoldPreviewLogic } from './Logic/SkaffoldPreviewLogic'
import { SkaffoldPreviewService } from './Service/SkaffoldPreviewService'

export function activate(context: vscode.ExtensionContext) {
	const extension = new Extension(context)

	// Skaffold Render
	const skaffoldPreviewLogic = new SkaffoldPreviewLogic()
	const skaffoldPreviewService = new SkaffoldPreviewService(
		skaffoldPreviewLogic,
	)
	const disposable = skaffoldPreviewService.disposable()

	extension.addSubscriptions(disposable)
}

export function deactivate() {}
