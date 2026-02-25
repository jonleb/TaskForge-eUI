---
description: Shows how to block interaction on a card and a nested section, including focus management and ARIA labeling while toggling the blocked state.
id: Default
---

```html
<eui-block-content [isBlocked]="isBlocked">
    <eui-card>
        <eui-card-header>
            <eui-card-header-title>Information</eui-card-header-title>
        </eui-card-header>
        <eui-card-content>
            <input euiInputText (keyup.enter)="onDataSubmit()" aria-label="Block content Input field"> Hit <code class="eui-u-text-code">Enter</code> while typing to block content for 1 second or use button below

            <eui-block-content role="presentation" ariaLabel="Nested block" [isBlocked]="isNestedBlocked">
                <eui-card class="eui-u-mt-xl">
                    <eui-card-header>
                        <eui-card-header-title><strong>Nested content</strong></eui-card-header-title>
                    </eui-card-header>
                    <eui-card-content>
                        Nested content can also be subject to block document...
                    </eui-card-content>
                </eui-card>
            </eui-block-content>

        </eui-card-content>
    </eui-card>
</eui-block-content>

<br>

<div class="row">
    <div class="col">
        <button euiButton euiPrimary (click)="onBlockContent()">
            @if (isBlocked) {
                <span>Unblock Content</span>
            }
            @if (!isBlocked) {
                <span>Block Content</span>
            }
        </button>
    </div>
    <div class="col">
        <button euiButton euiPrimary euiOutline (click)="onBlockNestedContent()">
            @if (isNestedBlocked) {
                <span>Unblock nested Content</span>
            }
            @if (!isNestedBlocked) {
                <span>Block nested Content</span>
            }
        </button>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BLOCK_CONTENT } from '@eui/components/eui-block-content';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BLOCK_CONTENT,
        ...EUI_INPUT_TEXT,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
    isBlocked = false;
    isNestedBlocked = false;

    onDataSubmit(): void {
        this.isBlocked = !this.isBlocked;
        setTimeout(() => {
            this.isBlocked = !this.isBlocked;
        }, 1000);
    }

    onBlockContent(): void {
        this.isBlocked = !this.isBlocked;
    }

    onBlockNestedContent(): void {
        this.isNestedBlocked = !this.isNestedBlocked;
    }
}
```

