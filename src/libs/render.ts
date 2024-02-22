import { exec } from "child_process";
import * as vscode from "vscode";
import { createHTML } from "./createHTML";
import path from "path";

export const render = (panel: vscode.WebviewPanel) => {
	const editor = vscode.window.activeTextEditor!;
	const currentFilePath = editor.document.uri.fsPath;
	const directoryPath = path.dirname(currentFilePath);
	const command = `cd ${directoryPath} && skaffold render -f ${currentFilePath}`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			vscode.window.showErrorMessage("Skaffold render failed: " + stderr);
			panel.webview.html = createHTML(stdout);
			return;
		}

		vscode.window.showInformationMessage("Skaffold render successful");
		panel.webview.html = createHTML(stdout);
	});
};
