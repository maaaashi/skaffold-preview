import * as vscode from "vscode";
import { createHTML } from "../libs/createHTML";
import { Render } from "../logic/render";

export const addSkaffoldPreview = (context: vscode.ExtensionContext) => {
	const skaffoldPreview = vscode.commands.registerCommand(
		"extension.skaffoldPreview",
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

				const render = new Render(panel);
				render.exec();
			} catch (e) {
				vscode.window.showErrorMessage("Failed to parse YAML file");
			}
		},
	);

	context.subscriptions.push(skaffoldPreview);
};
