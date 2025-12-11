import type { SVGProps, ReactNode, CSSProperties} from 'react';
import { SiBluesky } from '@icons-pack/react-simple-icons';

// SVG Source: https://svgl.app/
function Bluesky(props: SVGProps<SVGSVGElement>): ReactNode {
  return (
    <SiBluesky {...props} />
  );
}
export default Bluesky;
