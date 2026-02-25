# Default scripts and tools available

Once the application has been generated, a few scripts are provided by default to ease your development life cycle. You can find more information about these scripts inside the generated package.json at the "scripts" property.

## Serve your app locally
Corresponding to where you are in your development lifecycle, 3 main scripts can be used at a different point in time:

### Serve - UI prototyping using with a JSON server MOCK backend
You can run the same default serve with a JSON Server backend in order to mock your HTTP request to be able to start developing your real business features

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
