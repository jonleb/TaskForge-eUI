---
description: Read-only select element with optgroup structure preventing user interaction.
id: readonly
---

```html
<div euiInputGroup>
    <label euiLabel for="readonly-select">Select a dinosaur</label>
    <select euiSelect id="readonly-select" readonly>
        <optgroup label="Theropods">
            <option value="Tyrannosaurus">Tyrannosaurus</option>
            <option value="Velociraptor">Velociraptor</option>
            <option value="Deinonychus">Deinonychus</option>
        </optgroup>
        <optgroup label="Sauropods">
            <option value="Diplodocus">Diplodocus</option>
            <option value="Saltasaurus">Saltasaurus</option>
            <option value="Apatosaurus">Apatosaurus</option>
        </optgroup>
    </select>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';


@Component({
    // tslint:disable-next-line
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT, ...EUI_LABEL, ...EUI_INPUT_GROUP],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadOnlyComponent {
}
```

