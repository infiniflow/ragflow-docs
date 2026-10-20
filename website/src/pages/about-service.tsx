import type { ReactNode } from 'react';

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import FxGradientText from '@site/src/utils/visual-effects/FxGradientText';
import { cn } from '@site/src/utils/twUtils';

import styles from './index.module.scss';

const FACTS = [
  { label: 'Application', value: 'RAGFlow' },
  { label: 'Category', value: 'Enterprise knowledge & AI agents' },
  { label: 'Deployment', value: 'RAGFlow Cloud or self-hosted' },
];

const CAPABILITIES = [
  {
    title: 'Enterprise knowledge bases',
    description:
      'Upload or connect your own documents, images and tables, then turn them into traceable knowledge with hybrid retrieval and cited answers.',
  },
  {
    title: 'Agent-native by design',
    description:
      'The knowledge base is exposed to agents through APIs and tools, so reasoning workflows retrieve grounded context instead of guessing.',
  },
  {
    title: 'Built-in agent harness',
    description:
      'Compose retrieval, tools, models and MCP servers into agents with visual workflows and run them where your data lives.',
  },
  {
    title: 'Open and self-hostable',
    description:
      'Use the hosted service, or deploy the open-source edition in your own environment when data residency or isolation is required.',
  },
];

const GOOGLE_DATA = [
  {
    title: 'Sign in with Google',
    data: 'Name, email address and profile picture',
    scopes: 'openid, email, profile',
    purpose:
      'Create, identify and secure your RAGFlow account, and keep your workspace access under your control.',
  },
  {
    title: 'Google Drive import',
    data: 'Only the files and folders you explicitly select, plus their metadata and content',
    scopes: 'Google Drive read-only',
    purpose:
      'Import that content into a knowledge base, index it, and keep it in sync so you can search and ask questions about it.',
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className='mt-24 first:mt-0'>
      <h2 id={id} className='text-2xl font-bold mb-8'>
        {title}
      </h2>
      <div className='space-y-4 leading-relaxed text-secondary'>{children}</div>
    </section>
  );
}

