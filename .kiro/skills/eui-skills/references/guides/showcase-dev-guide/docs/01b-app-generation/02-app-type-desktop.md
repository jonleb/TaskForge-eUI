# Generate an app - default desktop eUI Angular

## Prerequisites

Follow the **[prerequisites](./docs/01-getting-started/01-prerequisites)** section


## Generation steps

**Let's create your first eUI application**

1. Create a folder : `mkdir my-eui-app`

2. In the folder : `cd my-eui-app`

3. Execute the eui-cli command : `eui-cli`

4. select the type of application skeleton you want to generate

    ![generate-app-1](assets/docs/01b-app-generation/gen-app-1.png)

    We select the `Angular Desktop` default type, we'll see in next chapters other application types.

5. Select one of more options

    ![generate-app-2](assets/docs/01b-app-generation/gen-app-2.png)

    We don't select any option here, we'll see them further in details

6. Choose if you want to install the dependencies (default: Yes) 

    ![generate-app-3](assets/docs/01b-app-generation/gen-app-3.png)

Your application is being generated, after installing the dependencies (this might take a few minutes),
it'll be served on http://localhost:4200, the default Angular CLI local server.

![generate-app-4](assets/docs/01b-app-generation/gen-app-4.png)

In the end the default eUI application will render : 

![generate-app-5](assets/docs/01b-app-generation/gen-app-5.png)

## Extra setup when using an EC laptop

<em>Do the following after installing the dependencies (yarn command). You may run the application afterwards.</em>

1. Modify the vite dependency

    In your project node modules, replace what is inside *node_modules/vite/node_modules/esbuild* with the content of the package folder you downloaded in the **[prerequisites](./docs/01-getting-started/01-prerequisites)** section (extract 2 times, first the tgz file then the tar file)

2. Create a new esbuild dependency

    Again in your project node modules, create a new folder called esbuild and paste what is inside the same package folder as the previous step.
