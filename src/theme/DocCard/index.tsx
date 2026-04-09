/**
 * Swizzled from @docusaurus/theme-classic DocCard — card body is not a link;
 * "Learn more" matches home OverviewCard / guide links.
 */

import React, { type ReactNode } from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import {
  useDocById,
  findFirstSidebarItemLink,
} from "@docusaurus/plugin-content-docs/client"
import { usePluralForm } from "@docusaurus/theme-common"
import isInternalUrl from "@docusaurus/isInternalUrl"
import { translate } from "@docusaurus/Translate"

import type { Props } from "@theme/DocCard"
import Heading from "@theme/Heading"
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs"

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm()
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: "1 item|{count} items",
          id: "theme.docs.DocCard.categoryDescription.plurals",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count },
      ),
    )
}

function CardLayout({
  className,
  href,
  icon,
  title,
  description,
}: {
  className?: string
  href: string
  icon: ReactNode
  title: string
  description?: string
}): ReactNode {
  const learnMore = translate({
    id: "theme.docs.DocCard.learnMore",
    message: "Learn more",
    description: "Link label at the bottom of a doc index card",
  })

  return (
    <div
      className={clsx("card padding--lg flex flex-col h-full", className)}
    >
      <div className="flex flex-col gap-ory-2 flex-1 min-h-0">
        <Heading
          as="h2"
          className="text--truncate"
          title={title}
        >
          {icon} {title}
        </Heading>
        {description && (
          <p className="text--truncate" title={description}>
            {description}
          </p>
        )}
      </div>
      <Link href={href} className="ory-guide-card__link mt-auto">
        {learnMore}
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const href = findFirstSidebarItemLink(item)
  const categoryItemsPlural = useCategoryItemsPlural()

  if (!href) {
    return null
  }

  return (
    <CardLayout
      className={item.className}
      href={href}
      icon="🗃️"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  )
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const icon = isInternalUrl(item.href) ? "📄️" : "🔗"
  const doc = useDocById(item.docId ?? undefined)
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  )
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />
    case "category":
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
