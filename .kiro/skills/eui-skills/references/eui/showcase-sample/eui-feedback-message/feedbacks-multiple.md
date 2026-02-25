---
description: Shows multiple feedback messages stacked under a single input, mixing default and state variants.
id: feedbacks-multiple
---

```html
<div euiInputGroup>
	<label euiLabel for="multiple-feedbacks">Multiple feedbacks</label>
	<input euiInputText id="multiple-feedbacks" placeholder="Placeholder text..." />

	<eui-feedback-message>This is the default feedback message</eui-feedback-message>
	<eui-feedback-message euiPrimary>This is the <strong>primary</strong> feedback message</eui-feedback-message>
	<eui-feedback-message euiSecondary>This is the <strong>secondary</strong> feedback message</eui-feedback-message>
	<eui-feedback-message euiInfo>This is the <strong>info</strong> feedback message</eui-feedback-message>
	<eui-feedback-message euiSuccess>This is the <strong>success</strong> feedback message</eui-feedback-message>
	<eui-feedback-message euiWarning>This is the <strong>warning</strong> feedback message</eui-feedback-message>
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
    selector: 'feedbacks-multiple',
    templateUrl: 'component.html',
    imports: [
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksMultipleComponent {
}
```

