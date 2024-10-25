// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getLinesIcon, getMUIIconsImports } from './editor_scanning';
import { getIconSVGAbsulotePath } from './backend';
import {DecorationsHolder} from './decorationsHolder';
import { ThemeHolder } from './themeHolder';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const decorationsHolder = new DecorationsHolder();
    const themeHolder = new ThemeHolder();

    const setThemeColor =() =>{
        const currentTheme = vscode.workspace.getConfiguration().get<string>('workbench.colorTheme') ?? "Default Dark+";
        themeHolder.setTheme(currentTheme);
    };

	const applyIcons = async (editor: vscode.TextEditor | undefined)  => {
        if (!editor) {return;}

        const text = editor.document.getText();

		const importedIcons = getMUIIconsImports(text);
		if(!importedIcons)
		{
			return;
		}

        const lines = text.split('\n');

		for (const [index, line] of lines.entries())
        {
			const lineIcon = getLinesIcon(line, importedIcons);
            if (lineIcon) {
                const decoration = {
                    range: new vscode.Range(new vscode.Position(index, 0), new vscode.Position(index, 0))
                };
				const svgPath = await getIconSVGAbsulotePath(lineIcon, themeHolder.getIconsColor(), context.extensionPath);
				if(!svgPath)
				{
					continue;
				}
				const iconDecorationType = vscode.window.createTextEditorDecorationType({
					gutterIconPath: svgPath,
					gutterIconSize: 'contain',
					color: 'blue'
				});
				editor.setDecorations(iconDecorationType, [decoration]);
                decorationsHolder.add(iconDecorationType);
            }
        }
    };

    const handleTextChange = async (editor: vscode.TextEditor | undefined) =>{
        // remove old icons
        const oldDecorations = decorationsHolder.popAll();
        oldDecorations.forEach((decorationType)=>{
            editor?.setDecorations(decorationType, []);
        });
        // add the new ones
        applyIcons(editor);
    };

    console.log("registering mui-icons-preview callbacks");

    // Apply icons when the active editor changes
    vscode.window.onDidChangeActiveTextEditor(handleTextChange);

    // Apply icons when the text in the document changes
    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            handleTextChange(editor);
        }
    });

    // theme change
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('workbench.colorTheme')) {
           setThemeColor();
           handleTextChange(vscode.window.activeTextEditor);
        }
    });

     // initial activation
     if (vscode.window.activeTextEditor) {
        setThemeColor();
        handleTextChange(vscode.window.activeTextEditor);
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}
