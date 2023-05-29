# eslint-plugin-fsd-import-linter

Eslint plugin which checks whether modules are imported according to feature sliced design (FSD) architecture

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

- Set "alias" to empty "" if you don't user alias for imports.
- "public-api-imports" rule also checks testing.ts public api for test files for imports some mock data
- "ignoreImportPatterns" is used to ignore layer import rules. Includes files in which you want to import overlying files in underlying files for testing purposes.

```json
{
  "rules": {
    "fsd-import-linter/path-checker-fsd": ["error", { "alias": "@" }],
    "fsd-import-linter/public-api-imports": [
      "error",
      {
        "alias": "@",
        "testFilesPatterns": [
          "**/*.test.*",
          "**/*.stories.*",
          "**/StoreDecorator.tsx"
        ]
      }
    ],
    "fsd-import-linter/fsd-layer-imports": [
      "error",
      {
        "alias": "@",
        "ignoreImportPatterns": ["**/StoreProvider", "**/testing"]
      }
    ]
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                   | Description                                                                                                                                    |
| :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| [fsd-layer-imports](docs/rules/fsd-layer-imports.md)   | Underlying layer modules should not use overlying layer modules. There is ignore options for some files such as StoreProvider or testing files |
| [path-checker-fsd](docs/rules/path-checker-fsd.md)     | Withing a slice all paths should be relative                                                                                                   |
| [public-api-imports](docs/rules/public-api-imports.md) | The plugin should not allow to import module directly from file. Modules can be imported only from public api                                  |

<!-- end auto-generated rules list -->
