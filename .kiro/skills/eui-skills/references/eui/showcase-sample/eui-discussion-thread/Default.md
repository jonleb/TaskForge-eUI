---
description: Displays a discussion thread from an items array with title/subtitle and multiple message type variants.
id: Default
---

```html
<eui-discussion-thread titleLabel="Title" subTitleLabel="Sub title">
    <eui-discussion-thread-item typeClass="secondary"
                            [isOdd]="false"
                            id="1"
                            date="{{dateToday}}"
                            author="Name Firstname"
                            body="This is the content of the discussion thread item"
                            tooltip="tooltip message" />

    <eui-discussion-thread-item typeClass="secondary"
                            [isOdd]="false"
                            id="2"
                            date="{{dateToday}}"
                            author="Name Firstname"
                            body="This is the content of the discussion thread item"
                            tooltip="tooltip message" />

    <eui-discussion-thread-item typeClass="secondary"
                            [isOdd]="true"
                            id="3"
                            date="{{dateToday}}"
                            author="Name Firstname"
                            body="This is the content of the discussion thread item"
                            tooltip="tooltip message" />

    <eui-discussion-thread-item typeClass="secondary"
                            [isOdd]="true"
                            id="4"
                            date="{{dateToday}}"
                            author="Name Firstname"
                            body="This is the content of the discussion thread item"
                            tooltip="tooltip message" />
</eui-discussion-thread>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_DISCUSSION_THREAD } from "@eui/components/eui-discussion-thread";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DISCUSSION_THREAD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent{

    dateToday: string = new Date('06/08/1987').toISOString();

}
```

