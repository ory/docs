declare module "@docusaurus/theme-common/internal" {
  export function useNavbarMobileSidebar(): {
    shown: boolean
    disabled: boolean
    toggle: () => void
  }
}

declare module "@theme/ApiItem/store" {
  import type { Middleware } from "@reduxjs/toolkit"
  export function createStoreWithoutState(
    preloadedState: Record<string, never>,
    middlewares: Middleware[],
  ): import("@reduxjs/toolkit").EnhancedStore
  export function createStoreWithState(
    preloadedState: unknown,
    middlewares: Middleware[],
  ): import("@reduxjs/toolkit").EnhancedStore
}

declare module "@theme/ApiExplorer/Authorization/slice" {
  export function createAuth(options: {
    security?: any
    securitySchemes?: any
    options?: any
  }): any
}

declare module "@theme/ApiExplorer/persistenceMiddleware" {
  export function createPersistenceMiddleware(options: any): any
}

declare module "@theme/ApiExplorer/storage-utils" {
  interface Storage {
    getItem(key: string): string | null
    setItem(key: string, value: string): void
    removeItem(key: string): void
  }
  export function createStorage(persistence: string): Storage
}

declare module "pako" {
  export function ungzip(data: Uint8Array, options?: object): Uint8Array
}
