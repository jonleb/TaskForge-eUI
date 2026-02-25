import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

import QuillType from 'quill';

@Component({
    // eslint-disable-next-line
    selector: 'focus-editor1',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_CARD,
        ...EUI_BUTTON
    ],
})
export class FocusEditor1Component implements OnInit {
    htmlContent = `<h3 class="eui-u-text-h3">Et harum <strong>quidem </strong><strong style="color: rgb(230, 0, 0);">rerum </strong><strong>facilis</strong>
    est et expedita distinctio.</h3><p class="eui-u-text-paragraph"><br></p><p class="eui-u-text-paragraph">At vero eos et <strong style="color: rgb(230, 0, 0);">accusamus </strong>et iusto odio
    dignissimos ducimus qui <strong>blanditiis </strong>praesentium voluptatum deleniti atque corrupti quos dolores et <u>quas molestias
    excepturi</u> sint occaecati cupiditate non provident, similique sunt in <strong style="color: rgb(230, 0, 0);">culpa </strong>qui
    officia deserunt mollitia animi, id est <strong>laborum </strong>et dolorum fuga.</p>`;
    placeholder = 'Compose an epic...';

    form: FormGroup;
    editor: QuillType;
    isFocused = false;

    @Output() editorCreate = new EventEmitter<QuillType>();

    ngOnInit() {
        this.form = new FormGroup({
            editorContent: new FormControl<string>(this.htmlContent),
        });
    }

    public onEditorCreate(editor: QuillType) {
        this.editor = editor;
        this.editorCreate.emit(this.editor);
    }

    public setFocus() {
        this.editor.focus();
        this.isFocused = !this.isFocused;
    }
}
