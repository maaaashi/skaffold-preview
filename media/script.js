const vscode = acquireVsCodeApi()
document
  .getElementById('profile-dropdown')
  .addEventListener('change', (event) => {
    vscode.postMessage({
      command: 'dropdownChanged',
      value: event.target.value,
    })
  })

document
  .getElementById('preview-on-save-check')
  .addEventListener('change', (event) => {
    vscode.postMessage({
      command: 'previewOnSaveChanged',
      value: event.target.checked,
    })
  })
