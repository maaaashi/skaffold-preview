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
	createPreview(body: string, script: Uri) {
		return `
<html>
	<body>
		<select id="profile-dropdown">
			<option value="option1">オプション1</option>
			<option value="option2">オプション2</option>
		</select>
    <pre>${this.escapeHtml(body)}</pre>
	</body>
	<script src="${script}"></script>
</html>
		`
	},
}
