import {
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
];

function TestimonialCard({ index }: { index: number }) {
  return (
    <div className={cn(
      styles.card, testimonialStyles.card,
      'flex-none pointer-events-auto',
      'flex flex-col items-center justify-center',
    )}>
      <div className="text-3xl font-bold mb-4">{index}</div>
      <div className="text-sm text-secondary">Pending to fill in data</div>
    </div>
  );
}

interface Props {
  testimonials?: typeof MOCK_TESTIMONIALS;
  scrollDuration?: number;
  gap?: string | number;
  itemWidth?: string | number;
}

export default function IndexTestimonials({
  testimonials = MOCK_TESTIMONIALS,
  scrollDuration = 60,
  gap = '2rem',
  itemWidth = '330px',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Partition the testimonials into two rows
  const [_row1, _row2] = partition(testimonials, (_, index) => index % 2 === 0);
  const sameLength = _row1.length === _row2.length;

  // Ensure the rows are the same length
  const [row1, row2] = sameLength
    ? [_row1, _row2]
    : [[..._row1, ..._row2], [..._row2, ..._row1]];

  const row1El = row1.map((testimonial, index) => (
    <TestimonialCard
      key={`row1-${index}`}
      index={index}
    />
  ));

  const row2El = row2.map((testimonial, index) => (
    <TestimonialCard
      key={`row2-${index}`}
      index={index}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={testimonialStyles.testimonial}
      style={{
        // @ts-ignore
        '--testimonial-inconsistent-rows': sameLength ? 0 : 1,
        '--testimonial-card-width': typeof itemWidth === 'number' ? `${itemWidth}px` : itemWidth,
        '--testimonial-card-gap': typeof gap === 'number' ? `${gap}px` : gap,
        '--testimonial-animation-duration': `${scrollDuration}s`,
      }}
    >
      {/* First Row */}
      <div className={cn(testimonialStyles.row)}>
        {row1El}
        {row1El}
      </div>

      {/* Second Row - Offset by 50% */}
      <div className={cn(testimonialStyles.row)}>
        {row2El}
        {row2El}
      </div>
    </div>
  );
}
