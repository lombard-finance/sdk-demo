module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'import',
    'react-refresh',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/jsx-newline': [
      'error',
      {
        allowMultilines: true,
      },
    ],

    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          ['^(components|assets|store|modules|hooks|utils|consts)(/.*|$)'],
          ['^\\u0000'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
};
