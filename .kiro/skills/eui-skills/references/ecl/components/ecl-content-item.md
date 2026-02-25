# ecl-content-item

## Overview

The Content item component provides a quick overview of the content it links to.
<br>
<more-info componentPartUrl="content-item/usage/"></more-info>

## API

API content

## Samples

### Content item with image (left)

```html
<ecl-content-item hasDivider>
    <picture eclContentItemPicture hasZoom>
        <source srcset="https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg" media="(min-width: 480px)" type="image/jpg">
        <img eclContentItemImage src="https://inno-ecl.s3.amazonaws.com/media/examples/example-image.jpg" alt="Alt test of the image">
    </picture>

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida ipsum ut lorem cursus, quis tincidunt sem viverra. Nunc vestibulum, mauris quis porta venenatis, justo odio commodo tellus
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
                <dt eclDescriptionListTerm>Standard text</dt>
                <dd eclDescriptionListDefinition>
                    Lorem ipsum dolor sit amet, <a eclLink routerLink="/">consectetur adipiscing elit</a>. Suspendisse ut sapien condimentum, aliquet turpis sit amet, finibus purus. Donec porttitor iaculis felis ut dapibus. Sed blandit, massa ac suscipit facilisis
                </dd>

                <dt eclDescriptionListTerm>Standalone links</dt>
                <dd eclDescriptionListDefinition variant="link">
                    <ul eclDescriptionListDefinitionList>
                        <li eclDescriptionListDefinitionItem>
                            <a eclLink variant="standalone" routerLink="/">
                                <span eclLinkLabel>Lorem ipsum dolor sit amet</span>
                            </a>
                        </li>
                        <li eclDescriptionListDefinitionItem>
                            <a eclLink variant="standalone" routerLink="/">
                                <span eclLinkLabel>Lorem ipsum dolor sit amet</span>
                            </a></li>
                    </ul>
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
        
    </ecl-content-block>
</ecl-content-item>
```

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EUI_ECL_CONTENT_BLOCK } from '@eui/ecl/components/ecl-content-block';
import { EUI_ECL_CONTENT_ITEM } from '@eui/ecl/components/ecl-content-item';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LABEL } from '@eui/ecl/components/ecl-label';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [RouterLink, ...EUI_ECL_CONTENT_ITEM, ...EUI_ECL_CONTENT_BLOCK, ...EUI_ECL_ICON, ...EUI_ECL_LABEL, ...EUI_ECL_LINK],
})
export class DefaultComponent {}
```
