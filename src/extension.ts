import * as vscode from "vscode";
import { addSkaffoldPreview } from "./functions/addSkaffoldPreview";
import { addStatusBarButton } from "./functions/addStatusBarButton";

export function activate(context: vscode.ExtensionContext) {
	addSkaffoldPreview(context);

	addStatusBarButton(context);
}

export function deactivate() {}
