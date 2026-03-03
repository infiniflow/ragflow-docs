import {
  useMemo,
  useRef,
} from 'react';

import { partition } from 'lodash-es';

import { cn } from '@site/src/utils/twUtils';

import testimonialStyles from './IndexTestimonials.module.scss';
import styles from '../index.module.scss';


const MOCK_TESTIMONIALS = [
  {
    name: 'John Doe',
    title: 'CEO',
    content: 'Testing out @ragflow\'s ETL.\nThis is the ETL we\'ve all been waiting for.',
  },
  {
    name: 'Jane Smith',
    title: 'CTO',
    content: 'Amazing product! The hybrid search feature is exactly what we needed.',
  },
  {
    name: 'Bob Johnson',
    title: 'Product Manager',
    content: 'RAGFlow has transformed how we handle our data pipeline.',
  },

  /*
  {
    name: 'Alice Williams',
    title: 'Data Scientist',
    content: 'The unified agent capabilities are outstanding. Highly recommended!',
  },
  {
    name: 'Charlie Brown',
    title: 'Engineering Lead',
    content: 'Best RAG solution we\'ve tried. The performance is incredible.',
  },
  {
    name: 'Samantha Lee',
    title: 'Lead ML Engineer',
    content: 'The onboarding process was seamless. Our team was productive in hours, not days.',
  },
  {
    name: 'David Kim',
    title: 'Solutions Architect',
    content: 'Love the attention to developer experience. The docs and UI are top notch.',
  },
  {
    name: 'Priya Patel',
    title: 'AI Researcher',
    content: 'We saw a 3x speedup in our RAG experiments after switching to RAGFlow.',
  },
  {
    name: 'Mark Evans',
    title: 'Head of AI Infrastructure',
    content: 'The flexible connectors and scalable ingestion engine are game changers.',
  },
  {
    name: 'Linda Martínez',
    title: 'VP of Engineering',
    content: 'Impressive support for custom data pipelines and hybrid semantic search!',
  },
  {
    name: 'Tomoko Suzuki',
    title: 'Principal Data Analyst',
    content: 'RAGFlow made it easy to unify siloed data and operationalize our LLM use cases.',
  },
  */
];

function TestimonialCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={cn(
      styles.card, testimonialStyles.card,
      'flex-none pointer-events-auto',
      'flex flex-col items-center justify-center',
    )}>
      <div className="text-sm text-secondary">{children}</div>
    </div>
  );
}

interface Props {
  testimonials?: typeof MOCK_TESTIMONIALS;
  duration?: number;
  speed?: number;
  gap?: string | number;
  itemWidth?: string | number;
  rows?: 1 | 2;
}

export default function IndexTestimonials({
  testimonials = MOCK_TESTIMONIALS,
  duration: _scrollDuration,
  speed: _speed = 5,
  gap: _gap = '2rem',
  itemWidth: _itemWidth = '330px',
  rows = 2,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const itemWidth = typeof _itemWidth === 'number' ? `${_itemWidth}px` : _itemWidth;
  const gap = typeof _gap === 'number' ? `${_gap}px` : _gap;
  const scrollDuration = typeof _scrollDuration === 'number' ? `${_scrollDuration}s` : _scrollDuration;

  const rowData = useMemo(() => {
    if (rows === 1) {
      return [testimonials];
    }

    const [_row1, _row2] = partition(testimonials, (_, index) => index % 2 === 0);
    const sameLength = _row1.length === _row2.length;

    return sameLength
      ? [testimonials, testimonials]
      : [[..._row1, ..._row2], [..._row2, ..._row1]];
  }, [testimonials, rows]);

  return (
    <div
      ref={containerRef}
      className={testimonialStyles.testimonial}
      style={{
        // @ts-ignore
        '--testimonial-inconsistent-rows': (rows.length !== 2 || rows[0].length === rows[1].length) ? 0 : 1,
        '--testimonial-card-width': itemWidth,
        '--testimonial-card-gap': gap,
        '--testimonial-animation-duration': (_scrollDuration != null
          ? scrollDuration
          : typeof _speed === 'number'
          ? `${_speed * rowData[0].length}s`
          : `calc(${_speed} * ${rowData[0].length})`
        ),
      }}
    >
      {rowData.map((row, index) => {
        const itemEls = row.map((t, index) => (
          <TestimonialCard key={index}>
            <div>{t.name}</div>
            <p>{t.title}</p>
            <p>{t.content}</p>
          </TestimonialCard>
        ));

        return (
          <div
            key={index}
            className={cn(testimonialStyles.row)}
          >
            {/* render twice to create the seamless loop */}
            {itemEls}
            {itemEls}
          </div>
        );
      })}
    </div>
  );
}
