import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

import QuillType from 'quill';

import { FocusEditor1Component } from './editor1/component';
import { FocusEditor2Component } from './editor2/component';

@Component({
    // eslint-disable-next-line
    selector: 'set-focus-blur',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_CARD,
        ...EUI_BUTTON,
        FocusEditor1Component,
        FocusEditor2Component,
    ],
})
export class SetFocusBlurComponent {

    editor1: QuillType;
    editor2: QuillType;

    public onEditor1Create(editor: QuillType): void {
        this.editor1 = editor;
    }

    public onEditor2Create(editor: QuillType): void {
        this.editor2 = editor;
    }

    public onFocus1(): void {
        this.editor1.focus();
    }

    public onFocus2(): void {
        this.editor2.focus();
    }

    public onBlur(): void {
        this.editor1.blur();
        this.editor2.blur();
    }
}
