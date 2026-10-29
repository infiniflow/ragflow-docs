---
sidebar_position: 10
slug: /details
---

# RAGFlow pricing and billing

**Limited-time promo:** RAGFlow billing is currently in beta. All plans enjoy limited-time discounts. Currently, **billing only applies to PDF parsing via DeepDoc**. Other parsing features are temporarily free.

## Introduction

RAGFlow uses a "base subscription + add-on packs + enterprise customization" billing model.

- Free plan: Best for evaluation and light testing.
- Team plans (small/medium): Designed for standard collaboration and scalable growth.
- Enterprise plan: Offers custom seats, storage, parsing quotas, and dedicated support.

Unless specified otherwise, all prices are in **USD** and billed **monthly**. Enterprise pricing is subject to individual contracts.

## Plan comparison

| Feature                | Free              | Small team              | Medium team     | Enterprise        |
| :--------------------- | :---------------- | :---------------------- | :-------------- | :---------------- |
| Doc QA                 | Supported         | Supported               | Supported       | Supported         |
| Agent / workflow       | Supported         | Supported               | Supported       | Supported         |
| Team seats             | 1 (Fixed)         | 5 (Fixed)               | 20 (Expandable) | Custom            |
| Knowledge base storage | 100 MB (Fixed)    | 5 GB                    | 50 GB           | Custom            |
| App count              | 5 (Fixed)         | 50                      | Unlimited       | Custom            |
| Monthly parsing quota  | 500 pages (Fixed) | 5,000 pages             | 20,000 pages    | Custom            |
| Peak protection        | N/A               | Priority                | Higher priority | Custom            |
| Overage                | N/A               | Tiered billing          | Tiered billing  | Custom            |
| API call support       | N/A               | Supported               | Supported       | Supported         |
| API rate limit         | 10/min            | 100/min                 | 1000/min        | Custom            |
| Support                | Community / docs  | Email / ticket (No SLA) | Priority ticket | Custom            |
| **Price**              | **$0**            | **$59**                 | **$259**        | **Contact sales** |

## Standard vs. add-on pricing

| Item    | Standard unit price | Add-on pack unit price |
| :------ | :------------------ | :--------------------- |
| Storage | $20 / GB / month    | $10 / GB / month       |
| Parsing | $0.05 / page        | $0.01 / page           |

## General billing rules

- Quota consumption: Plan quotas are consumed first. Once exhausted, you must purchase add-on packs to continue using the service.
- Free plan restrictions: The free plan cannot purchase add-ons. Once the free quota is exhausted, you must upgrade to a paid plan.
- Enterprise terms: Pricing, quotas, and billing terms for the enterprise plan are governed solely by the signed contract.

## Storage quota rules

Storage is measured in **GB** based on the actual size of your knowledge base.

### 1. Storage cycle & limits

- If your storage hits the limit, uploading or adding new content will be blocked. You can free up space by deleting files, upgrading your plan, or purchasing add-on packs.
- Unused plan storage quota does _not_ roll over to the next billing cycle.
- Add-on packs expire/renew in sync with your main subscription cycle.

### 2. Capacity release

- Deleting files instantly frees up space for use within the current cycle.
- Deleting files only releases occupied space; it does not increase your total plan quota.

### 3. Metric conversion

Storage uses standard decimal conversion:

> 1 GB = 1,000 MB = 1,000,000 KB = 1,000,000,000 Bytes

Usage is determined by the system backend metrics.

## Parsing billing

### What counts as 1 page?

For PDFs, 1 physical page equals 1 page.

### File type conversions

Currently, **only PDF parsing via DeepDoc** counts against your quota. Images, Word docs, spreadsheets, and TXT files are temporarily free.

### Failed & cancelled tasks

- Failures: Parsing failures caused by corrupted files, unsupported formats, encryption, or system errors do _not_ consume quota. Any incorrectly deducted quota will be refunded.
- Cancellations: If you cancel a task before completion, no quota is deducted. Completed tasks will be billed normally.

### Repeated parsing

Each upload or re-parsing request for the same file is treated as a new, independent task and will consume quota accordingly.

## Billing & payment

- Cycle & renewal: Subscriptions are billed monthly. Quotas reset at the start of each subscription cycle (e.g., if you subscribe on March 15 at 00:00, your cycle runs until April 15 before 00:00). Unused quotas do not roll over.
- Payment & invoicing: Credit cards are supported. Invoices can be requested in the console. Enterprise clients can contact sales for bank transfers and custom invoicing.
- Dashboard location: View your plan, usage, history, and add-on logs in the console.
- Plan modifications:
  - Upgrades: Immediate effect. Mid-cycle upgrades are prorated based on the remaining time.
  - Downgrades: Immediate mid-cycle downgrades are not supported. You can turn off auto-renew for the next cycle. No refunds for the current cycle.
  - Add-ons: Active immediately upon purchase. Terms are subject to the purchase page.

## Refund policy

_Last updated: October 29, 2026_

This Refund Policy applies to subscriptions purchased directly through RAGFlow\. Other purchases may be subject to separate refund terms\.

RAGFlow does not support self\-service refunds\. Refund requests must be submitted to RAGFlow Support and are reviewed on a case\-by\-case basis\. Submitting a refund request does not guarantee that a refund will be approved\.

