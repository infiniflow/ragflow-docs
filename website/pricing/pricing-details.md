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
| App connections        | 5 (Fixed)         | 50                      | Unlimited       | Custom            |
| Monthly parsing quota  | 500 pages (Fixed) | 5,000 pages             | 20,000 pages    | Custom            |
| Peak protection        | N/A               | Priority                | Higher priority | Custom            |
| Overage                | N/A               | Tiered billing          | Tiered billing  | Custom            |
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

Self-service refunds are not supported. For special requests, submit an application via email or ticket.

- Consumed quotas or services are non-refundable.
- If an invoice was already issued, it must be voided/adjusted before a refund can be processed.
- Review takes **5–10 business days**. Approved refunds will be credited back via the original payment method.

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
