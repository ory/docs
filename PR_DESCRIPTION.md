## What does this PR do?

This PR fixes redirect chain issues caused by trailing slash mismatches between
Docusaurus and Vercel configurations. Currently, we have 6,957 internal links
hitting redirects before reaching their final destination, which is consuming
Google's crawl budget unnecessarily.

### The Problem

- Docusaurus defaults to `trailingSlash: true` and generates links with trailing
  slashes (e.g., `/docs/polis/`)
- Vercel config has `trailingSlash: false`, which redirects these URLs to
  non-trailing slash versions
- This creates 308 redirects for many internal links, especially in sidebars and
  footers
- Since we recently migrated from .sh to .com domain, we don't have the
  established crawl budget to handle these inefficiencies

### Changes Made

1. **Footer links (docusaurus.config.ts)**:

   - Removed trailing slashes from all external URLs
   - Updated outdated URL paths (e.g., `/privacy` → `/legal/privacy`)
   - Ensures all footer links use `href` attribute correctly

2. **Navbar links (src/navbar.ts)**:
   - Changed `to:` to `href:` for external URLs to prevent Docusaurus router
     processing
   - This prevents Docusaurus from adding trailing slashes to external links

## What problem does it solve?

- Eliminates unnecessary redirect chains that waste Google's crawl budget
- Improves SEO by providing direct paths to final destinations
- Reduces server load from handling thousands of redirects
- Helps with faster indexing of the new .com domain after migration

## How should this be tested?

1. Run `npm run build` locally
2. Check that footer and navbar external links:
   - Don't have trailing slashes in the rendered HTML
   - Use proper `href` attributes for external URLs
   - Navigate directly without redirects
3. Test specific URLs like `https://www.ory.com/support` to ensure no 308
   redirects
4. Verify internal docs links still work correctly

## Related issue(s)

This is the first step in addressing the trailing slash mismatch. Future work
includes:

- Evaluating whether to change Docusaurus config to `trailingSlash: false` to
  match Vercel
- Manually updating sidebar links that auto-generate trailing slashes from
  `index.mdx` files
- Potentially restructuring some index.mdx files to avoid auto-generated
  trailing slashes

## Checklist

- [x] I have read the [contributing guidelines](../blob/master/CONTRIBUTING.md)
      and signed the CLA.
- [ ] I have referenced an issue containing the design document if my change
      introduces a new feature.
- [x] I have read the [security policy](../security/policy).
- [x] I confirm that this pull request does not address a security
      vulnerability.
- [ ] I have added tests that prove my fix is effective or that my feature
      works.
- [ ] I have added the necessary documentation within the code base (if
      appropriate).

## Further Comments

This PR addresses the static links only (footer and navbar). The sidebar links
generated from `index.mdx` files will require a more comprehensive solution,
potentially involving restructuring how we organize documentation or changing
the Docusaurus configuration to match Vercel's no-trailing-slash policy.
