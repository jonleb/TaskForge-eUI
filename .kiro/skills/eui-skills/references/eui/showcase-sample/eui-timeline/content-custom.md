---
description: Projects custom content inside items (chips, icons, links) instead of the default label/subLabel.
id: content-custom
---

```html
<eui-timeline>
    <eui-timeline-item date="01/06/2020" euiSuccess>
        <eui-chip euiSuccess euiSizeS isSquared><span euiLabel>FINALIZED</span></eui-chip>
        <div class="eui-u-mt-m">Action <strong>REGISTERED</strong> by <strong>John DOE</strong></div>
        <div class="eui-u-flex">
            <eui-icon-svg icon="arrow-bend-down-right:regular" fillColor="success" />
            <span class="eui-u-ml-xs">All features are validated and ready to be registered.</span>
        </div>
    </eui-timeline-item>

    <eui-timeline-item date="01/03/2020" euiDanger>
        <eui-chip euiDanger euiSizeS isSquared><span euiLabel>FINAL VALIDATION</span></eui-chip>
        <div class="eui-u-mt-m">Action <strong>VALIDATED</strong> by <strong>Arena GARCIA</strong></div>
        <div class="eui-u-flex">
            <eui-icon-svg icon="arrow-bend-down-right:regular" fillColor="danger" />
            <span class="eui-u-ml-xs">Please, fill in all the required fields!</span>
        </div>
    </eui-timeline-item>

    <eui-timeline-item date="01/01/2020" euiInfo>
        <eui-chip euiInfo euiSizeS isSquared><span euiLabel>START PROCESS</span></eui-chip>
        <div class="eui-u-mt-m">Action <strong>STARTED</strong> by <strong>Jean DUPONT</strong></div>
    </eui-timeline-item>
</eui-timeline>


<div class="doc-sample-section-title">With links</div>
<eui-timeline>
    <eui-timeline-item date="19 March 2024">
        <div class="eui-u-text-h5"><strong>Item title 1</strong></div>
        <div class="eui-u-text-h6 eui-u-c-text-light">sub label content of the timeline item</div>
        <a class="eui-u-text-link" routerLink=".">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a>
    </eui-timeline-item>

    <eui-timeline-item date="18 March 2024">
        <div class="eui-u-text-h5"><strong>Item title 2</strong></div>
        <div class="eui-u-text-h6 eui-u-c-text-light">sub label content of the timeline item</div>
        <a class="eui-u-text-link-external" href="https://google.com" target="_blank">Morbi facilisis, massa in dignissim interdum, risus urna condimentum ipsum, id molestie lectus orci vel massa. </a>
    </eui-timeline-item>

    <eui-timeline-item date="16 March 2024">
        <div class="eui-u-text-h5"><strong>Item title 3</strong></div>
        <div class="eui-u-text-h6 eui-u-c-text-light">sub label content of the timeline item</div>
        <a class="eui-u-text-link" routerLink=".">Curabitur placerat sit amet libero vitae volutpat. </a>
    </eui-timeline-item>
</eui-timeline>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    selector: 'contentCustom',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE, ...EUI_CHIP, ...EUI_ICON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCustomComponent {
}
```

