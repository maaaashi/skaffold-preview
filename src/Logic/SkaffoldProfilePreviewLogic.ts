import { WebviewPanel } from 'vscode'
import { SkaffoldPreviewLogicPort } from './Port/SkaffoldPreviewLogicPort'

export class SkaffoldProfilePreviewLogic implements SkaffoldPreviewLogicPort {
	render(panel: WebviewPanel): void {
		throw new Error('Method not implemented.')
	}
}
