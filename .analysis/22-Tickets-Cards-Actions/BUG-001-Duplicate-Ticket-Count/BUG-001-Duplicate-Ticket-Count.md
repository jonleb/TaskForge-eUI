# BUG-001: Duplicate Ticket Count Display

## Summary

On the Tickets page, the result count is displayed twice (e.g. "128 128 tickets found").

## Root Cause

The template in `tickets.component.html` renders the total count twice:

```html
<div aria-live="polite">
    <strong>{{ total }}</strong>&nbsp;{{ 'tickets.results.count' | translate:{ total: total } }}
</div>
```

The i18n key `tickets.results.count` already contains the `{{total}}` interpolation:

- EN: `"{{total}} tickets found"`
- FR: `"{{total}} tickets trouvés"`

So the rendered output becomes: `128 128 tickets found`.

## Correct Pattern (Backlog page reference)

The backlog page handles this correctly — the total is only inside the i18n string:

```html
<p aria-live="polite" class="eui-u-f-m">
    {{ 'backlog.results-found' | translate:{ total: total } }}
</p>
```

With i18n key: `"{{total}} results found"`.

## Fix

Remove the duplicate `<strong>{{ total }}</strong>&nbsp;` from the template, keeping only the i18n string with interpolation. This is consistent with the backlog page pattern.

### Template change

```html
<!-- Before -->
<div aria-live="polite">
    <strong>{{ total }}</strong>&nbsp;{{ 'tickets.results.count' | translate:{ total: total } }}
</div>

<!-- After -->
<div aria-live="polite" class="eui-u-f-m">
    {{ 'tickets.results.count' | translate:{ total: total } }}
</div>
```

No i18n key changes needed — the keys are already correct.

## Affected Files

- `src/app/features/tickets/tickets.component.html`

## Validation

- 752 tests must pass (`npm run test:ci`)
- Build must pass (`npx ng build --configuration=development`)
