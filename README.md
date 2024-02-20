# Skaffold Preview VS Code Extension

The Skaffold Render VS Code Extension is a powerful tool designed to render Skaffold manifests directly within Visual Studio Code, offering developers working with Kubernetes an efficient way to generate and preview manifests without leaving the editor.

## Features

- Intuitive Manifest Rendering: Directly render manifests from the currently open Skaffold YAML file and preview the results in a dedicated panel.
- Status Bar Shortcut: A convenient button in the VS Code status bar allows for easy execution of the Skaffold render command. This button is displayed only when a YAML file is open.
- Error Handling and Messaging: Errors encountered during the rendering process are clearly communicated, facilitating troubleshooting.

## Usage

1. Install the Extension: Search for "Skaffold Render Extension" in the Visual Studio Code Extensions Marketplace and install it.
2. Open a Skaffold YAML File: Open the Skaffold YAML file you wish to render in the editor.
3. Execute Rendering: Click the "Render Skaffold" button in the status bar or execute the "Render Skaffold" command from the Command Palette (Ctrl+Shift+P / Cmd+Shift+P).
4. Preview Results: Upon successful rendering, the generated manifest content is previewed in a new editor tab.

## Prerequisites

To use this extension, the following must be installed:

- Visual Studio Code
- Skaffold CLI

## Installation

Open the Extensions view in Visual Studio Code and search for "Skaffold Preview" to install.

## Configuration

This extension works out of the box and does not require additional configuration. However, depending on your Skaffold setup or project configuration, you might want to customize the path to the Skaffold CLI or its options.

## Support

If you encounter any issues or have feature requests, please create an Issue on the GitHub repository page.

## Contributions

Contributions to this project are welcome. Feel free to submit pull requests, feature suggestions, or any other feedback.

https://github.com/maaaashi/skaffold-preview