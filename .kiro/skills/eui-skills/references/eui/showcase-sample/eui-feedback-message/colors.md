---
description: Shows semantic state variants (primary, secondary, info, success, warning, danger) to color feedback messages.
id: colors
---

```html
<div euiInputGroup>
	<label euiLabel for="primary-feedback">Primary feedback</label>
	<input euiInputText id="primary-feedback" />
	<eui-feedback-message euiPrimary>This is the <strong>primary</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<label euiLabel for="secondary-feedback">Secondary feedback</label>
	<input euiInputText id="secondary-feedback" />
	<eui-feedback-message euiSecondary>This is the <strong>secondary</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<label euiLabel for="info-feedback">Info feedback</label>
	<input euiInputText id="info-feedback" />
	<eui-feedback-message euiInfo>This is the <strong>info</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<label euiLabel for="success-feedback">Success feedback</label>
	<input euiInputText id="success-feedback" />
	<eui-feedback-message euiSuccess>This is the <strong>success</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<label euiLabel for="warning-feedback">Warning feedback</label>
	<input euiInputText id="warning-feedback" />
	<eui-feedback-message euiWarning>This is the <strong>warning</strong> feedback message</eui-feedback-message>
</div>
<div euiInputGroup>
	<label euiLabel for="danger-feedback">Danger feedback</label>
	<input euiInputText id="danger-feedback" />
	<eui-feedback-message euiDanger>This is the <strong>danger</strong> feedback message</eui-feedback-message>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    selector: 'type',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

