
import * as vscode from 'vscode';

import { ExampleSerializer } from './serializers';


export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.registerNotebookSerializer(
      'open-notebook', new ExampleSerializer(), { transientOutputs: true }
    )
  );
}

export function deactivate() { }
