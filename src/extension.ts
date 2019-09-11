import * as vscode from 'vscode';
import * as path from 'path';

interface FolderMap {
    [key: string]: string;
}

interface Contribution {
    folderMap: FolderMap;
    browserModules: Array<string>;
    mainProcessModules: Array<string>;
}

interface API {
    contribute(sourceExtensionId: string, contribution: Contribution): void;
    active(): boolean;
}

class Extension {
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    async start() {
        let src = Array(`file://${path.join(path.join(this.context.extensionPath, 'layout'), 'style.css')}`);
        let config = await vscode.workspace.getConfiguration().get('vscode_custom_css.imports');
        if (!config) {
            await vscode.workspace
                .getConfiguration()
                .update('vscode_custom_css.imports', src, vscode.ConfigurationTarget.Global);
            vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
    }

    context: vscode.ExtensionContext;
}

export function activate(context: vscode.ExtensionContext) {
    new Extension(context).start();
}
export function deactivate() {}
