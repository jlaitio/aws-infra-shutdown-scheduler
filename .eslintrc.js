module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    indent: 'off',
    '@typescript-eslint/indent': ["error", 2],
    '@typescript-eslint/explicit-member-accessibility': "off",
    '@typescript-eslint/no-explicit-any': "off",
    '@typescript-eslint/member-delimiter-style': "off",
    '@typescript-eslint/camelcase': 'off',
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  "env": {
    "jest": true
  }
}
