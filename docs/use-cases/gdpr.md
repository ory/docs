---
id: gdpr
title: GDPR compliance
sidebar_label: GDPR compliance
---

## Use case:

## How Ory Network helps you to be GDPR compliant

With the option of hosting personal data on EU based servers and with Ory's dedication to upholding the highest standards in data
protection, adopting Ory Network as your identity management solution represents a big step towards becoming GDPR compliant. The
following GDPR checklist provides an overview of how Ory Network can bring you closer to overall GDPR compliance.

### GDPR checklist

According to the EU Commission's guidelines on
[Rules for business and organisations](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations_en),
there is an extensive set of GDPR rules that affect the processing of EU citizens' personal data. The following table summarizes
this aspect of the GDPR regulations and indicates the level at which Ory Network supports compliance.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="gdpr-regs">
<TabItem value="regulation" label="GDPR regulation">

| Dealing with citizens| Support level |
|----------------------|---------------|
| [Limitations on automated decision making](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/dealing-citizens/are-there-restrictions-use-automated-decision-making_en "Individuals should not be subject to a decision that is based solely on automated processing (such as algorithms) and that is legally binding or which significantly affects them") | ![Single check mark](./_common/check-mark-single.svg) |
| [Right to data portability](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/dealing-citizens/can-individuals-ask-have-their-data-transferred-another-organisation_en "Individuals have the right to data portability, that is to receive from your company/organisation the personal data they provided in a structured machine-readable format, and have it transmitted to another company/organisation") | ![Single check mark green](./_common/check-mark-single-green.svg) |
| [Right to ask for personal data to be deleted](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/dealing-citizens/do-we-always-have-delete-personal-data-if-person-asks_en "Individuals have the right to ask for their data to be deleted and organisations do have an obligation to do so, except in the some specific cases") | ![Single check mark green](./_common/check-mark-single-green.svg) |
| [Right to object to the processing of personal data](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/dealing-citizens/what-happens-if-someone-objects-my-company-processing-their-personal-data_en "Individuals have the right to object to the processing of personal data for specific reasons") | ![Single check mark green](./_common/check-mark-single-green.svg) |
| [Right to request access to personal data](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/dealing-citizens/what-personal-data-and-information-can-individual-access-request_en "When someone requests access to their personal data, your company/organisation must confirm whether or not it is processing personal data concerning them, provide a copy of the personal data it holds about them, and provide information about the processing (such as purposes, categories of personal data, recipients, etc.)") | ![Single check mark green](./_common/check-mark-single-green.svg) |
| [Dealing with requests](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/dealing-citizens/how-should-requests-individuals-exercising-their-data-protection-rights-be-dealt_en "Your company must reply to requests without undue delay, and in principle within 1 month of the receipt of the request; requests from individuals should be carried out free of charge") | ![Single check mark green](./_common/check-mark-single-green.svg) |

</TabItem>
<TabItem value="ory" label="Ory's role">

| Dealing with citizens| Ory's role |
|----------------------|------------------|
| Limitations on automated decision making | Ory does not make algorithmic decisions that significantly affect end users. |
| Right to data portability | Ory provides an API that enables you to retrieve all of the personal data for a specific user. |
| Right to ask for personal data to be deleted | Ory provides an API that enables you to delete personal data for a specific user. |
| Right to object to the processing of personal data | You can optionally customize the Ory identity schema to store consent flags. |
| Right to request access to personal data | Ory provides an API that enables you to retrieve all of the personal data for a specific user. |
| Dealing with requests | Requests relating to personal data can be automated using Ory's API, facilitating a rapid response to the user.  |

</TabItem>
<TabItem value="customersupports" label="Customer's role">

| Dealing with citizens| Customer's role |
|----------------------|-----------------------|
| Limitations on automated decision making | Your applications must avoid making purely algorithmic decisions (without human review) that significantly affect end users. |
| Right to data portability | Any additional data you store in your own database must be retrievable by end users.  |
| Right to ask for personal data to be deleted | Any user data you store in your own database must be deleted on request, followed by deletion of the related Ory user account. |
| Right to object to the processing of personal data | Your application must respect a user's consent flag settings, and provide a mechanism for the user to give or revoke consent.  |
| Right to request access to personal data | If you store any personal data in your own database, it must be retrievable by end users. |
| Dealing with requests | Implement automated mechanisms that enable users to manage their personal data, in accordance with GDPR regulations. In particular, enabling Ory's self-service account settings flow enables users to manage most aspects of their personal data. |

