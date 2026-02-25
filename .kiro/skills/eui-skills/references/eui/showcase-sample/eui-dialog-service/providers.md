---
description: Passes a local injector so injected dialog components can access component-level providers.
id: providers
---

```html
<button euiButton type="button" (click)="openWithService()" aria-haspopup="dialog">Open Dialog</button>
```

```typescript
import { Component, Injector, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from "@eui/components/eui-button";

import { FakeService } from './service';
import { DummyBodyWithProvidersServiceComponent } from '../../dummy-components/dummy-body-with-providers-service-component';

@Component({
    selector: 'providers-service',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
    ],
    providers: [
        FakeService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvidersServiceComponent implements OnInit {

    private euiDialogService = inject(EuiDialogService);
    private fakeService = inject(FakeService);
    private injector = inject(Injector);

    ngOnInit(): void {
        this.fakeService.fake();
    }

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            bodyComponent: {
                component: DummyBodyWithProvidersServiceComponent,
            },
        });

        this.euiDialogService.openDialog(config, this.injector);
    }

}
```

```typescript
import { Injectable } from "@angular/core";

@Injectable()
export class FakeService {
    public readonly id: number;

    constructor() {
        this.id = Math.floor(Math.random() * 1000);
        console.log("FakeService instance created with id =", this.id);
    }

    fake(): void {
        console.log("fake() called from instance", this.id);
    }
}
```

