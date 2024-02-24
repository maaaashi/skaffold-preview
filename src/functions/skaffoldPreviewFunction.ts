import { createHTML } from '../libs/createHTML'
import { Function } from './function'
import * as vscode from 'vscode'
import { Preview } from '../logic/render'

export class SkaffoldPreviewFunctoin extends Function {
	constructor() {
		super('extension.skaffoldPreview')
	}

	static create(): SkaffoldPreviewFunctoin {
		return new SkaffoldPreviewFunctoin()
	}

	disposable(): vscode.Disposable {
		return vscode.commands.registerCommand(
			'extension.skaffoldPreview',
			async () => {
				const editor = vscode.window.activeTextEditor
				if (!editor) {
					vscode.window.showInformationMessage('No editor is active')
					return
				}

				try {
					const panel = vscode.window.createWebviewPanel(
						'skaffold-preview',
						'Skaffold Preview',
						vscode.ViewColumn.Beside,
						{},
					)

					panel.webview.html = createHTML('読み込み中...')

					const render = new Preview(panel)
					render.render()
				} catch (e) {
					vscode.window.showErrorMessage('Failed to parse YAML file')
				}
			},
		)
	}
}
