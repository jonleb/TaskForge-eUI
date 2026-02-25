---
description: Shows custom headers with left icons, right badges, sublabels, and closable/flat combinations.
id: with-icon-badge
---

```html
<div class="doc-sample-section-title">With left-content and icon</div>

<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant">
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>



<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant">
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>


<div class="doc-sample-section-title">With right-content and badge</div>

<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant">
            <eui-tab-header>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>


<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant">
            <eui-tab-header>
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>


<div class="doc-sample-section-title">Both options</div>


<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant">
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>                
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>

<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant">
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>                
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>


<div class="doc-sample-section-title">Both options and isClosable</div>


<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant" isClosable>
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>                
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>

<eui-tabs>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant" isClosable>
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>                
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>


<div class="doc-sample-section-title">Both options - isFlat</div>


<eui-tabs isFlat>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant" isClosable>
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>                
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>

<eui-tabs isFlat>
    @for (tab of tabs; let i = $index; track tab) {
        <eui-tab [euiVariant]="tab.variant" isClosable>
            <eui-tab-header>
                <eui-tab-header-left-content>
                    <eui-icon-svg [icon]="tab.icon"/>
                </eui-tab-header-left-content>                
                <eui-tab-header-label>
                   {{ tab.tabLabel }}
                </eui-tab-header-label>
                <eui-tab-header-sub-label>
                    {{ tab.tabSubLabel }}
                </eui-tab-header-sub-label>
                <eui-tab-header-right-content>
                    <eui-badge>99</eui-badge>
                </eui-tab-header-right-content>
            </eui-tab-header>
            <eui-tab-body>{{ tab.tabContent }}</eui-tab-body>
        </eui-tab>
    }
</eui-tabs>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    selector: 'with-icon-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_TABS,
        ...EUI_ICON,
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconBadgeComponent {

    public tabs = [
        { tabLabel: 'Tab 2', tabSubLabel: 'euiPrimary', tabContent: 'euiPrimary', variant: 'primary', icon: 'eui-state-info' },
        { tabLabel: 'Tab 2', tabSubLabel: 'euiSecondary', tabContent: 'euiSecondary', variant: 'secondary', icon: 'eui-state-info' },
        { tabLabel: 'Tab 3', tabSubLabel: 'euiInfo', tabContent: 'euiInfo', variant: 'info', icon: 'eui-state-info' },
        { tabLabel: 'Tab 4', tabSubLabel: 'euiSuccess', tabContent: 'euiSuccess', variant: 'success', icon: 'eui-state-success' },
        { tabLabel: 'Tab 5', tabSubLabel: 'euiWarning', tabContent: 'euiWarning', variant: 'warning', icon: 'eui-state-warning' },
        { tabLabel: 'Tab 6', tabSubLabel: 'euiDanger', tabContent: 'euiDanger', variant: 'danger', icon: 'eui-state-danger' },
    ];

}
```

