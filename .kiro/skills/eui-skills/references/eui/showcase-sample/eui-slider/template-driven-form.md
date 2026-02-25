---
description: Binds slider values with ngModel for single and range modes.
id: template-driven-form
---

```html
<div>
    <eui-slider [(ngModel)]="sliderValue"/><br/>
    {{ sliderValue | json }}
    <br/>
    <eui-slider [(ngModel)]="rangeSliderValue" [hasRange]="true" /><br/>
    {{ rangeSliderValue | json }}
</div>
```

```typescript
import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SLIDER, IEuiSliderValues } from '@eui/components/eui-slider';

@Component({
    selector: 'template-driven-form',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_SLIDER,
        JsonPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDrivenFormComponent {

    public sliderValue: IEuiSliderValues = { start: 30 };
    public rangeSliderValue: IEuiSliderValues = { start: 10, end: 90 };
}
```

