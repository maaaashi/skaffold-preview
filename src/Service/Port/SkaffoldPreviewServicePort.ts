import * as vscode from 'vscode'

export interface SkaffoldPreviewServicePort {
	disposable(): vscode.Disposable
}
