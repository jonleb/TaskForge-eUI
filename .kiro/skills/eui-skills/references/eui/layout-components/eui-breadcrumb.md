# eui-breadcrumb

## Overview

<p class="eui-u-text-paragraph">A breadcrumb is a secondary navigation pattern providing an effective visual aid that indicates the location of the user within the website’s hierarchy and enable them to quickly move up to a parent level or previous step.</p>

<p class="eui-u-f-bold eui-u-mt-xl">Service</p>
<p class="eui-u-text-paragraph">The &#64;eui/component layout sub package provides a helper service that can be imported like.</p>
<pre class="eui-u-text-pre"><code class="language-javascript" euiCode>import {{'{'}} EuiBreadcrumbService {{']'}} from '&#64;eui/components/eui-breadcrumb'</code></pre>
<p class="eui-u-text-paragraph"> This service needs to be provided at your app-shell root module. For more information advise the AppShell documentation.</p>
<pre class="eui-u-text-pre"><code class="language-javascript" euiCode>&#64;NgModule({{'{'}}
    imports: [
        CommonModule,
        ...
    ],
    declarations: [
        EuiBreadcrumbService,
    ],
    exports: [
        ...
    ],
{{'}'}})
</code></pre>

<p class="eui-u-f-bold eui-u-mt-xl">Usage</p>
<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">eui-breadcrumb</code> component can be used in 2 ways :</p>
<ul>
    <li>
        <div class="eui-u-m-m">
            at <strong>application (App-Shell) level</strong> : place the <code class="eui-u-text-code">eui-app-breadcrumbs</code> component inside the <code class="eui-u-text-code">eui-app</code> wrapper.
            <pre class="eui-u-text-pre"><code class="language-markup" euiCode>{{code}}</code></pre>
        </div>
    </li>
    <li>
        <div class="eui-u-m-m">
            at <strong>page (layout) level</strong> : use the <code class="eui-u-text-code">eui-page-breadcrumb</code> component inside the <code class="eui-u-text-code">eui-page</code> wrapper.
            <pre class="eui-u-text-pre"><code class="language-markup" euiCode>{{codePage}}</code></pre>
        </div>
    </li>
</ul>

## Samples

### [Default](samples/eui-breadcrumb/Default)

```html
<eui-breadcrumb>
    <eui-breadcrumb-item link="/" iconSvgName="eui-home" ariaLabel="Home"></eui-breadcrumb-item>
    <eui-breadcrumb-item link="/services" label="Services"></eui-breadcrumb-item>
    <eui-breadcrumb-item link="/services/cool" label="Cool Service"></eui-breadcrumb-item>
</eui-breadcrumb>

<eui-breadcrumb>
    <eui-breadcrumb-item link="/" label="Home"></eui-breadcrumb-item>
    <eui-breadcrumb-item link="/services" label="Services"></eui-breadcrumb-item>
    <eui-breadcrumb-item link="/services/cool" label="Cool Service"></eui-breadcrumb-item>
</eui-breadcrumb>
```

```typescript
import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BreadCrumbItem,
    EuiBreadcrumbComponent,
    EUI_BREADCRUMB,
    EuiBreadcrumbService,
} from '@eui/components/eui-breadcrumb';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        CommonModule,
        ...EUI_BREADCRUMB, ...EUI_BUTTON,
    ],
    providers: [
        EuiBreadcrumbService,
    ],
})
export class DefaultComponent {
    @ViewChild('breadCrumbRef', { read: EuiBreadcrumbComponent }) breadCrumbRef: EuiBreadcrumbComponent;
    private counter = 4;

    constructor(public service: EuiBreadcrumbService) {
        this.service.setBreadcrumb([
            { id: '1', label: 'Item 1', link: `/style-guide/layout-components/eui-breadcrumb/route_1` },
            { id: '2', label: 'Item 2', link: `/style-guide/layout-components/eui-breadcrumb/route_2` },
            { id: '3', label: 'Item 3', link: `/style-guide/layout-components/eui-breadcrumb/route_3` },
        ]);
    }

    addLast($event: MouseEvent) {
        // generate Item
        const item = new BreadCrumbItem();
        item.id = `test_${this.counter}`;
        item.label = `Item ${this.counter}`;
        item.link = `/style-guide/layout-components/eui-breadcrumb/route_${this.counter++}`;

        this.service.addCrumb(item);
    }

    removeLast($event: MouseEvent) {
        this.service.removeCrumb();
        if (this.counter > 0) {
            this.counter--;
        }
    }
}
```

### Other examples

- [Options: Navigation extras options](samples/eui-breadcrumb/navigation-extras)
- [Main features: Service usage](samples/eui-breadcrumb/service-usage)
- [Main features: Without link](samples/eui-breadcrumb/without-link)
- [Misc: Service with router](samples/eui-breadcrumb/service-with-router)

## Accessibility

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