</TabItem>
</Tabs>
```

```mdx-code-block
<Tabs groupId="gdpr-regs">
<TabItem value="regulation" label="GDPR regulation">

| Legal grounds for processing data | Support level |
|-----------------------------------|---------------|
| [Specific safeguards for data about children](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/are-there-any-specific-safeguards-data-about-children_en "Your company/organisation can only process a child’s personal data on grounds of consent with the explicit consent of their parent or guardian up to a certain age") | ![Single check mark](./_common/check-mark-single.svg) |
| [Consent required for third-party marketing](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/can-data-received-third-party-be-used-marketing_en "Before acquiring a contact list or a database with contact details of individuals from another organisation, that organisation must be able to demonstrate that the data was obtained in compliance with the General Data Protection Regulation and that it may use it for advertising purposes") | ![Single check mark](./_common/check-mark-single.svg) |
| [Validity of consent](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/grounds-processing/when-consent-valid_en "When consent is required to process personal data, for that consent to be valid multiple conditions must be met") | ![Single check mark](./_common/check-mark-single.svg) |
| [Sensitive data](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/legal-grounds-processing-data/sensitive-data_en "Sensitive personal data is protected under EU law and can only be processed by organisations if specific safeguards are in place") | ![Single check mark](./_common/check-mark-single.svg) |

</TabItem>
<TabItem value="ory" label="Ory's role">

| Legal grounds for processing data | Ory's role |
|-----------------------------------|------------------|
| Specific safeguards for data about children | Ory provides all of the APIs that would be needed for implementing safeguards around parental consent for processing children's personal data, but Ory cannot offer any support beyond that. |
| Consent required for third-party marketing | You can optionally customize the Ory identity schema to store consent flags and then use these flags to decide whether the personal data is processed or not. |
| Validity of consent | By default, Ory does not process personal data in a way that requires additional consent. |
| Sensitive data | By default, Ory does not store or process sensitive data. |

</TabItem>
<TabItem value="customersupports" label="Customer's role">

| Legal grounds for processing data | Customer's role |
|-----------------------------------|-----------------------|
| Specific safeguards for data about children | If your application is targeted at children, you must implement additional safeguards and ensure that personal data is stored only with explicit consent of a parent or guardian. |
| Consent required for third-party marketing | Your application must respect a user's consent flag settings, and provide a mechanism for the user to give or revoke consent. |
| Validity of consent | There are multiple conditions that must be complied with in order for consent to be valid and, in particular, you must always provide a mechanism for the user to revoke consent. |
| Sensitive data | Processing of sensitive data is allowed only in special cases.  |

</TabItem>
</Tabs>
```

```mdx-code-block
<Tabs groupId="gdpr-regs">
<TabItem value="regulation" label="GDPR regulation">

| Data protection | Support level |
|-----------------|---------------|
| [Data protection by design](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/obligations/what-does-data-protection-design-and-default-mean_en "The use of pseudonymisation (replacing personally identifiable material with artificial identifiers) and encryption (encoding messages so only those authorised can read them)") | ![Single check mark green](./_common/check-mark-single-green.svg) |
| [Data protection by default](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/obligations/what-does-data-protection-design-and-default-mean_en "A social media platform should be encouraged to set users’ profile settings in the most privacy-friendly setting by, for example, limiting from the start the accessibility of the users’ profile so that it isn’t accessible by default to an indefinite number of persons") | ![Single check mark](./_common/check-mark-single.svg) |
| [Obligations in the event of a data breach](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/obligations/what-data-breach-and-what-do-we-have-do-case-data-breach_en "Your company has to notify the supervisory authority without undue delay, and at the latest within 72 hours after having become aware of the breach; If the data breach poses a high risk to those individuals affected then they should all also be informed") | ![Double check mark green](./_common/check-mark-double-green.svg) |
| [Transfer of data outside the EU](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/obligations/what-rules-apply-if-my-organisation-transfers-data-outside-eu_en "The protection offered by the General Data Protection Regulation (GDPR) travels with the data, meaning that the rules protecting personal data continue to apply regardless of where the data lands") | ![Double check mark green](./_common/check-mark-double-green.svg) |

