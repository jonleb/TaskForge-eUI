---
description: Size attribute variations showing different visible option counts and multiple selection with size control.
id: size
---

```html
<div class="doc-sample-section-title">Default size 1</div>
<select euiSelect name="framework" size="1" aria-label="Select framework with size 1">
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="ember">Ember.js</option>
    <option value="meteor">Meteor</option>
    <option value="mithril">Mithril</option>
    <option value="node">Node.js</option>
</select>

<div class="doc-sample-section-title">With size 3</div>
<select euiSelect name="framework" size="3" aria-label="Select framework with size 3">
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="ember">Ember.js</option>
    <option value="meteor">Meteor</option>
    <option value="mithril">Mithril</option>
    <option value="node">Node.js</option>
</select>

<div class="doc-sample-section-title">With size 5 and multiple</div>
<select euiSelect name="framework" size="5" multiple aria-label="Select framework with size 5">
    <option value="angular">Angular</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="ember">Ember.js</option>
    <option value="meteor">Meteor</option>
    <option value="mithril">Mithril</option>
    <option value="node">Node.js</option>
</select>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';


@Component({
    // tslint:disable-next-line
    selector: 'size',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeComponent {
}
```

