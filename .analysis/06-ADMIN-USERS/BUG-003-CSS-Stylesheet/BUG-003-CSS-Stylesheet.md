# BUG-003: "Could not parse CSS stylesheet" noise in test output

## Status: RESOLVED

## Symptom

Running frontend unit tests (`npm run ng test`) floods the terminal with hundreds of repeated messages:

```
Could not parse CSS stylesheet
Could not parse CSS stylesheet
Could not parse CSS stylesheet
...
```

The messages are harmless — all tests pass — but they obscure real test output and make it hard to spot actual failures or warnings.

## Root Cause

The test environment uses **jsdom** (via Vitest) to simulate a browser DOM. jsdom's CSS parser (`@acemir/cssom`) cannot handle the modern CSS syntax used by eUI component stylesheets (e.g. CSS nesting, `:host`, custom properties in selectors, etc.).

When parsing fails, jsdom emits the error through its **virtual console** mechanism:

```
// node_modules/jsdom/lib/jsdom/living/helpers/stylesheets.js
elementImpl._ownerDocument._defaultView._virtualConsole.emit("jsdomError", error);
```

This is **not** routed through `console.warn` or `console.error` — it goes directly from the jsdom virtual console to `process.stderr`. That's why standard approaches like patching `console.warn`/`console.error` or overriding `CSSStyleSheet.prototype.replaceSync` have no effect.

## Solution

Created `src/test-setup.ts` that intercepts `process.stderr.write` and filters out lines containing the CSS parse message before they reach the terminal:

```typescript
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = (chunk, ...args) => {
    const text = typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString();
    if (text.includes('Could not parse CSS stylesheet')) {
        return true;
    }
    return originalStderrWrite(chunk, ...args);
};
```

Wired it into the test runner via `angular.json`:

```json
"test": {
    "builder": "@angular/build:unit-test",
    "options": {
        "tsConfig": "src/tsconfig.spec.json",
        "setupFiles": ["src/test-setup.ts"]
    }
}
```

Also added `test-setup.ts` to `src/tsconfig.spec.json` `include` array so it's part of the TypeScript compilation scope.

## Files Changed

| File | Change |
|---|---|
| `src/test-setup.ts` | New — stderr filter for jsdom CSS parse noise |
| `angular.json` | Added `setupFiles` option to test builder |
| `src/tsconfig.spec.json` | Added `test-setup.ts` to `include` |

## Why not other approaches?

| Approach | Why it didn't work |
|---|---|
| Patch `console.warn` / `console.error` | jsdom doesn't use `console` — it uses its own virtual console → stderr pipe |
| Override `CSSStyleSheet.prototype.replaceSync` | The error comes from `cssom.parse()`, not from the Web API `replaceSync` |
| Vitest `onConsoleLog` config | Only intercepts `console.*` calls, not raw stderr writes |
| `process.stderr.write` intercept | ✅ Works — catches the output at the final destination |
