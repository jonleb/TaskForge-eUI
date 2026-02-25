---
description: Shows the thread inside a dialog and adds messages through a form with a message type selector.
id: content-modal
---

```html
<!-- EXCLUDE_START -->
<button euiButton euiPrimary (click)="onDialogOpen()">Open dialog</button>

<eui-dialog #dialog [title]="'Discussion Thread'" (close)="onDialogClose()">

    <eui-discussion-thread titleLabel="Title" subTitleLabel="Sub title" [items]="messagesModal" />

    <eui-dialog-footer>
        <form [formGroup]="formValidation">
            <div class="eui-u-flex">
                <div class="eui-u-flex">
                    <input euiInputText formControlName="inputMessage" placeholder="Your comment here"/>
                </div>
                <div class="eui-u-flex eui-u-ml-m">
                    <select euiSelect formControlName="selectValue" placeholder="Message type">
                        @for (option of selectOptions; track $index) {
                            <option [ngValue]="option.id" [selected]="option.selected">{{option.value}}</option>
                        }
                    </select>
                    <button euiButton euiPrimary (click)="onFormSubmit($event)" class="eui-u-ml-s">
                        <eui-icon-svg icon="eui-send" size="m" class="eui-u-mr-s" />
                        Send
                    </button>
                </div>
            </div>
        </form>
    </eui-dialog-footer>
</eui-dialog>
<!-- EXCLUDE_START -->
```

```typescript

```

