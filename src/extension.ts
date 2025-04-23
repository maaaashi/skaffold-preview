import { ExtensionContext, workspace } from 'vscode'
import { Extension } from './VSCode/Extension'
import { SkaffoldPreviewGateway } from './Gateway/SkaffoldPreviewGateway'
import { SkaffoldPreviewUsecase } from './Usecase/SkaffoldPreviewUsecase'
import { SkaffoldCLI } from './Driver/SkaffoldCLI'

export function activate(context: ExtensionContext) {
  const extension = new Extension(context)

  const skaffoldCliDriver = new SkaffoldCLI()
  const skaffoldPreviewGateway = new SkaffoldPreviewGateway(skaffoldCliDriver)
  const skaffoldPreviewUsecase = new SkaffoldPreviewUsecase(
    skaffoldPreviewGateway,
  )

  skaffoldPreviewUsecase.onSaveEditor(context, workspace)

  extension.addSubscriptions(skaffoldPreviewUsecase.disposable(context))

  extension.addStatusBarItem(
    'extension.skaffoldPreview',
    '$(play) Skaffold Preview',
  )
}

export function deactivate() {}
