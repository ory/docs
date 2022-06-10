module.exports = {
  ...require('ory-prettier-styles'),
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 130
      }
    }
  ]
}