</TabItem>
<TabItem value="ory" label="Ory's role">

| Data protection | Ory's role |
|-----------------|------------------|
| Data protection by design | Ory protects personal data with the highest standards in data protection (for details, see [Integrity and confidentiality](#integrity-and-confidentiality)). |
| Data protection by default | By default, personal data is accessible only to the owner of the data. |
| Obligations in the event of a data breach | Ory implements multiple technical measures to guard against data breaches and has policies in place to respond to a data breach, in the unlikely event of one occurring. |
| Transfer of data outside the EU | Ory provides the option of storing personal data on EU servers, with an EU based operations team, which provides the most practical way to stay in compliance with GDPR. |

</TabItem>
<TabItem value="customersupports" label="Customer's role">

| Data protection | Customer's role |
|-----------------|-----------------------|
| Data protection by design | The parts of your application that process personal data must also uphold high standards of data protection (including encrypted communication). |
| Data protection by default | If your application is capable of exposing personal data to other users (for example, social media), this data must remain hidden by default. |
| Obligations in the event of a data breach | In the event of a data breach occurring, you must comply with the reporting obligations laid down in the GDPR regulations. |
| Transfer of data outside the EU | Transferring personal data of EU citizens outside the EU is severely restricted and is currently not permitted for most countries in the world (including the US). |

</TabItem>
</Tabs>
```

```mdx-code-block
<Tabs groupId="gdpr-regs">
<TabItem value="regulation" label="GDPR regulation">

| Principles of the GDPR | Support level |
|------------------------|---------------|
| [Lawful and transparent data processing](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Data must be processed in a lawful and transparent manner") | ![Single check mark](./_common/check-mark-single.svg) |
| [Specifity of purpose](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Must be specific purposes for processing the data") | ![Single check mark](./_common/check-mark-single.svg) |
| [Data minimization](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Collect and process only the personal data that is necessary to fulfil the specific purpose") | ![Single check mark](./_common/check-mark-single.svg) |
| [Accuracy](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Must ensure the personal data is accurate and up-to-date") | ![Single check mark green](./_common/check-mark-single-green.svg) |
| [Repurposing](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Cannot use personal data for other purposes that aren’t compatible with the original purpose") | ![Single check mark](./_common/check-mark-single.svg) |
| [Storage limitation](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Must ensure that personal data is stored for no longer than necessary") | ![Single check mark](./_common/check-mark-single.svg) |
| [Integrity and confidentiality](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en "Must install appropriate technical and organisational safeguards that ensure the security of the personal data") | ![Double check mark green](./_common/check-mark-double-green.svg) |

</TabItem>
<TabItem value="ory" label="Ory's role">

| Principles of the GDPR | Ory's role |
|------------------------|------------------|
| Lawful and transparent data processing | By default, Ory uses personal data only for basic account operations, with no significant legal implications. |
| Specifity of purpose | By default, Ory uses personal data only for basic account operations. |
| Data minimization | When using the default identity schemas, Ory stores just enough personal data for basic account operations. |
| Accuracy | When the Ory _account settings_ self-service flow is enabled, users can directly view and manage their own personal data to keep it accurate and up-to-date. |
| Repurposing | By default, Ory stores personal data only for the purpose of basic account operations. |
| Storage limitation | Ory provides an API for deleting user accounts and, by default, records the date and time of account creation, which makes it possible to implement a storage limitation on a user's personal data. |
| Integrity and confidentiality | Ory implements comprehensive technical measures to ensure data integrity and confidentiality&mdash;see [Integrity and confidentiality](#integrity-and-confidentiality) for details. |

</TabItem>
<TabItem value="customersupports" label="Customer's role">

| Principles of the GDPR | Customer's role |
|------------------------|-----------------------|
| Lawful and transparent data processing | You must ensure that your application processes personal data in a lawful and transparent manner. |
| Specifity of purpose | There must be a specific purpose for the personal data that you collect and you must indicate this specific purpose to the user when collecting the data. |
| Data minimization | You must store and process only the data that is needed for the purposes you have specified to the user. |
| Accuracy | You must ensure that a user's personal data is accurate and up-to-date. |
| Repurposing | You must ensure that the personal data is not used for another purpose that is not compatible with the original purpose. |
| Storage limitation | You must ensure that personal data is stored for no longer than is necessary (this depends on the purpose for which the data was collected). |
| Integrity and confidentiality | When processing personal data in your application, you must implement technical measures to ensure data integrity and confidentiality. |

</TabItem>
</Tabs>
```

Where the support levels in this table are, as follows:

- ![Single check mark](./_common/check-mark-single.svg) - Compliance with this GDPR regulation is mainly the responsibility of the
  customer.
- ![Single check mark green](./_common/check-mark-single-green.svg) - Ory Network is compliant and/or facilitates compliance with
  this GDPR regulation.
- ![Double check mark green](./_common/check-mark-double-green.svg) - Ory Network has special features that strongly support
  compliance with this aspect of GDPR.

:::caution

The purpose of the preceding checklist is to help you understand how Ory Network can assist you with making your applications and
systems GDPR compliant. This checklist does not list the complete provisions of the GDPR and is **not** a substitutes for due
diligence and conducting your own research. Only the text of the General Data Protection Regulation (GDPR) has legal force.

:::

### EU based servers

In the context of the GDPR, cross-border transfers of personal data are problematic. The GDPR rules for international data
transfer are derived from the principle that _"protection offered by the General Data Protection Regulation (GDPR) travels with
the data"_. Transferring data to a third country outside the EU is therefore not generally permitted, unless the the EU accepts
that the destination country upholds data protection standards equivalent to GDPR. The only exceptions are for those countries the
EU has certified as a _safe destination_ for data, through a so-called "Adequacy Decision". Unfortunately, until now very few
countries have been certified, and the list of certified countries does **not** include the US.

Hence, in most cases, in order to be GDPR compliant, your company needs to store personal data for European customers on EU based
servers. With Ory Network, you can choose to store all of your identity data on EU based servers, which ensures compliance with
this aspect of GDPR.

### Integrity and confidentiality

The GDPR requires companies to take technical measures to ensure data integrity and confidentiality. At Ory, data integrity and
confidentiality are central to our mission and we adhere to recommended industry standards and security practices to ensure your
data remains safe. In particular, these measures include:

- Ory Network forces HTTPS for all services using TLS 1.2 or higher, including our public website, the Ory Console, and the Ory
  Network APIs to ensure data is encrypted in transit.
- Any data stored by the Ory Network is encrypted at rest using industry best practice standard AES-256 Password Encryption Ory
  uses salted bcrypt to ensure passwords are stored securely.
- The Ory Network implements a backup strategy to ensure regular backups are created and stored in an encrypted fashion.

### Protection against data breaches

The GDPR also requires companies to protect personal data and prevent data breaches. Ory has multiple policies and technical
measures in place to keep your data safe:

- **Vulnerability management** &mdash; Ory embeds vulnerability scans into the CI/CD pipelines and scans all containers built for
  deployment. In addition, at runtime all containers running in our clusters are scanned continuously to report findings.

- **Third party penetration testing** &mdash; Third party pen tests are conducted on a quarterly basis to ensure regular
  verification of our systems and procedures.

- **Bug bounty program** &mdash; Ory's disclosure and reward program supports anyone who wants to increase the security of the Ory
  Network by conducting external pen testing.

- **Secure cloud deployment** &mdash; Google Cloud Platform provides secure and scalable infrastructure that meets Ory's strict
  requirements and compliance needs.

- **Logging and audit trail** &mdash; Ory uses logging in its cloud network. enabling forensic analysis of potential incidents.