### 1\. Refund Eligibility

Subscription fees are generally non\-refundable once charged\. However, RAGFlow may consider a refund in exceptional billing circumstances, such as duplicate charges, incorrect billing, or other billing errors where RAGFlow determines that a refund is appropriate\.

Refund requests are reviewed individually based on the circumstances of the transaction, applicable subscription terms, and applicable law\.

### 2\. Non\-Refundable Subscription Fees

Unless otherwise required by applicable law or expressly agreed by RAGFlow:

- Subscription fees already charged for the current billing period are non\-refundable\.

- RAGFlow does not provide prorated refunds for any unused portion of the current billing period\.

- Canceling a subscription does not result in a refund of fees already charged for that billing period\.

This applies even if the subscription is canceled shortly after the initial subscription payment or a renewal charge has been processed\.

### 3\. Subscription Cancellation

Users may cancel their RAGFlow subscription at any time through the available subscription management controls\. Cancellation takes effect at the end of the current paid billing period\.

- After cancellation, the user may continue to access and use the applicable paid subscription features until the end of the current billing period\.

- The subscription will not automatically renew for the next billing period, and no subscription fee will be charged for that next period\.

- At the end of the current billing period, the subscription expires and access to the applicable paid subscription features ends, unless the user subscribes again\.

For example, if a monthly subscription is canceled five days into the paid billing period, the user may continue using the subscription until the end of that billing period, but no refund will be issued for the unused days\. The same rule applies if the user cancels immediately after a subscription or renewal charge has been processed\.

### 4\. Refund Requests and Review

To request a refund, users must submit a request through RAGFlow Support and provide sufficient information for RAGFlow to identify the relevant subscription and transaction and evaluate the request\. This may include the account information associated with the subscription, relevant transaction or invoice details, the payment date and amount, the reason for the refund request, and any relevant supporting documentation\.

RAGFlow may contact the requester for additional information or documentation reasonably required to evaluate the request\. Refund reviews generally take **5–10 business days** after RAGFlow receives the information required to evaluate the request\. More complex requests may require additional review time\.

RAGFlow reserves the right to approve or deny a refund request in accordance with this Policy, applicable subscription terms, and applicable law\.

**Security notice:** Do not include full payment card numbers, passwords, API keys, access tokens, or other sensitive authentication information in a support request\.

### 5\. Invoices

If an invoice has already been issued for the relevant subscription charge, it may need to be voided, credited, or otherwise adjusted before an approved refund can be processed\.

Where applicable, RAGFlow may issue a credit note, revised invoice, or other appropriate billing document in connection with an approved refund\.

### 6\. Approved Refunds

If a refund is approved, RAGFlow will generally process the eligible refund amount through **Stripe**, RAGFlow's current payment processor, and return it to the original payment method used for the subscription payment, where possible\.

After RAGFlow initiates the refund, the time required for the refunded amount to appear in the user's account may vary depending on Stripe, the payment method, the bank or card issuer, and other relevant financial institutions\. This processing period is separate from the refund review period described in Section 4 and may be outside RAGFlow's control\.

### 7\. Cancellation and Refund Requests

Cancellation and refund requests are separate processes\. Canceling a subscription prevents future renewal after the current paid billing period but does not refund subscription fees already charged\.

If a user believes a subscription charge was duplicate, incorrect, or otherwise warrants exceptional review, the user must submit a separate refund request through **Support** **>** **Create Ticket** **>** **Billing** **&** **Invoicing**.

### 8\. Enterprise and Separately Contracted Services

This Refund Policy is intended for subscriptions covered by this Policy\. RAGFlow Enterprise, custom deployments, professional services, and other offerings purchased under a separate order form, quotation, purchase order, license agreement, statement of work, or other written agreement are governed by the applicable terms of those agreements\.

### 9\. Applicable Law

Nothing in this Refund Policy limits any refund, cancellation, withdrawal, or other consumer rights that cannot lawfully be waived or restricted\. Where applicable law provides mandatory refund or cancellation rights, those requirements will apply\.

### 10\. Changes to This Policy

RAGFlow may update this Refund Policy from time to time\. Any updated version will be posted on the applicable RAGFlow website or service and will become effective as stated in the updated policy\.

### 11\. Contact

For subscription refund or billing questions, sign in to your RAGFlow account and submit a ticket through **Support** **>** **Create Ticket** **>** **Billing** **&** **Invoicing**.

## Billing example

**Example:** A customer on the **small team plan** ($59/mo, includes 5 GB storage and 5,000 pages parsing) uses **7 GB storage** and **6,500 pages of parsing** in a month.

| Cost item      | Calculation                                | Amount  |
| :------------- | :----------------------------------------- | :------ |
| Base plan      | Small team plan                            | $59     |
| Storage add-on | 2 GB (7 - 5) × $10 / GB                    | $20     |
| Parsing add-on | 1,500 pages (6,500 - 5,000) × $0.01 / page | $15     |
| **Total cost** | **$59 + $20 + $15**                        | **$94** |

## Legal disclaimer

This page is for informational purposes to help users understand RAGFlow's billing structure. It does not replace or supersede any terms of service, procurement contracts, or enterprise agreements. In case of conflicts, the signed legal contracts shall prevail.
