import * as vscode from 'vscode'
import { addStatusBarButton } from './functions/addStatusBarButton'
import { Extension } from './logic/extension'
import { SkaffoldPreviewFunctoin } from './functions/skaffoldPreviewFunction'
import { ProfileSkaffoldPreviewFunction } from './functions/profileSkaffoldPreviewFunction'

export function activate(context: vscode.ExtensionContext) {
	const extension = Extension.create(context)
	const skaffoldPreviewFunction = SkaffoldPreviewFunctoin.create()
	extension.addSubscription(skaffoldPreviewFunction.disposable())

	const profileSkaffoldPreview = ProfileSkaffoldPreviewFunction.create()
	extension.addSubscription(profileSkaffoldPreview.disposable())

	addStatusBarButton(context)
}

export function deactivate() {}
