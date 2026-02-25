# eui-resizable

## Overview

<p class="eui-u-text-paragraph">The <strong>euiResizable</strong> directive allows users to adjust the width of a container by hovering on its right side and click-move to the left or to the right to decrease/increase the size width of the container.
   This can influence the overall page layout and we recommend making sure your app can be fully resizable or constrained to horizontal size changes (responsiveness).
</p>

<eui-alert euiInfo class="eui-u-mv-m">
    <eui-alert-title>Important recommendations</eui-alert-title>
    Use this directive wisely as it can quickly lead to unexpected layout issues.
    This directive is ment to work best with containers having relative position and works best with:
    <div class="eui-u-ml-m">
        <li>tables : add the directive next to the <code class="eui-u-text-code">th</code> element of the table thead section</li>
        <li>columns : add the directive next to the <code class="eui-u-text-code">eui-page-column</code> you want to be resizable</li>
        <li>cards : add the directive next to the <code class="eui-u-text-code">eui-card</code> you want to be resizable</li>
    </div>
    <br>
    Do <strong>NOT override</strong> the <code class="eui-u-text-code">width</code> property on resizabble elements since this is used to dynamically set the element's width.
    If needed, you can use the <code class="eui-u-text-code">max-width</code> property instead.
</eui-alert>

## Samples

### [Default](samples/eui-resizable/Default)

```html
<div class="doc-sample-section-title">Using simple responsive containers</div>

<div class="row">
    <div euiResizable class="col-md-4">
        <p class="eui-u-text-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut volutpat enim. Etiam a mattis tortor. Etiam egestas magna at iaculis malesuada. Etiam vulputate quam at consectetur pharetra.
            Nunc sit amet lectus mattis, aliquam mi quis, iaculis est. Donec nec diam tristique, egestas lorem nec, varius neque. Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt. Phasellus scelerisque tellus eu imperdiet dictum.
        </p>
    </div>
    <div euiResizable class="col-md-4">
        <p class="eui-u-text-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut volutpat enim. Etiam a mattis tortor. Etiam egestas magna at iaculis malesuada. Etiam vulputate quam at consectetur pharetra.
            Nunc sit amet lectus mattis, aliquam mi quis, iaculis est. Donec nec diam tristique, egestas lorem nec, varius neque. Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt. Phasellus scelerisque tellus eu imperdiet dictum.
        </p>
    </div>
    <div euiResizable class="col-md-4">
        <p class="eui-u-text-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut volutpat enim. Etiam a mattis tortor. Etiam egestas magna at iaculis malesuada. Etiam vulputate quam at consectetur pharetra.
            Nunc sit amet lectus mattis, aliquam mi quis, iaculis est. Donec nec diam tristique, egestas lorem nec, varius neque. Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt. Phasellus scelerisque tellus eu imperdiet dictum.
        </p>
    </div>
</div>


<div class="doc-sample-section-title">Using a Flexbox container</div>

<div euiResizable class="eui-u-flex">
    <div class="eui-u-flex-row">
        <p class="eui-u-text-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut volutpat enim. Etiam a mattis tortor. Etiam egestas magna at iaculis malesuada. Etiam vulputate quam at consectetur pharetra.
            Nunc sit amet lectus mattis, aliquam mi quis, iaculis est. Donec nec diam tristique, egestas lorem nec, varius neque. Aenean consequat nisi in sem porttitor, a eleifend lorem tincidunt. Phasellus scelerisque tellus eu imperdiet dictum.
        </p>
        <p class="eui-u-text-paragraph">
            Sed vitae tellus ac nisl facilisis posuere. Mauris cursus dui nec arcu molestie sodales. Morbi vel enim semper, luctus odio vitae, lacinia nisl. Sed sollicitudin ex et nibh bibendum, id blandit nunc pretium. Nunc venenatis eros a leo tincidunt gravida.
            Etiam pulvinar leo sit amet sapien pharetra, porta laoreet tellus consequat.
        </p>
    </div>
</div>
```

```typescript
import { Component } from '@angular/core';

import { EuiResizableDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        EuiResizableDirective,
    ],
})
export class DefaultComponent {
}
```

### Other examples

- [Misc: Cards](samples/eui-resizable/cards)
- [Misc: Page columns](samples/eui-resizable/page-columns)
- [Misc: Tables](samples/eui-resizable/tables)

## Accessibility

<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">euiResizable</code> directive adds an <code class="eui-u-text-code">aria-describedby</code> description that provides screenreaders the information needed to announce the resizable element.
    There are no other interactions available.
</p>
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
