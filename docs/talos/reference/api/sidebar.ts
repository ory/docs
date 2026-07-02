import type { SidebarsConfig } from "@docusaurus/plugin-content-docs"

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "talos/reference/api/ory-talos-api",
    },
    {
      type: "category",
      label: "ApiKeys",
      items: [
        {
          type: "doc",
          id: "talos/reference/api/admin-batch-verify-api-keys",
          label: "Batch Verify API Keys",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-derive-token",
          label: "Derive Token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-verify-api-key",
          label: "Verify API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-list-imported-api-keys",
          label: "List Imported API Keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-import-api-key",
          label: "Import API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-update-imported-api-key",
          label: "Update Imported API Key",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-delete-imported-api-key",
          label: "Delete Imported API Key",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-get-imported-api-key",
          label: "Get Imported API Key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-revoke-imported-api-key",
          label: "Revoke Imported API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-batch-create-imported-api-keys",
          label: "Batch Import API Keys",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-list-issued-api-keys",
          label: "List Issued API Keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-issue-api-key",
          label: "Issue API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-update-issued-api-key",
          label: "Update Issued API Key",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-get-issued-api-key",
          label: "Get Issued API Key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-revoke-issued-api-key",
          label: "Revoke Issued API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-rotate-issued-api-key",
          label: "Rotate Issued API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/revoke-api-key",
          label: "Revoke API Key (self-service)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/get-jwks",
          label: "Get JWKS",
          className: "api-method get",
        },
      ],
    },
  ],
}

export default sidebar.apisidebar
