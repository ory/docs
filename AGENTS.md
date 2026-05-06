# Updating Ory Documentation

## Overview

Ory documentation is being organized by **deployment model**:

- **Ory Network** → `docs/network`
- **Ory Enterprise License (OEL)** → `docs/oel`
- **Ory Open Source (OSS)** → `docs/oss`

## Current State (Transitional Phase)

- Most content is still **co-mingled**
- Only some sections (e.g. Quickstarts) use the new structure
- The Docs team is actively splitting content

### What you should do

- **Non-migrated sections** → continue using the existing structure
- **Migrated sections** → follow the new pattern
- **Do not restructure content yourself** unless it has already been migrated

## How to Tell if Content is Migrated

A section is migrated if:

- The **sidebar** shows routes like:
  - `docs/network/...`
  - `docs/oel/...`
  - `docs/oss/...`

OR

- You **cannot find the page in the old structure** and it exists under one of
  the deployment folders above

## New Structure (Migrated Sections Only)

### Shared Source Content

- Location: `/src/components/shared/<product>/...`
- Purpose:
  - Reusable, deployment-agnostic content
  - Written once, used across deployments

### Deployment Shell Files

Locations:

- `docs/network`
- `docs/oel`
- `docs/oss`

Shell files:

- Import content from `/src/components/shared/...`
- Represent a page for a specific deployment
- Are the files added to sidebars

---

## Sidebars

- Each deployment has its **own sidebar**

When adding a page:

- Add the **shell file** (not the shared source file)
- Only include it in deployments where the feature exists

## Canonical URL Rules (SEO)

When the same content exists across multiple deployments, you must define a
canonical URL.

### Default (Most Cases)

**Ory Network is canonical**

- Network → self-canonical
- OEL → canonical points to Network
- OSS → canonical points to Network

### Self-Hosted Exception

If content is specific to **self-hosted (OEL/OSS)**: **OEL is canonical**

- OEL → self-canonical
- OSS → canonical points to OEL
- Network → usually not applicable

## How to Update Content (Migrated Sections)

### 1. Determine deployment availability

- Is this available in:
  - Network
  - OEL
  - OSS
- Be explicit, even if it’s only available in one for now

### 2. Update content

- Edit shared source when possible:`/src/components/shared/<product>/...`
- Avoid duplicating content across deployments

**Example (shared source):**

`/src/components/shared/kratos/index.mdx`

```mdx
Ory Kratos Identities is an API-first identity and user management system...

- Self-service login and registration
- Multi-factor authentication
- Account recovery
```

---

### 3. Wire it into deployments

- Ensure a shell file exists in each relevant deployment:
  - `docs/network/...`
  - `docs/oel/...`
  - `docs/oss/...`
- Import the shared content into the shell file

**Example (Network shell):**

`/docs/network/kratos/intro.mdx`

```mdx
---
id: intro
title: Introduction to Ory Kratos for Ory Network
sidebar_label: Introduction
---

<head>
  <link rel="canonical" href="https://www.ory.com/docs/network/kratos/intro" />
</head>

import MyPartial from "@site/src/components/shared/kratos/index.mdx"

<MyPartial />
```

---

### 4. Update sidebar

- Add the **shell file** (not the shared file) to the correct sidebar
- Only include it in deployments where the feature exists

### 5. Set canonical URLs

- Follow canonical rules:

**Default:**

- Network → self-canonical
- OEL / OSS → point to Network

**Self-hosted exception:**

- OEL → self-canonical
- OSS → point to OEL
- Canonical is defined in the shell file:

```html
<link rel="canonical" href="..." />
```

### Summary

- Edit → `/src/components/shared/...`
- Expose → `docs/<deployment>/...` shell files
- Navigate → via sidebars
- De-duplicate → with canonical URLs

## Rule of Thumb

- Old section → leave as-is
- Migrated section → use shared content + shell files
- Can’t find a page → check `docs/network`, `docs/oel`, `docs/oss`
- Duplicate content → always set canonical URLs
- Adding a page → update the correct sidebar

## When in Doubt

- Check the sidebar first
- Look for `/src/components/shared/...` usage
- If unclear, ask the Docs team before making structural changes
