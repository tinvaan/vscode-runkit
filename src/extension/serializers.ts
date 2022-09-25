
import * as vscode from 'vscode';
import { TextDecoder, TextEncoder } from 'util';


interface RawNotebookData {
    cells: RawNotebookCell[]
}

interface RawNotebookCell {
    value: string;
    language: string;
    kind: vscode.NotebookCellKind;
}


export class ExampleSerializer implements vscode.NotebookSerializer {

    async deserializeNotebook(content: Uint8Array, token: vscode.CancellationToken)
    : Promise<vscode.NotebookData> {
        let raw: RawNotebookData = { cells: [] },
            contents = new TextDecoder().decode(content);

        try {
            raw = <RawNotebookData>JSON.parse(contents);
        } catch (err) {
            console.error('Failed to parse JSON document ', err);
        }

        return new vscode.NotebookData(raw.cells.map(
            item => new vscode.NotebookCellData(item.kind, item.value, item.language)
        ));
    }

    async serializeNotebook(data: vscode.NotebookData, token: vscode.CancellationToken)
    : Promise<Uint8Array> {
        let contents: RawNotebookData = { cells: [] };

        for (const cell of data.cells) {
            contents.cells.push({
                kind: cell.kind, value: cell.value, language: cell.languageId
            });
        }

        return new TextEncoder().encode(JSON.stringify(contents));
    }

}
