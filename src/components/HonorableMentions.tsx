import PolyculeCard from './PolyculeCard';
import type { Polycule } from '../types';

type Props = {
  polycules: readonly Polycule[];
};

export default function HonorableMentions({ polycules }: Props): JSX.Element {
  const cards = polycules.map((polycule, i) => (
    <PolyculeCard
      key={polycule.id}
      polycule={polycule}
      position={i + 2}
      size="medium"
    />
  ));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl tracking-wide uppercase">honorable mentions</h1>
      {polycules.length === 0 ? (
        <p>There are no other polycules.</p>
      ) : (
        <div className="flex space-x-12">{cards}</div>
      )}
    </div>
  );
}
