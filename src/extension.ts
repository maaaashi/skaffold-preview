import * as vscode from 'vscode'
import { Extension } from './VSCode/Extension'
import { SkaffoldPreviewGateway } from './Gateway/SkaffoldPreviewGateway'
import { SkaffoldPreviewUsecase } from './Usecase/SkaffoldPreviewUsecase'
import { SkaffoldCLI } from './Driver/SkaffoldCLI'

export function activate(context: vscode.ExtensionContext) {
	const extension = new Extension(context)

	const skaffoldCliDriver = new SkaffoldCLI()
	// Skaffold Preview
	const skaffoldPreviewGateway = new SkaffoldPreviewGateway(skaffoldCliDriver)
	const skaffoldPreviewUsecase = new SkaffoldPreviewUsecase(
		skaffoldPreviewGateway,
	)

	extension.addSubscriptions(skaffoldPreviewUsecase.disposable(context))
}

export function deactivate() {}
