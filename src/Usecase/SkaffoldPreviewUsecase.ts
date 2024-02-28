import { SkaffoldPreviewGateway } from '../Gateway/SkaffoldPreviewGateway'
import { WebviewPanel, commands, window, Disposable, ViewColumn } from 'vscode'
import { createHTML } from '../libs/createHTML'
import { RenderException } from '../Domain/ExecException'

export class SkaffoldPreviewUsecase {
	private panel: WebviewPanel | undefined

	constructor(private gateway: SkaffoldPreviewGateway) {
		this.panel = undefined
	}

	disposable(): Disposable {
		return commands.registerCommand('extension.skaffoldPreview', async () => {
			this.panel = window.createWebviewPanel(
				'skaffold-preview',
				'Skaffold Preview',
				ViewColumn.Beside,
				{},
			)
			this.panel.webview.html = createHTML('読み込み中...')

			try {
				const skaffoldPreview = await this.gateway.exec()
				this.panel.webview.html = createHTML(skaffoldPreview.result)
			} catch (error) {
				this.panel.webview.html = createHTML((error as RenderException).message)
			}
		})
	}
}
