# eui-progress-bar

## Overview

<p class="eui-u-text-paragraph">Progress indicators inform users by providing visual feedback on the duration and progress of a process such as loading an application, submitting a form, downloading or uploading a file, etc.</p>
The <code class="eui-u-text-code">eui-progress-bar</code> component allows the user to check the progress of the process with some extra visual information like process status messages, icons, errors messages, etc.

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-progress-bar' |
| Input | label | string | '' |
| Input | progress | NumberInput | - |
| Input | isIndeterminate | BooleanInput | false |
| Input | hasStatusIcon | BooleanInput | false |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiSize2XS, euiSizeXS, euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiVariant, euiSizeVariant |

## Samples

### [Default](samples/eui-progress-bar/Default)

```html
<p class="eui-u-text-paragraph">Use the <code class="eui-u-text-code">progress</code> input to set the percentage value of the progress indicator (0 - 100).</p>

<div class="doc-sample-section-title">Ongoning progress</div>
<eui-progress-bar [progress]="progress1"></eui-progress-bar>


<div class="doc-sample-section-title">Completed</div>
<eui-progress-bar [progress]="100"></eui-progress-bar>


<div class="doc-sample-section-title">Dynamic changes of inputs</div>
<button euiButton (click)="progress2 = 100">set progress to 100</button>
<br><br>
<eui-progress-bar [progress]="progress2"></eui-progress-bar>

<br><br>

<button euiButton (click)="variant = 'warning'">set to warning</button>
<br><br>
<eui-progress-bar [euiVariant]="variant"></eui-progress-bar>

<br><br>

<button euiButton (click)="statusIcon = true">set statusIcon</button>
<br><br>
<eui-progress-bar label="Progress bar title" [progress]="100" euiWarning [hasStatusIcon]="statusIcon"></eui-progress-bar>

<br><br>

<button euiButton (click)="indeterminate = true">set indeterminate</button>
<br><br>
<eui-progress-bar label="Progress bar title" [progress]="100" [isIndeterminate]="indeterminate"></eui-progress-bar>
```

```typescript
import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR, ...EUI_BUTTON],
})
export class DefaultComponent {
    public progress1 = 50;
    public progress2 = 50;
    public variant = 'primary';
    public statusIcon = false;
    public indeterminate = false;
}
```

### Other examples

- [Variants: Colors](samples/eui-progress-bar/colors)
- [Variants: Sizes](samples/eui-progress-bar/sizes)
- [Options: isIndeterminate](samples/eui-progress-bar/indeterminate)
- [Options: Labels](samples/eui-progress-bar/labels)
- [Options: Status icon](samples/eui-progress-bar/status-icon)
- [Misc: Custom header](samples/eui-progress-bar/custom-header)
- [Misc: Horizontal layout](samples/eui-progress-bar/horizontal-layout)
- [Misc: Service based](samples/eui-progress-bar/service-based)
- [Misc: With card](samples/eui-progress-bar/with-card)
- [Misc: With feedback message](samples/eui-progress-bar/with-feedback-message)
- [Misc: With table](samples/eui-progress-bar/with-table)

## Accessibility

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
