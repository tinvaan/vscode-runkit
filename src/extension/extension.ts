
import * as vscode from 'vscode';

import { ExampleSerializer } from './serializers';
import { ExampleController } from './controllers';


export function activate(context: vscode.ExtensionContext) {
  const notebook = vscode.workspace.registerNotebookSerializer(
    'runkit-notebook', new ExampleSerializer(), { transientOutputs: true }
  );

  context.subscriptions.push(notebook, new ExampleController());
}
