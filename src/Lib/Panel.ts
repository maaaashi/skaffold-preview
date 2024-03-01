import { Uri } from 'vscode'

export const Panel = {
  escapeHtml(unsafeText: string) {
    return unsafeText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  },
  createPlainHTML(body: string, src: { script: Uri; style: Uri }) {
    return `
<html>
  <head>
    <link href="${src.style}" rel="stylesheet">
  </head>
	<body>
    <div class="header">
    </div>
    <div class="preview">
      <pre>${this.escapeHtml(body)}</pre>
    </div>
	</body>
</html>
`
  },
  createPreview(
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
    <div class="header">
      <select id="profile-dropdown">
        <option value="">(profileを選択)</option>
        ${profiles.map(
          (profile) =>
            `<option value="${profile.name}" ${
              profile.name === active && 'selected'
            }>${profile.name}</option>`,
        )}
      </select>
    </div>
    <div class="preview">
      <pre>${this.escapeHtml(body)}</pre>
    </div>
  </body>
  <script src="${src.script}"></script>
</html>
		`
  },
}
