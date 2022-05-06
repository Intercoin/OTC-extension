
module.exports = {
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['airbnb-base', 'airbnb-typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/dot-notation': 'off',
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'import/prefer-default-export': 'off',
        'import/no-cycle': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-implied-eval': 0,
        '@typescript-eslint/no-throw-literal': 0,
        '@typescript-eslint/return-await': 0,
        'react/jsx-one-expression-per-line': 2,
        'max-len': ['error', { code: 125 }],
        'arrow-body-style': 2,
        'import/no-extraneous-dependencies': [
          'error',
        ],
        'operator-linebreak': [
          'error',
          'after',
        ],
        'import/extensions': 'off',
        'react/state-in-constructor': 'off',
        'react/button-has-type': 'off',
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',
        "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
        camelcase: 'off',
        'import/named': 'off',
        'import/no-unresolved': 0,
        'react/jsx-indent-props': 0,
        'react/jsx-indent': ['error', 2],
        'react/self-closing-comp': 2,
      },
      env: {
        browser: true,
        es6: true,
        jest: true,
      },
      globals: {
        Generator: true,
        Iterator: true,
        Iterable: true,
        $Keys: true,
        $Shape: true,
        logging: true,
      },
      settings: {
        'import/resolver': {
          node: {
            paths: [
              'src',
            ],
          },
        },
      },
      plugins: [
        'react',
        'import',
      ],
    },
  ],
};
