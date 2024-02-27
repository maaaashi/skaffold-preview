import { WebviewPanel } from 'vscode'
import { SkaffoldCLI } from '../Driver/SkaffoldCLI'

export class SkaffoldPreviewGateway {
	constructor(private driver: SkaffoldCLI) {}

	exec() {
		throw new Error('Method not implemented.')
	}
}
