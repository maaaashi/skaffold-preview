import { Disposable } from 'vscode'
import { SkaffoldPreviewServicePort } from './Port/SkaffoldPreviewServicePort'
import { SkaffoldPreviewLogicPort } from '../Logic/Port/SkaffoldPreviewLogicPort'

export class SkaffoldProfilePreviewService
	implements SkaffoldPreviewServicePort
{
	constructor(private inputPort: SkaffoldPreviewLogicPort) {}

	disposable(): Disposable {
		throw new Error('Method not implemented.')
	}
}
