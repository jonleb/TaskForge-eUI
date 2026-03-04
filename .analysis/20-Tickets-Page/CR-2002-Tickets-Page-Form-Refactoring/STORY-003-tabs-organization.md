# STORY-003 — eui-tabs Content Organization

## Scope

Wrap the page content into `eui-tabs` with 4 tabs:
1. Details — form fieldsets (from STORY-002)
2. Comments — comment thread + add form
3. Activity — activity timeline
4. Links — linked tickets + dialogs

## eUI Components

- `EUI_TABS` from `@eui/components/eui-tabs`
- `EUI_BADGE` from `@eui/components/eui-badge` (comment count on tab header)

## Template Structure

```html
<eui-tabs [ariaLabel]="'ticket-detail.tabs' | translate">
    <eui-tab [label]="'ticket-detail.tab.details' | translate">
        <eui-tab-body>
            <!-- form fieldsets from STORY-002 -->
        </eui-tab-body>
    </eui-tab>
    <eui-tab>
        <eui-tab-header>
            <eui-tab-header-label>{{ 'ticket-detail.tab.comments' | translate }}</eui-tab-header-label>
            <eui-tab-header-right-content>
                @if (comments.length > 0) {
                    <eui-badge euiInfo>{{ comments.length }}</eui-badge>
                }
            </eui-tab-header-right-content>
        </eui-tab-header>
        <eui-tab-body>
            <!-- comments content -->
        </eui-tab-body>
    </eui-tab>
    <eui-tab [label]="'ticket-detail.tab.activity' | translate">
        <eui-tab-body>
            <!-- activity content -->
        </eui-tab-body>
    </eui-tab>
    <eui-tab [label]="'ticket-detail.tab.links' | translate">
        <eui-tab-body>
            <!-- links content -->
        </eui-tab-body>
    </eui-tab>
</eui-tabs>
```

## TypeScript Changes

- Add `activeTabIndex = 0` property
- Load comments/activity/links lazily on tab activation (or keep eager load — simpler)
- Keep existing section content, just wrap in tab bodies

## i18n Keys

- `ticket-detail.tabs` — "Ticket detail tabs"
- `ticket-detail.tab.details` — "Details"
- `ticket-detail.tab.comments` — "Comments"
- `ticket-detail.tab.activity` — "Activity"
- `ticket-detail.tab.links` — "Links"

## Tests

- 4 tabs render
- Details tab is active by default
- Comments tab shows badge with comment count
- Tab content switches on click
