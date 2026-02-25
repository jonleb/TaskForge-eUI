# eUI Project Steering Rules

## Component Selection: eUI-First Policy

Before proposing any UI implementation, ALWAYS check the eUI component library first using the `eui-compodoc` MCP tools (`search-components`, `get-component-docs`, `get-component-examples`, `list-components`).

- Use eUI components instead of standard Angular Material or HTML equivalents.
  Examples: `eui-table` not `mat-table`, `EuiDialogService` not `MatDialog`, `eui-button` not `<button>`.
- Use eUI services (`EuiGrowlService`, `EuiLoaderService`, `EuiBreadcrumbService`, etc.) instead of custom or third-party alternatives.
- If no suitable eUI component exists for a use case, document the reason for choosing a non-eUI alternative in a code comment.

## Documentation and Task Design

Before writing specs, tasks, or enabler stories, consult eUI documentation and guidelines via the MCP tools or the skill references in `.kiro/skills/eui-skills/references/`.

## Backend: Use the Mock Server

This project includes a local Express/json-server mock backend in `mock/server.js`.

- For any backend API needs, add or modify endpoints in the `mock/` folder.
- Start the full dev environment (frontend + mock server) with: `npm start`
- Start only the mock server with: `npm run start-mock-server`
- Do NOT set up separate backend services or external API stubs.

## Running Tests

The project uses `@angular/build:unit-test` (Jasmine).

- To run all unit tests: `npm run ng test`
- To run a specific test file: `npm run ng test -- --include src/path/to/file.spec.ts`
- NEVER use `npm test -- file.spec.ts --run` — this syntax does not work in this project.
- Mock server tests (Jest): `npm run test:mock`

## MCP Server

The `eui-compodoc` MCP server must be available. If it is not responding, check `.kiro/settings/mcp.json` and reconnect from the MCP Server view in Kiro.
