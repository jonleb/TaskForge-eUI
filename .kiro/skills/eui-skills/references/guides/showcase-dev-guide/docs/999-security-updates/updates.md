# Critical Security Update Advisory

### Notification and Monitoring of Security Updates

We wish to inform you that important security updates, detected through our pipeline, will be reflected on this page. Once updates are available, a notification will be disseminated through the General MS Teams channel. It is imperative for all users to monitor these updates closely, as they are integral to maintaining the security integrity of each eUI Release.

### Dependency Management and Upgrade Protocols

While we actively detect and patch internal dependencies, there are instances where certain dependencies cannot be automatically updated. In such cases, users are required to manually adjust the dependencies. This is achieved by modifying the **resolutions** entries in the root `package.json` file of your application according to the specified guidelines.

<em>Critical Note 1</em>:  
It is of utmost importance to **consistently** upgrade eUI to the latest version within the current major release cycle. This practice ensures that your application remains secure and up-to-date.

<em>Critical Note 2</em>:  
For optimal compatibility and performance, it is essential to use **yarn** for installing eUI application dependencies, as outlined in the pre-requisites.

## Addressing Security Audited Dependencies in Your Project

To identify and rectify vulnerabilities in your project, execute **yarn audit --level high** (additional information available at: [Yarn Documentation](https://classic.yarnpkg.com/lang/en/docs/cli/audit/)). Upon detecting vulnerabilities, update the relevant dependencies and their versions by modifying the **resolutions** entry in your application's root `package.json` file. Subsequently, re-run yarn to apply these changes.

Please exercise caution when enforcing specific version overrides through yarn resolutions, as certain dependencies might impact eUI, Angular, or the overall build of your application. It is essential to ensure that these changes do not adversely affect the application's functionality or security.
