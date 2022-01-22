import PolyculeCard from './PolyculeCard';
import type { Polycule } from '../types';

type Props = {
  polycule: Polycule;
};

export default function BestPolycule({ polycule }: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl tracking-wide uppercase">best polycule</h1>
      <PolyculeCard
        key={polycule.id}
        polycule={polycule}
        position={1}
        size="large"
      />
    </div>
  );
}
