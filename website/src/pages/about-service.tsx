import type { ReactNode } from 'react';

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import FxGradientText from '@site/src/utils/visual-effects/FxGradientText';
import { cn } from '@site/src/utils/twUtils';

import styles from './index.module.scss';

const CAPABILITIES = [
  {
    title: 'Enterprise knowledge bases',
    description:
      'Ingest documents, images, tables and connected sources, then structure them into traceable knowledge that supports enterprise-scale retrieval.',
  },
  {
    title: 'Agent-native by design',
    description:
      'Knowledge is exposed as retrievable context for agents rather than as a dashboard-only search box, so reasoning workflows can call it directly.',
  },
  {
    title: 'Built-in agent harness',
    description:
      'Compose retrieval, tools, models and MCP servers into agents with visual workflows, and run them inside the same platform that holds your data.',
  },
  {
    title: 'Open and self-hostable',
    description:
      'Run RAGFlow Cloud, or deploy the open-source edition in your own environment when data residency or network isolation is required.',
  },
];

const GOOGLE_DATA = [
  {
    data: 'Basic Google Account profile: name, email address and profile picture',
    purpose:
      'Create and maintain your RAGFlow account, and identify you when you sign in with Google.',
  },
  {
    data: 'Google Drive items you explicitly select: file and folder names, IDs, MIME types, modified times and file contents',
    purpose:
      'Import the selected content into a knowledge base, index it, and keep it in sync so that you can search and ask questions about it in RAGFlow.',
  },
];

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-16 first:mt-0">
      <h2 id={id} className="text-2xl font-bold mb-6">
        {title}
      </h2>
      <div className="space-y-4 leading-relaxed">{children}</div>
    </section>
  );
}

export default function AboutService(): ReactNode {
  return (
    <Layout
      title="About RAGFlow"
      description="RAGFlow is an agent-native data platform for enterprise knowledge bases. Learn what the RAGFlow app does and how it uses Google user data."
      wrapperClassName={styles.page}
    >
      <div className="container max-desktop:px-page text-standard text-sm mobile:text-base pb-32">
        <div className="mx-auto max-w-4xl">
          <header className="pt-16 mobile:pt-20 desktop:pt-24 pb-4">
            <h1 className="text-4xl mobile:text-5xl font-bold mb-6">
              <FxGradientText preset="primary" direction="right">
                RAGFlow
              </FxGradientText>
            </h1>

            <p className="text-lg mobile:text-xl">
              RAGFlow is an agent-native data platform for enterprise
              knowledge. Teams use it to build enterprise-grade knowledge bases
              and to serve that knowledge to built-in and third-party agent
              harnesses.
            </p>

            <p className="mt-4 text-secondary">
              This page describes what the RAGFlow application does, why it
              requests access to your Google Account, and how you stay in
              control of your data. It is publicly available and requires no
              account or sign-in.
            </p>
          </header>

          <Section id="what-is-ragflow" title="What RAGFlow is">
            <p>
              RAGFlow turns scattered enterprise content into a single,
              queryable context layer. Documents are parsed, chunked and
              indexed, and retrieval combines vector search, full-text search
              and re-ranking so that answers can cite the exact source passage.
            </p>

            <p>
              The platform is <strong>agent-native</strong>: the same knowledge
              base is exposed to agents through APIs and tools, so an agent
              harness — the orchestration layer that plans, calls tools and
              produces answers — can retrieve grounded context instead of
              guessing. RAGFlow ships with its own agent harness and also works
              with external harnesses you already run.
            </p>
          </Section>

          <Section id="capabilities" title="What you can do with RAGFlow">
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4 mobile:gap-6">
              {CAPABILITIES.map((capability) => (
                <article key={capability.title} className={cn(styles.card)}>
                  <h3 className="text-base font-semibold mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-secondary">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="google-user-data"
            title="How RAGFlow uses Google user data"
          >
            <p>
              Google integrations in RAGFlow are optional and only activated
              after you explicitly authorize them. RAGFlow requests only the
              scopes required for the features you turn on.
            </p>

            <ul className="space-y-4 list-none p-0 m-0">
              {GOOGLE_DATA.map((item) => (
                <li key={item.data} className={cn(styles.card)}>
                  <p className="font-semibold mb-2">{item.data}</p>
                  <p className="text-sm text-secondary m-0">{item.purpose}</p>
                </li>
              ))}
            </ul>

            <p>
              Depending on the integration, the Google scopes requested are{' '}
              <code>openid</code>, <code>email</code> and <code>profile</code>{' '}
              for sign-in, and Google Drive read-only access when you choose to
              import Drive content.
            </p>

            <p className="font-medium">What we never do with Google user data:</p>

            <ul className="!list-disc !pl-6 space-y-2">
              <li>We do not use it for advertising or ad personalization.</li>
              <li>We do not sell it.</li>
              <li>
                We do not use it to train or improve generalized AI or machine
                learning models.
              </li>
              <li>
                We do not transfer it to third parties except as needed to
                provide the feature you requested, to comply with law, or as
                part of a merger or acquisition.
              </li>
              <li>
                We do not allow humans to read it, except with your explicit
                consent, for security purposes, or to comply with law.
              </li>
            </ul>

            <p>
              RAGFlow&apos;s use of information received from Google APIs
              adheres to the{' '}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </Section>

          <Section id="your-control" title="Your control over your data">
            <ul className="!list-disc !pl-6 space-y-2">
              <li>
                Revoke RAGFlow&apos;s access to your Google Account at{' '}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  myaccount.google.com/permissions
                </a>
                .
              </li>
              <li>
                Disconnect an integration inside your RAGFlow workspace at any
                time; synchronization stops immediately.
              </li>
              <li>
                Request deletion of imported content and stored tokens by
                emailing{' '}
                <a href="mailto:privacy@ragflow.io">privacy@ragflow.io</a>. We
                delete the associated data within 30 days, except where we are
                legally required to retain it.
              </li>
            </ul>

            <p>
              Full details are in our{' '}
              <Link to="/policies/privacy">Privacy Policy</Link>.
            </p>
          </Section>

          <Section id="operator" title="Operator and policies">
            <p>
              RAGFlow is operated by <strong>InfiniFlow Inc.</strong> Questions
              about this page, the application, or our data practices can be
              sent to <a href="mailto:privacy@ragflow.io">privacy@ragflow.io</a>{' '}
              or through our <Link to="/contact-us">contact page</Link>.
            </p>

            <p className="text-sm text-secondary">
              Registered address: Palm Grove Unit 4, 265 Smith Road, George
              Town, P.O. Box 52A Edgewater Way, #1653, Grand Cayman KY1-9006,
              Cayman Islands.
            </p>

            <ul className="!list-disc !pl-6 space-y-2">
              <li>
                <Link to="/policies/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/policies/terms">Terms of Use</Link>
              </li>
              <li>
                <Link to="/policies/cookies">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/policies/dpa">Data Processing Agreement</Link>
              </li>
              <li>
                <Link to="/docs">Documentation</Link>
              </li>
            </ul>

            <p className="text-sm text-secondary">
              Last updated: 2026-10-20
            </p>
          </Section>
        </div>
      </div>
    </Layout>
  );
}
