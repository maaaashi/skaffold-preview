import { SkaffoldCLI } from '../Driver/SkaffoldCLI'
import { SkaffoldPreview } from '../Domain/SkaffoldPreview'
import path from 'path'
import { RenderException } from '../Domain/ExecException'
import type { ExecException } from 'child_process'

export class SkaffoldPreviewGateway {
  constructor(private driver: SkaffoldCLI) {}

  async exec(skaffoldPreview: SkaffoldPreview): Promise<SkaffoldPreview> {
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
