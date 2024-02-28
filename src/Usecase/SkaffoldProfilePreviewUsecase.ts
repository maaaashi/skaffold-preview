import { SkaffoldPreviewGateway } from '../Gateway/SkaffoldPreviewGateway'
import { WebviewPanel, commands, window, Disposable, ViewColumn } from 'vscode'
import { createHTML } from '../libs/createHTML'
import { RenderException } from '../Domain/ExecException'

export class SkaffoldProfilePreviewUsecase {
	private panel: WebviewPanel | undefined

	constructor(private gateway: SkaffoldPreviewGateway) {
		this.panel = undefined
	}

	disposable(): Disposable {
		return commands.registerCommand(
			'extension.skaffoldProfilePreview',
			async () => {
				const profile = await window.showInputBox({
					title: '設定したいprofileを入力してください',
					placeHolder: 'dev',
				})

				if (!profile) {
					window.showInformationMessage('Profileが入力されていません')
					return
				}

				this.panel = window.createWebviewPanel(
					'skaffold-profile-preview',
					`Skaffold Profile Preview ${profile}`,
					ViewColumn.Beside,
					{},
				)

				this.panel.webview.html = createHTML('読み込み中...')

				try {
					const skaffoldPreview = await this.gateway.exec(profile)
					this.panel.webview.html = createHTML(skaffoldPreview.result)
				} catch (error) {
					this.panel.webview.html = createHTML(
						(error as RenderException).message,
					)
				}
			},
		)
	}
}
