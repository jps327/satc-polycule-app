import PolyculeCard from './PolyculeCard';
import type { Polycule } from '../types';

type Props = {
  onCardClick: (polycule: Polycule) => void;
  polycules: readonly Polycule[];
};

export default function HonorableMentions({
  onCardClick,
  polycules,
}: Props): JSX.Element {
  const cards = polycules.map((polycule, i) => (
    <PolyculeCard
      key={polycule.id}
      onCardClick={onCardClick}
      polycule={polycule}
      position={i + 2}
      size="medium"
    />
  ));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl tracking-wider uppercase">Honorable mentions</h1>
      {polycules.length === 0 ? (
        <p>There are no other polycules.</p>
      ) : (
        <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:space-x-12">
          {cards}
        </div>
      )}
    </div>
  );
}
