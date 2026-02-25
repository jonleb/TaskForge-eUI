# App development - MOCK server and APIs setup

In this chapter, we'll see how to use the provided NodeJS/Express mock server from the eUI CLI generated app.


## Samples

The **mock** folder of your app contains already the necessary files to be able to follow this tutorial.

![mock-structure](assets/docs/03-app-dev/01-basic-concepts/mock-structure.png)

Entry point is the **server.js** file, which is globally defining the **routes** (/api/...routes) of your REST API, 
and the **db/db.json** which is faking with a file adapter the database of this REST endpoints.  


## Mock API routes

The eUI CLI app generated comes with some examples of API, those are not intended for PROD use as you can imagine, this is just for demonstration purposes.

For each REST API "module" entries : here **user** for example, we define in a **user-route** file the api methods to be called by your UI, GET/POST/PUT/DELETE : 


```javascript
module.exports = function (app, db) {
  db.then(db => {
    app.get('/api/user-details', (req, res) => {
      res.send(db.get('user-details'))
    });

    app.get('/api/users', (req, res) => {
      res.send(db.get('users'))
    });

    app.get('/api/users/:userId', (req, res) => {
      res.send(
        db.get('users')
          .find({ userId: req.params.userId })
      );
    });

    app.put('/api/users/:userId', (req, res) => {
      db.get('users')
        .find({ userId: req.params.userId })
        .assign( { ...req.body } )
        .write()
        .then(user => res.send(user))
    });

    app.delete('/api/users/:userId', (req, res) => {
      db.get('users')
        .remove({ userId: req.params.userId })
        .write()
        .then(res.send())
    });

    app.post('/api/users', (req, res) => {
      db.get('users')
        .push({ ...User, ...req.body, ...{ userId: uuid.v4() } })
        .last()
        .write()
        .then(user => res.send(user))
    });
  });
};
```

## Testing API routes using Postman

We'll use postman to test the APIs, simulating those for the creation of our CRUD, where on the Angular side the same operations will be made (we'll see this in a future chapter).

1. Start the app

        npm run start 
        OR 
        npm start
    
2. Express mock server is starting alongside

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/mock-server-started.png)

3. Open Postman or any other similar tools

4. Test the GET user-details api

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-01a-user-details.png)

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-01b-user-details.png)

5. Test the POST users api

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-02a-post.png)

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-02b-post.png)

6. Test the GET users api

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-03a-get-users.png)

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-03b-get-users.png)

7. Test the PUT users/:userId api

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-04a-put.png)

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-04b-put.png)

    The result in the **db.json** file on the server : 

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-04c-put-json.png)

8. Test the GET users/:userid api

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-05a-get-user.png)

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-04b-put.png)

8. Test the DELETE users/:userid api

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-06a-delete.png)

    ![live-reload-app](assets/docs/03-app-dev/03-crud-creation/02-mock-setup/postman-06b-delete.png)


We've tested all the API for our CRUD, everything is now ready for making those calls in our eUI app. 


## Video tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/HO6vNPqQ97A?si=-IA3kF3YkFfTM9TI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
