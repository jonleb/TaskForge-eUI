# ecl-content-block

## Overview

Provides building blocks for content rich containers.

## API

API content

## Samples

### Default

```html
<ecl-content-block>
    <ul eclContentBlockLabels aria-label="Labels">
        <li eclContentBlockLabel>
            <span eclLabel variant="highlight">highlight</span>
        </li>
        <li eclContentBlockLabel>
            <span eclLabel variant="high">high importance</span>
        </li>
    </ul>

    <ul eclContentBlockPrimaryMetas>
        <li eclContentBlockPrimaryMeta>PRIMARY META</li>
        <li eclContentBlockPrimaryMeta>DD Month Year</li>
    </ul>

    <div eclContentBlockTitle><a eclLink variant="standalone" routerLink="/">Title</a></div>

    <div eclContentBlockDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida ipsum ut lorem cursus, quis tincidunt
        sem viverra. Nunc vestibulum, mauris quis porta venenatis, justo odio commodo tellus
    </div>

    <ul eclContentBlockSecondaryMetas>
        <li eclContentBlockSecondaryMeta>
            <ecl-icon icon="calendar" size="s" eclContentBlockSecondaryMetaIcon></ecl-icon>
            <span eclContentBlockSecondaryMetaLabel>2018/10/22</span>
        </li>
        <li eclContentBlockSecondaryMeta>
            <ecl-icon icon="location" size="s" eclContentBlockSecondaryMetaIcon></ecl-icon>
            <span eclContentBlockSecondaryMetaLabel>Luxembourg</span>
        </li>
    </ul>

    <div eclContentBlockListContainer>
        <dl eclDescriptionList eclContentBlockList>
            <dt eclDescriptionListTerm>Standalone links</dt>
            <dd eclDescriptionListDefinition variant="link">
                <ul eclDescriptionListDefinitionList>
                    <li eclDescriptionListDefinitionItem>
                        <a eclLink variant="standalone" routerLink="/">
                            <ecl-icon icon="copy" size="s"></ecl-icon>
                            <span eclLinkLabel>Lorem ipsum dolor sit amet</span>
                        </a>
                    </li>
                    <li eclDescriptionListDefinitionItem>
                        <a eclLink variant="standalone" routerLink="/">
                            <ecl-icon icon="download" size="s"></ecl-icon>
                            <span eclLinkLabel>Lorem ipsum dolor sit amet</span>
                        </a>
                    </li>
                </ul>
            </dd>
            <dt eclDescriptionListTerm>Standard text</dt>
            <dd eclDescriptionListDefinition>
                Lorem ipsum dolor sit amet, <a eclLink routerLink="/">consectetur adipiscing elit</a>.
            </dd>
            <dt eclDescriptionListTerm>Links inline</dt>
            <dd eclDescriptionListDefinition variant="inline">
                <ul eclDescriptionListDefinitionList>
                    <li eclDescriptionListDefinitionItem>
                        <a eclLink variant="standalone" routerLink="/">Lorem ipsum dolor sit amet</a>
                    </li>
                    <li eclDescriptionListDefinitionItem>
                        <a eclLink variant="standalone" routerLink="/">Lorem ipsum dolor sit amet</a>
                    </li>
                </ul>
            </dd>

            <dt eclDescriptionListTerm>Taxonomy list</dt>
            <dd eclDescriptionListDefinition variant="taxonomy">
                <ul eclDescriptionListDefinitionList>
                    <li eclDescriptionListDefinitionItem>Taxonomy item 1</li>
                    <li eclDescriptionListDefinitionItem>Taxonomy item 2</li>
                    <li eclDescriptionListDefinitionItem>Taxonomy item 3</li>
                </ul>
            </dd>
        </dl>
    </div>
    <div eclContentBlockLinksContainer>
        <ul eclContentBlockLinks>
            <li eclContentBlockLink>
                <a eclLink variant="standalone" routerLink="/">Primary link 1</a>
            </li>
            <li eclContentBlockLink>
                <a eclLink variant="standalone" routerLink="/">Primary link 2</a>
            </li>
            <li eclContentBlockLink>
                <a eclLink variant="standalone" routerLink="/">Primary link 3</a>
            </li>
            <li eclContentBlockLink>
                <a eclLink variant="standalone" routerLink="/">Primary link 4</a>
            </li>
        </ul>
        <ul eclContentBlockLinks>
            <li eclContentBlockLink>
                <a eclLink variant="standalone" routerLink="/">Secondary link 1</a>
            </li>
            <li eclContentBlockLink>
                <a eclLink variant="standalone" routerLink="/">Secondary link 2</a>
            </li>
        </ul>
    </div>
</ecl-content-block>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_CONTENT_BLOCK } from '@eui/ecl/components/ecl-content-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LABEL } from '@eui/ecl/components/ecl-label';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_CONTENT_BLOCK, ...EUI_ECL_ICON, ...EUI_ECL_LABEL, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
```
