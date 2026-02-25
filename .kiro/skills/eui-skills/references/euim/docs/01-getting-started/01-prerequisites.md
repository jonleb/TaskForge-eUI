# Prerequisites and setup

Some required steps are mandatory to be followed in order to install eUI :

## Default installation

1. Install NodeJS

    **[NodeJS 10.x download](https://nodejs.org/dist/latest-v10.x/)**
    <em>NodeJS LTS 10.x is mandatory and 10.20.x+</em>

2. Install a git client

    **[Git download](https://git-scm.com/downloads)**
            
3. Install Yarn.

    `npm i -g yarn`

4. Install eUI CLI

    `npm i -g @eui/cli` by default this will install the latest known version.

   **Note**: you can target a specific version to be installed : `npm i -g @eui/cli@10.0.0-rc.1`.


## Extra setup when used inside EC premises

1. Configure the npm proxy

    run those commands : 

    ```
    npm config set prefix <your-nodejs-folder>
    npm config set cache <your-nodejs-folder>/cache
    npm config set proxy http://u:p@ps-bxl-usr.cec.eu.int:8012
    ```

    Here is the content of the `.npmrc` file resulting of the config command above : 

    ```
    prefix=C:\\Project\\_tools\\nodejs ==> where your nodejs is located
    cache=C:\\Project\\_tools\\nodejs\\cache ==> where your nodejs cache is located
    proxy=http://u:p@ps-bxl-usr.cec.eu.int:8012 
    ```

    **NOTE** : for Luxembourg use this: ps-lux-usr.cec.eu.int

    <em>HTTP\\_PROXY / HTTPS\\_PROXY environment variables</em>

    <em>If you've set HTTP\\_PROXY or HTTPS\\_PROXY in your environment variables, they have to be cleaned up before the installation :</em>

    ```
    set http\\_proxy=
    set https\\_proxy=
    ```

2. Set yarn always-auth option - if you're using an alternate registry

    Registry usage when using Yarn requires this npm config option set :

    ```
    npm config set always-auth true
    ```

## Common errors found

**Python install error when executing node-sass**

if you have python installation error, at build time when node-sass is trying to compile the SCSS file in your project, use this command to install the necessary build tools locally

**install the necessary tooling (python mainly through this command :**

```
npm install --global windows-build-tools
```

## Optional config and tools

In order to enhance productivity by switching between NPM registries, you can use a tool called [npmrc](https://www.npmjs.com/package/npmrc). Consider a scenario where you are working Outside of EC and you need to have access for some packages at the Company's internal NPM registry, NPM.JS, and ecDevops. In that case the NPMRC tool comes in handy. You can set profiles for each registry and quickly switch between them by simply executing **npmrc \\[PROFILE\\_NAME\\]** for more information about installing and using this tool you can find [here](https://www.npmjs.com/package/npmrc).


## Development through Commission's official Laptop

In order to smoothly develop with Commission's laptop please follow the following TIPS ![(smile)](https://webgate.ec.europa.eu/fpfis/wikis/s/en_GB/8100/b0984b7297905b7c7bd946458f753ce0130bfc8c/_/images/icons/emoticons/smile.svg "(smile)")

Go to **Start** → **Edit environment variables for your account → Edit Path (for User variables, not system's) → Add the following folders**

1. installation path of **NodeJS**
2. installation path of **Git** - (bin folder of Gitbash installation)
3. installation path of **Gitbash**
4. installation path of **VSCode** (in case you are using it as IDE) - **Bin folder**
1. installation path of **npm**

![](https://webgate.ec.europa.eu/fpfis/wikis/download/attachments/528812104/485f3478-722f-47ea-8173-3c60398075a5.jpg?version=1&modificationDate=1593095129610&api=v2)

How to find the path of an application installed with EC Store? Simply open the application and from the start bar select right-click properties and find the location of the application. In case you don't have these installed we recommend you install them from EC Store.

Then for an even smoother Developer Experience (DX)

```
npm i -g yarn npx @eui/cli
````
