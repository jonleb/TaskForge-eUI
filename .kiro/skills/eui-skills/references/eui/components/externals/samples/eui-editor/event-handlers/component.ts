import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EuiEditorModule } from '@eui/components/externals/eui-editor';

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        EuiEditorModule,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_BADGE,
    ],
})
export class EventHandlersComponent implements OnInit {

    public emptyContent = '';
    public placeholder = 'Compose an epic...';

    public form: FormGroup;
    public editorValue: any;
    public isConsoleLogActive = false;

    ngOnInit(): void {
        this.form = new FormGroup({
            htmlContent: new FormControl<string>(this.emptyContent, [Validators.required]),
        });
    }

    public onEditorCreate(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('editorCreate event:', event);
        }
    }

    public onEditorChange(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('editorChange event:', event);
        }
    }

    public onContentChange(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('contentChange event:', event);
        }
    }

    public onSelectionChange(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('selectionChange event:', event);
        }
    }

    public onFocus(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('focus event:', event);
        }
    }

    public onBlur(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('blur event:', event);
        }
    }

    public onCharactersCountChange(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('charactersCountChange event:', event);
        }
    }

    public onWordsCountChange(event: any): void {
        if (this.isConsoleLogActive) {
            console.log('wordsCountChange event:', event);
        }
    }

    public toggleConsoleLog(): void {
        this.isConsoleLogActive = !this.isConsoleLogActive;
    }
}
