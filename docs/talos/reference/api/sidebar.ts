import type { SidebarsConfig } from "@docusaurus/plugin-content-docs"

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "talos/reference/api/ory-talos-api",
    },
    {
      type: "category",
      label: "AdminPlaneService",
      items: [
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-get-jwks",
          label: "Get JWKS",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-revoke-api-key",
          label: "Revoke API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-derive-token",
          label: "Derive Token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-list-imported-api-keys",
          label: "List Imported API Keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-import-api-key",
          label: "Import API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-delete-imported-api-key",
          label: "Delete Imported API Key",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-get-imported-api-key",
          label: "Get Imported API Key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-batch-import-api-keys",
          label: "Batch Import API Keys",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-list-issued-api-keys",
          label: "List Issued API Keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-issue-api-key",
          label: "Issue API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-get-issued-api-key",
          label: "Get Issued API Key",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-update-issued-api-key",
          label: "Update Issued API Key",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "talos/reference/api/admin-plane-service-rotate-issued-api-key",
          label: "Rotate Issued API Key",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "DataPlaneService",
      items: [
        {
          type: "doc",
          id: "talos/reference/api/data-plane-service-batch-verify-api-keys",
          label: "Batch Verify API Keys",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/data-plane-service-self-revoke-api-key",
          label: "Self-Revoke API Key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "talos/reference/api/data-plane-service-verify-api-key",
          label: "Verify API Key",
          className: "api-method post",
        },
      ],
    },
  ],
}

export default sidebar.apisidebar
