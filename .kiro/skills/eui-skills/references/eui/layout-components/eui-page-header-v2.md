# eui-page-header-v2

## Overview

The <code class="eui-u-text-code">eui-page-header</code> (TODO)

<!-- <p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-page-header</code> supports the following input options :</p>
<div class="eui-u-ml-m">
    <ul>
        <li><strong>label</strong> : this is the main page title</li>
        <li><strong>subLabel</strong> : this is the optional page sub-title</li>
        <li><strong>labelTooltip</strong> : this is optional tooltip text for the page title</li>
        <li><strong>subLabelTooltip</strong> : this is optional tooltip text for the page sub-title</li>
        <li><strong>isCollapsible</strong> <sup>1</sup>: allows collapsible custom header body content: true | false (default)</li>
        <li><strong>isCollapsed</strong> <sup>1</sup> : is the state fo the collapsible option: true | false (default)</li>
        <li><strong>isHeaderMultilines</strong> : optional - (default: false) allows to display the page header title and optional subtitle on multiple lines (not truncated)</li>
        <li><strong>collapsedLabel</strong> : optional - the label to display as tooltip text when hovering on the collapse trigger icon</li>
        <li><strong>expandedLabel</strong> : optional - the label to display as tooltip text when hovering on the expanded trigger icon</li>
    </ul>
</div>
<br>
<sup>(1)</sup> Displays custom content by using the <code class="eui-u-text-code">eui-page-header-body</code> template directive.
 -->

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | label | unknown | - |
| Input | subLabel | unknown | - |
| Input | labelTooltip | unknown | - |
| Input | subLabelTooltip | unknown | - |
| Input | isCollapsible | boolean | false |
| Input | isCollapsed | boolean | false |
| Input | isHeaderMultilines | boolean | false |
| Input | collapsedLabel | string | '' |
| Input | expandedLabel | string | '' |
| Output | collapse | unknown | new EventEmitter<boolean>() |

## Samples

### [Default](samples/eui-page-header-v2/default)

```html
<p class="eui-u-text-paragraph">The page title is <strong>mandatory</strong>. Page sub-title is optional.</p>

<eui-page-header>
    <eui-page-header-label>Label</eui-page-header-label>
    <eui-page-header-sub-label>Sub label</eui-page-header-sub-label>
</eui-page-header>
```

```typescript
import { Component } from '@angular/core';
import { EUI_PAGE } from '@eui/components/eui-page-v2';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PAGE,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Main features: Action items](samples/eui-page-header-v2/action-items)
- [Options: isCollapsible](samples/eui-page-header-v2/collapsible)
- [Options: Label & subLabel](samples/eui-page-header-v2/label-sublabel)
- [Main features: Custom content](samples/eui-page-header-v2/custom-content)
- [Misc: With eui-tooltip](samples/eui-page-header-v2/with-tooltip)

## Accessibility

<eui-alert>
    <eui-alert-title>N/A</eui-alert-title>
    this component has no interaction, it's a plain container used for rendering
</eui-alert>
