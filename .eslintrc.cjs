



/** @type {import("eslint").ESLint.ConfigData } */
module.exports = {
  
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "plugins": [
    // "eslint-plugin-local-rules",
    "eslint-plugin-import",
  ],
  // "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2022
    ,
    "sourceType": "module"
  },
  "rules": {
    "import/no-cycle": [
      "error"
    ],
    // "linebreak-style": [
    //   "warn",
    //   "unix"
    // ],
    "semi": [
      "error",
      "always"
    ],
    "no-extra-semi": [
      "off",
    ],
    // "local-rules/import-extensions": 2,
    "import/unused": [
      "off",
    ],
    "array-callback-return": "error" ,
    "getter-return": "error" ,
    "no-constructor-return": "warn" ,
    "no-unsafe-finally": "warn" ,
    // "no-unreachable": "warn" , /* already handled by the editor's TS/JS checking/highlighting */
    "no-case-declarations": "warn" ,
    "require-yield": "error" ,
    "no-param-reassign": "error" ,
    "no-loop-func": "warn" ,
    // "no-magic-numbers": "warn" , /* made false positives */
    "no-plusplus": "warn" ,
    "curly": "warn" ,
    "default-case": "warn" ,
    "default-case-last": "error" ,
    "no-misleading-character-class": "error" ,
    // "no-loss-of-precision": "warn" , /* already handled by the editor's TS/JS checking/highlighting */
  },
} ;


