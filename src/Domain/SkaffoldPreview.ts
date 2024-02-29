import { TextEditor, WebviewPanel } from 'vscode'

export class SkaffoldPreview {
  private _result: string

  constructor(
    private _editor: TextEditor | undefined,
    private _panel: WebviewPanel | undefined,
    private _profile: string,
  ) {
    this._result = ''
  }

  get result(): string {
    return this._result
  }

  set result(value: string) {
    this._result = value
  }

  get currentPath(): string {
    return this.editor?.document.uri.fsPath || ''
  }

  get profile(): string {
    return this._profile
  }

  set profile(p) {
    this._profile = p
  }

  get editor(): TextEditor | undefined {
    return this._editor
  }

  set editor(e) {
    this._editor = e
  }

  get panel(): WebviewPanel | undefined {
    return this._panel
  }

  set panel(p) {
    this._panel = p
  }
}
