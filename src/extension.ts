import * as vscode from 'vscode'
import { Extension } from './VSCode/Extension'
import { SkaffoldPreviewGateway } from './Gateway/SkaffoldPreviewGateway'
import { SkaffoldPreviewUsecase } from './Usecase/SkaffoldPreviewUsecase'
import { SkaffoldCLI } from './Driver/SkaffoldCLI'
import { SkaffoldProfilePreviewUsecase } from './Usecase/SkaffoldProfilePreviewUsecase'

export function activate(context: vscode.ExtensionContext) {
	const extension = new Extension(context)

	const skaffoldCliDriver = new SkaffoldCLI()
	// Skaffold Preview
	const skaffoldPreviewGateway = new SkaffoldPreviewGateway(skaffoldCliDriver)
	const skaffoldPreviewUsecase = new SkaffoldPreviewUsecase(
		skaffoldPreviewGateway,
	)

	extension.addSubscriptions(skaffoldPreviewUsecase.disposable())

	// Skaffold Profile Preview
	const skaffoldProfilePreviewGateway = new SkaffoldPreviewGateway(
		skaffoldCliDriver,
	)
	const skaffoldProfilePreviewUsecase = new SkaffoldProfilePreviewUsecase(
		skaffoldProfilePreviewGateway,
	)

	extension.addSubscriptions(skaffoldProfilePreviewUsecase.disposable())
}

export function deactivate() {}
