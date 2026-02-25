# eui-popover

## Overview

<p class="eui-u-text-paragraph"> A popover is a non-modal dialog used to display contextual information paired with a clickable trigger element.
It can contain rich Html information like tabs and technically any eUI component which should be contextual, useful, and nonessential.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | title | string | - |
| Input | position | EuiPopoverPosition | 'bottom' |
| Input | width | string | null |
| Input | hasBackDrop | boolean | false |
| Input | hasCloseButton | boolean | true |
| Input | isDismissable | boolean | true |
| Input | hasNoContentPadding | boolean | false |
| Output | outsideClick | unknown | new EventEmitter() |
| Output | popoverOpen | unknown | new EventEmitter() |
| Output | popoverClose | unknown | new EventEmitter() |

## Host Directives

| Host Directive | Inputs |
| --- | --- |
| BaseStatesDirective | euiSizeS, euiSizeM, euiSizeL, euiSizeXL, euiSize2XL, euiSizeAuto, euiSizeVariant |

## Samples

### [Default](samples/eui-popover/Default)

```html
<button euiButton euiRounded euiBasicButton euiIconButton euiSizeS aria-label="Popover Icon Button" (click)="openPopover($event)">
    <eui-icon-svg icon="eui-circle-fill" size="m" fillColor="secondary"></eui-icon-svg>
</button>
<eui-popover #popover [title]="'This is popover title'">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus corporis commodi.
</eui-popover>
```

```typescript
import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON],
})
export class DefaultComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }
}
```

### Other examples

- [Variants: Sizes](samples/eui-popover/size)
- [Options: Custom width](samples/eui-popover/custom-width)
- [Options: No close button](samples/eui-popover/no-close-button)
- [Options: Position](samples/eui-popover/position)
- [Options: Types](samples/eui-popover/types)
- [Main features: isDismissable](samples/eui-popover/is-dismissable)
- [Main features: Open to other target](samples/eui-popover/open-to-other-target)
- [Events handlers: Events](samples/eui-popover/event-handlers)
- [Misc: Async content](samples/eui-popover/async-content)
- [Misc: In overflowed area](samples/eui-popover/in-overflowed-area)
- [Misc: With eui-card](samples/eui-popover/with-eui-card)
- [Misc: With eui-dialog](samples/eui-popover/with-eui-dialog)
- [Misc: With eui-tabs](samples/eui-popover/with-eui-tabs)

## Accessibility

<code class="eui-u-text-code">eui-popover</code> is an overlay triggered by an element (typically a button or button-icon) programmatically.
The developers need to make sure that the trigger is an accessible element that can be focused and be part of the tab sequence. Upon pressing the Enter key the trigger should be able to call the <code class="eui-u-text-code">openPopover()</code> function from the component's API as shown on our samples
<a href="https://eui.ecdevops.eu/eui-showcase-ux-components-21.x/style-guide/components/eui-popover#samples" target="_blank">here</a>.<br>
The overlay that opens consists of a header with a title which is a string that can be passed as an Input property and it is announced to the screen reader users as static text content.
The close button(if used) is an <code class="eui-u-text-code">euiIconButton</code> which is announced to the screen reader users through the <code class="eui-u-text-code">aria-label</code> attribute as "Close Icon Button". <br>
Regarding the content developers need to make sure that the projected content is both accessible by keyboard and that it is announced properly to the screen reader users.

<div class="doc-sample-section-title">Keyboard interaction</div>
Once the overlay opens the first focusable element gets focused and the key focus is trapped within the overlay region, which means that <strong>Tab</strong> and <strong>Shift+Tab</strong> will not leave the overlay. To exit the overlay region either press the <code class="eui-u-text-code">close icon-button</code> or the <strong>Esc</strong> key. Upon destruction, the focus will return to the previous active element(the popover trigger in this case).
<!-- LEFT blank showcase central link provided in showcase doc-page component -->
