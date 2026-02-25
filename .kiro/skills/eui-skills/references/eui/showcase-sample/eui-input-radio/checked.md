---
description: Shows radio buttons with the checked attribute to pre-select a specific option within a radio group.
id: checked
---

```html
<input euiInputRadio
       id="checked-value1"
       name="radioChecked"
       value="value1" />
<label euiLabel for="checked-value1">Radio 1</label>

<input euiInputRadio
       id="checked-value2"
       name="radioChecked"
       value="value2"
       checked />
<label euiLabel for="checked-value2">Radio 2</label>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';


@Component({
    // tslint:disable-next-line
    selector: 'checked',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_RADIO],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckedComponent {

}
```

