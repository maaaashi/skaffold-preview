import { SkaffoldPreviewGateway } from '../Gateway/SkaffoldPreviewGateway'
import { WebviewPanel, commands, window, Disposable, ViewColumn } from 'vscode'
import { createHTML } from '../libs/createHTML'

export class SkaffoldPreviewUsecase {
	private panel: WebviewPanel

	constructor(private gateway: SkaffoldPreviewGateway) {
		this.panel = window.createWebviewPanel(
			'skaffold-preview',
			'Skaffold Preview',
			ViewColumn.Beside,
			{},
		)
	}

	disposable(): Disposable {
		return commands.registerCommand('extension.skaffoldPreview', () => {
			const editor = window.activeTextEditor

			if (!editor) {
				window.showInformationMessage('No editor is active')
				return
			}

			this.panel.webview.html = createHTML('読み込み中...')

			// const result = this.gateway.exec()
		})
	}
}
