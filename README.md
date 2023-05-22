# eslint-plugin-fsd-import-linter

eslint plugin which checks whether modules are imported according to feature sliced design architecture

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-import-linter`:

```sh
npm install eslint-plugin-fsd-import-linter --save-dev
```

## Usage

Add `fsd-import-linter` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["fsd-import-linter"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "fsd-import-linter/rule-name": ["error", { "alias": "@" }]
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
