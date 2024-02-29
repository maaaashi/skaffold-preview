import { exec as e } from 'child_process'
import { window } from 'vscode'
import * as util from 'util'

const exec = util.promisify(e)

export class SkaffoldCLI {
  async render(command: string): Promise<string> {
    const { stdout } = await exec(command)
    window.showInformationMessage('Skaffold render successful')
    return stdout
  }
}
