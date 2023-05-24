/**
 * @fileoverview The module should not allow to import module directly from file. Modules can be imported only from public api
 * @author Ilhom
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
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
      errors: [{messageId: 'PUBLIC_ERROR'}],
      options: aliasOptions,
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    },
    {
      filename: 'C:\\Users\\Alina_Schneider\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [{messageId: 'PUBLIC_ERROR'}],
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      options: [{
      alias: '@',
      testFilesPatterns: ['**/*.testing.ts', '**/*.test.ts', '**/*.stories.ts', '**/StoreDecorator.tsx']
      }]
    },
    {
      filename: 'C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [{messageId: 'TESTING_PUBLIC_ERROR'}],
      output: null,
      options: [{
      alias: '@',
      testFilesPatterns: ['**/*.testing.ts', '**/*.test.ts', '**/*.stories.ts', '**/StoreDecorator.tsx']
      }],
    }
  ],
});
