---
description: Demonstrates long feedback text wrapping naturally across multiple lines.
id: multiple-lines
---

```html
<div class="row">
	<div class="col-md-6">
		<div euiInputGroup>
			<label euiLabel for="default-label-multi">This is the label</label>
			<input euiInputText id="default-label-multi" />
			<eui-feedback-message>
				Feedback messages can be very long and automatically displayed on <strong>multiple lines</strong>.
				This is the default feedback message.
			</eui-feedback-message>
		</div>
	</div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";

@Component({
    selector: 'multiple-lines',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleLinesComponent {
}
```

