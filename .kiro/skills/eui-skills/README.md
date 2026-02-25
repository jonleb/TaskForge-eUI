# eui-skills

A [Skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) for building European Commission web applications using [eUI Library](https://euidev.ecdevops.eu/). Provides comprehensive documentation and guidance for eUI, and eUI-ECL component.

## Installation

### Using npx skills (Recommended)

The skills CLI will use your existing Git credentials to access the repository:

```bash
# Using HTTPS (will use your GitLab credentials)
npx skills add https://sdlc.webcloud.ec.europa.eu/csdr/eui-skills.git

# Or using SSH (if you have SSH keys configured)
npx skills add git@sdlc.webcloud.ec.europa.eu:csdr/eui-skills.git
```

The skill will be installed to `.kiro/skills/` in your project or `~/.kiro/skills/` globally with the `-g` flag.

### Manual Installation

Alternatively, clone the repository directly:

```bash
# For project-specific installation
git clone https://sdlc.webcloud.ec.europa.eu/csdr/eui-skills.git .kiro/skills/eui-angular-v21

# For global installation (available across all projects)
git clone https://sdlc.webcloud.ec.europa.eu/csdr/eui-skills.git ~/.kiro/skills/eui-angular-v21
```

### Troubleshooting

If `npx skills add` shows "No skills found", ensure:
1. The `.well-known/skills/index.json` file exists in the repository
2. You have proper Git credentials configured for the GitLab server
3. Try using the `.git` extension in the URL

### Maintenance
- Update all skills: Run `npx skills update` to update every installed skill to its latest version
- Check for updates: Run `npx skills check` to see if updates are available for your current skills without installing them immediately
- Fresh install/Sync: If you need to ensure you have the latest version of the CLI itself, use `npx skills@latest`

## Usage

Once installed, the eUI skill is automatically available in Kiro AI. It provides context-aware guidance when working on eUI Angular 21 projects.

### Examples

**Ask about components:**
> "Create a data table with sorting and pagination using eUI"

**Get help with patterns:**
> "How do I set up a reactive form with eUI form controls and validation?"

**ECL integration:**
> "Add an ECL-compliant site header with language switcher"

The skill references are organized under `references/` — Kiro will automatically pull the relevant documentation based on your query context. For the full component reference and common patterns, see [SKILL.md](SKILL.md).

## What's Included

- Complete eUI Angular 21 component documentation
- ECL (Europa Component Library) integration guides
- eUI-Mobile (Ionic 8) mobile development references
- Modern Angular patterns (standalone components, signals, new control flow)
- Security best practices and testing guidelines
- Design patterns and templates for EC/EU applications


## Quick Reference

See [SKILL.md](SKILL.md) for the complete guide including:
- Component quick reference and import patterns
- Common pitfalls and solutions
- Modern Angular patterns (signals, control flow)
- Form patterns and directives
- Icon usage and styling utilities

## Repository Structure

```
references/
├── eui/          # eUI component documentation
├── ecl/          # ECL component documentation  
├── euim/         # eUI-Mobile (Ionic) documentation
├── guides/       # Design patterns and templates
└── services/     # Core services documentation
```

---

## Development Notes

* [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://sdlc.webcloud.ec.europa.eu/csdr/eui-skills.git
git branch -M develop
git push -uf origin develop
```

## Support
For support you can reach us at [Mailbox](digit-eui-support@ec.europa.eu).

## Authors and acknowledgment
This project is being developed and maintained by the [eUI team](https://euidev.ecdevops.eu/).

## License
[EUPL 1.1](https://eupl.eu/1.2/en/)
