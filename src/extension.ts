import * as vscode from 'vscode'
import { addStatusBarButton } from './function/AddStatusBarButton'
import { Extension } from './logic/extension'
import { SkaffoldPreviewUsecase } from './Usecase/SkaffoldPreviewUsecase'
import { SkaffoldPreviewService } from './Service/SkaffoldPreviewService'

export function activate(context: vscode.ExtensionContext) {
	const extension = Extension.create(context)
	const skaffoldPreviewService = new SkaffoldPreviewService()
	const skaffoldPreviewUsecase = new SkaffoldPreviewUsecase(
		skaffoldPreviewService,
	)

	extension.addSubscription(skaffoldPreviewUsecase.disposable())

	addStatusBarButton(context)
}

export function deactivate() {}
