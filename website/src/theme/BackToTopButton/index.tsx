import { translate } from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useBackToTopButton } from '@docusaurus/theme-common/internal';

import { cn } from '@site/src/utils/twUtils';

export default function BackToTopButton() {
  const { shown, scrollToTop } = useBackToTopButton({ threshold: 300 });

  return (
    <button
      aria-label={translate({
        id: 'theme.BackToTopButton.buttonAriaLabel',
        message: 'Scroll back to top',
        description: 'The ARIA label for the back to top button',
      })}
      className={cn(
        'clean-btn',
        ThemeClassNames.common.backToTopButton,
        'fixed right-6 bottom-6 size-12 rounded-full',
        'z-50 opacity-0 scale-0 invisible transition-all bg-secondary-contrast-background/75 backdrop-blur-lg',
        shown && 'opacity-100 scale-100 visible',
      )}
      type="button"
      onClick={scrollToTop}
    >
      <svg
        className="size-5 lucide lucide-arrow-up-from-line-icon lucide-arrow-up-from-line"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <path d="m18 9 l-6 -6 l-6 6" />
        <path d="M12 3 v14" />
        <path d="M5 21 q7 0 14 0">
          <animate
            attributeName="d"
            values="
              M5 21 q7 0 14 0;
              M5 21 q7 4 14 0"
            dur="1s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".1 .8 .15 .98"
          />
        </path>
      </svg>
    </button>
  );
}
