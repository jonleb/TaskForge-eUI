# eui-editor

## Overview

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-editor</code> is an advanced <strong>Rich Text WYSIWYG editor</strong> based on <a class="eui-u-text-link-external-underline" href="https://quilljs.com/" target="_blank"><strong>Quill JS</strong></a> and <a class="eui-u-text-link-external-underline" href="https://www.npmjs.com/package/ngx-quill" target="_blank"><strong>Ngx-Quill.</strong></a>
</p>
<p class="eui-u-text-paragraph">
    As a long-time requested feature, the new eui-editor allows to create embedded data tables within the editor's contents as well as all previous features such as toolbar customization, reactive forms support with ready to use advanced validators, etc.
</p>

<br>

<eui-alert euiWarning>
    <eui-alert-title>IMPORTANT INSTALLATION NOTICE & USAGE</eui-alert-title>
    <p class="eui-u-text-paragraph">
        <strong>The eui-editor component's module has been <u>externalized</u> and it must be imported in your <code class="eui-u-text-code">shared.module.ts</code> :</strong>
        <br/>
        <code class="eui-u-ml-2xl">import &#123; EuiEditorModule &#125; from '&#64;eui/components/externals/eui-editor';</code>
    </p>

    <p class="eui-u-text-paragraph">
        In order to use this component, <strong>Quill JS</strong> and its style dependencies must be added to your project's root <strong>angular.json</strong> config file :
    </p>

    <ul class="eui-u-ml-xl">
        <li>
            In the "<strong>styles</strong>" section, add the Quill <strong>stylesheets imports</strong>:
            <ul>
                <li><code class="eui-u-ml-m">"node_modules/quill/dist/quill.core.css"</code></li>
                <li><code class="eui-u-ml-m">"node_modules/quill/dist/quill.snow.css"</code></li>
            </ul>
        </li>
        <li>
            In the "<strong>scripts</strong>" section, add the Quill <strong>library import</strong>:
            <ul>
                <li><code class="eui-u-ml-m">"node_modules/quill/dist/quill.js"</code></li>
                <li><code class="eui-u-ml-m">"node_modules/quill-better-table/dist/quill-better-table.min.js"</code></li>
            </ul>
        </li>
    </ul>

    <p class="eui-u-text-paragraph">
        In case you want to load the script and styles dynamically (lazy loading), you can use the following provide in your <strong>app.module.ts</strong> file :
        <br/>
        The <strong>QUILL_DYNAMIC_CONFIG_TOKEN</strong> is an InjectionToken that allows to configure the path to the Quill JS library and its stylesheets. 
        For example :
    </p>
    <p class="eui-u-c-danger-light">
        &#123; provide: QUILL_DYNAMIC_CONFIG_TOKEN, useValue: &#123; path: 'assets/quill' &#125; &#125;
    </p>
    will load the Quill JS library from the assets/Quill folder.


    <p class="eui-u-text-paragraph">Also, the following line has to be added in the project's root <strong>polyfills.ts</strong> file for better-table plugin :</p>
        <code class="eui-u-ml-2xl">(window as any).global = window;</code>

    <p class="eui-u-text-paragraph">
        For more information, feel free to check the source code of this page or you can contact us on
        <a class="eui-u-text-link-external" href="https://teams.microsoft.com/l/channel/19%3a6db7a6cef52340eb91d67b8d75db2523%40thread.tacv2/%25E2%259D%2593%25E2%259D%2593%2520%2520HELPDESK%2520and%2520SUPPORT?groupId=fb6def72-c57b-4e8f-a82e-49be65d6e1f5&tenantId=b24c8b06-522c-46fe-9080-70926f8dddb1" target="_blank"><strong>Teams</strong></a>
        or by <a class="eui-u-text-link" href="mailto:digit-eui-support&#64;ec.europa.eu" target="_blank"><strong>email</strong></a>.
    </p>
</eui-alert>

