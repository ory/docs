---
id: security
title: Security Policy
---

:::caution Disclaimer

We're in the process of setting up a disclosure platform. Until that process is
done, we can't payout bug bounties due to the administrative overhead. All
disclosures that are made until the launch, will later be processed under the
same conditions, but we can't guarantee when that happens.

:::

As a security focused company, Ory appreciates and encourages any interest by
security researches and white-hat hackers in the companies products. To support
the global infosec community, we award the responsible disclosure of
vulnerabilities and data leaks according to the following policies.

## Responsible Disclosure

A responsible disclosure always starts with contacting the Ory security team,
using one of the channels specified at
[https://www.ory.sh/.well-known/security.txt](https://www.ory.sh/.well-known/security.txt).
Provide all details to reproduce the issue in form of a non-public git
repository including all setup and execution steps, the binary and source of the
exploit, as well as an example exploit payload (if applicable). Low-quality
reports may be disqualified. The Ory security team will contact you within 96
hours to confirm the issue or ask for further details. Don't publish or share
any details regarding the issue until the Ory security team explicitly permits
the publication in written form. The Ory security team will permit publication
once incidence response and patches are fully enrolled. Any exploits shall not
be tested against environments hosted by Ory or any third party without the
explicit consent to do so. In case this happens, the submission is disqualified.

## Awards

The Ory maintainers have final decision on which issues constitute security
vulnerabilities. Reports for already known issues will only be awarded with
regards to the new information they add to the issue. Ory will score the
severity of the disclosed issue according to
[CVSS 3.1](https://www.first.org/cvss/v3.1/specification-document). Ory reserves
the right to solely determine the factors affecting the score calculation based
on the submitted exploit. Effectively this means that you have to prove for
example the loss of confidentiality to have that included in the CVSS
calculation.

Other Ory open source projects may still be eligible depending on the impact of
the disclosed issue.

### Additional Expenses

In case you required exceptional expenses for providing and disclosing the
issue, Ory will refund you these expenses, if and only if you provide the
original invoice and a valid reason for requiring the resources. All resources
have to be directly tied to the disclosure of the issue. This clause also
applies to exceptionally huge time-investment from your side. In that case, file
an invoice yourself according to your local law, including a description of the
work done on your side. It's Ory’s final decision whether the reasons for
additional expenses are valid and the additional expenses are refunded.

## Disclaimer

This document is **not legally binding**. It’s sole purpose is to define the
submission and follow-up process of reporting security issues to Ory. The
content of this document may change at any time.
