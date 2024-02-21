"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
var vscode = require("vscode");
var child_process_1 = require("child_process");
var path = require("path");
function escapeHtml(unsafeText) {
    return unsafeText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function updateStatusBarItem(editor, item) {
    if (editor && editor.document.languageId === "yaml") {
        item.show();
    }
    else {
        item.hide();
    }
}
function activate(context) {
    var disposable = vscode.commands.registerCommand("extension.renderSkaffold", function () {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No editor is active");
            return;
        }
        try {
            var currentFilePath = editor.document.uri.fsPath;
            var directoryPath = path.dirname(currentFilePath);
            var command = "cd ".concat(directoryPath, " && skaffold render -f ").concat(currentFilePath);
            var panel_1 = vscode.window.createWebviewPanel('skaffold-preview', 'Skaffold Preview', vscode.ViewColumn.Beside, {});
            panel_1.webview.html = "\n          <html>\n            <body>\n              \u8AAD\u307F\u8FBC\u307F\u4E2D...\n            </body>\n          </html>\n        ";
            (0, child_process_1.exec)(command, function (error, stdout, stderr) {
                if (error) {
                    console.error("exec error: ".concat(error));
                    vscode.window.showErrorMessage("Skaffold render failed: " + stderr);
                    panel_1.webview.html = "\n              <html>\n                <body style=\"color: red;\">\n                  ".concat(stderr, "\n                </body>\n              </html>\n            ");
                    return;
                }
                vscode.window.showInformationMessage("Skaffold render successful");
                var escapedStdout = escapeHtml(stdout);
                panel_1.webview.html = "\n\t\t\t\t\t<html>\n\t\t\t\t\t\t<body>\n\t\t\t\t\t\t\t<pre>".concat(escapedStdout, "</pre>\n\t\t\t\t\t\t</body>\n\t\t\t\t\t</html>\n\t\t\t\t");
            });
        }
        catch (e) {
            vscode.window.showErrorMessage("Failed to parse YAML file");
        }
    });
    context.subscriptions.push(disposable);
    var button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
    button.command = "extension.renderSkaffold";
    button.text = "$(button-icon) Render Skaffold";
    context.subscriptions.push(button);
    button.show();
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        updateStatusBarItem(editor, button);
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
