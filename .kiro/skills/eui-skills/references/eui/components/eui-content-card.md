# eui-content-card

## Overview

TODO

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | isSelected | boolean | false |
| Input | isSelectable | boolean | false |
| Input | isCollapsible | boolean | false |
| Input | isCollapsed | boolean | false |
| Input | isBookmarkable | boolean | false |
| Input | isBookmarked | boolean | false |
| Output | cardSelect | unknown | new EventEmitter<boolean>() |
| Output | cardBookmark | unknown | new EventEmitter<boolean>() |
| Output | cardCollapse | unknown | new EventEmitter<boolean>() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | - |

## Samples

### [Default](samples/eui-content-card/Default)

```html
<eui-content-card>
    <eui-content-card-header>
        <eui-content-card-header-title>
            <a class="eui-u-text-link" href="javascript:void(0)">
                This is a title
            </a>
        </eui-content-card-header-title>
    </eui-content-card-header>

    <eui-content-card-body>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum."
    </eui-content-card-body>
</eui-content-card>
```

```typescript
import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
    ],
})
export class DefaultComponent {

}
```

### Other examples

- [Options: isBookmarkable](samples/eui-content-card/bookmarkable)
- [Options: isCollapsible](samples/eui-content-card/collapsible)
- [Options: isSelectable](samples/eui-content-card/selectable)
- [Main Features: Blocks](samples/eui-content-card/blocks)
- [Main Features: Footer actions](samples/eui-content-card/footer-actions)
- [Main Features: Header metadata](samples/eui-content-card/header-metadata)
- [Main Features: Subtitle](samples/eui-content-card/subtitle)
- [Compositions: Media - Avatar](samples/eui-content-card/media-avatar)
- [Compositions: Media - Date block](samples/eui-content-card/media-dateblock)
- [Compositions: Media - Image](samples/eui-content-card/media-image)
- [Misc: All options](samples/eui-content-card/all-options)

## Accessibility

TODO
