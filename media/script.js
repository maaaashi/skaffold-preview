const vscode = acquireVsCodeApi()
document
  .getElementById('preview-render-button')
  .addEventListener('click', () => {
    vscode.postMessage({
      command: 'dropdownChanged',
      value: document.getElementById('profile-dropdown').value,
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
