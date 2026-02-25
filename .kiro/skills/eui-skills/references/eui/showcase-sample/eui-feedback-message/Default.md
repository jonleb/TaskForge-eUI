---
description: Shows the default feedback message below a labeled input group.
id: Default
---

```html
<div euiInputGroup>
	<label euiLabel for="default-label">This is the label</label>
	<input euiInputText id="default-label" />
	<eui-feedback-message>This is the default feedback message</eui-feedback-message>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

