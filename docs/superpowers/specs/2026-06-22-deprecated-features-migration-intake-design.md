# Deprecated-features migration intake — design

**Date:** 2026-06-22
**Branch:** `jonas-jonas/addDeprecatedFeatures`
**Status:** Implemented as full migration guides (not stubs) per follow-up request.
See "Implementation note" below.

## Implementation note (2026-06-22)

The follow-up instruction was to write **full** migration guides for each deprecated
feature — matching the depth of the existing `faster_session_extend` entry and adding
explicit "Am I affected?" checklists — rather than the `TODO(collect)` stubs this
design originally proposed. All seven in-scope features were written as complete
`###` entries in `docs/kratos/deprecations/index.mdx`, plus the
`password_profile_registration_node_group` triage candidate (it is an unambiguous
deprecation that mirrors the OIDC node-group change). Each entry follows the template:
short description → **Am I affected?** checklist → **Why was this change made?** →
**How to adapt?** with `<Tabs>` for Ory Network vs Self-hosted.

Content was sourced from code-verified research (config getters, schema defaults,
deprecation events). Two genuinely unknown facts were intentionally **not** invented:
exact removal version numbers (phrased as "scheduled for removal" / "a future
release") and per-flag Ory Console deep-link anchors (the entries link to the Advanced
settings page generically). The remaining two triage candidates
(`use_continue_with_transitions`, `choose_recovery_address`) were deferred: they are
V1/V2 behavior switches rather than clear deprecations.

## Goal

Produce a repeatable **intake artifact** that, for each in-scope deprecated Ory
Kratos feature, captures what we already know from code research and clearly marks
what still needs to be *collected* from the Ory changelog / engineering / PM before
customer-facing migration advice is finalized.

This is an **intake/research plan**, not the finished docs and not a standalone
customer migration guide. The stubs it produces are designed to become the published
docs once their gaps are filled, so there is no throwaway work.

## Background

- The branch already ships `docs/kratos/deprecations/index.mdx` with one fully-worked
  entry, `faster_session_extend`, using a clear template:
  **Who is impacted? → Why was this change made? → How to adapt?** with
  `<Tabs>` for **Ory Network** vs **Self-hosted (OSS or OEL)**.
- A prior research session traced ~20 config flags/migration toggles in the
  kratos-oss codebase. Findings are summarized in the session handoff. Code tracing
  is complete and should **not** be re-run.

## Artifact form

Per-feature **stub entries** that mirror the existing `faster_session_extend`
template. Each stub:

- Is appended as a `###` section to `docs/kratos/deprecations/index.mdx`
  (matching the single existing entry — see Structure decision).
- Is pre-filled with the code-research facts we already have ("what changed",
  affected endpoint/strategy, source-of-truth getter).
- Carries explicit `{/* TODO(collect): ... */}` placeholders for each unfilled gap,
  so an editor knows exactly what to chase and from whom.

Each stub tracks four **collectible gaps**:

1. **Deprecation + removal version/timeline** — source: Ory changelog / release
   notes / engineering.
2. **Official migration-steps wording** — the recommended, customer-safe upgrade
   steps per deployment; source: engineering/PM sign-off.
3. **Deployment availability** — confirm Network / OEL / OSS applicability (several
   flags are Network-only or behave differently self-hosted).
4. **Customer impact / who is affected** — a concrete signal (config value, API
   usage, UI pattern) a customer can self-check against.

A small **status table** sits at the top of the plan output: one row per feature
with the gaps still outstanding and an owner, so the collection work is assignable
and scannable at a glance.

## In-scope features

True deprecations + clean field replacements:

| # | Feature | Type | Replacement / target | Code reference (from research) |
|---|---|---|---|---|
| 1 | `legacy_continue_with_verification_ui` | deprecation | modern `continue_with` verification UI | `selfservice/hook/verification.go:203-210` |
| 2 | `legacy_require_verified_login_error` | deprecation | new verified-login error behavior | `selfservice/hook/require_verified_address.go` |
| 3 | `legacy_oidc_registration_node_group` | deprecation | `default` node group | `selfservice/strategy/oidc/strategy.go:754-773` |
| 4 | `enable_legacy_one_step` | deprecation | `registration.style` | `SelfServiceFlowRegistrationTwoSteps()` `config.go:693-708` |
| 5 | `web_hook.can_interrupt` | field replacement | `response.parse` | `selfservice/hook/web_hook.go:302-440` |
| 6 | WebAuthn `rp.origin` (+ `rp.icon` ignored) | field replacement | `rp.origins` | `config.go:1534-1548` |
| 7 | `link.config.base_url` | field replacement | remove (request URL used) | no getter (ignored) |

## Triage candidates

Legacy-ish but ambiguous; the plan will surface each for an explicit include/exclude
decision **before** stubbing, rather than silently including or dropping them:

- `password_profile_registration_node_group` (`password` → `default`) —
  `selfservice/strategy/password/registration.go:195-235`
- `use_continue_with_transitions` (redirect vs `continue_with` array)
- `choose_recovery_address` (Recovery V1 vs V2) —
  `selfservice/flow/recovery/flow.go:153-157`

## Structure decision

Stubs are added as `###` sections in the existing
`docs/kratos/deprecations/index.mdx`, matching the one existing entry, because:

- There is no sidebar wiring for sub-pages under `deprecations/`.
- The page already presents itself as a single list ("Each entry in this section…").

Revisit splitting into separate files only if the list outgrows a single readable
page.

## Out of scope

- **Silent default changes** (e.g. `verification.use`/`recovery.use` → `code`,
  `registration.style` → `profile_first`).
- **Experimental flags** (e.g. login `identifier_first`).
- **Network-only behavior flags** (e.g. `cacheable_sessions`,
  `account_linking_mode`).

(These were deliberately excluded for this intake; they may warrant their own
"upgrade notes" effort later.)

## Success criteria

- Every in-scope feature has a stub in `index.mdx` following the established
  template, pre-filled with known facts and with a `TODO(collect)` for each of the
  four gaps it is missing.
- The three triage candidates are each resolved (included as stubs or explicitly
  deferred) with a one-line rationale.
- A status table lists each feature, outstanding gaps, and an owner.
- No code re-tracing; the build/lint for the docs page still passes
  (stubs are valid MDX).
