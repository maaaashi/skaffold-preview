import * as vscode from 'vscode'
import { Extension } from './VSCode/Extension'
import { SkaffoldPreviewGateway } from './Gateway/SkaffoldPreviewGateway'
import { SkaffoldPreviewUsecase } from './Usecase/SkaffoldPreviewUsecase'

export function activate(context: vscode.ExtensionContext) {
	const extension = new Extension(context)

	// Skaffold Render
	const skaffoldPreviewGateway = new SkaffoldPreviewGateway({})
	const skaffoldPreviewUsecase = new SkaffoldPreviewUsecase(
		skaffoldPreviewGateway,
	)

	extension.addSubscriptions(skaffoldPreviewUsecase.disposable())
}

export function deactivate() {}
