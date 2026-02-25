# App development - eUI mobile

## Serving your app

Let's first serve your generated eUI app :  

`npm run start`

this will start in parallel and watch : 

- the Express mock server on **http://localhost:3000**
- the eUI Angular app on **http://localhost:4200**

Opening up your app in your default browser : 

![first-serve](assets/docs/images/03b-app-dev-mobile/03-crud-creation/first-serve.png)


## Live-reload on change

Each time you'll change a file on the eUI app : Typescript / Styles / HTML component (not config JSON file), your app will
live reload itself on the route it was where you left it.  

Your console will ouput : 

![live-reload-app](assets/docs/images/03b-app-dev-mobile/03-crud-creation/live-reload-app.png)

Same principle applies to the Express server, which listening to all file changes, but won't reload by default your UI app.

Your console will output : 

![live-reload-mock](assets/docs/images/03b-app-dev-mobile/03-crud-creation/live-reload-mock.png)
