# ecl-popover

## Overview

A Popover can be used to display some content on top of another.
<br>
<more-info componentPartUrl="popover/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<div style="text-align: right;max-width: 65ch;">
    <ecl-popover>
        <button eclPopoverToggle eclButton variant="ghost" aria-controls="popover-example1">
            <ecl-icon icon="share" size="m" aria-label="Popover toggle">
            </ecl-icon>
            <span eclButtonLabel>Popover</span>
        </button>

        <div eclPopoverContent>
            Nulla est ad excepteur sint officia fugiat aute commodo ullamco amet culpa eiusmod labore. Esse nostrud
            aliqua pariatur
            pariatur officia non laboris cillum velit dolore in sit laboris fugiat.
        </div>
    </ecl-popover>
</div>
<p class="ecl-u-type-paragraph-m">Ullamco nulla eiusmod do eu nisi anim adipisicing eiusmod quis. Commodo dolore
    reprehenderit culpa consequat ex ullamco esse. Deserunt occaecat ipsum non commodo ullamco aute labore deserunt.
    Laborum proident qui laborum ipsum velit anim aliquip. Exercitation nostrud elit nulla et proident occaecat nostrud
    officia quis elit eiusmod labore non aute. Reprehenderit duis aliqua reprehenderit nostrud. Mollit deserunt elit
    incididunt exercitation do magna mollit ex. Labore laboris labore sunt incididunt et voluptate duis duis amet.
    Aliquip occaecat sunt proident laboris. Ea ullamco officia ullamco elit nisi do in magna tempor dolor. Velit est
    elit minim et sint in elit occaecat voluptate reprehenderit veniam. Laborum nostrud cillum consectetur dolore
    commodo ut aliqua consequat quis ea quis fugiat exercitation irure. In aute amet nisi proident ipsum labore ad
    reprehenderit do ut. Dolore ea culpa exercitation duis aliqua mollit aute eiusmod irure. Incididunt tempor sit
    labore anim amet ut nostrud fugiat non cupidatat esse duis aliquip. Nisi sint veniam tempor excepteur ea ut sunt
    sunt laborum ullamco aute pariatur ipsum. Sint labore eiusmod irure cupidatat Lorem pariatur laborum anim eu eu
    cupidatat tempor pariatur nostrud. Qui laboris ipsum exercitation sunt cillum dolor magna excepteur dolor ipsum
    dolor culpa pariatur tempor. Excepteur voluptate duis reprehenderit magna nulla do sunt. Quis proident pariatur
    proident esse irure aliquip amet.</p>
<div class="eui-u-mr-4xl eui-u-ml-4xl">
    <ecl-popover>
        <button eclPopoverToggle eclButton variant="ghost" aria-controls="popover-example2">
            <ecl-icon icon="share" size="m" aria-label="Popover toggle">
            </ecl-icon>
            <span eclButtonLabel>Popover</span>
        </button>

        <div eclPopoverContent>
            Nulla est ad excepteur sint officia fugiat aute commodo ullamco amet culpa eiusmod labore. Esse nostrud
            aliqua pariatur
            pariatur officia non laboris cillum velit dolore in sit laboris fugiat.
        </div>
    </ecl-popover>
</div>

<p class="ecl-u-type-paragraph-m">Ullamco nulla eiusmod do eu nisi anim adipisicing eiusmod quis. Commodo dolore
    reprehenderit culpa consequat ex ullamco esse. Deserunt occaecat ipsum non commodo ullamco aute labore deserunt.
    Laborum proident qui laborum ipsum velit anim aliquip. Exercitation nostrud elit nulla et proident occaecat nostrud
    officia quis elit eiusmod labore non aute. Reprehenderit duis aliqua reprehenderit nostrud. Mollit deserunt elit
    incididunt exercitation do magna mollit ex. Labore laboris labore sunt incididunt et voluptate duis duis amet.
    Aliquip occaecat sunt proident laboris. Ea ullamco officia ullamco elit nisi do in magna tempor dolor. Velit est
    elit minim et sint in elit occaecat voluptate reprehenderit veniam. Laborum nostrud cillum consectetur dolore
    commodo ut aliqua consequat quis ea quis fugiat exercitation irure. In aute amet nisi proident ipsum labore ad
    reprehenderit do ut. Dolore ea culpa exercitation duis aliqua mollit aute eiusmod irure. Incididunt tempor sit
    labore anim amet ut nostrud fugiat non cupidatat esse duis aliquip. Nisi sint veniam tempor excepteur ea ut sunt
    sunt laborum ullamco aute pariatur ipsum. Sint labore eiusmod irure cupidatat Lorem pariatur laborum anim eu eu
    cupidatat tempor pariatur nostrud. Qui laboris ipsum exercitation sunt cillum dolor magna excepteur dolor ipsum
    dolor culpa pariatur tempor. Excepteur voluptate duis reprehenderit magna nulla do sunt. Quis proident pariatur
    proident esse irure aliquip amet.</p>
<div class="ecl-u-d-inline-flex">
    <ecl-popover>
        <button eclPopoverToggle eclButton variant="ghost">
            <ecl-icon icon="share" size="m" aria-label="Popover toggle">
            </ecl-icon>
            <span eclButtonLabel>Popover</span>
        </button>

        <div eclPopoverContent>
            Nulla est ad excepteur sint officia fugiat aute commodo ullamco amet culpa eiusmod labore. Esse nostrud
            aliqua pariatur
            pariatur officia non laboris cillum velit dolore in sit laboris fugiat.
        </div>
    </ecl-popover>
</div>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_POPOVER } from '@eui/ecl/components/ecl-popover';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BUTTON, ...EUI_ECL_ICON, ...EUI_ECL_POPOVER],
})
export class DefaultComponent {}
```
