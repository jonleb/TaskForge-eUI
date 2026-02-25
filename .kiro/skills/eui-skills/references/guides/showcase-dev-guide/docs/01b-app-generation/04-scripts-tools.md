# Default scripts and tools available

Once the application has been generated, a few scripts are provided by default to ease your development life cycle. You can find more information about these scripts inside the generated package.json at the "scripts" property.

## Serve your app locally
Corresponding to where you are in your development lifecycle, 3 main scripts can be used at a different point in time:

### Serve - UI prototyping using with a JSON server MOCK backend
You can run the same default serve with a NodeJS/Express Server backend in order to mock your HTTP request to be able to start developing your real business features

`npm run start`

Use this mock serving when starting to develop business features that require data-driven interactions, and when you don't have a real backend server yet to be used.

### Serve - Development mode against a real backend
Finally, when your backend is ready and deployed either locally or on a remote server, you can use the proxy feature of Angular CLI to proxy your HTTP requests to your backend.

`npm run start-proxy`

## Build your app

Build - Development build

`npm run build`

Build - Production build

`npm run build-prod`

## List of available scripts

Here is the list of available scripts you can find once generating the eUI CLI app : 

```javascript
{
    "name": "eui-angular-app",
    "version": "21.0.0-next.36",
    "license": "EUPL-1.1",
    "scripts": {
        "ng": "ng",
        "start-mock-server": "nodemon --watch ./mock ./mock/server.js",
        "start-serve": "eui-cli serve-app --configuration=proxy-mock",
        "start": "npm-run-all --parallel start-mock-server start-serve",
        "start-proxy": "eui-cli serve-app --configuration=proxy",
        "start-local": "eui-cli serve-app",
        "build": "eui-cli build-app",
        "build-dev": "eui-cli build-app --configuration=development --configEnvTarget=dev",
        "build-prod": "eui-cli build-app --configuration=production-optimized --configEnvTarget=prod",
        "build-prod-skip-test": "eui-cli build-app --configuration=production-optimized --configEnvTarget=prod --skipTest",
        "build-prod-stats": "eui-cli build-app --configuration=production-optimized --configEnvTarget=prod --statsJson",
        "app:build": "eui-cli build-app",
        "app:inject-config": "eui-cli inject-config-app"
    },
    "private": true,
    "dependencies": {
        "@eui/deps-base": "21.0.0-next.36"
    },
    "devDependencies": {
        "npm-run-all": "4.1.5",
        "json-server": "1.0.0-beta.3",
        "nodemon": "3.1.11",
        "lowdb": "1.0.0",
        "body-parser": "1.20.3",
        "express": "4.21.2"
    },
    "resolutions": {
        "semver": ">=7.5.2",
        "dompurify": ">=3.2.4",
        "tmp": ">0.2.4"
    }
}
```
