// sidebars-integrates.ts
import {
  SidebarItem,
  SidebarItemConfig,
} from "@docusaurus/plugin-content-docs/src/sidebars/types"

type SidebarItemsConfig = SidebarItemConfig[]

const integratesSidebar = [
  {
    type: "category",
    label: "Integrations overview",
    link: {
      type: "generated-index",
      slug: "/integrations",
    },
    items: [
      {
        type: "category",
        label: "Agent identity",
        items: ["integrates-with/agent-identity/skyfire"],
      },
      {
        type: "category",
        label: "API gateways",
        link: { type: "generated-index" },
        items: [
          "integrates-with/api-gateways/apigee",
          "integrates-with/api-gateways/aws-api-gateway",
          "integrates-with/api-gateways/kong",
          "integrates-with/api-gateways/traefik",
        ],
      },
      {
        type: "category",
        label: "CDP and analytics",
        link: { type: "generated-index" },
        items: [
          "integrates-with/cdp-analytics/amplitude",
          "integrates-with/cdp-analytics/mixpanel",
          "integrates-with/cdp-analytics/mparticle",
        ],
      },
      {
        type: "category",
        label: "Cloud infrastructure",
        link: { type: "generated-index" },
        items: [
          "integrates-with/cloud-infrastructure/aws",
          "integrates-with/cloud-infrastructure/azure",
          "integrates-with/cloud-infrastructure/gcp",
        ],
      },
      {
        type: "category",
        label: "Compliance and audit",
        link: { type: "generated-index" },
        items: [
          "integrates-with/compliance-audit/drata",
          "integrates-with/compliance-audit/vanta",
        ],
      },
      {
        type: "category",
        label: "Consent and privacy",
        link: { type: "generated-index" },
        items: [
          "integrates-with/consent-privacy/didomi",
          "integrates-with/consent-privacy/onetrust",
          "integrates-with/consent-privacy/osano",
        ],
      },
      {
        type: "category",
        label: "Containerization",
        link: { type: "generated-index" },
        items: [
          "integrates-with/containerization/docker",
          "integrates-with/containerization/kubernetes",
        ],
      },
      {
        type: "category",
        label: "CRM",
        link: { type: "generated-index" },
        items: [
          "integrates-with/crm/microsoft-dynamics-365",
          "integrates-with/crm/salesforce-crm",
        ],
      },
      {
        type: "category",
        label: "Data persistence",
        items: ["integrates-with/data-persistence/cockroachdb"],
      },
      {
        type: "category",
        label: "Directory sync",
        link: { type: "generated-index" },
        items: [
          "integrates-with/directory-sync/bamboohr",
          "integrates-with/directory-sync/workday-scim",
          "integrates-with/directory-sync/workday",
        ],
      },
      {
        type: "category",
        label: "Edge token validation",
        link: { type: "generated-index" },
        items: [
          "integrates-with/edge-token-validation/akamai-edgeworkers",
          "integrates-with/edge-token-validation/cloudflare-workers",
          "integrates-with/edge-token-validation/fastly-compute",
        ],
      },
      {
        type: "category",
        label: "Email providers",
        link: { type: "generated-index" },
        items: [
          "integrates-with/email-providers/brevo",
          "integrates-with/email-providers/mailchimp-transactional",
          "integrates-with/email-providers/sparkpost",
        ],
      },
      {
        type: "category",
        label: "Enterprise SSO",
        link: { type: "generated-index" },
        items: [
          "integrates-with/enterprise-sso/cyberark-identity",
          "integrates-with/enterprise-sso/forgerock-am",
          "integrates-with/enterprise-sso/hid-global",
          "integrates-with/enterprise-sso/ibm-security-verify",
          "integrates-with/enterprise-sso/keycloak",
        ],
      },
      {
        type: "category",
        label: "Feature flags",
        link: { type: "generated-index" },
        items: [
          "integrates-with/feature-flags/launchdarkly",
          "integrates-with/feature-flags/split-io",
        ],
      },
      {
        type: "category",
        label: "Fraud and bot protection",
        link: { type: "generated-index" },
        items: [
          "integrates-with/fraud-bot-protection/arkose-labs",
          "integrates-with/fraud-bot-protection/castle",
          "integrates-with/fraud-bot-protection/cloudflare-turnstile",
          "integrates-with/fraud-bot-protection/hcaptcha",
          "integrates-with/fraud-bot-protection/recaptcha",
          "integrates-with/fraud-bot-protection/sift",
        ],
      },
      {
        type: "category",
        label: "Government identity",
        link: { type: "generated-index" },
        items: [
          "integrates-with/government-identity/aadhaar",
          "integrates-with/government-identity/bankid",
          "integrates-with/government-identity/eidas",
          "integrates-with/government-identity/idin",
        ],
      },
      {
        type: "category",
        label: "IaC and DevOps",
        items: [
          "integrates-with/iac-devops/terraform",
          "integrates-with/iac-devops/helm",
          "integrates-with/iac-devops/pulumi",
        ],
      },
      {
        type: "category",
        label: "Identity verification",
        link: { type: "generated-index" },
        items: [
          "integrates-with/identity-verification/equifax",
          "integrates-with/identity-verification/gbg-acuant",
          "integrates-with/identity-verification/id-me",
          "integrates-with/identity-verification/socure",
        ],
      },
      {
        type: "category",
        label: "MFA",
        link: { type: "generated-index" },
        items: [
          "integrates-with/mfa/duo-security",
          "integrates-with/mfa/okta-verify",
        ],
      },
      {
        type: "category",
        label: "Monitoring and observability",
        items: ["integrates-with/monitoring-observability/new-relic"],
      },
      {
        type: "category",
        label: "Payment and billing",
        link: { type: "generated-index" },
        items: [
          "integrates-with/payment-billing/recurly",
          "integrates-with/payment-billing/stripe",
        ],
      },
      {
        type: "category",
        label: "SIEM and security analytics",
        link: { type: "generated-index" },
        items: [
          "integrates-with/siem-security-analytics/elastic-siem",
          "integrates-with/siem-security-analytics/microsoft-sentinel",
          "integrates-with/siem-security-analytics/splunk",
          "integrates-with/siem-security-analytics/sumo-logic",
        ],
      },
      {
        type: "category",
        label: "SMS providers",
        link: { type: "generated-index" },
        items: [
          "integrates-with/sms-providers/whatsapp",
        ],
      },
      {
        type: "category",
        label: "Social sign-in",
        link: { type: "generated-index" },
        items: [
          "integrates-with/social-sign-in/battle-net",
          "integrates-with/social-sign-in/epic-games",
          "integrates-with/social-sign-in/github-app",
          "integrates-with/social-sign-in/kakao",
          "integrates-with/social-sign-in/naver",
          "integrates-with/social-sign-in/steam",
          "integrates-with/social-sign-in/telegram",
          "integrates-with/social-sign-in/tiktok",
          "integrates-with/social-sign-in/wechat",
        ],
      },
      {
        type: "category",
        label: "Support and helpdesk",
        link: { type: "generated-index" },
        items: [
          "integrates-with/support-helpdesk/freshdesk",
          "integrates-with/support-helpdesk/intercom",
          "integrates-with/support-helpdesk/zendesk",
        ],
      },
      {
        type: "category",
        label: "User enrichment",
        link: { type: "generated-index" },
        items: [
          "integrates-with/user-enrichment/clearbit",
          "integrates-with/user-enrichment/fullcontact",
          "integrates-with/user-enrichment/zoominfo",
        ],
      },
      {
        type: "category",
        label: "Webhook infrastructure",
        link: { type: "generated-index" },
        items: [
          "integrates-with/webhook-infrastructure/hookdeck",
          "integrates-with/webhook-infrastructure/svix",
        ],
      },
    ],
  },
]

export default integratesSidebar
