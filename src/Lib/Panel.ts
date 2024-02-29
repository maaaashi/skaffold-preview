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
  createPlainHTML(body: string) {
    return `
<html>
  <body>
    ${this.escapeHtml(body)}
  </body>
</html>
`
  },
  createPreview(
    body: string,
    script: Uri,
    profiles: { name: string }[],
    active: string,
  ) {
    return `
<html>
	<body>
		<select id="profile-dropdown">
			<option value="">(profileを選択)</option>
			${profiles.map(
        (profile) =>
          `<option value="${profile.name}" ${
            profile.name === active && 'selected'
          }>${profile.name}</option>`,
      )}
		</select>
    <pre>${this.escapeHtml(body)}</pre>
	</body>
	<script src="${script}"></script>
</html>
		`
  },
}
