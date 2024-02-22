import * as vscode from "vscode";
import path from "path";

const editor = vscode.window.activeTextEditor;
export const currentFilePath = editor?.document.uri.fsPath;
export const directoryPath = path.dirname(currentFilePath || "");
