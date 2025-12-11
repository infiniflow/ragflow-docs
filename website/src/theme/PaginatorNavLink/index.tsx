import Link from '@docusaurus/Link';
import type {Props} from '@theme/PaginatorNavLink';
import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

export default function PaginatorNavLink(props: Props) {
  const {permalink, title, subLabel, isNext} = props;
  return (
    <Link
      className={cn(
        'p-6 rounded-md text-standard border border-solid border-component transition-colors',
        isNext && 'col-start-2 col-end-3 text-right',
      )}
      to={permalink}
    >
      <div className="text-secondary text-sm mb-2">
        {!isNext && <Icon icon="LucideArrowLeft" />}
        <span>{subLabel}</span>
        {isNext && <Icon icon="LucideArrowRight" />}
      </div>

      <div className="text-h3 font-medium">{title}</div>
    </Link>
  );
}
