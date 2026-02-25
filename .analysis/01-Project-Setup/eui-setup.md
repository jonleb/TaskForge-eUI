# Project Setup: eUI Desktop Application

## Goal
Scaffold a new eUI desktop application using the eUI CLI in headless mode.

## CLI Command
Run from the workspace root:

```bash
eui-cli --config appType:angular,appName:TaskForge-eUI-v2,npmInstall:true,packageManager:yarn,appStart:false --targetPath .
```

## Requirements
- Application type: `angular` (eUI desktop app shell — NOT ECL, NOT mobile)
- App name: `TaskForge-eUI-v2`
- Branding: eUI (internal EC/EU style) — do NOT use ECL templates
- Package manager: `yarn`
- The generated project files (`src/`, `angular.json`, `package.json`, etc.) must be placed directly in the workspace root — do NOT create a subfolder
- Initialize `.gitignore` with standard Angular/Node ignores (`node_modules/`, `dist/`, `.angular/`, etc.)

## Expected Project Structure (per eUI conventions)
```
./
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   └── environments/
├── angular.json
├── package.json
├── tsconfig.json
├── .gitignore
└── ...
```

## Post-Setup Verification
- Verify the app compiles: `yarn build` or `eui-cli build-app`
- Verify the dev server starts: `yarn start`
- Commit the scaffolded project as a clean baseline

## References
- eUI CLI instructions: available via MCP tool `get-eui-cli-instructions`
- App structure guide: `.kiro/skills/eui-skills/references/app-structure.md`
- Getting started: `.kiro/skills/eui-skills/references/getting-started.md`
