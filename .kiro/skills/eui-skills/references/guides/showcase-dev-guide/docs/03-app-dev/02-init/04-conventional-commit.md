# App development - initialization - conventional commit message format

When you commit your changes a specific format should be given in order to type and categorize the commits, allow the generating of the automatic changelog for a future release, and enforce the semantic versioning based on the feature content, this is optionally provided by the eUI tooling to generate automatic release notes (we'll see more in details when we'll speak about the build in a more advanced part of the documentation).

read more info here: https://conventionalcommits.org/

we will identify the main types of message : 

- feat : new feature 
- fix : bug fix
- breaking change type : either a "feat" or "fix" with "BREAKING CHANGE" text in the footer of the message, the body of the - message is used for the ISSUE KEY
- others (chore/ci/test/refactor/etc...)

![conventional-commit](assets/docs/03-app-dev/02-init/conventional-commit.png)

--- 
**Note**: If you are using IntelliJ or Webstorm etc, consider using any of the plugins below that will help you follow the convention commit strategy easier. This plugin has builtin angular support and lets you autocomplete the component you want https://github.com/lppedd/idea-conventional-commit-angular2
