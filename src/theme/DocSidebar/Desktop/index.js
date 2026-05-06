/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Swizzled to add Deployment Model block at top of sidebar (Figma 6276-45491).
 */
import React from "react"
import clsx from "clsx"
import { useThemeConfig } from "@docusaurus/theme-common"
import Logo from "@theme/Logo"
import CollapseButton from "@theme/DocSidebar/Desktop/CollapseButton"
import Content from "@theme/DocSidebar/Desktop/Content"
import SidebarDeploymentModel from "@site/src/components/SidebarDeploymentModel"
import styles from "./styles.module.css"

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig()
  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <SidebarDeploymentModel />
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  )
}
export default React.memo(DocSidebarDesktop)
