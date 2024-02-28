import { exec as e, ExecException } from 'child_process'
import path from 'path'
import { window } from 'vscode'
import { createHTML } from '../libs/createHTML'
import * as util from 'util'

const exec = util.promisify(e)

export class SkaffoldCLI {
	async render(command: string): Promise<string> {
		const { stdout } = await exec(command)
		window.showInformationMessage('Skaffold render successful')
		return stdout
	}
}
