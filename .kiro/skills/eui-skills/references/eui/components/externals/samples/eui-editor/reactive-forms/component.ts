import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { euiEditorMinLength, euiEditorMaxLength } from '@eui/components/externals/eui-editor';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';
import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';

@Component({
    // eslint-disable-next-line
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_FEEDBACK_MESSAGE,
    ],
})
export class ReactiveFormsComponent implements OnInit {
    public placeholder = 'Compose an epic...';

    public form1: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public form5: FormGroup;
    public form6: FormGroup;
    public form7: FormGroup;
    public form8: FormGroup;
    public form9: FormGroup;
    public form10: FormGroup;
    public form11: FormGroup;
    public form12: FormGroup;

    public customFormats = ['bold', 'italic', 'underline'];
    public customFormats2 = ['bold', 'italic', 'underline'];

    public customToolbar = [
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

    public isReadOnly = false;
    public htmlContent = `<p>At vero eos et <strong style=\"color: rgb(230, 0, 0);\">accusamus </strong>et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p><p>Et harum quidem rerum facilis est et expedita distinctio.</p><h6 class=\"ql-align-right\"><strong style=\"color: rgb(136, 136, 136);\"><em>Cogito, ergo sum</em></strong></h6><p><br></p><p>These are <strong style=\"color: rgb(230, 0, 0);\">formatted lists</strong> content of the rich text editor.</p><p><strong>Ordered list</strong></p><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>one</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>two</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>three</li><li data-list=\"ordered\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.1</li><li data-list=\"ordered\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.2</li><li data-list=\"ordered\" class=\"ql-indent-2\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.2.1</li><li data-list=\"ordered\" class=\"ql-indent-2\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.2.2</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>four</li></ol><p><strong>Unordered list</strong></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>one</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>two</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>three</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.1</li><li data-list=\"bullet\" class=\"ql-indent-1\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.2</li><li data-list=\"bullet\" class=\"ql-indent-2\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.2.1</li><li data-list=\"bullet\" class=\"ql-indent-2\"><span class=\"ql-ui\" contenteditable=\"false\"></span>3.2.2</li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>four</li></ol>`;
    public jsonContent = `{\"ops\":[{\"insert\":\"At vero eos et \"},{\"attributes\":{\"color\":\"#e60000\",\"bold\":true},\"insert\":\"accusamus \"},{\"insert\":\"et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\\nEt harum quidem rerum facilis est et expedita distinctio.\\n\"},{\"attributes\":{\"italic\":true,\"color\":\"#888888\",\"bold\":true},\"insert\":\"Cogito, ergo sum\"},{\"attributes\":{\"align\":\"right\",\"header\":6},\"insert\":\"\\n\"},{\"insert\":\"\\nThese are \"},{\"attributes\":{\"color\":\"#e60000\",\"bold\":true},\"insert\":\"formatted lists\"},{\"insert\":\" content of the rich text editor.\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Ordered list\"},{\"insert\":\"\\none\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"two\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"three\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"3.1\"},{\"attributes\":{\"indent\":1,\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"3.2\"},{\"attributes\":{\"indent\":1,\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"3.2.1\"},{\"attributes\":{\"indent\":2,\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"3.2.2\"},{\"attributes\":{\"indent\":2,\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"four\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Unordered list\"},{\"insert\":\"\\none\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"two\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"three\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"3.1\"},{\"attributes\":{\"indent\":1,\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"3.2\"},{\"attributes\":{\"indent\":1,\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"3.2.1\"},{\"attributes\":{\"indent\":2,\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"3.2.2\"},{\"attributes\":{\"indent\":2,\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"four\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"}]}`;

    ngOnInit(): void {
        this.form1 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent),
        });

        this.form2 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent),
        });

        this.form3 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent),
        });

        this.form4 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent),
        });

        this.form5 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, Validators.required),
        });

        this.form6 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent, Validators.required),
        });

        this.form7 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(10)]),
        });

        this.form8 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(10)]),
        });

        this.form9 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(10)]),
        });

        this.form10 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(10)]),
        });

        this.form11 = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(10)]),
        });

        this.form12 = new FormGroup({
            jsonContent: new FormControl<string>(this.jsonContent, [Validators.required, euiEditorMinLength(5), euiEditorMaxLength(10)]),
        });
    }

    public toggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }
}
