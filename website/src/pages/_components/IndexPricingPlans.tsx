import { cn } from "@site/src/utils/twUtils";
import FxGlowEffect from "@site/src/utils/visual-effects/FxGlowEffect";

import Icon from "@site/src/components/Icon";

import indexStyles from '../index.module.scss';
import styles from './IndexPricingPlans.module.scss';

const PRICING_PLANS = [
  {
    name: 'Starter',
    description: 'Ideal for individuals and small teams starting their journey with essential features.',
    features: [
      { name: '20 Apps', icon: 'LucideLayoutGrid' },
      { name: '50 team members', icon: 'LucideUsers' },
      { name: '5 GB dataset storage', icon: 'LucideDatabaseZap' },
      { name: '6000/min API requests', icon: 'LucideGitPullRequestArrow' },
    ],
    price: {
      currency: 'USD',
      currencySymbol: '$',
      amount: 9,
      frequency: 'month',
    },
    action: 'Upgrade now',
  },
  {
    name: 'Pro',
    isMostPopular: true,
    description: 'Perfect for growing businesses requiring more advanced tools and higher limits.',
    features: [
      { name: '50 Apps', icon: 'LucideLayoutGrid' },
      { name: '100 team members', icon: 'LucideUsers' },
      { name: '50 GB dataset storage', icon: 'LucideDatabaseZap' },
      { name: '20,000/min API requests', icon: 'LucideGitPullRequestArrow' },
    ],
    price: {
      currency: 'USD',
      currencySymbol: '$',
      amount: 29,
      frequency: 'month',
    },
    action: 'Upgrade now',
  },
  {
    name: 'Enterprise',
    description: 'Tailored for large organizations needing custom solutions, priority support, and full scalability',
    features: [
      { name: 'Unlimited Apps', icon: 'LucideLayoutGrid' },
      { name: 'Unlimited team members', icon: 'LucideUsers' },
      { name: 'Unlimited dataset storage', icon: 'LucideDatabaseZap' },
      { name: 'Unlimited API requests', icon: 'LucideGitPullRequestArrow' },
    ],
    action: 'Contact us',
  },
];

export default function IndexPricingPlans() {
  return (
    <div
      className={cn(
        styles.pricingPlanGroup,
        'py-8 flex flex-col',
        'desktop:grid desktop:grid-cols-3 gap-8',
      )}
    >
      {PRICING_PLANS.map((plan) => (
        <FxGlowEffect
          as="div"
          key={plan.name}
          className={cn(
            styles.pricingPlan,
            plan.isMostPopular && styles.mostPopular,
          )}
          itemScope
          itemType="https://schema.org/Product"
          interactive
          glowOnInteract={!plan.isMostPopular}
        >
          <div
            className={cn(
              'size-full flex flex-col',
              indexStyles.secondaryCard,
              plan.isMostPopular && 'px-10 py-12 rounded-2xl transition-colors duration-slow border-1 border-solid border-primary/75',
            )}
          >
            <h2>
              <span itemProp="name">{plan.name}</span>

              {plan.isMostPopular && (
                <span className="
                  ml-2 px-3 py-1 rounded-full align-middle
                  text-theme-white text-xs font-normal leading-none
                  bg-gradient-to-r from-primary to-[#42ffa4]"
                >
                  Most popular
                </span>
              )}
            </h2>
            <p className="mb-0" itemProp="description">{plan.description}</p>

            <hr className="my-6" />

            <ul>
              {plan.features.map((feature) => (
                <li
                  key={feature.name}
                  itemProp="disambiguatingDescription"
                >
                  {feature.icon && <Icon icon={feature.icon as any} />}
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>

            {plan.price && (
              <div
                itemScope
                itemType="https://schema.org/Offer"
                itemProp="offers"
              >
                <div
                  className="mt-12"
                  itemScope
                  itemType="https://schema.org/PriceSpecification"
                  itemProp="priceSpecification"
                >
                  <span
                    className="font-medium text-[1.25rem] mx-0.5"
                    itemProp="priceCurrency"
                    content={plan.price.currency}
                  >
                    {plan.price.currencySymbol}
                  </span>

                  <span
                    className="font-bold text-[3rem] align-[-.2ex]"
                    itemProp="price"
                  >
                    {plan.price.amount}
                  </span>

                  <span
                    className="text-secondary text-sm before:content-['/']"
                    itemProp="unitText"
                    content={plan.price.frequency.toUpperCase()}
                  >
                    {plan.price.frequency}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-1" />

            <button className={cn(
              indexStyles.btn,
              'px-8 py-2 mt-12 block w-full border border-component rounded-lg transition-colors duration-slow',
              plan.isMostPopular
                ? [
                  '!text-theme-white bg-text-standard hover:bg-text-standard/80 focus-visible:bg-text-standard/80',
                  'bg-gradient-to-b from-transparent to-secondary shadow-[0_2px_0_rgb(var(--ragflow-color-primary))]',
                ]
                : 'bg-surface hover:bg-hover-overlay focus-visible:bg-hover-overlay',
            )}>
              {plan.action}
            </button>
          </div>
        </FxGlowEffect>
      ))}
    </div>
  );
}