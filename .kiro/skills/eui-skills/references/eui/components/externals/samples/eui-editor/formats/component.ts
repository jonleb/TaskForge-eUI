import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule, ToolbarItemConfig } from '@eui/components/externals/eui-editor';

export type FormatTypes = ('background' | 'bold' | 'color' | 'font' | 'code' | 'italic' | 'link' | 'size' | 'strike' | 'script' |
'underline' | 'blockquote' |'header' | 'indent' | 'list' | 'align' | 'direction' | 'code-block' | 'Formula' | 'image' | 'video' |
'table')[];

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'formats',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_ALERT,
    ],
})
export class FormatsComponent implements OnInit {

    public form: FormGroup;
    public htmlContent = '<p class="eui-u-text-paragraph">This is some unformatted content of the rich text editor.</p>';
    public placeholder = 'Compose an epic...';
    public formats: FormatTypes = ['header', 'bold', 'italic', 'color'];
    public allFormats: FormatTypes = ['background', 'bold','color','font','code','italic','link','size','strike','script',
        'underline','blockquote','header','indent','list','align','direction','code-block','Formula','image','video'];
    public customToolbar: ToolbarItemConfig[] = [
        { name: 'headings', label: 'Style - Apply an HTML tag or CSS class to the selected text', options: [1, 2, 3] },
        { name: 'bold', label: 'Bold (Ctrl + B) - Make the selected text bold' },
        { name: 'italic', label: 'Italic (Ctrl + I) - Italicize the selected text' },
        { name: 'underline', label: 'Underline (Ctrl + U) - Underline the selected text' },
        { name: 'strike', label: 'Strikethrough - Draw a line to the middle of the selected text' },
        { name: 'textAlign', label: 'Text Align - Align the text to the selected position: left (default), center, right or justify' },
        { name: 'fontColor', label: 'Font Color - Change the text color' },
        { name: 'clean', label: 'Remove Styles - Remove the styles of the selected text' },
        { name: 'undo', label: 'Undo (Ctrl + Z) - Cancels the previous action' },
        { name: 'redo', label: 'Redo (Ctrl + Y) - Do the next history action again' },
        { name: 'counters', label: 'Counters - Characters and words counters (stripped Html)', options: [
            { name: 'characters' },
            { name: 'words' },
        ]},
    ];

    ngOnInit(): void {
        this.form = new FormGroup({
            editorContentTextValue: new FormControl<string>(this.htmlContent),
        });
    }

}
