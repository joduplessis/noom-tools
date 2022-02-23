# UI

## Table of Contents
- [UI](#ui)
  - [Table of Contents](#table-of-contents)
  - [Git & Github Flow introduction](#git--github-flow-introduction)
  - [Branching](#branching)
  - [Coding Standards](#coding-standards)
    - [Let the machine do the work](#let-the-machine-do-the-work)
    - [Let the IDE do the work](#let-the-ide-do-the-work)
    - [Versioning](#versioning)
  - [Service Standards](#service-standards)
    - [Use globally provided `.editorconfig`](#use-globally-provided-editorconfig)
    - [Use globally provided `.gitignore`](#use-globally-provided-gitignore)

## Git & Github Flow introduction
If you are totally new to Git and Github, feel free to create a personal & private repository for some experiments based
on this guides.

- https://guides.github.com/introduction/git-handbook/
- https://guides.github.com/activities/hello-world/

Within this project, we follow the best practice of using the Github Flow approach. Check out the following links as an
introduction.

- https://guides.github.com/introduction/flow/
- https://guides.github.com/features/issues/
- https://guides.github.com/features/wikis/
- https://guides.github.com/features/mastering-markdown/

## Branching
1. Use git branches to request updates to the repository:
    - Use `feature/*` to propose new features or to refactor code.
    - Use `experiment/*` to propose and share new thoughts (data, ml, ui/ux).
    - Use `fix/*` to submit patches.
    - Use `doc/*` to add only documentation related content.
    - Use `tmp/*` if no other branch label works out.
    - Use a short string when naming a branch that is descriptive of its purpose.
2. Perform a pull request and ask for a review from at least one other contributor.
3. Do a _squash and merge_ of the branch with `main`.
    - Leave the pull request number in the _merge_ message.
    - This makes it really simple to revert a change if needed.
    - Additionally, it keeps the git log free of intermediate commits.

## Coding Standards

### Let the machine do the work
Some programming languages (e.g. Golang) and tools (e.g. Terraform) provide an official `fmt` command. If available,
just use it and remove obsolete/conflicting entries for this language from the `.editorconfig` file.

If an official `fmt` command is not available, choose the style guide for the given service and implement `make fmt`
to cover all steps for auto-formatting the code.

### Let the IDE do the work
- Use the built-in code formatting tools/commands - e.g. Command+Option+L in Intellij on Mac.
- Install [File Watchers](https://www.jetbrains.com/help/idea/using-file-watchers.html) plugin in
Intellij (is bundled with Pycharm by default) and add file watchers for your project in
`Settings > Tools > File watchers`

### Versioning
Packages and releases must use Calendar Versioning _([CalVer](https://calver.org/))_. The format is: `YY.MM.DD.pp` where:
- `YY` is the short year (20, 21, ...)
- `MM` is the month (1, 2, 3, [...], 10, 11, 12)
- `DD` is the day (1, 2, 3, [...], 29, 30, 31)
- `pp` is used to push patches on the same day (0, 1, 2, ...)

Examples: `20.12.30.1` `21.1.4.0`

## Service Standards
### Use globally provided `.editorconfig`
- This will add an empty line at the end of files and setup the proper indent space and format.
- Support in Intellij IDEs is found in `Settings > Editor > Code Style`.

### Use globally provided `.gitignore`
- The `.gitignore` file will be used as a root/base setting for ignoring files within the whole service.
- If necessary provide a service related `.gitignore` file which will overrule the global one.
