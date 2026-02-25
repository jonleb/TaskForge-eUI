import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'html-format',
    templateUrl: 'component.html',
    imports: [
            ReactiveFormsModule,
            EuiEditorModule,
            ...EUI_SLIDE_TOGGLE,
            ...EUI_INPUT_GROUP,
            ...EUI_LABEL,
        ],
})
export class HtmlFormatComponent implements OnInit {
    public isReadOnly = false;
    public isReadOnly2 = false;
    public dangerousHtmlContent = `All dangerous Html content such as scripts, malformed object sources such as images, media, etc. are filtered and dropped (sanitized).<script>alert(1)</script><p class="eui-u-text-paragraph"><img src="https://europa.eu/wel/eu_portal/2014/images/header/europa-flag.gif" alt="Europa Flag" onerror="alert('Sanitizing not working!')"></p><p class="eui-u-text-paragraph">Correct image src should not open alert.</p>`;
    public htmlContent = `<h1 class="eui-u-text-h1">Hello <strong style="color: rgb(229, 91, 183);">World !</strong></h1>
<p class="eui-u-text-paragraph">This is some <strong>Html </strong><strong style="color: rgb(230, 0, 0);">formatted </strong>content of the rich text editor.</p>
<p class="eui-u-text-paragraph">It contains Html semantic code with its customized styles such as color attributes.</p>

<p class="eui-u-text-paragraph"><strong>Lists</strong></p>
<p class="eui-u-text-paragraph">These are <strong style="color: rgb(230, 0, 0);">formatted lists</strong> content of the rich text editor.</p>
<ol>
    <li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Numbered list</li>
    <li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
</ol>
<ol>
    <li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Bulletted list</li>
    <li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="bullet" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
    <li data-list="bullet" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Sub-section</li>
</ol>

<p class="eui-u-text-paragraph"><strong>Paragraphs</strong></p>
<p class="eui-u-text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat nulla malesuada mauris consequat, ut fermentum ante facilisis.
Vivamus vel porta massa. Nullam fringilla dolor ipsum, at cursus nulla bibendum sit amet.</p>
<p class="eui-u-text-paragraph">Cras porta, magna at ornare tincidunt, massa augue tincidunt ligula, ut fringilla massa mauris quis dolor. Maecenas porta rutrum
lorem, vel congue eros vehicula eu. Quisque auctor quam ac mi sodales imperdiet. Sed at nulla metus.</p>
<p class="eui-u-text-paragraph">Ut rhoncus vestibulum rhoncus. Nulla at mi felis. Integer semper tempus luctus. Phasellus ac tempor lorem. Sed sit amet nibh pretium,
pellentesque felis vitae, consectetur odio. Pellentesque porttitor eros sit amet lacinia scelerisque. Morbi quis eleifend sem. Praesent
laoreet euismod mi, at sodales metus sodales vel.</p>

<p class="eui-u-text-paragraph"><strong>Headings</strong></p>
<h1 class="eui-u-text-h1">H1 - The quick brown fox jumps over the lazy dog</h1>
<h2 class="eui-u-text-h2">H2 - The quick brown fox jumps over the lazy dog</h2>
<h3 class="eui-u-text-h3">H3 - The quick brown fox jumps over the lazy dog</h3>
<h4 class="eui-u-text-h4">H4 - The quick brown fox jumps over the lazy dog</h4>
<h5 class="eui-u-text-h5">H5 - The quick brown fox jumps over the lazy dog</h5>
<h6 class="eui-u-text-h6">H6 - The quick brown fox jumps over the lazy dog</h6>
<p class="eui-u-text-paragraph">Normal - The quick brown fox jumps over the lazy dog</p>

<p class="eui-u-text-paragraph">Check the code source for more detail.</p>
`;

    public placeholder = 'Compose an epic...';
    public form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            htmlContent: new FormControl<string>(this.htmlContent),
            dangerousHtmlContent: new FormControl<string>(this.dangerousHtmlContent),
        });
    }

    toggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }

    toggleReadOnly2(): void {
        this.isReadOnly2 = !this.isReadOnly2;
    }
}
