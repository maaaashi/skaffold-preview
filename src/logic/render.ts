import { exec } from "child_process";
import * as vscode from "vscode";
import { createHTML } from "../libs/createHTML";
import { currentFilePath, directoryPath } from "../libs/path";

export class Render {
	constructor(private panel: vscode.WebviewPanel) {
		this.panel = panel;
	}

	public exec() {
		const command = `cd ${directoryPath} && skaffold render -f ${currentFilePath}`;

		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				vscode.window.showErrorMessage("Skaffold render failed: " + stderr);
				this.panel.webview.html = createHTML(stdout);
				return;
			}

			vscode.window.showInformationMessage("Skaffold render successful");
			this.panel.webview.html = createHTML(stdout);
		});
	}

	public customExec() {

	}
}