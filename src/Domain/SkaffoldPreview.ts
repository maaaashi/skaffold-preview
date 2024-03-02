import { TextEditor, Uri, WebviewPanel } from 'vscode'
import { escapeHtml } from '../Lib/Panel'

export class SkaffoldPreview {
  private _result: string
  public previewOnSave = true

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

  filename() {
    return this.editor?.document.fileName
  }

  loadingHTML(src: { script: Uri; style: Uri }) {
    return `
<html>
  <head>
    <link href="${src.style}" rel="stylesheet">
  </head>
  <body>
    <h1>${this.filename()}</h1>
    <div class="checkbox-wrapper-4">
      <input class="inp-cbx" id="preview-on-save-check" type="checkbox" ${
        this.previewOnSave && 'checked'
      }/>
      <label class="cbx" for="preview-on-save-check"><span>
      <svg width="12px" height="10px">
        <use xlink:href="#check-4"></use>
      </svg></span><span>保存時に再実行する</span></label>
      <svg class="inline-svg">
        <symbol id="check-4" viewbox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>

    <div class="preview">
      <div class="spinner-box">
        <div class="blue-orbit leo">
        </div>
      
        <div class="green-orbit leo">
        </div>
        
        <div class="red-orbit leo">
        </div>
        
        <div class="white-orbit w1 leo">
        </div><div class="white-orbit w2 leo">
        </div><div class="white-orbit w3 leo">
        </div>
      </div>
    </div>
  </body>
</html>
`
  }

  createPreviewHTML(
    body: string,
    src: { script: Uri; style: Uri },
    profiles: { name: string }[],
    active: string,
  ) {
    return `
<html>
  <head>
    <link href="${src.style}" rel="stylesheet">
  </head>
  <body>
    <h1>${this.filename()}</h1>
    <div class="checkbox-wrapper-4">
      <input class="inp-cbx" id="preview-on-save-check" type="checkbox" ${
        this.previewOnSave && 'checked'
      }/>
      <label class="cbx" for="preview-on-save-check"><span>
      <svg width="12px" height="10px">
        <use xlink:href="#check-4"></use>
      </svg></span><span>保存時に再実行する</span></label>
      <svg class="inline-svg">
        <symbol id="check-4" viewbox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>

    <div class="header">
      <div class="select">
        <select id="profile-dropdown">
          <option value="">profile なし</option>
          ${profiles.map(
            (profile) =>
              `<option value="${profile.name}" ${
                profile.name === active && 'selected'
              }>${profile.name}</option>`,
          )}
        </select>
      </div>
      <button id="preview-render-button">
        描画
      </button>
    </div>
    <div class="preview">
      <pre>${escapeHtml(body)}</pre>
    </div>
  </body>
  <script src="${src.script}"></script>
</html>
		`
  }
}
