---
description: Demonstrates automatic height adjustment using autoResize property with optional minRows and maxRows constraints, including dynamic toggling and usage within dialogs.
id: auto-resize
---

```typescript
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';


@Component({
    template: `
        <label euiLabel for="form-autoresize">With Form</label>
        <form [formGroup]="form">
            <textarea euiTextArea id="form-autoresize" name="story" autoResize="true"
                      formControlName="control"></textarea>
        </form>
        <br>
        <button euiButton (click)="changeValue()">Change value</button>
    `,
    imports: [
        ReactiveFormsModule,
        ...EUI_BUTTON,
        ...EUI_TEXTAREA,
        ...EUI_LABEL,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent {

    private euiDialogService = inject(EuiDialogService);

    public form: FormGroup = new FormGroup({
        control: new FormControl(`aaaa ` + 'aaaa '.repeat(1000) + 'END'),
    });

    public closeDialog() {
        this.euiDialogService.closeDialog();
    }

    changeValue() {
        this.form.get('control').setValue(this.form.get('control').value + '\n' + Math.random() * 100);
    }
}
```

```html
<div euiInputGroup>
    <label euiLabel for="story-autoresize">Tell us your story</label>
    <textarea euiTextArea id="story-autoresize" name="story" autoResize>It was a dark and stormy night...</textarea>
</div>

<div euiInputGroup>
    <label euiLabel for="form-minrows">With minRows=3</label>
    <textarea euiTextArea id="form-minrows" name="story" autoResize="true" minRows="3">It was a dark and stormy night...</textarea>
</div>

<div euiInputGroup>
    <label euiLabel for="form-maxrows">With maxRows=4</label>
    <textarea euiTextArea id="form-maxrows" name="story" autoResize="true" maxRows="4">It was a dark and stormy night...</textarea>
</div>

<div class="doc-sample-section-title">Dynamically remove/add autoResize</div>
<div euiInputGroup>
    <label euiLabel for="story-autoresize-dyn">Tell us your story</label>
    <textarea euiTextArea id="story-autoresize-dyn" name="story" [autoResize]="state">
It was a dark and stormy night...
    </textarea>
</div>

<br>

<button euiButton euiOutline euiPrimary (click)="changeState()">{{state ? 'Remove':'Add'}} AutoResize</button>


<div class="doc-sample-section-title">Inside dialog</div>
<button euiButton euiOutline euiPrimary (click)="openDialog()">Open Dialog</button>
```

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';

import { BodyComponent } from './body.component';


@Component({
    // tslint:disable-next-line
    selector: 'auto-resize',
    templateUrl: 'component.html',
    imports: [
        ReactiveFormsModule,
        ...EUI_INPUT_GROUP,
        ...EUI_TEXTAREA,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoResizeComponent {

    public state: false | true = true;
    public form: FormGroup = new FormGroup({
        control: new FormControl('It was a dark and stormy night... '.repeat(20) + 'END'),
    });

    private euiDialogService = inject(EuiDialogService);
    private cd = inject(ChangeDetectorRef);

    public openDialog() {
        this.euiDialogService.openDialog(new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: BodyComponent,
                config: {
                    aaa: 1,
                    bbb: 2,
                    onFormValueChange: (values: any) => {
                        this.cd.detectChanges();
                    },
                },
            },
        }));
    }

    public changeState() {
        this.state = !this.state;
    }

    changeValue() {
        this.form.get('control').setValue(this.form.get('control').value + '\n' + Math.random() * 100 );
    }
}
```

