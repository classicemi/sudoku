module.exports = {
  extends: "eslint:recommended",
  env: {
    es6: true,
    node: true,
  },
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-empty": "warn",
    "no-useless-escape": "warn",
    "no-empty-function": "warn",
    "no-unreachable": "warn",
    //   'max-lines': [
    //     'warn',
    //     {
    //       max: 1500,
    //       skipBlankLines: true,
    //       skipComments: true,
    //     },
    //   ],
    //   '@typescript-eslint/no-unused-vars': 'error',
    //   'prettier/prettier': 'error',
  },
  // overrides: [
  //   {
  //     files: ['scripts/**/*.js', '**/*.js'],
  //     env: {
  //       node: true,
  //       browser: false,
  //       es6: true,
  //     },
  //     rules: {
  //       'no-console': 'off',
  //       '@typescript-eslint/no-var-requires': 'off',
  //       '@typescript-eslint/no-explicit-any': 'off',
  //       '@typescript-eslint/prefer-optional-chain': 'off',
  //     },
  //   },
  // ],
};
