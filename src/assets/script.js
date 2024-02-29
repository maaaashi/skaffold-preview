const vscode = acquireVsCodeApi()
document
	.getElementById('profile-dropdown')
	.addEventListener('change', (event) => {
		vscode.postMessage({
			command: 'dropdownChanged',
			value: event.target.value,
		})
	})
