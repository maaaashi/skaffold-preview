import { exec } from "child_process";
import * as vscode from "vscode";
import { createHTML } from "../libs/createHTML";
import path from "path";

export class Preview {
	public editor: vscode.TextEditor | undefined;
	public currentPath: string;
	public directoryPath: string;

	constructor(private panel: vscode.WebviewPanel) {
		this.panel = panel;
		this.editor = vscode.window.activeTextEditor;
		this.currentPath = this.editor?.document.uri.fsPath || "";
		this.directoryPath = path.dirname(this.currentPath || "");
	}

	private exec(command: string) {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				vscode.window.showErrorMessage(`Skaffold render failed: ${stderr}`);
				this.panel.webview.html = createHTML(stdout);
				return;
			}

			vscode.window.showInformationMessage("Skaffold render successful");
			this.panel.webview.html = createHTML(stdout);
		});
	}

	public render() {
		const command = `cd ${this.directoryPath} && skaffold render -f ${this.currentPath}`;
		this.exec(command);
	}

	public profileRender(profile: string) {
		const command = `cd ${this.directoryPath} && skaffold render -f ${this.currentPath} -p ${profile}`;
		this.exec(command);
	}
}
