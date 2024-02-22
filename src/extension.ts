import * as vscode from "vscode";
import { addSkaffoldPreview } from "./functions/addSkaffoldPreview";
import { addStatusBarButton } from "./functions/addStatusBarButton";
import { addCustomSkaffoldPreview } from "./functions/addCustomSkaffoldPreview";

export function activate(context: vscode.ExtensionContext) {
	addSkaffoldPreview(context);
	addCustomSkaffoldPreview(context);
	addStatusBarButton(context);
}

export function deactivate() {}
