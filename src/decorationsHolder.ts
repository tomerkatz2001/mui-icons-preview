import * as vscode from 'vscode';


export class DecorationsHolder
{
    private decorations:  vscode.TextEditorDecorationType[];

    constructor()
    {
        this.decorations = [];
    }

    public add(decoration: vscode.TextEditorDecorationType)
    {
        this.decorations.push(decoration);
    }

    public popAll()
    {
        const decorations = this.decorations;
        this.decorations = [];
        return decorations;
    }
}