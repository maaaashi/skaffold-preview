import * as vscode from "vscode";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.renderSkaffold",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No editor is active");
        return;
      }

      const text = editor.document.getText();
      try {
				const currentPath = editor.document.uri.fsPath

			  exec(`skaffold render -f ${currentPath}`, (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					console.log(`stdout: ${stdout}`);
					console.error(`stderr: ${stderr}`);	
				})

        // エディターを縦に分割してレンダリング結果を表示
        const panel = vscode.window.createWebviewPanel(
					'skaffold-preview',
					'Skaffold Preview',
					vscode.ViewColumn.Beside,
					{}
				)

				panel.webview.html = `
					YES
				`
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
	button.show()
}

export function deactivate() {}
