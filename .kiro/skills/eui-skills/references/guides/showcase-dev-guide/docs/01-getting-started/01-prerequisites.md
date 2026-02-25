# Prerequisites and setup

Some required steps are mandatory to be followed in order to install eUI :

## Default installation

1. Install NodeJS
    <em>Minimal versions of NodeJS required : "^20.19.0 || ^22.12.0 || >=24.0.0"</em>
    Check here for download : **[NodeJS](https://nodejs.org)** / or install nvm in order to easily switch NodeJS version on your machine (requires admin rights / srv4dev usage).

2. Install a git client

    **[Git download](https://git-scm.com/downloads)**
            
3. Install Yarn.

    > ignore if you are using Linux4Dev and installed above
   
    `npm i -g yarn`

4. Install eUI CLI

    `npm i -g @eui/cli` by default this will install the latest known version.

   **Note**: you can target a specific version to be installed : `npm i -g @eui/cli@21.0.0-next.36`.

5. Setting prefix and cache folder

    <em>Avoid doing this on EC Linux laptop except if you know what you are doing</em>

    run those commands : 

    ```
    npm config set prefix <your-nodejs-folder>
    npm config set cache <your-nodejs-folder>/cache
    ```
    Here is the content of the `.npmrc` file resulting of the config command above : 

    ```
    prefix=C:\\Project\\_tools\\nodejs ==> where your nodejs is located
    cache=C:\\Project\\_tools\\nodejs\\cache ==> where your nodejs cache is located
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


## Maven eUI Project Development

```text
Q: Can I use the FullStack App option of EUI-CLI as it is in an EU Commission laptop?
A: The short answer is NO. Why? It's because the Security Policy set by the Relative team responsible for Windows Commission Laptops. The eUI team cannot do anything about this since its out of its Jurisdiction.

Q: Is there anything to make it work? 
A: Yes! First, you need to overcome the policy limitation. To achieve this you need to install through ECSTORE the Eclipse. This will help you have the Java binaries in a folder of the Virtualized App (Eclipse) that seem to not fall under the Policy limitation.
```
So to summarize you need to follow the steps us described below.
1. Install the Eclipse through ECSTORE
2. Download the Latest Version of Maven https://maven.apache.org/download.cgi and extract the folder somewhere in your Documents Folder (preferable).
3. You need to inform your Operating System about the PATH of those binaries. 
   1. First, we'll set up the maven. So Open your User Environment variables and Edit The **PATH** variable. Then add a new entry as the bin path of your maven e.g. YOUR_DOCUMENTS_PATH/maven/bin .
   2. Now you need to do the same but for the Java bin. To find the folder of the Java Bin you need to Open Eclipse, click menu Help > About Eclipse IDE. Then in the About Eclipse IDE dialog, click the Installation Details button. Then in the next screen, click the Configuration tab. There you should find the JDK variable where it points to the bin folder. Copy that path and follow the same process to add the entry to the **PATH** variable.
4. The last step is to configure Maven to pass through the Commission Proxy in order to reach out the Internet. To achieve that you need to go to your maven folder -> conf -> open the configuration XML with a text editor and edit the proxies tag by replacing with
```xml
 <proxies>
    <proxy>
      <id>optional</id>
      <active>true</active>
      <protocol>http</protocol>
      <username>PROXY_USER</username>
      <password>PROXY_PASSWORD</password>
      <host>147.67.138.13</host>
      <port>8012</port>
      <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
  </proxies>
```
*For further configuration advices or if you have any issue with your proxy credentials please contact the HelpDesk Support.
They will guide you through.*
