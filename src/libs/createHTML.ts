function escapeHtml(unsafeText: string) {
	return unsafeText
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}

export const createHTML = (body: string) => {
	return `
<html>
  <body>
    <pre>${escapeHtml(body)}<pre>
  </body>
</html>
`
}
