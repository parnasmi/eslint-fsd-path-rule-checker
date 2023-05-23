# Inside the same slice all paths should be relative (`fsd-import-linter/path-checker-fsd`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
[
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\Article",
    code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
    errors: [{ message: "Inside the same slice all paths should be relative" }],
    options: [
      {
        alias: "@",
      },
    ],
  },
  {
    filename:
      "C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\Article",
    code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
    errors: [{ message: "Inside the same slice all paths should be relative" }],
  },
];
```

Examples of **correct** code for this rule:

```js
    {
      filename: 'C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
