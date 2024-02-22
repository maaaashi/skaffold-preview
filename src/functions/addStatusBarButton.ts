import * as vscode from "vscode";

const updateStatusBarItem = (
	editor: vscode.TextEditor | undefined,
	item: vscode.StatusBarItem,
) => {
	if (editor && editor.document.languageId === "yaml") {
		item.show();
	} else {
		item.hide();
	}
};

export const addStatusBarButton = (context: vscode.ExtensionContext) => {
	const button = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		0,
	);
	button.command = "extension.skaffoldPreview";
	button.text = "$(button-icon) Render Skaffold";
	context.subscriptions.push(button);
	button.show();

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		updateStatusBarItem(editor, button);
	});
};
