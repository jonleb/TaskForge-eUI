# eui-accordion

## Overview

<p class="eui-u-text-paragraph">
    An accordion is a vertically stacked list of headers that reveal or hide associated sections of content.
</p>
<p class="eui-u-text-paragraph">
    The <strong>eui-accordion</strong> component distributes large amounts of content in a small space using a progressively expandable display.
    <br>
    The title provides the user with a general overview of the content, allowing them to choose which sections to read.
    <br>
    Accordions can optimize information processing and discovery. However, they obscure content from users, and it is important to consider the risk that a user may not notice or read all of the included content.
</p>

<p class="eui-u-text-h5">
    Usage
</p>
<ul>
    <li>To organize related information.</li>
    <li>To shorten pages and reduce scrolling when content is not crucial to read in full.</li>
    <li>When space is at a premium and long content cannot be displayed all at once, like on a mobile interface or in a side panel.</li>
    <li>When having large amounts of nested information, consider using the <a routerLink="/style-guide/components/eui-tree" class="eui-u-text-link">eui-tree</a>
    or <a routerLink="/style-guide/components/eui-tree-list" class="eui-u-text-link">eui-tree-list</a> components instead.
    </li>
</ul>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| CdkAccordion | multi: isMulti |

## Samples

### [Default](samples/eui-accordion/_default)

```html
<div class="row">
    <div class="col-md-8 col-lg-6">
        <eui-accordion>
            <eui-accordion-item>
                <eui-accordion-item-header>Item 1</eui-accordion-item-header>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </eui-accordion-item>

            <eui-accordion-item>
                <eui-accordion-item-header>Item 2</eui-accordion-item-header>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </eui-accordion-item>

            <eui-accordion-item euiDisabled>
                <eui-accordion-item-header>Item 3 - disabled</eui-accordion-item-header>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </eui-accordion-item>
        </eui-accordion>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EUI_ACCORDION } from '@eui/components/eui-accordion';

@Component({
    // eslint-disable-next-line
    selector: 'overview-default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
})
export class OverviewDefaultComponent {
}
```

### Other examples

- [Options: isExpanded](samples/eui-accordion/isExpanded)
- [Options: isMulti](samples/eui-accordion/isMulti)
- [Options: Sizes](samples/eui-accordion/sizes)
- [Event handlers: Events](samples/eui-accordion/event)
- [Composition: Misc compositions](samples/eui-accordion/accordion-compositions)

## Accessibility

<p class="eui-u-text-paragraph">
TODO
</p>
