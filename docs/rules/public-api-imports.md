# The plugin should not allow to import module directly from file. Modules can be imported only from public api (`fsd-import-linter/public-api-imports`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
[
  {
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
    errors: [
      {
        message: "Absolute imports are only allowed from Public API(index.ts)",
      },
    ],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\StoreDecorator.tsx",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
    errors: [
      {
        message: "Absolute imports are only allowed from Public API(index.ts)",
      },
    ],
    options: [
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.ts",
          "**/*.stories.ts",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\forbidden.ts",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
    errors: [
      {
        message:
          "Test data should be imported from publicApi/testing.ts only in testing and storybook files",
      },
    ],
    options: [
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.ts",
          "**/*.stories.ts",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
  },
];
```

Examples of **correct** code for this rule:

```js
[
  {
    code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
    errors: [],
  },
  {
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\file.test.ts",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
    errors: [],
    options: [
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.ts",
          "**/*.stories.ts",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\StoreDecorator.tsx",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
    errors: [],
    options: [
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.ts",
          "**/*.stories.ts",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
  },
];
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
