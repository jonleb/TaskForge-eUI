# Basic concepts - extra files and setup

## Mock Server
This Nodejs server uses fully the express.js. This means that it's fully customizable and you can create a REST API really fast. You can enhance it if needed with packages like Faker or Mock.js or any other package out there. That way you can develop in parallel with the Backend team since you don't need to wait for a fully working endpoint. 

## Proxy
When you generate an eUI app you'll notice that in the root folder there are two files. A proxy.conf.json file and a proxy-mock.conf.json. These files are both being used by the Webpack Dev Server and Webpack utilizes the http-proxy-middleware package. For more information about how to configure these proxy files please visit their Github website, it's really explanatory.

````javascript
proxy-mock.conf.json
{
    "/api": {
        "target": "http://127.0.0.1:3000",
        "secure": false
    }
}
````
