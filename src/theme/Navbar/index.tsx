import React from "react"
import clsx from "clsx"
import { translate } from "@docusaurus/Translate"
import { ErrorCauseBoundary, useThemeConfig } from "@docusaurus/theme-common"
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal"

import NavbarLayout from "@theme/Navbar/Layout"
import Logo from "@theme/Logo"
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle"
import NavbarSearch from "@theme/Navbar/Search"
import SearchBar from "@theme/SearchBar"
import IconMenu from "@theme/Icon/Menu"
import NavbarItem from "@theme/NavbarItem"

function useNavbarItems() {
  // Docusaurus ThemeConfig type is intentionally broad here
  return (useThemeConfig() as any).navbar.items as any[]
}

function splitItemsByPosition(items: any[]) {
  const left: any[] = []
  const right: any[] = []

  for (const item of items) {
    if (item?.position === "right") {
      right.push(item)
    } else {
      left.push(item)
    }
  }

  return { left, right }
}

function NavbarItems({ items }: { items: any[] }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.\nPlease double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:\n${JSON.stringify(item, null, 2)}\n\nOriginal error:\n${String(error)}`,
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

function OryNavbar() {
  const mobileSidebar = useNavbarMobileSidebar()
  const items = useNavbarItems()
  const { left: leftItems, right: rightItems } = splitItemsByPosition(items)
  const searchBarItem = items.find((item) => item?.type === "search")

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1920px] h-16 px-2 flex items-center">
        <div className="h-full flex items-center border-l border-r border-ory-border-primary px-4">
          <Logo
            className="h-full flex items-center"
            imageClassName="h-4 w-auto"
            titleClassName="sr-only"
          />
        </div>

        <div className="h-full flex items-center border-r border-ory-border-primary px-4 min-[997px]:hidden">
          {!mobileSidebar.disabled && (
            <button
              onClick={mobileSidebar.toggle}
              aria-label={translate({
                id: "theme.docs.sidebar.toggleSidebarButtonAriaLabel",
                message: "Toggle navigation bar",
                description:
                  "The ARIA label for hamburger menu button of mobile navigation",
              })}
              aria-expanded={mobileSidebar.shown}
              type="button"
              className={clsx(
                "h-8 w-8 inline-flex items-center justify-center",
                "rounded-ory-btn border border-transparent",
                "bg-transparent hover:bg-transparent active:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ory-border-brand-tertiary",
              )}
            >
              <IconMenu />
            </button>
          )}
        </div>

        <div className="flex-1 min-w-0 h-full flex items-center gap-2 px-4 lg:px-8">
          {/* Desktop links (Option A) */}
          <div className="hidden min-[997px]:flex min-w-0 items-center gap-2">
            <NavbarItems items={leftItems} />
          </div>

          <div className="ml-auto flex items-center gap-2 min-w-0">
            {/* Right-side items from config (e.g. GitHub, Support dropdown) */}
            <div className="hidden min-[997px]:flex items-center gap-2">
              <NavbarItems items={rightItems} />
            </div>

            <div className="hidden lg:flex items-center">
              <NavbarColorModeToggle className="h-8 w-8" />
            </div>

            {!searchBarItem && (
              <NavbarSearch className="min-w-0 flex-1 lg:flex-none">
                <div className="min-w-0 w-full lg:w-64">
                  <SearchBar />
                </div>
              </NavbarSearch>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Navbar(): React.ReactElement {
  return (
    <NavbarLayout>
      <OryNavbar />
    </NavbarLayout>
  )
}

