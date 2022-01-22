import PolyculeCard from './PolyculeCard';
import type { Polycule } from '../types';

type Props = {
  polycules: readonly Polycule[];
};

export default function FullList({ polycules }: Props): JSX.Element {
  const cards = polycules.map((polycule, i) => (
    <PolyculeCard
      key={polycule.id}
      polycule={polycule}
      position={i + 1}
      size="small"
    />
  ));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl tracking-wide uppercase">all polycules</h1>
      <div className="space-y-2">{cards}</div>
    </div>
  );
}
