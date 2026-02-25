# App development - basic concepts - local mock server

## Startup in parallel with eUI app start

When starting locally your application : `npm run start`,  
the bundled Node/Express server is launched alongside the Angular served eUI app : 

![mock-server-1](assets/docs/03-app-dev/01-basic-concepts/mock-server-1.png)


### App mock folder

![mock-structure](assets/docs/03-app-dev/01-basic-concepts/mock-structure.png)

Entry point is the **server.js** file, which is globally defining the **routes** (/api/...routes) of your REST API, 
and the **db/db.json** which is faking with a file adapter the database of this REST endpoints.  

For each REST API "module" entries : here **user** for example, we define in a **user-route** file the api methods to be called by your UI, GET/POST/...: 

```javascript
module.exports = function (app, db) {
  db.then(db => {
    app.get('/api/user-details', (req, res) => {
      res.send(db.get('user-details'))
    });

    app.get('/api/users', (req, res) => {
      res.send(db.get('users'))
    });
    ...
  });
};
```

When the UI side will make a HTTP GET request to /api/user-details we'll send back the content of the user-details entry in the db.json :

```javascript
{
  "user-details": {
    "userId": "doejohn",
    "firstName": "John",
    "lastName": "Doe",
    "email": "John.DOE@ec.europa.eu"
  },
  "users": [
  ]
}
```

This is translated on the eUI app call during the **app-starter.service.ts** "fetchUserDetails"  
In this function, we're fetching the api definitions through the config (see config basic details in previous chapter),
we then make the call to the the API location found, here using the mock server : /api/user-details.

**NOTE** : this code as expected as no notion at all that we're making the call against the localhost:3000 (the proxy started earlier) and can be used in any other environment, making our code environment independent by nature.

```javascript
...
// fetch of the user-details from the CONFIG_TOKEN (config)
    private fetchUserDetails(): Observable<UserDetails> {
        const moduleCoreApi = this.config.modules.core;
        const url = `${moduleCoreApi.base}${moduleCoreApi.userDetails}`;
        const user = { userId: 'anonymous' };

        if (!url) {
            return of(user);
        }
        return this.http.get<UserDetails>(url);
    }
...

```

If we inspect our network request we can see that reflected here : 

![app-user-details-request](assets/docs/03-app-dev/01-basic-concepts/app-user-details-request.png)
