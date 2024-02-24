import * as vscode from 'vscode'
import { addStatusBarButton } from './function/AddStatusBarButton'
import { Extension } from './logic/extension'
import { SkaffoldPreviewFunctoin } from './function/SkaffoldPreviewFunction'
import { ProfileSkaffoldPreviewFunction } from './function/ProfileSkaffoldPreviewFunction'

export function activate(context: vscode.ExtensionContext) {
	const extension = Extension.create(context)
	const skaffoldPreviewFunction = SkaffoldPreviewFunctoin.create()
	extension.addSubscription(skaffoldPreviewFunction.disposable())

	const profileSkaffoldPreview = ProfileSkaffoldPreviewFunction.create()
	extension.addSubscription(profileSkaffoldPreview.disposable())

	addStatusBarButton(context)
}

export function deactivate() {}
