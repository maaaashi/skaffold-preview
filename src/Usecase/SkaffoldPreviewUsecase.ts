import { SkaffoldPreviewGateway } from '../Gateway/SkaffoldPreviewGateway'
import {
  commands,
  window,
  Disposable,
  ViewColumn,
  Uri,
  ExtensionContext,
  TextDocument,
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

  // Skaffold Renderを実行し、結果をWebviewに表示する
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

  // コマンド登録
  disposable(context: ExtensionContext): Disposable {
    return commands.registerCommand('extension.skaffoldPreview', async () => {
      this.skaffoldPreview.editor = window.activeTextEditor

      if (!this.skaffoldPreview.editor) {
        window.showErrorMessage('エディタが開かれていません')
        return
      }

      if (this.skaffoldPreview.editor.document.languageId !== 'yaml') {
        window.showErrorMessage('yaml形式のファイルを開いてください')
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

      // Previewで使われるスクリプトとスタイルのパスを取得
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

      // Previewでのイベント処理
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

          if (message.command === 'previewOnSaveChanged') {
            this.skaffoldPreview.previewOnSave = message.value
          }
        },
      )

      // Webviewが閉じられた時の処理
      this.skaffoldPreview.panel.onDidDispose(() => {
        this.skaffoldPreview.panel = undefined
      })
    })
  }

  // エディタが保存された時の処理
  async onSaveEditor(context: ExtensionContext, document: TextDocument) {
    if (!this.skaffoldPreview.panel) return
    if (document.uri !== this.skaffoldPreview.editor?.document.uri) return
    if (!this.skaffoldPreview.previewOnSave) return

    // Previewで使われるスクリプトとスタイルのパスを取得
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
  }
}
