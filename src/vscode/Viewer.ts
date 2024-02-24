export class Viewer {
	static escapeHtml(unsafeText: string) {
		return unsafeText
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
	}

	static createHtml(body: string) {
		return `<html><body><pre>${this.escapeHtml(body)}<pre></body></html>`
	}
}
