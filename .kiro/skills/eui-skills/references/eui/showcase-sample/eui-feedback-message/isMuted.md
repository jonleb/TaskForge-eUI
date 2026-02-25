---
description: Demonstrates the muted variant, which reduces emphasis and hides the status icon while keeping the state color.
id: isMuted
---

```html
<div euiInputGroup>
	<input euiInputText id="primary-feedback-muted-false" aria-label="Primary feedback muted false" />
	<eui-feedback-message isMuted euiPrimary>This is the <strong>primary</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<input euiInputText id="secondary-feedback-muted-false" aria-label="Secondary feedback muted false" />
	<eui-feedback-message isMuted euiSecondary>This is the <strong>secondary</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<input euiInputText id="info-feedback-muted-false" aria-label="Info feedback muted false" />
	<eui-feedback-message isMuted euiInfo>This is the <strong>info</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<input euiInputText id="success-feedback-muted-false" aria-label="Success feedback muted false" />
	<eui-feedback-message isMuted euiSuccess>This is the <strong>success</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<input euiInputText id="warning-feedback-muted-false" aria-label="Warning feedback muted false" />
	<eui-feedback-message isMuted euiWarning>This is the <strong>warning</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<input euiInputText id="danger-feedback-muted-false" aria-label="Danger feedback muted false" />
	<eui-feedback-message isMuted euiDanger>This is the <strong>danger</strong> feedback message</eui-feedback-message>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_FEEDBACK_MESSAGE } from '@eui/components/eui-feedback-message';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    selector: 'is-muted',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsMutedComponent {
}
```

