import { MarkdownView } from "obsidian";
import { App, Editor } from "obsidian";

/**
 * 
 * @param {App} app 
 * @returns {Editor | null}
 */
export function currentEditor(app) {
    const context = app.workspace.getActiveViewOfType( MarkdownView );
    return context ? context.editor : null;
}
