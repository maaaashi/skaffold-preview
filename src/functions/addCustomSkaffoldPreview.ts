import * as vscode from "vscode";

export const addCustomSkaffoldPreview = (context: vscode.ExtensionContext) => {
	// const customSkaffoldPreview = vscode.commands.registerCommand(
	// 	"extension.customSkaffoldPreview",
	// 	() => {
	// 		const editor = vscode.window.activeTextEditor;
	// 		if (!editor) {
	// 			vscode.window.showInformationMessage("No editor is active");
	// 			return;
	// 		}

	// 		try {
	// 			const panel = vscode.window.createWebviewPanel(
	// 				"skaffold-preview",
	// 				"Skaffold Preview",
	// 				vscode.ViewColumn.Beside,
	// 				{},
	// 			);

	// 			panel.webview.html = createHTML("読み込み中...");

	// 			render(panel);
	// 		} catch (e) {
	// 			vscode.window.showErrorMessage("Failed to parse YAML file");
	// 		}
	// 	},
	// );

	// context.subscriptions.push(customSkaffoldPreview);
};
