# eUI Frontend Steering Rules

## Component Selection: eUI-First Policy

Before proposing any UI implementation, ALWAYS check the eUI component library first using the `eui-compodoc` MCP tools (`search-components`, `get-component-docs`, `get-component-examples`, `list-components`).

- Use eUI components instead of standard Angular Material or HTML equivalents.
  Examples: `eui-table` not `mat-table`, `EuiDialogService` not `MatDialog`, `eui-button` not `<button>`.
- Use eUI services (`EuiGrowlService`, `EuiLoaderService`, `EuiBreadcrumbService`, etc.) instead of custom or third-party alternatives.
- If no suitable eUI component exists for a use case, document the reason for choosing a non-eUI alternative in a code comment.

## Documentation and Task Design

Before writing specs, tasks, or enabler stories, consult eUI documentation and guidelines via the MCP tools or the skill references in `.kiro/skills/eui-skills/references/`.

## Running Frontend Tests

The project uses `@angular/build:unit-test` (vitest under the hood).

- To run all unit tests (single-run, exits cleanly): `npm run test:ci`
- To run a specific test file (single-run): `npm run test:ci -- --include src/path/to/file.spec.ts`
- Watch mode (interactive dev): `npm run ng test`
- NEVER use `npm test -- file.spec.ts --run` — this syntax does not work in this project.
- After implementation, run `npm run test:ci` (not `npm run ng test`) to avoid watch-mode hangs.
- Only run the full suite once — skip individual file test runs to save time.

## Frontend Definition of Done

- Frontend changes include unit tests for new components, services, guards, and interceptors.
- All existing frontend tests still pass: `npm run test:ci`.
- Build passes: `npx ng build --configuration=development`.
- Code follows the a11y steering rules (see `a11y.md`).

## MCP Server

The `eui-compodoc` MCP server must be available. If it is not responding, check `.kiro/settings/mcp.json` and reconnect from the MCP Server view in Kiro.
