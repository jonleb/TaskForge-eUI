import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule, ToolbarItemConfig } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'read-only',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
})
export class ReadonlyComponent implements OnInit {
    public emptyContent = '';
    public nullContent = null;
    public htmlContent = `<p><strong>This sample shows some layout elements</strong></p>

<p>This is some <strong>Html </strong><strong style="color: rgb(230, 0, 0);">formatted </strong>content of the rich text editor. 
It contains Html semantic code with its customized styles such as color attributes and also <a href="https://google.com" rel="noopener noreferrer" target="_blank">links</a>.</p>

<p><strong>Paragraphs</strong></p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat nulla malesuada mauris consequat, ut fermentum ante facilisis.
Vivamus vel porta massa. Nullam fringilla dolor ipsum, at cursus nulla bibendum sit amet.</p>
<p>Cras porta, magna at ornare tincidunt, massa augue tincidunt ligula, ut fringilla massa mauris quis dolor. Maecenas porta rutrum
lorem, vel congue eros vehicula eu. Quisque auctor quam ac mi sodales imperdiet. Sed at nulla metus.</p>
<p>Ut rhoncus vestibulum rhoncus. Nulla at mi felis. Integer semper tempus luctus. Phasellus ac tempor lorem. Sed sit amet nibh pretium,
pellentesque felis vitae, consectetur odio. Pellentesque porttitor eros sit amet lacinia scelerisque. Morbi quis eleifend sem. Praesent
laoreet euismod mi, at sodales metus sodales vel.</p>
<h6 class="ql-align-right"><strong style="color: rgb(136, 136, 136);"><em>Cogito, ergo sum</em></strong></h6>

<p><strong>Headings</strong></p>
<h1>Hello <strong style="color: rgb(229, 91, 183);">World !</strong></h1>
<h1 class="eui-u-text-h1">H1 - The quick brown fox jumps over the lazy dog</h1>
<h2 class="eui-u-text-h2">H2 - The quick brown fox jumps over the lazy dog</h2>
<h3 class="eui-u-text-h3">H3 - The quick brown fox jumps over the lazy dog</h3>
<h4 class="eui-u-text-h4">H4 - The quick brown fox jumps over the lazy dog</h4>
<h5 class="eui-u-text-h5">H5 - The quick brown fox jumps over the lazy dog</h5>
<h6 class="eui-u-text-h6">H6 - The quick brown fox jumps over the lazy dog</h6>
<p>Normal - The quick brown fox jumps over the lazy dog</p>
`;
    // OL/UL lists
    public htmlContent2 = `<p><strong style="color: rgb(230, 0, 0);">Quill formatted lists</strong></p>
<p><strong>Ordered list</strong></p>
<ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>one</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>two</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>three</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>3.1</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>3.2</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>3.2.1</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>3.2.2</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>four</li></ol>
<p><strong>Unordered list</strong></p>
<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>one</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>two</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>three</li><li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>3.1</li><li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>3.2</li><li data-list="bullet" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>3.2.1</li><li data-list="bullet" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>3.2.2</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>four</li></ol>
`;

    public htmlContent3 = `<p><strong style="color: rgb(230, 0, 0);">HTML lists</strong></p>
<p><strong>Ordered nested list</strong></p>
<ol>
    <li>one</li>
    <li>two</li>
    <li>three
        <ol>
            <li>3.1</li>
            <li>3.2
                <ol>
                    <li>3.2.1</li>
                    <li>3.2.2</li>
                </ol>
            </li>
        </ol>
    </li>    
    <li>four</li>
</ol>

<p><strong>Unordered nested list</strong></p>
<ul>
    <li>one</li>
    <li>two</li>
    <li>three
        <ul>
            <li>3.1</li>
            <li>3.2
                <ul>
                    <li>3.2.1</li>
                    <li>3.2.2
                        <ul>
                            <li>3.2.2.1</li>
                            <li>3.2.2.2
                                <ul>
                                    <li>3.2.2.2.1</li>
                                    <li>3.2.2.2.2</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>    
    <li>four</li>
</ul>
`;

    jsonContent = `{\"ops\":[{\"insert\":\"Hello \"},{\"attributes\":{\"color\":\"#e55bb7\",\"bold\":true},\"insert\":\"World !\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nThis \"},{\"attributes\":{\"bold\":true},\"insert\":\"JSON content object \"},{\"insert\":\"is easy to store and to maintain, because there is \"},{\"attributes\":{\"italic\":true,\"color\":\"#e60000\",\"bold\":true},\"insert\":\"no html \"},{\"insert\":\"syntax parsing necessary.\\nIt contains representations of the content (as inserts) and formatting operations (as attributes).\\nCheck the code source and/or activate the debug option for more detail.\\n\"}]}`;
    placeholder = 'Compose an epic...';

    form: FormGroup;
    isReadOnly = true;

    public customToolbar: ToolbarItemConfig[] = [
        // { name: 'headings', label: 'Style - Apply an HTML tag or CSS class to the selected text', values: [1, 2, 3, 4, 5, 6] },
        // { name: 'font', label: 'Font - Change the font face' },
        { name: 'bold', label: 'Bold (Ctrl + B) - Make the selected text bold' },
        { name: 'italic', label: 'Italic (Ctrl + I) - Italicize the selected text' },
        { name: 'underline', label: 'Underline (Ctrl + U) - Underline the selected text' },
        { name: 'strike', label: 'Strikethrough - Draw a line to the middle of the selected text' },
        { name: 'fontColor', label: 'Font Color - Change the text color' },
        // { name: 'fontBackground', label: 'Font Background - Change the text background' },
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
        // { name: 'counters', label: 'Counters - Characters and words counters (stripped Html)' },
    ];

    ngOnInit(): void {
        this.form = new FormGroup({
            editorContent: new FormControl<string>(this.htmlContent),
            emptyContent: new FormControl<string>(this.emptyContent),
            nullContent: new FormControl<string>(this.nullContent),
            htmlContent: new FormControl<string>(this.htmlContent),
            htmlContent2: new FormControl<string>(this.htmlContent2),
            htmlContent3: new FormControl<string>(this.htmlContent3),
            jsonContent: new FormControl<string>(this.jsonContent),
        });
    }

    toggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }
}
