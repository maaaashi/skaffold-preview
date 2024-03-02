import { exec as e } from 'child_process'
import * as util from 'util'

const exec = util.promisify(e)

export class SkaffoldCLI {
  async render(command: string): Promise<string> {
    const { stdout } = await exec(command)
    return stdout
  }
}
