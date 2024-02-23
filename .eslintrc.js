module.exports = {
    env: {
      browser: true,
      es2021: true,
      'jest/globals': true,
    },
    extends: [
      'airbnb',
      'plugin:prettier/recommended',
    ],
    plugins: ['jest'],
    overrides: [
      {
        env: {
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
        rules: {},
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {},
  };