<eui-alert euiWarning>
    <eui-alert-title>KNOWN BUGS (Better Table plugin)</eui-alert-title>

    <p class="eui-u-text-paragraph">
        While using the better-table plugin beware that you are not allowed to insert a header inside a cell of the table. If you do so,
        expect to get a runtime error which is a known, still open, bug of that plugin. For more information check on
        <a class="eui-u-text-link-external" href="https://github.com/soccerloway/quill-better-table/issues" target="_blank">Github</a>.
    </p>
</eui-alert>

<br>

<eui-alert euiDanger>
    <eui-alert-title>IMPORTANT SECURITY MESSAGE</eui-alert-title>

    <p class="eui-u-text-paragraph">
        The eui-editor is patched to fulfill some <strong>security requirements</strong> and to resolve some vulnerabilities.<br/>
        As a consequence, please note that these patches strips out the editor's HTML format from all vulnerable code such as :
    </p>
    <div class="eui-u-mt-xs">
        <ul class="eui-u-ml-m">
            <li><strong>scripts</strong> &mdash; any script content is removed</li>
            <li><strong>object's sources</strong> &mdash; malformed or malicious object sources are dropped</li>
        </ul>
    </div>
    <p class="eui-u-text-paragraph">
        For more information, feel free to contact us by sending an email to <a class="eui-u-text-link" href="mailto:digit-eui-support&#64;ec.europa.eu" target="_blank"><strong>DIGIT-EUI-SUPPORT</strong></a>.
    </p>
</eui-alert>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-editor' |
| Input | id | string | - |
| Input | placeholder | string | '' |
| Input | format | 'html' \| 'json' | 'html' |
| Input | theme | 'snow' \| 'bubble' | 'snow' |
| Input | debug | 'warn' \| 'log' \| 'error' \| false | false |
| Input | customToolbarPosition | 'top' \| 'bottom' | 'top' |
| Input | tabindex | string | '0' |
| Input | modules | QuillModules | - |
| Input | formats | string[] \| null | - |
| Input | customToolbarConfig | ToolbarItemConfig[] | - |
| Input | height | string | - |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Input | get | unknown | - |
| Output | editorCreate | unknown | new EventEmitter<typeof QuillType>() |
| Output | editorChange | unknown | new EventEmitter<EditorChangeSelection \| ContentChange>() |
| Output | contentChange | unknown | new EventEmitter<ContentChange>() |
| Output | selectionChange | unknown | new EventEmitter<SelectionChange>() |
| Output | focus | unknown | new EventEmitter<Focus>() |
| Output | blur | unknown | new EventEmitter<Blur>() |
| Output | charactersCountChange | unknown | new EventEmitter<number>() |
| Output | wordsCountChange | unknown | new EventEmitter<number>() |

## Samples

### [Default](samples/eui-editor/Default)

```html
<form [formGroup]="form">
    <eui-editor formControlName="emptyContent" [placeholder]="placeholder"></eui-editor>

    <div class="eui-showcase-demo eui-u-mt-m">
        <div class="doc-sample-section-title">Editor's contents</div>
        <div class="code" tabindex="0">
            <pre class="eui-u-text-pre">{{ form.get('emptyContent').value }}</pre>
        </div>
    </div>
</form>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
    ],
})
export class DefaultComponent implements OnInit {
    public placeholder = 'Compose an epic...';

    public form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            emptyContent: new FormControl<string>(''),
        });
    }
}
```

### Other examples

- [Options: Enabled on focus](samples/eui-editor/enabled-on-focus)
- [Options: Formats](samples/eui-editor/formats)
- [Options: Height](samples/eui-editor/height)
- [Options: Html format](samples/eui-editor/html-format)
- [Options: JSON format](samples/eui-editor/json-format)
- [Options: Read-only editor](samples/eui-editor/readonly)
- [Main features: Toolbar customization](samples/eui-editor/custom-toolbar)
- [Reactive forms: Reactive forms](samples/eui-editor/reactive-forms)
- [Reactive forms: Validators](samples/eui-editor/validators)
- [Event handlers: Events](samples/eui-editor/event-handlers)
- [Misc: Modal editor](samples/eui-editor/modal-editor)
- [Misc: Set focus/blur](samples/eui-editor/set-focus-blur)
- [Misc: With eui-card](samples/eui-editor/within-card)
