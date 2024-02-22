import * as vscode from "vscode";
import { addSkaffoldPreview } from "./functions/addSkaffoldPreview";
import { addStatusBarButton } from "./functions/addStatusBarButton";
import { addProfileSkaffoldPreview } from "./functions/addProfileSkaffoldPreview";

export function activate(context: vscode.ExtensionContext) {
	addSkaffoldPreview(context);
	addProfileSkaffoldPreview(context);
	addStatusBarButton(context);
}

export function deactivate() {}
