import type { ReactNode, SVGProps } from 'react';

import { SiGithub } from '@icons-pack/react-simple-icons';

function GitHub(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <SiGithub {...props} />
  );
}
export default GitHub;
