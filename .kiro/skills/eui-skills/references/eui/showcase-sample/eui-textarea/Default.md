---
description: Demonstrates basic textarea usage with euiTextArea directive, including rows/cols configuration, rowsChange event, and integration with euiMaxlength directive for character limits.
id: Default
---

```html
<div euiInputGroup>
    <label euiLabel for="story">Tell us your story</label>
    <textarea (rowsChange)="onRowsChange($event)" euiTextArea id="story" name="story" rows="5" cols="33">It was a dark and stormy night...</textarea>
</div>

Current rows: {{ rows }}


<div class="doc-sample-section-title">With max length defined</div>
<p class="eui-u-text-paragraph">Use the <code class="eui-u-text-code">euiMaxlength</code> directive to set contents size limit</p>

<br>

<div euiInputGroup>
    <label euiLabel for="story_max200">Tell us your story (euiMaxlength=255)</label>
    <textarea euiTextArea id="story_max200" name="story" rows="5" cols="33" [euiMaxlength]="255">It was a dark and stormy night...</textarea>
</div>

<p class="eui-u-text-paragraph">For more dynamic usage samples, please see the reactive forms section.</p>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';


@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_TEXTAREA, ...EUI_INPUT_GROUP, EuiMaxLengthDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
    rows: number = 0;

    onRowsChange(rows: number) {
        this.rows = rows;
    }
}
```

