/**
 * @fileoverview Withing a slice all paths should be relative
 * @author Ilhom
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker-fsd"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\Article\\file.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: "Withing a slice all paths should be relative"}],
      options: [
        {
          alias: '@'
        }
      ],
      output:
        "import { addCommentFormActions, addCommentFormReducer } from './model/slices/addCommentFormSlice'",
    },
    {
      filename: 'C:\\Users\\user\\Desktop\\javascript\\test_project\\src\\entities\\Article\\file.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: "Withing a slice all paths should be relative"}],
      output:
        "import { addCommentFormActions, addCommentFormReducer } from './model/slices/addCommentFormSlice'",
    },
  ],
});