export default function AboutService(): ReactNode {
  return (
    <Layout
      title='RAGFlow'
      description='RAGFlow is an agent-native data platform for enterprise knowledge bases. Learn what the RAGFlow application does, how it uses Google user data, and how to revoke access.'
      wrapperClassName={styles.page}
    >
      <div className='container max-desktop:px-page text-standard text-sm mobile:text-base pb-32'>
        <div className='mx-auto max-w-4xl'>
          <header className='pt-16 mobile:pt-20 desktop:pt-24 pb-12 text-center'>
            <p className='text-xs uppercase tracking-[0.2em] text-secondary mb-6'>
              Application overview
            </p>

            <h1 className='text-5xl mobile:text-6xl font-bold mb-6'>
              <FxGradientText preset='primary' direction='right'>
                RAGFlow
              </FxGradientText>
            </h1>

            <p className='mx-auto max-w-2xl text-lg mobile:text-xl'>
              An agent-native data platform for enterprise knowledge. Build
              knowledge bases from your own documents and serve them to AI
              agents with citations.
            </p>

            <p className='mx-auto max-w-2xl mt-4 text-secondary'>
              This page describes the application, why it requests access to
              your Google Account, and how you stay in control of your data. No
              account or sign-in is required to read it.
            </p>
          </header>

          <div className='grid grid-cols-1 mobile:grid-cols-3 gap-4 mb-4'>
            {FACTS.map((fact) => (
              <div key={fact.label} className={cn(styles.card, 'text-center')}>
                <p className='text-xs uppercase tracking-[0.15em] text-secondary mb-2'>
                  {fact.label}
                </p>
                <p className='text-base font-medium'>
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <Section id='purpose' title='Purpose of the application'>
            <p>
              RAGFlow is used by teams to import their own business documents,
              build enterprise knowledge bases with hybrid retrieval, and run AI
              agents that answer questions from that content with traceable
              citations. Typical uses are enterprise search, document question
              answering, knowledge management and agent automation.
            </p>

            <p>
              RAGFlow is not a consumer social network, and it is not an image,
              audio or video generation product.
            </p>
          </Section>

          <Section id='what-is-ragflow' title='What RAGFlow is'>
            <p>
              RAGFlow turns scattered enterprise content into a single queryable
              context layer. Documents are parsed, chunked and indexed, and
              retrieval combines vector search, full-text search and re-ranking
              so that answers can cite the exact source passage.
            </p>

            <p>
              The platform is agent-native: the same knowledge base is exposed to
              agents through APIs and tools, so an agent harness — the
              orchestration layer that plans, calls tools and produces answers —
              can retrieve grounded context instead of guessing. RAGFlow ships
              with its own agent harness and also works with external harnesses
              you already run.
            </p>
          </Section>

          <Section id='capabilities' title='What you can do with RAGFlow'>
            <div className='grid grid-cols-1 desktop:grid-cols-2 gap-4'>
              {CAPABILITIES.map((capability) => (
                <article key={capability.title} className={cn(styles.card)}>
                  <h3 className='text-base font-semibold mb-2'>
                    {capability.title}
                  </h3>
                  <p className='text-sm text-secondary'>
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id='google-user-data'
            title='How RAGFlow uses Google user data'
          >
            <p>
              Google integrations are optional and activate only after you
              authorize them. RAGFlow requests only the scopes required for the
              features you turn on.
            </p>

            <div className='grid grid-cols-1 desktop:grid-cols-2 gap-4'>
              {GOOGLE_DATA.map((item) => (
                <article key={item.title} className={cn(styles.card)}>
                  <h3 className='text-base font-semibold mb-3'>{item.title}</h3>

                  <dl className='text-sm m-0 space-y-3'>
                    <div>
                      <dt className='text-xs uppercase tracking-[0.15em] text-secondary mb-1'>
                        Data accessed
                      </dt>
                      <dd className='m-0'>{item.data}</dd>
                    </div>
                    <div>
                      <dt className='text-xs uppercase tracking-[0.15em] text-secondary mb-1'>
                        Scopes
                      </dt>
                      <dd className='m-0'>
                        <code>{item.scopes}</code>
                      </dd>
                    </div>
                    <div>
                      <dt className='text-xs uppercase tracking-[0.15em] text-secondary mb-1'>
                        Why
                      </dt>
                      <dd className='m-0'>{item.purpose}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <p className='font-medium text-standard'>
              What we never do with Google user data:
            </p>

            <ul className='!list-disc !pl-6 space-y-2'>
              <li>We do not use it for advertising or ad personalization.</li>
              <li>We do not sell it.</li>
              <li>
                We do not use it to train or improve generalized AI or machine
                learning models.
              </li>
              <li>
                We do not transfer it to third parties except as needed to
                provide the feature you requested, to comply with law, or as part
                of a merger or acquisition.
              </li>
              <li>
                We do not allow humans to read it, except with your explicit
                consent, for security purposes, or to comply with law.
              </li>
            </ul>

            <p>
              RAGFlow&apos;s use of information received from Google APIs adheres
              to the{' '}
              <a
                href='https://developers.google.com/terms/api-services-user-data-policy'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </Section>

          <Section id='prohibited-uses' title='Prohibited uses'>
            <p>
              RAGFlow prohibits the use of the Services to create, request, store
              or distribute AI-generated non-consensual intimate imagery (NCII),
              child sexual abuse material (CSAM), or any other sexual content
              involving minors or real people without their consent.
            </p>

            <p>
              We do not use Google APIs to generate, host or distribute such
              content, and we suspend accounts that violate this policy. Our{' '}
              <Link to='/policies/terms'>Terms of Use</Link> set out these
              restrictions and their consequences.
            </p>
          </Section>

          <Section id='your-control' title='Your control over your data'>
            <ul className='!list-disc !pl-6 space-y-2'>
              <li>
                Revoke RAGFlow&apos;s access to your Google Account at{' '}
                <a
                  href='https://myaccount.google.com/permissions'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  myaccount.google.com/permissions
                </a>
                .
              </li>
              <li>
                Disconnect an integration in your RAGFlow workspace at any time;
                synchronization stops immediately.
              </li>
              <li>
                Request deletion of imported content and stored tokens by
                emailing{' '}
                <a href='mailto:privacy@ragflow.io'>privacy@ragflow.io</a>. We
                delete the associated data within 30 days, except where we are
                legally required to retain it.
              </li>
            </ul>

            <p>
              Full details are in our{' '}
              <Link to='/policies/privacy'>Privacy Policy</Link>.
            </p>
          </Section>

          <Section id='operator' title='Operator and policies'>
            <p>
              RAGFlow is operated by <strong>InfiniFlow Inc.</strong> Questions
              about this page, the application, or our data practices can be sent
              to <a href='mailto:privacy@ragflow.io'>privacy@ragflow.io</a> or
              through our <Link to='/contact-us'>contact page</Link>.
            </p>

            <p className='text-sm'>
              Registered address: Palm Grove Unit 4, 265 Smith Road, George Town,
              P.O. Box 52A Edgewater Way, #1653, Grand Cayman KY1-9006, Cayman
              Islands.
            </p>

            <div className='grid grid-cols-2 mobile:grid-cols-4 gap-3 pt-2'>
              {[
                { label: 'Privacy Policy', to: '/policies/privacy' },
                { label: 'Terms of Use', to: '/policies/terms' },
                { label: 'Cookie Policy', to: '/policies/cookies' },
                { label: 'Data Processing Agreement', to: '/policies/dpa' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    styles.card,
                    'block text-center text-sm hover:no-underline',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className='text-xs text-secondary'>
              Last updated: 2026-10-20
            </p>
          </Section>
        </div>
      </div>
    </Layout>
  );
}
