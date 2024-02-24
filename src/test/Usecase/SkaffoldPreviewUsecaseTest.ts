import * as assert from 'assert'
import * as vscode from 'vscode'
import { expect } from 'chai'
import { spy } from 'sinon'
import { SkaffoldPreviewUsecase } from '../../Usecase/SkaffoldPreviewUsecase'
import { SkaffoldPreviewServiceInputPort } from '../../Service/Port/SkaffoldServiceInputPort'

suite('Skaffold Preview Usecasce Test', () => {
	vscode.window.showInformationMessage('Start all tests.')

	test('exec', () => {
		const mockSkaffoldPreviewInputPort = {} as SkaffoldPreviewServiceInputPort
		new SkaffoldPreviewUsecase(mockSkaffoldPreviewInputPort)

		expect(mockSkaffoldPreviewInputPort.render).to.have.been.call
	})
})
