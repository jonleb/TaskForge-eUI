# eui-page-column

## Overview

<p class="eui-u-text-paragraph">
    The <code class="eui-u-text-code">eui-page-columns</code> component allows to structure and organize the <code class="eui-u-text-code">eui-page</code> content in a flexible way by adding interaction in the flow process. 
</p>

<p class="eui-u-text-paragraph">
    It also adds a valuable user experience and consistency when navigating from one page to another.
    For more information regarding the Design Pattern and UX, please refer to the <a class="eui-u-text-link-external" href="https://eui.ecdevops.eu/eui-showcase-ux-patterns-19.x/patterns/page-layout/advanced-page-layout" target="_blank">Advanced page layout pattern</a> documentation.
</p>


<div class="doc-sample-section-title">Anatomy of the page</div>

<p class="eui-u-text-paragraph">
    Page columns are always part of the <code class="eui-u-text-code">eui-page-content</code>, just below the page header.
</p>

<pre class="eui-u-text-pre" tabindex="0">
<code euiCode class="language-markup">&lt;eui-page&gt;
    &lt;eui-page-breadcrumb&gt;...&lt;/eui-page-breadcrumb&gt;
    &lt;eui-page-header&gt;...&lt;/eui-page-header&gt;
    &lt;eui-page-content&gt;
        &lt;eui-page-columns&gt;
            &lt;eui-page-column label="Side column"&gt;...&lt;/eui-page-column&gt;
            &lt;eui-page-column label="Main column"&gt;...&lt;/eui-page-column&gt;
        &lt;/eui-page-columns&gt;
    &lt;/eui-page-content&gt;
    &lt;eui-page-footer&gt;...&lt;/eui-page-footer&gt;
&lt;/eui-page&gt;
</code></pre>

<p class="eui-u-text-paragraph">
    Columns are gathered within the <code class="eui-u-text-code">eui-page-columns</code> wrapper which is mandatory and allows single 
    or multiple columns layout within the <code class="eui-u-text-code">eui-page-content</code>.
</p>

<eui-alert euiWarning>
    Please, be aware that <code class="eui-u-text-code">eui-page-columns</code> cannot be part of a conditional statement such as ngIf! But <code class="eui-u-text-code">eui-page-column</code> can be.
</eui-alert>


<div class="doc-sample-section-title">Structure of a page column</div>

<p class="eui-u-text-paragraph">The structure of an <code class="eui-u-text-code">eui-page-column</code> is composed by the following sections:</p>
<table class="eui-table-default eui-table-default--responsive eui-table-default--bordered eui-table-default--compact eui-u-mt-m">
    <thead>
        <tr>
            <th>Element</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td nowrap><strong>eui-page-column-header</strong></td>
            <td>
                contains the column title (mandatory) and optional sub-title. Column header can be fully customized for left and right content sections to add some extra elements like icon, button, etc.
                In such case, the <strong>eui-page-column-header</strong> is replaced by the <code class="eui-u-text-code">eui-page-column-header-left-content</code> and <code class="eui-u-text-code">eui-page-column-header-right-content</code> tags.
                <br>
                Columns are expandable/collapsible by default and the expand/collapse trigger icon <sup>(1)</sup> is always displayed at the very top right of the column header right container.
            </td>
        </tr>
        <tr>
            <td nowrap><strong>eui-page-column-header-body</strong></td>
            <td>
                optional column header section for extra content which remains sticky when scrolling into the column's content.
            </td>
        </tr>
        <tr>
            <td nowrap><strong>eui-page-column-body</strong></td>
            <td>
                is the mandatory main column body content.
            </td>
        </tr>
        <tr>
            <td nowrap><strong>eui-page-column-footer</strong></td>
            <td>
                optional column footer content with customizable left, middle and right sections.
            </td>
        </tr>
    </tbody>
</table>

<p class="eui-u-text-paragraph">
    <sup>(1)</sup> When the <code class="eui-u-text-code">&lt;eui-page-column [isCollapsible]="true"&gt;</code> option is set.
</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | label | unknown | - |
| Input | subLabel | unknown | - |
| Input | autocloseContainerWidth | number | null |
| Input | expandAriaLabel | string | - |
| Input | collapseAriaLabel | string | - |
| Input | isCollapsible | boolean | false |
| Input | isCollapsed | boolean | false |
| Input | isCollapsedHidden | boolean | false |
| Input | isRightCollapsible | boolean | false |
| Input | isHighlighted | boolean | false |
| Input | isCollapsedWithIcons | boolean | false |
| Input | hasSidebarMenu | boolean | false |
| Input | hasHeaderBodyShrinkable | boolean | false |
| Input | isAutocloseOnContainerResize | boolean | false |
| Input | isAutocloseOnMobile | boolean | false |
| Input | hasSubColumns | boolean | false |
| Output | collapse | unknown | new EventEmitter() |
| Output | headerCollapse | unknown | new EventEmitter() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiSize2XL, euiSize3XL, euiSize4XL, euiSize5XL, euiSize6XL, euiSizeVariant, euiHighlighted |

## Samples

### [Default](samples/eui-page-column/Default)

```html
<p class="eui-u-text-paragraph">
    Columns are gathered within the <code class="eui-u-text-code">eui-page-columns</code> wrapper which is mandatory and allows single
    or multiple columns layout within the <code class="eui-u-text-code">eui-page-content</code>.
</p>

<eui-page>
    <eui-page-content>
        <eui-page-columns>
            <eui-page-column label="Side column title" subLabel="Side column subtitle (optional)" euiSizeVariant="2xl" isCollapsible=true>
                <eui-page-column-header-body>
                    <em>sticky column header body</em>
                </eui-page-column-header-body>

                <eui-page-column-body>
                    <em>column body content</em>
                </eui-page-column-body>
            </eui-page-column>

            <eui-page-column label="Main column title" subLabel="Main column subtitle (optional)">
                <eui-page-column-header-body>
                    <em>This is the optional column header body which remains sticky when scrolling into the column's content</em>
                </eui-page-column-header-body>

                <eui-page-column-body>
                    <eui-showcase-doc-lorem-ipsum textSize="small"></eui-showcase-doc-lorem-ipsum>
                </eui-page-column-body>
            </eui-page-column>

        </eui-page-columns>
    </eui-page-content>
</eui-page>
```

```typescript
import { Component } from '@angular/core';

import { EUI_SHOWCASE } from '@eui/showcase';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    selector: 'default',
    templateUrl: './component.html',
    imports: [...EUI_PAGE, ...EUI_SHOWCASE],
})
export class DefaultComponent {

    public sidebarItems = [
        { label: 'Item 1', url: 'dummy-route-1', iconSvgName: 'eui-state-info', iconTypeClass: "primary" },
        { label: 'Item 2', url: 'dummy-route-2', iconSvgName: 'eui-state-warning', iconTypeClass: "warning" },
        { label: 'Item 3', url: 'dummy-route-3', iconSvgName: 'eui-state-danger', iconTypeClass: "danger" },
        { label: 'Item 4', url: 'dummy-route-4', iconSvgName: 'eui-state-success', iconTypeClass: "success" },
    ];

}
```

### Other examples

- [Variants: Sizes](samples/eui-page-column/sizes)
- [Options: Autoclose on resize](samples/eui-page-column/autoclose)
- [Options: isCollapsed with icons](samples/eui-page-column/collapsed-with-icons)
- [Options: isCollapsed with initials](samples/eui-page-column/collapsed-with-initials)
- [Options: isCollapsible](samples/eui-page-column/collapsible)
- [Main features: Custom header & footer](samples/eui-page-column/custom-header-footer)

## Accessibility

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
