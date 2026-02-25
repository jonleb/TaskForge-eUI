# ecl-timeline

## Overview

The timeline displays concurrent and/or sequential items visually on a time axis.
<br>
<more-info componentPartUrl="timeline/usage/"></more-info>

## API

API content

## Samples

### Default

```html
<ecl-timeline>
    <ecl-timeline-item>
        <div eclTimelineItemTitle>Item title 1</div>
        <div eclTimelineItemLabel>1995 - 1996</div>
        President Juncker's State of the Union speech
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemLabel>1996 - 1997</div>
        Informal Digital Summit, Tallinn
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemLabel>1997 - 1998</div>
        Strengthening European identity through education and culture: European Commission's contribution to the Leaders' meeting, Gothenburg, Sweden
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemLabel>1998 - 1999</div>
        <a eclLink href="/">Social Summit in Gothenburg, Sweden</a>
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemLabel>1999 - 2000</div>
        Economic and Monetary Union package of proposals
    </ecl-timeline-item>
    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2000 - 2001</div>
        EU Leaders' meeting on migration, Brussels
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2001 - 2002</div>
        <a eclLink href="/">Euro Summit</a>
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2002 - 2003</div>
        EU-Western Balkans Strategy
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2003 - 2004</div>
        Multiannual Financial Framework and institutional issues enhancing efficiency at the helm of the European Union
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2004 - 2005</div>
        Informal European Council
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2005 - 2006</div>
        European Council
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2006 - 2007</div>
        <a eclLink href="/">Commission proposal: Long-term budget post-2020</a>
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2007 - 2008</div>
        European Commission’s contribution to the Informal Leaders' meeting, Sofia, Bulgaria (16 May 2018)
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemLabel>2008 - 2009</div>
        EU-Western Balkans Summit (Sofia, Bulgaria)
    </ecl-timeline-item>

    <ecl-timeline-item isToggler toggleGroup="myGroup"
        expandLabel="Show 9 more items" collapseLabel="Hide 9 items">
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemLabel>2009 - 2010</div>
        Progress by Member States in meeting the conditions for adopting the euro - <a eclLink href="/">reports</a> by the European Commission and ECB
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemLabel>2010 - 2011</div>
        European Semester: European Commission publishes economic policy guidance for Member States
    </ecl-timeline-item>
</ecl-timeline>

<h6 class="section-title">Custom toggler</h6>

<ecl-timeline>
    <ecl-timeline-item>
        <div eclTimelineItemTitle>Item title 1</div>
        <div eclTimelineItemLabel>13 September 2017</div>
        President Juncker's State of the Union speech
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemTitle>Item title 2</div>
        <div eclTimelineItemLabel>14 September 2017</div>
        Informal Digital Summit, Tallinn
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemTitle>Item title 3</div>
        <div eclTimelineItemLabel>15 September 2017</div>
        Strengthening European identity through education and culture: European Commission's contribution to the Leaders' meeting, Gothenburg, Sweden
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemTitle>Item title 4</div>
        <div eclTimelineItemLabel>16 September 2017</div>
        EU Leaders' meeting on migration, Brussels
    </ecl-timeline-item>

    <ecl-timeline-item toggleGroup="myGroup" isCollapsed>
        <div eclTimelineItemTitle>Item title 5</div>
        <div eclTimelineItemLabel>17 September 2017</div>
        Euro Summit
    </ecl-timeline-item>

    <ecl-timeline-item isToggler toggleGroup="myGroup" #timelineItem>
        <ecl-timeline-item-toggler>
            <a eclLink>
                <span eclLinkLabel>Toggle (2) more items</span>
                <ecl-icon icon="corner-arrow" size="fluid" [transform]="timelineItem.isTogglerExpanded ? 'rotate-180' : ''"></ecl-icon>
            </a>
        </ecl-timeline-item-toggler>
        <p>There's more items marked with <ecl-tag>collapsed</ecl-tag> attribute available</p>
    </ecl-timeline-item>

    <ecl-timeline-item>
        <div eclTimelineItemTitle>Item title 6</div>
        <div eclTimelineItemLabel>18 September 2017</div>
        Commission contribution to the Euro Summit
    </ecl-timeline-item>
    
    <ecl-timeline-item>
        <div eclTimelineItemTitle>Item title 7</div>
        <div eclTimelineItemLabel>19 September 2017</div>
        Commission contribution to the Euro Summit
    </ecl-timeline-item>
</ecl-timeline>
```

```typescript
import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LINK } from '@eui/ecl/components/ecl-link';
import { EUI_ECL_TAG } from '@eui/ecl/components/ecl-tag';
import { EUI_ECL_TIMELINE } from '@eui/ecl/components/ecl-timeline';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_ICON, ...EUI_ECL_LINK, ...EUI_ECL_TAG, ...EUI_ECL_TIMELINE],
})
export class DefaultComponent {}
```
