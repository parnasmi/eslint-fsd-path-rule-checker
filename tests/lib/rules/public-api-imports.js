/**
 * @fileoverview The module should not allow to import module directly from file. Modules can be imported only from public api
 * @author ilhom
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const aliasOptions = [
  {
    alias: '@'
  }
]

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});
ruleTester.run("public-api-imports", rule, {
  valid: [
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
        "C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\file.test.ts",
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
        "C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx",
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
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
      errors: [{ message: 'Absolute imports are only allowed from Public API(index.ts)'}],
      options: aliasOptions,
    },
    {
      filename:
        "C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx",
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
        "C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\forbidden.ts",
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
  ],
});
