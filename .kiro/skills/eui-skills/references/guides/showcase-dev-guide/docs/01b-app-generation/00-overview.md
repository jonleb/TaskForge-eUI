# Generate an app - eUI CLI overview

## Prerequisites

Follow the **[prerequisites](./docs/01-getting-started/01-prerequisites)** section


## Application skeleton types

### Overview

When executing the `eui-cli` command you'll be prompted with different choices of application types.    

For each of the application types as shown here :  

![eui-cli-version](assets/docs/01b-app-generation/eui-cli-app-types.png)

As you can see here, we're running a **next** (future eUI release version) of the eUI CLI, on your side, the version that would be installed may differ, and installation of the eUI CLI will always take the latest available at the time of install.

**NOTE**
eUI CLI is used only at initialization step of your app. You don't need it after, except if you want to re-generate another app / reset your current app.

### Selection in eUI CLI

The Angular frontend part will be always the same generated and according to the type selected, will be structured / setup in a different way, let's see what are the differences : 


### Angular - Desktop (default)

This is the most common app - it's containing only the frontend part of your app : the eUI Angular application, generated at the root of your target folder (see next chapter for more details).

### Angular - Mobile Ionic

If you want to generate an Mobile ready eUI Ionic application.

### Angular + Spring Boot web module

In this setup, 2 maven modules will be created :  

- one containing the "web" eUI Angular application
- one containing the "web-rest" Spring Boot Java REST API backend


### Angular + Maven web module

In this setup, one maven "web" module will be created, basically setting a maven "src/main/angular" structure holding the eUI Angular application.  

This setup is recommended for "attaching" this eUI maven web module to an existing JEE application maven-multi-modules.  

It's configured out-of-the-box to generate a WAR file wrapping up the distributed / compiled eUI Angular application as a maven webResource.


## Options for the eUI Angular frontend part

For every application types, the eUI Angular application can be customized with the **eUI ECL** option : 
This will generate an app of your choice with an **eUI ECL** template (use if for application targeted to be delivered on ec.europa.eu with public facing requirements)
