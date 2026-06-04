// Hand-maintained navigation tree for the auto-generated Talos CLI reference.
//
// The CLI docs (talos-*.md in this directory) are generated from Cobra and ship
// without a sidebar, so this file mirrors the `talos --help` command hierarchy.
// When commands are added/removed, update this tree to match the generated pages.
//
// Imported by sidebars-oss.ts and sidebars-oel.ts and rendered as the
// "CLI reference" category (linked to the root `talos` command page).
const id = (name: string) => `talos/reference/cli/${name}`

const talosCliReference = {
  type: "category",
  label: "CLI reference",
  link: { type: "doc", id: id("talos") },
  items: [
    {
      type: "category",
      label: "talos jwk",
      link: { type: "doc", id: id("talos-jwk") },
      items: [
        {
          type: "category",
          label: "talos jwk generate",
          link: { type: "doc", id: id("talos-jwk-generate") },
          items: [
            id("talos-jwk-generate-ecdsa"),
            id("talos-jwk-generate-eddsa"),
            id("talos-jwk-generate-hmac"),
            id("talos-jwk-generate-rsa"),
          ],
        },
        id("talos-jwk-get"),
      ],
    },
    {
      type: "category",
      label: "talos keys",
      link: { type: "doc", id: id("talos-keys") },
      items: [
        id("talos-keys-issue"),
        id("talos-keys-verify"),
        id("talos-keys-batch-verify"),
        id("talos-keys-derive-token"),
        id("talos-keys-self-revoke"),
        {
          type: "category",
          label: "talos keys issued",
          link: { type: "doc", id: id("talos-keys-issued") },
          items: [
            id("talos-keys-issued-issue"),
            id("talos-keys-issued-get"),
            id("talos-keys-issued-list"),
            id("talos-keys-issued-update"),
            id("talos-keys-issued-rotate"),
            id("talos-keys-issued-revoke"),
          ],
        },
        {
          type: "category",
          label: "talos keys imported",
          link: { type: "doc", id: id("talos-keys-imported") },
          items: [
            id("talos-keys-imported-import"),
            id("talos-keys-imported-batch-import"),
            id("talos-keys-imported-get"),
            id("talos-keys-imported-list"),
            id("talos-keys-imported-update"),
            id("talos-keys-imported-revoke"),
            id("talos-keys-imported-delete"),
          ],
        },
      ],
    },
    {
      type: "category",
      label: "talos migrate",
      link: { type: "doc", id: id("talos-migrate") },
      items: [
        id("talos-migrate-up"),
        id("talos-migrate-down"),
        id("talos-migrate-status"),
        id("talos-migrate-force"),
      ],
    },
    id("talos-proxy"),
    {
      type: "category",
      label: "talos serve",
      link: { type: "doc", id: id("talos-serve") },
      items: [id("talos-serve-public"), id("talos-serve-admin")],
    },
  ],
}

export default talosCliReference
