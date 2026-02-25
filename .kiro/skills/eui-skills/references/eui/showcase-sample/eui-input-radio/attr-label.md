---
description: Shows proper label association with radio buttons using for/id attributes, including long text labels and different alignment options (eui-u-flex, eui-u-inline-flex, eui-u-display-flex) for top vs center alignment.
id: attr-label
---

```html
<eui-alert>
    <eui-alert-title>Usage recommendation</eui-alert-title>
    Always wrap the <code class="eui-u-text-code">input + label</code> within a <strong>Flexbox div container</strong> by applying the any eUI Flex utility class :
    <ul>
       <li><code class="eui-u-text-code">eui-u-flex</code> and <code class="eui-u-text-code">eui-u-inline-flex</code>: radios are centered aligned</li>
       <li><code class="eui-u-text-code">eui-u-display-flex</code>: radios are top aligned</li>
    </ul>
    See the code source for examples.
</eui-alert>

<br><br>

@for (libelle of state; let i = $index; track $index) {
       <div class="eui-u-display-flex eui-u-mb-s">
           <input euiInputRadio
                  id="customLabel-{{i}}"
                  name="customLabel"
                  [value]="libelle" />
           <label for="customLabel-{{i}}">{{libelle}}</label>
       </div>
}

<div class="eui-u-display-flex eui-u-mb-s">
       <input euiInputRadio id="customLabel-99" name="customLabel" checked="checked" />
       <label for="customLabel-99">{{longText}}</label>
</div>


<div class="doc-sample-section-title">Center aligned radios with long labels</div>
<div class="eui-u-flex">
       <input euiInputRadio
              id="option-value1"
              name="customLabel_long"
              checked="checked"
              value="value1" />
        <label for="option-value1">{{longText}}</label>

       <input euiInputRadio
              id="option-value2"
              name="customLabel_long"
              value="value2" />
        <label for="option-value2">{{longText}}</label>
</div>


<div class="doc-sample-section-title">Top aligned checkboxes with long labels</div>
<div class="eui-u-display-flex eui-u-mb-s">
       <input euiInputRadio
              id="option-value3"
              name="customLabel_long_top"
              checked="checked"
              value="value3" />
       <label for="option-value3">{{longText}}</label>
</div>

<div class="eui-u-display-flex eui-u-mb-s">
       <input euiInputRadio
              id="option-value4"
              name="customLabel_long_top"
              value="value4" />
       <label for="option-value4">{{longText2}}</label>
</div>
```

```typescript
/* eslint-disable max-len */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_ALERT } from '@eui/components/eui-alert';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'attr-label',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_RADIO,
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
    public state: string[] = ['Label 1', 'Label 2'];
    public longText = `Long label - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas tincidunt aliquet. Pellentesque condimentum nec nibh in blandit. In nec tristique magna. Aliquam faucibus rhoncus nibh, id cursus turpis tincidunt id. Aenean a lorem lacus. Morbi mollis nibh nec fermentum consectetur.`;
    public longText2 = `Quisque libero urna, commodo eget libero at, convallis accumsan eros. Vivamus feugiat tempus felis, sed tincidunt eros porta a. Curabitur eget rutrum ipsum, vitae sagittis eros.`;
}
```

