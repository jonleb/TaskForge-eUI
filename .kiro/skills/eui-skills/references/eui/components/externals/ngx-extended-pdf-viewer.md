# ngx-extended-pdf-viewer

## Overview

<code class="eui-u-text-code">ngx-extended-pdf-viewer</code> is a third party library that provides an embeddable PDF viewer that strongly resembles the PDF viewer of your browser.<br>
<p class="eui-u-text-paragraph">It supports the four most current versions of Angular and thus the minimum required Angular version is Angular 12. For more information please check <a href="https://www.npmjs.com/package/ngx-extended-pdf-viewer/v/15.0.5" target="_blank">here</a>.</p>
<p class="eui-u-text-paragraph">For documentation and demos please check <a href="https://pdfviewer.net/extended-pdf-viewer/getting-started" target="_blank">here</a>.</p>

<eui-alert euiWarning>Please bear in mind of the following constrain of this library: As explained by the author <a href="https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/190" target="_blank">here</a> and also <a href="https://stackoverflow.com/questions/68895725/cant-open-multiple-instances-of-ngx-extended-pdf-viewer" target="_blank">here</a> it's not possible to use more than 1 instances of the component on the same page. As he explains, the base library, pdf.js, pollutes the global name space(uses the window scope), that's why there should be only one instance of the PDF viewer at max.</eui-alert>

## Samples

### [Default](samples/ngx-extended-pdf-viewer/Default)

```html
<ngx-extended-pdf-viewer 
    [src]="'assets/test_pdf.pdf'" 
    height="100vh"
    [textLayer]="true"
    [showHandToolButton]="true">
</ngx-extended-pdf-viewer>
```

```typescript
import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
    // tslint:disable-next-line
    selector: 'default-example',
    templateUrl: 'component.html',
    imports: [NgxExtendedPdfViewerModule],
})
export class DefaultComponent {
}
```

### Other examples

- [Misc: Within eui-dialog](samples/ngx-extended-pdf-viewer/within-dialog)
