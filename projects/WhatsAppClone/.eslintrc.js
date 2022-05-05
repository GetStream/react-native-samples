module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: [2, 'never'],
    curly: 'off',
    '@typescript-eslint/no-unused-vars': 0,
    noUnusedLocals: 0,
  },
}
