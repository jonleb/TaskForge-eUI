# eui-tree-list

## Overview

N/C <br>

## API

API content

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isShowToolbar | boolean | false |
| Input | isShowToolbarToggle | boolean | true |
| Input | isExpanded | boolean | false |
| Input | hasItemsUrl | boolean | false |
| Input | filterLabel | string | - |
| Input | filterFunction | (params: EuiTreeListFilterParams) | > boolean |
| Input | expandAllLabel | string | - |
| Input | collapseAllLabel | string | - |
| Input | tabindex | string | '0' |
| Input | ariaLabel | string | '' |
| Input | toolbarFilterValue | string | '' |
| Input | e2eAttr | string | 'eui-tree-list' |
| Output | itemSelected | unknown | new EventEmitter<string>() |
| Output | filter | unknown | new EventEmitter<string>() |
| Output | expandAll | unknown | new EventEmitter() |
| Output | collapseAll | unknown | new EventEmitter() |

## Samples

### [Default](samples/eui-tree-list/Default)

```html
<div class="doc-sample-section-title">Basic tree default</div>

<div class="row">
    <div class="col-md-5">
        <eui-tree-list>
            <eui-tree-list-item label="Item 1 - with children">
                <eui-tree-list>
                    <eui-tree-list-item label="Item 1.1 - with children">
                        <eui-tree-list>
                            <eui-tree-list-item
                                label="Item 1.1.1"></eui-tree-list-item>
                            <eui-tree-list-item
                                label="Item 1.1.2"></eui-tree-list-item>
                            <eui-tree-list-item
                                label="Item 1.1.3 - with children">
                            </eui-tree-list-item>
                        </eui-tree-list>
                    </eui-tree-list-item>
                    <eui-tree-list-item label="Item 1.2"></eui-tree-list-item>
                </eui-tree-list>
            </eui-tree-list-item>
            <eui-tree-list-item label="Item 2"></eui-tree-list-item>
            <eui-tree-list-item label="Item 3"></eui-tree-list-item>
        </eui-tree-list>
    </div>
</div>



<div class="doc-sample-section-title">Color variants on eui-tree-list-item</div>

<div class="row">
    <div class="col-md-5">
        <eui-tree-list>
            <eui-tree-list-item euiPrimary label="Primary item"></eui-tree-list-item>
            <eui-tree-list-item euiSecondary label="Secondary item"></eui-tree-list-item>
            <eui-tree-list-item euiInfo label="Info item"></eui-tree-list-item>
            <eui-tree-list-item euiSuccess label="Success item"></eui-tree-list-item>
            <eui-tree-list-item euiWarning label="Warning item"></eui-tree-list-item>
            <eui-tree-list-item euiDanger label="Danger item"></eui-tree-list-item>
        </eui-tree-list>
    </div>
</div>
```

```typescript
import { Component } from "@angular/core";

import { EUI_TREE_LIST } from "@eui/components/eui-tree-list";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_TREE_LIST],
})
export class DefaultComponent {
}
```

### Other examples

- [Options: isExpanded](samples/eui-tree-list/isExpanded)
- [Main features: Custom content](samples/eui-tree-list/extra-content-simple)
- [Main features: Toolbar](samples/eui-tree-list/toolbar)
- [Misc: With eui-card](samples/eui-tree-list/with-card)
