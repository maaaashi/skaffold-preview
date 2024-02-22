import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
import { createHTML } from "./libs/createHTML";
import { render } from "./libs/render";

function escapeHtml(unsafeText: string) {
	return unsafeText
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function updateStatusBarItem(
	editor: vscode.TextEditor | undefined,
	item: vscode.StatusBarItem,
) {
	if (editor && editor.document.languageId === "yaml") {
		item.show();
	} else {
		item.hide();
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
				const panel = vscode.window.createWebviewPanel(
					"skaffold-preview",
					"Skaffold Preview",
					vscode.ViewColumn.Beside,
					{},
				);

				panel.webview.html = createHTML("読み込み中...");

				render(panel);
			} catch (e) {
				vscode.window.showErrorMessage("Failed to parse YAML file");
			}
		},
	);

	context.subscriptions.push(disposable);

	const button = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		0,
	);
	button.command = "extension.renderSkaffold";
	button.text = "$(button-icon) Render Skaffold";
	context.subscriptions.push(button);
	button.show();

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		updateStatusBarItem(editor, button);
	});
}

export function deactivate() {}
