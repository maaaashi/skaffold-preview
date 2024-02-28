import { SkaffoldCLI } from '../Driver/SkaffoldCLI'
import { SkaffoldPreview } from '../Domain/SkaffoldPreview'
import { window } from 'vscode'
import path from 'path'
import { RenderException } from '../Domain/ExecException'
import type { ExecException } from 'child_process'

export class SkaffoldPreviewGateway {
	constructor(private driver: SkaffoldCLI) {}

	async exec(profile?: string): Promise<SkaffoldPreview> {
		const editor = window.activeTextEditor

		if (!editor) {
			window.showInformationMessage('No editor is active')
			throw new Error('No editor is active')
		}

		const currentPath = editor?.document.uri.fsPath || ''
		const skaffoldPreview = new SkaffoldPreview(currentPath, profile)

		const directoryPath = path.dirname(skaffoldPreview.currentPath || '')
		const command = `cd ${directoryPath} && skaffold render -f ${
			skaffoldPreview.currentPath
		}${skaffoldPreview.profile ? ` -p ${skaffoldPreview.profile}` : ''}`

		try {
			skaffoldPreview.result = await this.driver.render(command)
			return skaffoldPreview
		} catch (error) {
			throw new RenderException((error as ExecException).message)
		}
	}
}
