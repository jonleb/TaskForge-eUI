# eui-growl

## Overview

<eui-alert>
    This component is declared internally within the <strong>eui-app</strong> component, to interact with it, use te <strong>EuiGrowlService</strong>
    <br>
    Check the code here in the examples for more info
</eui-alert>
<br>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | sticky | boolean | false |
| Input | life | number | 3000 |
| Input | value | EuiGrowlMessage[] | [] |
| Input | closeAllSticky | boolean | false |
| Input | position | string | - |
| Input | callback | () | > void = null |
| Output | growlClick | EventEmitter<void> | new EventEmitter<void>() |
| Output | growlClose | EventEmitter<void> | new EventEmitter<void>() |

## Samples

### [Default](samples/eui-growl/Default)

```html
<div class="eui-u-flex">
    <button euiButton euiInfo euiSizeS (click)="showGrowl('info')">Info growl</button>
    <button euiButton euiSuccess euiSizeS (click)="showGrowl('success')" class="eui-u-ml-s">Success growl</button>
    <button euiButton euiWarning euiSizeS (click)="showGrowl('warning')" class="eui-u-ml-s">Warning growl</button>
    <button euiButton euiDanger euiSizeS (click)="showGrowl('danger')" class="eui-u-ml-s">Danger growl</button>
</div>
```

```typescript
import { Component } from "@angular/core";

import { EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
    ],
})
export class DefaultComponent {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    summaryTitle = 'Summary title';

    constructor(
        private euiGrowlService: EuiGrowlService,
    ) { }

    public showGrowl(type: string, summary?: string, inputMessage: string = 'Message details') {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl({
            severity: type,
            summary: summary || this.summaryTitle,
            detail: inputMessage },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }
}
```

### Other examples

- [Variants: Specific Content](samples/eui-growl/specific-content)
- [Main Features: Filled Growl](samples/eui-growl/filled-growl)
- [Event Handlers: Event callback](samples/eui-growl/event-callback)
- [Composition: Calling from modal](samples/eui-growl/from-modal)

## Accessibility

<code class="eui-u-text-code">eui-growl</code> has a <code class="eui-u-text-code">role="status"</code> which is intended for non-modal, dynamically updated regions that provide advisory information to the user, such as notifications. Growl messages are typically transient, non-intrusive notifications that inform users of events or updates, which matches the purpose of the status role. They are announced politely by assistive technologies (like screen readers) without interrupting the user's current task. <br>
That's why it has also been given an <code class="eui-u-text-code">aria-live="polite"</code> attribute, in order for the assistive technologies to announce any dynamic changes happening in the live region that are important for the user to receive. The screen reader will announce changes whenever the user is idle. The aria-live attribute can be changed through the <code class="eui-u-text-code">ariaLive</code> input property, which can be set to <code class="eui-u-text-code">off</code>, <code class="eui-u-text-code">polite</code>, or <code class="eui-u-text-code">assertive</code>. <br>
The <code class="eui-u-text-code">assertive</code> value indicates that the growl message should be announced immediately, interrupting the user's current task. This could be useful for critical notifications that require immediate attention, but using this value is not recommended for growl messages, as it can interrupt the user and cause frustration. More info <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live">here</a>. <br>
The title of the growl message is announced by the screen reader through the <code class="eui-u-text-code">aria-labelledby</code> attribute, which is set to the title of the growl message. The content of the growl message is announced through the <code class="eui-u-text-code">aria-describedby</code> attribute, which is set to the content of the growl message. <br>
The growl messages are announced in the order they are added, and the screen reader will announce the most recent message first. This is because the growl messages are added to the top of the list, and the screen reader will announce the first message in the list first. <br>
The growl messages can be dismissed by the user through the close icon, which has an <code class="eui-u-text-code">aria-label</code> attribute set to "Close growl icon". This allows the user to dismiss the growl message without having to navigate to it. The close icon is also focusable, so the user can navigate to it using the keyboard. <br>
