# App building - Bamboo setup

This step by step guide will guide you through the default script to be created in order to build an eUI app in Bamboo
(default agent).

*NOTE*: that in that default setup (default agent), the unit test can't be run (no chrome headless available in Bamboo), hence the usage of the "build-prod-skip-test" command which is bypassing the unit test of your eUI app.

---

1. Create a new Bamboo plan on your project (dependencing on your privileges)

    click the "Create => create plan" in the Bamboo toolbar

    ![create-plan](assets/docs/04-app-build/01-create-plan.png)

2. Fill in your plan information / repository location

    select - link new repository => bitbucket server / stash => look for your repository => select develop branch

    ![create-plan-details](assets/docs/04-app-build/02-create-plan-details.png)

    Once information are filled, click "configure plan"

3. Add a script task 

    Click on "add task" :

    ![add-task](assets/docs/04-app-build/03-add-task.png)

    Then select a "script" task type, select it :

    ![add-task-script](assets/docs/04-app-build/04-add-task-script.png)

    on the script command line, add : 

    ![script-task-details](assets/docs/04-app-build/05-script-task-details.png)

    here we just do a yarn to install - this will install at the root of your repository (Angular default app) and
    we excute the *build-prod-skip-test* command

    *NOTE*: if you're using an eUI Maven module, change your directory to *src/main/angular* prior to run the yarn command

    after the build is executed, a /dist folder containing the compiled app to be distributed will be available for deployment / executing an FTP transfer to whatever container of your choice.

4. OPTIONAL for maven module type of application

    On a maven module eUI app, the module has a pom.xml at the root, this pom.xml contains the default setup to package your /dist folder (resulting of build point 3 above).

    add this extra task to run a maven command : 

    ```
    mvn clean package
    ```  

    <b class="eui-u-color-danger-100">IMPORTANT!!!</b>  

    <b class="eui-u-color-danger-100">
    DON'T USE THE eirslett maven plugin to build your eUI Application, this is known to be error prone, on a default maven module setup everything is there in the default pom.xml for the packaging to happen and this has to be done in 2 steps : build your eUI app first (see previous task) + maven packaging in another !!
    </b>
