import { SkaffoldPreviewGateway } from '../Gateway/SkaffoldPreviewGateway'
import {
  commands,
  window,
  Disposable,
  ViewColumn,
  Uri,
  ExtensionContext,
} from 'vscode'
import { RenderException } from '../Domain/ExecException'
import path from 'path'
import { SkaffoldPreview } from '../Domain/SkaffoldPreview'
import yaml from 'js-yaml'

export class SkaffoldPreviewUsecase {
  private skaffoldPreview: SkaffoldPreview

  constructor(private gateway: SkaffoldPreviewGateway) {
    this.skaffoldPreview = new SkaffoldPreview(undefined, undefined, '')
  }

  private async exec(srcUrl: { script: Uri; style: Uri }) {
    if (!this.skaffoldPreview.editor || !this.skaffoldPreview.panel) {
      return
    }

    const text = this.skaffoldPreview.editor.document.getText()
    const json = yaml.load(text)
    const profiles = (json as { profiles: { name: string }[] }).profiles || []

    try {
      const skaffoldPreview = await this.gateway.exec(this.skaffoldPreview)
      this.skaffoldPreview.panel.webview.html =
        this.skaffoldPreview.createPreviewHTML(
          skaffoldPreview.result,
          srcUrl,
          profiles,
          skaffoldPreview.profile,
        )
    } catch (error) {
      this.skaffoldPreview.panel.webview.html =
        this.skaffoldPreview.createPreviewHTML(
          (error as RenderException).message,
          srcUrl,
          profiles,
          this.skaffoldPreview.profile,
        )
    }
  }

  disposable(context: ExtensionContext): Disposable {
    return commands.registerCommand('extension.skaffoldPreview', async () => {
      this.skaffoldPreview.editor = window.activeTextEditor

      if (!this.skaffoldPreview.editor) {
        window.showErrorMessage('エディタが開かれていません')
        return
      }

      this.skaffoldPreview.profile = ''

      if (!this.skaffoldPreview.panel) {
        this.skaffoldPreview.panel = window.createWebviewPanel(
          'skaffold-preview',
          'Skaffold Preview',
          ViewColumn.Beside,
          { enableScripts: true },
        )
      }

      const scriptPathOnDisk = Uri.file(
        path.join(context.extensionPath, 'media', 'script.js'),
      )
      const scriptUri =
        this.skaffoldPreview.panel.webview.asWebviewUri(scriptPathOnDisk)

      const stylePathOnDisk = Uri.file(
        path.join(context.extensionPath, 'media', 'style.css'),
      )
      const styleUri =
        this.skaffoldPreview.panel.webview.asWebviewUri(stylePathOnDisk)

      const srcUrl = {
        script: scriptUri,
        style: styleUri,
      }

      this.skaffoldPreview.panel.webview.html =
        this.skaffoldPreview.loadingHTML(srcUrl)

      await this.exec(srcUrl)

      // Handle messages from the webview
      this.skaffoldPreview.panel.webview.onDidReceiveMessage(
        async (message) => {
          if (!this.skaffoldPreview.panel) {
            return
          }

          if (message.command === 'dropdownChanged') {
            this.skaffoldPreview.panel.webview.html =
              this.skaffoldPreview.loadingHTML(srcUrl)
            this.skaffoldPreview.profile = message.value

            await this.exec(srcUrl)
          }
        },
      )

      // Dispose the panel when it is closed
      this.skaffoldPreview.panel.onDidDispose(() => {
        this.skaffoldPreview.panel = undefined
      })
    })
  }
}
