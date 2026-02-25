# eui-fieldset

## Overview

<p class="eui-u-text-paragraph">
    The eui-fieldset component is used to group content in forms, lists and layouts and can be collapsed/expanded to enhance overall layout structure visibility and organization.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | e2eAttr | string | 'eui-fieldset' |
| Input | id | string | - |
| Input | label | string | - |
| Input | iconClass | string | - |
| Input | iconSvgName | string | - |
| Input | iconSvgFillColor | string | - |
| Input | hasDefaultIcon | boolean | false |
| Input | isExpandable | boolean | false |
| Input | isExpanded | boolean | true |
| Input | hasLeftExpander | boolean | false |
| Input | isLarge | boolean | false |
| Input | isFirst | boolean | false |
| Output | expand | EventEmitter<string> | new EventEmitter() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiPrimary, euiSecondary, euiSuccess, euiInfo, euiWarning, euiDanger, euiVariant, euiHighlighted |

## Samples

### [Default](samples/eui-fieldset/default)

```html
<eui-fieldset label="Fieldset label">
    <p class="eui-u-text-paragraph">
        fieldset content
    </p>
</eui-fieldset>
```

```typescript
import { Component } from '@angular/core';

import { EUI_FIELDSET } from "@eui/components/eui-fieldset";

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_FIELDSET],
})
export class DefaultComponent {
    isEditActive = false;

    onEdit(event: any) {
        this.isEditActive = !this.isEditActive;
    }

    onSave(event: any) {
        this.isEditActive = !this.isEditActive;
    }

    onCancel(event: any) {
        this.isEditActive = !this.isEditActive;
    }
}
```

### Other examples

- [Variants: Colors](samples/eui-fieldset/colors)
- [Options: hasDefaultIcon](samples/eui-fieldset/default-icon)
- [Options: iconSvgFillColor](samples/eui-fieldset/svg-fill-colors)
- [Options: iconSvgName](samples/eui-fieldset/svg-name)
- [Options: isExpandable](samples/eui-fieldset/isExpandable)
- [Options: isExpanded](samples/eui-fieldset/isExpandable-isExpanded)
- [Misc: Editable state](samples/eui-fieldset/editable-state)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-fieldset</code> is accessible when isExpandable option is used.</p>
The expand/collapse <code class="eui-u-text-code">euiIcon</code> is announced due to the <code class="eui-u-text-code">[aria-label]="isCollapsed? 'Expanded...': 'Collapsed...'"</code>.

<div class="doc-sample-section-title">Keyboard interaction</div>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact">
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><kbd class="eui-u-text-kbd">Enter / Spacebar</kbd></td>
            <td>Expands/collapses the fieldset contents</td>
        <tr>
            <td><kbd class="eui-u-text-kbd">Tab</kbd></td>
            <td>Goes to next targettable element</td>
        </tr>
    </tbody>
</table>

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
