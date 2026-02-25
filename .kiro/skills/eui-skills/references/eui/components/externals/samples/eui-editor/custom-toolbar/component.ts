import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule, ToolbarItemConfig } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'custom-toolbar',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        EuiTooltipDirective,
        ...EUI_ICON,
    ],
})
export class CustomToolbarComponent implements OnInit {

    public placeholder = 'Compose an epic...';
    isReadOnly = false;

    public form: FormGroup;

    public customToolbar: ToolbarItemConfig[] = [
        { name: 'headings', label: 'Style - Apply an HTML tag or CSS class to the selected text', options: [1, 2, 3] },
        // { name: 'font', label: 'Font - Change the font face' },
        { name: 'bold', label: 'Bold (Ctrl + B) - Make the selected text bold' },
        { name: 'italic', label: 'Italic (Ctrl + I) - Italicize the selected text' },
        { name: 'underline', label: 'Underline (Ctrl + U) - Underline the selected text' },
        { name: 'strike', label: 'Strikethrough - Draw a line to the middle of the selected text' },
        { name: 'fontColor', label: 'Font Color - Change the text color' },
        // { name: 'fontBackground', label: 'Font Background - Change the text background color' },
        // { name: 'subscript', label: 'Subscript - Create ssmall letters below the text baseline' },
        // { name: 'superscript', label: 'Superscript - Create small letters above the line of the text' },
        // { name: 'textAlign', label: 'Text Align - Align the text to the selected position: left (default), center, right or justify' },
        // { name: 'orderedList', label: 'Numbering - Start an ordered list' },
        // { name: 'bulletList', label: 'Bullets - Start a bulleted list' },
        // { name: 'indentLess', label: 'Decrease Indent - Decrease the indent level of the paragraph' },
        // { name: 'indentMore', label: 'Increase Indent - Increase the indent level of the paragraph' },
        // { name: 'blockquote', label: 'Blockquote - Create a quoted block of the selected text' },
        // { name: 'codeBlock', label: 'Insert Code Block - Insert a code block at the cursor row position' },
        // { name: 'link', label: 'Insert Hyperlink (Ctrl + K) - Create a link to a Web page, a picture, an e-mail address or a program' },
        // { name: 'image', label: 'Insert Picture - Insert a picture from a file' },
        { name: 'imageUrl', label: 'Insert Picture from URL - Insert a picture from a remote URL' },
        // { name: 'video', label: 'Insert Video - Insert a video from a file' },
        // { name: 'table', label: 'Insert Table - Insert a 3-rows/3-cols table' },
        { name: 'clean', label: 'Remove Styles - Remove the styles of the selected text' },
        // { name: 'delete', label: 'Delete content - Permanently deletes editor\'s contents' },
        { name: 'undo', label: 'Undo (Ctrl + Z) - Cancels the previous action' },
        { name: 'redo', label: 'Redo (Ctrl + Y) - Do the next history action again' },
        { name: 'counters', label: 'Counters - Characters and words counters (stripped Html)', options: [
            { name: 'characters' },
            { name: 'words' },
        ]},
    ];

    public htmlContent = `<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>One</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Two</li><li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Two.1</li><li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Two.2</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Three</li></ol><p><br></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>One</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Two</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Two.1</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Two.2</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Three</li></ol>`;

    public crlf = String.fromCharCode(10, 13);     // for tooltip CR+LF
    public charactersCount = 0;
    public charactersCount2 = 0;
    public charactersLabel = 'chars';
    public wordsCount = 0;
    public wordsCount2 = 0;
    public wordsLabel = 'words';
    public isMaxLengthValid = true;
    public isMaxLengthValid2 = true;

    quillEditor: any;
    quillEditor2: any;

    ngOnInit(): void {
        this.form = new FormGroup({
            editorContentEmptyValue: new FormControl<string>(null),
            editorContentTextValue: new FormControl<string>('<p class="eui-u-text-paragraph">This is some unformatted content of the rich text editor with tooltip.</p>'),
            editorContentTextValueTooltip: new FormControl<string>(this.htmlContent),
        });
    }

    public onEditorCreated(event: any): void {
        this.quillEditor = event;
    }

    public getCharactersCounter(event: any): void {
        this.charactersCount = event;
    }

    public getWordsCounter(event: any): void {
        this.wordsCount = event;
    }

    public editorUndo(): void {
        this.quillEditor.history.undo();
    }

    public editorRedo(): void {
        this.quillEditor.history.redo();
    }

    public onEditorCreated2(event: any): void {
        this.quillEditor2 = event;
    }

    public getCharactersCounter2(event: any): void {
        this.charactersCount2 = event;
    }

    public getWordsCounter2(event: any): void {
        this.wordsCount2 = event;
    }

    public editorUndo2(): void {
        this.quillEditor2.history.undo();
    }

    public editorRedo2(): void {
        this.quillEditor2.history.redo();
    }

    toggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }
}
