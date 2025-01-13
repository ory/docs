---
id: security
title: Security policy
---

This security policy outlines the security support commitments for different types of Ory users.

[Get in touch](https://www.ory.sh/contact/) to learn more about Ory's security SLAs and process.

### Apache 2.0 License users

- **Security SLA:** No security Service Level Agreement (SLA) is provided.
- **Release Schedule:** Releases are planned every 3 to 6 months. These releases will contain all security fixes implemented up to
  that point.
- **Version Support:** Security patches are only provided for the current release version.

### Ory Enterprise License customers

- **Security SLA:** The following timelines apply for security vulnerabilities based on their severity:
  - Critical: Resolved within 14 days.
  - High: Resolved within 30 days.
  - Medium: Resolved within 90 days.
  - Low: Resolved within 180 days.
  - Informational: Addressed as needed.
- **Release Schedule:** Updates are provided as soon as vulnerabilities are resolved, adhering to the above SLA.
- **Version Support:** Depending on the Ory Enterprise License agreement multiple versions can be supported.

### Ory Network users

- **Security SLA:** The following timelines apply for security vulnerabilities based on their severity:
  - Critical: Resolved within 14 days.
  - High: Resolved within 30 days.
  - Medium: Resolved within 90 days.
  - Low: Resolved within 180 days.
  - Informational: Addressed as needed.
- **Release Schedule:** Updates are automatically deployed to Ory Network as soon as vulnerabilities are resolved, adhering to the
  above SLA.
- **Version Support:** Ory Network always runs the most current version.

### Reporting a vulnerability

Please read the following section to learn more about reporting security vulnerabilities at the Ory Bug Bounty Program.

## Ory bug bounty program

Ory is working with Hackerone to provide a private bug bounty program for all Ory products. If you are interested in joining the
program, please [create an account at Hackerone](https://hackerone.com/sign_up) and [request access](mailto:security@ory.sh). The
following is the policy for the private bug bounty program.

Being a security-focused company, Ory appreciates, encourages, and rewards feedback from the security community. Ory is open
source at heart, so feel free to inspect our [source code](https://github.com/ory). Ory commits to following HackerOne's
[vulnerability disclosure guidelines](https://www.hackerone.com/disclosure-guidelines) and we ask you to do the same. Thank you
for helping keep Ory and our users safe!

### Research guidelines

While security-testing Ory systems, please make a good-faith effort to avoid privacy violations, destruction of data, and
interruption or degradation of our service. Interact only with accounts you own or with the explicit permission of the account
holder.

Prohibited activities:

- creating failing/incomplete subscriptions to paid plans in Ory Network for example with incomplete or fake credit card
  information.
- social engineering like phishing, vishing, or smishing.
- security scanning with more than 5 QPS against Ory domains.
- any activity that leads to disruption of the Ory Network service for customers.

### What can you report

Please report any potential security vulnerability that potentially leads to sensible exploits. Please report vulnerabilities in
Ory's upstream dependencies to the respective projects and only reach out to us if the report to upstream was unsuccessful.

When reporting vulnerabilities, please consider the attack scenario, exploitability, and security impact of the bug. Out of scope
are attacks

- through the runtime environment of self-hosted Ory installations
- through user-provided configuration like a user not setting appropriate permissions on projects containing sensitive information
- through port address translation for Ory Network Projects
- around missing rate limiting (we have it on our roadmap)
- on intentionally public hosts and information on them like our [documentation](https://github.com/ory/docs/) and
  [website](https://github.com/ory/docs/)
- that require physical access to the victim's computer
- against vulnerabilities in outdated browsers (more than two versions behind the latest stable version)
- based on software version disclosure, banner identification issues, descriptive error messages or headers (stack traces,
  application or server errors)
- based on tabnabbing or open redirect unless you can demonstrate an additional security impact
- that require unlikely user interaction
- disclosing configuration and paths unless you include proof of credential leakage or demonstrate an attack with the leaked
  information (since we manage much of our infrastructure through public GitOps repositories)

Please use Ory's customer support channels if you need help tuning Ory components for security or need help applying
security-related updates.

### How to report

Submit one vulnerability per report unless you need to chain vulnerabilities to achieve impact.

Please provide a detailed vulnerability report with step-by-step instructions to reproduce the issue. Only vulnerabilities that we
can reproduce are eligible for a reward.

### Review

Ory commits to these response timelines:

- 1-2 business days to first response
- 3-5 business days from report submission to triage
- 3-5 business days from triage to bounty

We'll stay in close contact with you throughout the process.

### Rewards

While all reward decision are up to our discretion, we generally award these monetary bounties out of our total yearly bounty
budget for security vulnerabilities that we can reproduce:

| Low  | Medium | High   | Critical |
| ---- | ------ | ------ | -------- |
| $100 | $350   | $1,000 | $3,000   |

We also award swag for smaller findings like problems with Ory usage of third-party software and services for marketing, email, or
developer support.

When receiving multiple reports about the same issue, we award the first report that we can fully reproduce. Multiple
vulnerabilities caused by the same underlying issue result in only one bounty. We award public Zero-day vulnerabilities that have
had an official patch for less than one month on a case-by-case basis

### Publication

Please do not discuss any vulnerabilities, even resolved ones, outside this program without written consent from Ory.

### Safe harbor

Any activities conducted in a manner consistent with this policy will be considered authorized conduct and not result in legal
action from Ory against you. If you face legal action in connection with activities conducted under this policy, Ory will take
steps to make it known that you conducted your actions in compliance with this policy.
