# Getting Started

## Prerequisites

- Node.js ^20.19.0 || ^22.12.0 || >=24.0.0
- Git
- Yarn: `npm i -g yarn`
- eUI CLI: `npm i -g @eui/cli`

## Creating a New Project

The eUI CLI is interactive and must be run by the user directly:

```bash
eui-cli new my-app
```

The CLI will prompt for:
- Project type (Angular, Mobile, etc.)
- Features to include
- Configuration options

**Note:** AI assistants cannot run `eui new` as it requires interactive input. Run this command yourself in your terminal.

## After Project Creation

Once the project is created:

```bash
cd my-app
yarn install
yarn start
```

The app runs at `http://localhost:4200`.

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   └── environments/
├── angular.json
├── package.json
└── tsconfig.json
```

## Next Steps

- [App Structure](app-structure.md) - Configure app shell, toolbar, sidebar
- [App Configuration](app-configuration.md) - Environment and runtime config
- [eUI Components](eui-components.md) - Available components
- [Styling](eui-styles.md) - Theming and CSS utilities
