# Underlying layer modules should not use overlying layer modules (`fsd-import-linter/fsd-layer-imports`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
[
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\entities\\providers",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
    errors: [
      {
        message:
          "The layer can import only from underlying layers(shared, entities, features, widgets, pages, app)",
      },
    ],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\features\\providers",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
    errors: [
      {
        message:
          "The layer can import only from underlying layers(shared, entities, features, widgets, pages, app)",
      },
    ],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\entities\\providers",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
    errors: [
      {
        message:
          "The layer can import only from underlying layers(shared, entities, features, widgets, pages, app)",
      },
    ],
    options: aliasOptions,
  },
];
```

Examples of **correct** code for this rule:

```js
[
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\features\\Article",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\features\\Article",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\app\\providers",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\widgets\\pages",
    code: "import { useLocation } from 'react-router-dom'",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\app\\providers",
    code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\index.tsx",
    code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
    errors: [],
    options: aliasOptions,
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\some_project\\src\\entities\\Article.tsx",
    code: "import { StateSchema } from '@/app/providers/StoreProvider'",
    errors: [],
    options: [
      {
        alias: "@",
        ignoreImportPatterns: ["**/StoreProvider"],
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
