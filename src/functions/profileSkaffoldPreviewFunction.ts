import { Disposable } from 'vscode'
import { Function } from './function'
import * as vscode from 'vscode'
import { createHTML } from '../libs/createHTML'
import { Preview } from '../logic/render'

export class ProfileSkaffoldPreviewFunction extends Function {
	constructor() {
		super('extension.skaffoldPreview')
	}

	static create(): ProfileSkaffoldPreviewFunction {
		return new ProfileSkaffoldPreviewFunction()
	}

	disposable(): Disposable {
		return vscode.commands.registerCommand(
			'extension.profileSkaffoldPreview',
			async () => {
				const editor = vscode.window.activeTextEditor
				if (!editor) {
					vscode.window.showInformationMessage('No editor is active')
					return
				}

				try {
					const profile = await vscode.window.showInputBox({
						title: '設定したいprofileを入力してください',
						placeHolder: 'dev',
					})

					if (!profile) {
						vscode.window.showInformationMessage('profileが入力されていません')
						return
					}

					const panel = vscode.window.createWebviewPanel(
						'skaffold-preview',
						`Skaffold Preview - ${profile}`,
						vscode.ViewColumn.Beside,
						{},
					)

					panel.webview.html = createHTML('読み込み中...')

					const render = new Preview(panel)
					render.profileRender(profile)
				} catch (e) {
					vscode.window.showErrorMessage('Failed to parse YAML file')
				}
			},
		)
	}
}
