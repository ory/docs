declare module "@docusaurus/theme-common/internal" {
  export function useNavbarMobileSidebar(): {
    shown: boolean
    disabled: boolean
    toggle: () => void
  }
}

