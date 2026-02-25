# App development - basic concepts - development phases

The mock files and server configuration is using a very simple Express server which allows you to simulate API requests,
it's extremely useful at first steps of application development, when your backend and REST API are not yet defined / known or as a frontend developer you want to directly create usable UI interface against real API calls.  

To explain better the concept of phasing your app development, consider this : 

![app-dev-phazes](assets/docs/03-app-dev/01-basic-concepts/development-proxy.png)

**phase 1**, the eUI app is starting on typical **http://localhost:4200** (Angular CLI serve default), and in parallel a **http://localhost:3000** is starting too, serving the Express mock server, in the **angular.json** the **proxy-mock** configuration is set by default, to target all incoming **/api** calls and redirect them to the Express mock server host.

**phase 2**, the definitive rest API is deployed on local backend server, instead of the doing the proxy to the mock server, here the proxy is made the same way to the local backend,

**phase 3**, the rest API is deployed and is accessible to be consumer from its own server / location / API GW, etc... from the localhost eUI app, the proxy can be made against the deployed rest API.
