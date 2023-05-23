const path = require('path');
const {isPathRelative} = require('../helpers');
const micromatch = require('micromatch');
/**
 * @fileoverview Underlying layer modules should not use overlying layer modules
 * @author Ilhom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Underlying layer modules should not use overlying layer modules",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreImportPatterns: {
            type: 'array',
          }
        },
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    const layers = {
      'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
      'pages': ['widgets', 'features', 'shared', 'entities'],
      'widgets': ['features', 'shared', 'entities'],
      'features': ['shared', 'entities'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    }

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
      'pages': 'pages',
      'widgets': 'widgets',
    }
    const {alias = '', ignoreImportPatterns = []} = context.options[0] ?? {};

    // const getCurrentFileLayer = () => {
    //   const currentFilePath = context.getFilename();

    //   const normalizedPath = path.toNamespacedPath(currentFilePath);
    //   const projectPath = normalizedPath?.split('src')[1];
    //   const segments = projectPath?.split('\\')

    //   return segments?.[1];
    // }

    function getCurrentFileLayer(filePath) {
      const normalizedPath = filePath.replace(/[\\]+/g, "/")
      const projectPath = normalizedPath?.split('src')[1]
      const segments = projectPath?.split('/')
      
      return segments?.[1]
      }

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, '') : value;
      const segments = importPath?.split('/')

      return segments?.[0]
    }
    
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        const currentFileLayer = getCurrentFileLayer(context.getFilename())
        const importLayer = getImportLayer(importPath)

        if(isPathRelative(importPath)) {
          return;
        }

        if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
          return;
        }

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(importPath, pattern)
        });

        if(isIgnored) {
          return;
        }

        if(!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(node, 'The layer can import only from underlying layers(shared, entities, features, widgets, pages, app)');
        }
      }
    };
  },
};
