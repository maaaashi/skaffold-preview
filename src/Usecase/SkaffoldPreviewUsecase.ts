import { SkaffoldPreviewGateway } from '../Gateway/SkaffoldPreviewGateway'
import {
	WebviewPanel,
	commands,
	window,
	Disposable,
	ViewColumn,
	Uri,
	ExtensionContext,
} from 'vscode'
import { RenderException } from '../Domain/ExecException'
import { Panel } from '../Lib/Panel'
import path from 'path'

export class SkaffoldPreviewUsecase {
	private panel: WebviewPanel | undefined

	constructor(private gateway: SkaffoldPreviewGateway) {
		this.panel = undefined
	}

	disposable(context: ExtensionContext): Disposable {
		return commands.registerCommand('extension.skaffoldPreview', async () => {
			this.panel = window.createWebviewPanel(
				'skaffold-preview',
				'Skaffold Preview',
				ViewColumn.Beside,
				{ enableScripts: true },
			)
			this.panel.webview.html = Panel.createPlainHTML('読み込み中...')

			const scriptPathOnDisk = Uri.file(
				path.join(context.extensionPath, 'src', 'assets', 'script.js'),
			)
			const scriptUri = this.panel.webview.asWebviewUri(scriptPathOnDisk)

			this.panel.webview.onDidReceiveMessage(async (message) => {
				if (this.panel === undefined) {
					return
				}

				if (message.command === 'dropdownChanged') {
					try {
						this.panel.webview.html = Panel.createPreview(
							'読み込み中...',
							scriptUri,
						)
					} catch (error) {
						this.panel.webview.html = Panel.createPreview(
							'読み込み中...',
							scriptUri,
						)
					}
				}
			})

			try {
				const skaffoldPreview = await this.gateway.exec()
				this.panel.webview.html = Panel.createPreview(
					skaffoldPreview.result,
					scriptUri,
				)
			} catch (error) {
				this.panel.webview.html = Panel.createPreview(
					(error as RenderException).message,
					scriptUri,
				)
			}
		})
	}
}
