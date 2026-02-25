# App development - initialization - first commit

## Initial app commit

Point to where you've generated your application then execute the following commands :

`git init`

`git add --all`

`git commit -m "chore: Initial setup - JIRA-KEY"` - see conventional commit explanation (next chapters)

`git remote add origin https://webgate.ec.europa.eu/CITnet/stash/scm/YOUR_PROJECT/YOUR_REPO.git`

`git push -u origin master`

In the end your repository will be updated and your local sources connected to it :

**Note**: by default the generated app already has some pre-defined exclusion (in the .gitignore file at the root of the folder), to prevent you commiting your node_modules for example and all target/dist (generated) folders resulting from the build.

![first-commit-1](assets/docs/03-app-dev/02-init/first-commit-1.png)

In Bitbucket the repo has been correctly pushed : 

![first-commit-2](assets/docs/03-app-dev/02-init/first-commit-2.png)


## Recommended branching structure

By default your initial branch in bitbucket is the **master** branch, right from the start let's create a **develop** branch
on which we can pull request our feature branches ensuring a 2 levels development cycle : 
- **develop** for constant development and targeting mainly your DEV environment
- **master** when you're ready to ship your application to upper environments

Let's create a "develop" branch :

![first-commit-3](assets/docs/03-app-dev/02-init/first-commit-3.png)

![first-commit-4](assets/docs/03-app-dev/02-init/first-commit-4.png)

Once the branch has been created, let's checkout develop in our local dev :

![first-commit-5](assets/docs/03-app-dev/02-init/first-commit-5.png)
