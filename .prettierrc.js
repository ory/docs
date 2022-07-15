module.exports = {
  ...require('ory-prettier-styles'),
  overrides: [
    {
      files: ['docs/**/*.md', 'docs/**/*.mdx'],
      options: {
        printWidth: 130
      }
    }
  ]
}
