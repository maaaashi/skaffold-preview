import { SkaffoldPreviewServiceInputPort } from '../Service/Port/SkaffoldServiceInputPort'
import { createHTML } from '../libs/createHTML'
import { createPanel } from '../libs/createPanel'
import { SkaffoldPreviewInterface } from './SkaffoldPreviewInterface'
import * as vscode from 'vscode'

export class SkaffoldPreviewUsecase implements SkaffoldPreviewInterface {
	constructor(private inputPort: SkaffoldPreviewServiceInputPort) {}

	disposable() {
		return vscode.commands.registerCommand('extension.skaffoldPreview', () => {
			const editor = vscode.window.activeTextEditor

			if (!editor) {
				vscode.window.showInformationMessage('No editor is active')
				return
			}

			const panel = createPanel('Skaffold Preview')

			panel.webview.html = createHTML('読み込み中...')

			try {
				this.inputPort.render(panel)
			} catch (e) {
				panel.webview.html = createHTML('Failed to parse YAML file')
			}
		})
	}
}
