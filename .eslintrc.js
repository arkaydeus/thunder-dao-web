module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-img-element': 'off'
  }
}
