import * as vscode from 'vscode';

export class Editor {
  constructor(
    public readonly editor: vscode.TextEditor,
    public readonly panel: vscode.WebviewPanel,
    public readonly currentPath: string,
    public readonly directoryPath: string
  ) {}
}