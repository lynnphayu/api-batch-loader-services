module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  plugins: [require('prettier-plugin-organize-imports'), require('prettier-plugin-packagejson')]
}
