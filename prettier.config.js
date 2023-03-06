module.exports = {
  singleQuote: true,
  semi: false,
  importOrder: [
    '^[./]',
    '^@/lib/(.*)$',
    '^@/images/(.*)$',
    '^@/components/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('prettier-plugin-tailwindcss')],
}
