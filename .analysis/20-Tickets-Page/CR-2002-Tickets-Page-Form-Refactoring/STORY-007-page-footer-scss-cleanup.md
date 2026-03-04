# STORY-007 — eui-page-footer + SCSS Cleanup

## Scope

1. Replace custom `.save-bar` div with `eui-page-footer` (visible only when `isEditActive`)
2. Footer layout: Reset (left) | Cancel + Save (right)
3. Delete all custom SCSS — leave only `:host { display: block; }`

## eui-page-footer Pattern

```html
@if (isEditActive) {
    <eui-page-footer>
        <div class="eui-u-d-flex eui-u-flex-justify-content-between">
            <div>
                <button euiButton (click)="onResetForm()">
                    {{ 'ticket-detail.footer.reset' | translate }}
                </button>
            </div>
            <div class="eui-u-d-flex eui-u-gap-s">
                <button euiButton euiSecondary (click)="toggleEditMode()">
                    {{ 'ticket-detail.footer.cancel' | translate }}
                </button>
                <button euiButton euiPrimary (click)="saveChanges()" [attr.aria-busy]="isSaving">
                    {{ 'ticket-detail.footer.save' | translate }}
                </button>
            </div>
        </div>
    </eui-page-footer>
}
```

Note: `eui-page-footer` must be a direct child of `eui-page`, after `eui-page-content`.

## SCSS Cleanup

Delete all classes. Final SCSS:
```scss
:host {
    display: block;
}
```

## Tests

- Footer visible when isEditActive is true
- Footer hidden when isEditActive is false
- Reset button resets form to ticket values
- Cancel button toggles edit mode off
- Save button calls saveChanges
