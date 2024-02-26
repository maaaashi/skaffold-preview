import * as vscode from 'vscode'
import { Extension } from './VSCode/Extension'
import { SkaffoldPreviewLogic } from './Logic/SkaffoldPreviewLogic'
import { SkaffoldPreviewService } from './Service/SkaffoldPreviewService'
import { SkaffoldProfilePreviewService } from './Service/SkaffoldProfilePreviewService'
import { SkaffoldProfilePreviewLogic } from './Logic/SkaffoldProfilePreviewLogic'

export function activate(context: vscode.ExtensionContext) {
	const extension = new Extension(context)

	// Skaffold Render
	const skaffoldPreviewLogic = new SkaffoldPreviewLogic()
	const skaffoldPreviewService = new SkaffoldPreviewService(
		skaffoldPreviewLogic,
	)
	const skaffoldPreviewDisposable = skaffoldPreviewService.disposable()
	extension.addSubscriptions(skaffoldPreviewDisposable)

	// Profile Skaffold Render
	const skaffoldProfilePreviewLogic = new SkaffoldProfilePreviewLogic()
	const skaffoldProfilePreviewService = new SkaffoldProfilePreviewService(
		skaffoldProfilePreviewLogic,
	)
	const skaffoldProfilePreviewDisposable =
		skaffoldProfilePreviewService.disposable()
	extension.addSubscriptions(skaffoldProfilePreviewDisposable)
}

export function deactivate() {}
