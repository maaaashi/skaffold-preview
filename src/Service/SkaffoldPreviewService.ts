import { WebviewPanel } from 'vscode'
import { SkaffoldPreviewServiceInputPort } from './Port/SkaffoldServiceInputPort'

export class SkaffoldPreviewService implements SkaffoldPreviewServiceInputPort {
	render(panel: WebviewPanel): void {
		throw new Error('Method not implemented.')
	}
}
