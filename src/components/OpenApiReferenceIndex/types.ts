// Shared types for the OpenAPI SDK reference index.

export type OpenApiSidebarDoc = {
  type: "doc"
  id: string
  label?: string
  className?: string
}

export type OpenApiSidebarCategory = {
  type: "category"
  label: string
  items: OpenApiSidebarItem[]
}

export type OpenApiSidebarItem = OpenApiSidebarDoc | OpenApiSidebarCategory

export type SdkParam = {
  name: string
  type: string
  description: string
  required: boolean
}

export type SdkMethodDocs = {
  signature: string
  params: SdkParam[]
  returnType: string
}
