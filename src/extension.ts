import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from 'path'

function escapeHtml(unsafeText: string) {
  return unsafeText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateStatusBarItem(editor: vscode.TextEditor | undefined, item: vscode.StatusBarItem) {
	if (editor && editor.document.languageId === "yaml") {
		item.show()
	} else {
		item.hide()
	}
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.renderSkaffold",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No editor is active");
        return;
      }

      try {
				const currentFilePath = editor.document.uri.fsPath
				const directoryPath = path.dirname(currentFilePath);
				const command = `cd ${directoryPath} && skaffold render -f ${currentFilePath}`

			  exec(command, (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						vscode.window.showErrorMessage("Skaffold render failed: " + stderr);
						return;
					}

					vscode.window.showInformationMessage("Skaffold render successful");

					const panel = vscode.window.createWebviewPanel(
						'skaffold-preview',
						'Skaffold Preview',
						vscode.ViewColumn.Beside,
						{}
					)

					const escapedStdout = escapeHtml(stdout)
	
					panel.webview.html = `
					<html>
						<body>
							<pre>${escapedStdout}</pre>
						</body>
					</html>
				`;
				})

      } catch (e) {
        vscode.window.showErrorMessage("Failed to parse YAML file");
      }
    }
  );

  context.subscriptions.push(disposable);

	const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0)
	button.command = "extension.renderSkaffold"
	button.text = "$(button-icon) Render Skaffold"
	context.subscriptions.push(button)

	vscode.window.onDidChangeActiveTextEditor((editor) => {
    updateStatusBarItem(editor, button);
  });
}

export function deactivate() {}
