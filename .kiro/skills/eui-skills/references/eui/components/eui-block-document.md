# eui-block-document

## Overview

N/C <br>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isBlocked | boolean | false |

## Samples

### [Default](samples/eui-block-document/Default)

```html
<eui-alert>
This component is declared internally within the <strong>eui-app</strong> component, to interact with it, use te <strong>EuiAppShellService</strong>
<br>
check the code sample here under for more info
</eui-alert><br/>

<button euiButton (click)="blockDocument()">
    Block document (2 sec.)
</button>
```

```typescript
import { Component, inject } from '@angular/core';

import { EuiAppShellService } from '@eui/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    templateUrl: 'component.html',
    selector: 'Default',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ALERT,
    ]
})
export class DefaultComponent {
    private asService: EuiAppShellService = inject(EuiAppShellService);

    blockDocument() {
        this.asService.isBlockDocumentActive = true;
        setTimeout(() => {
            this.asService.isBlockDocumentActive = false;
        }, 2000);
    }
}
```

## Accessibility

<code class="eui-u-text-code">eui-block-document</code> is a <code class="eui-u-text-code">div</code> element that is announced to the screen reader users through <code class="eui-u-text-code">aria-label="eUI Block Document"</code>.
