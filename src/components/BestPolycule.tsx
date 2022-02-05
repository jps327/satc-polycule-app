import PolyculeCard from './PolyculeCard';
import type { Polycule } from '../types';

type Props = {
  onCardClick: (polycule: Polycule) => void;
  polycule: Polycule;
};

export default function BestPolycule({
  onCardClick,
  polycule,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl tracking-wider uppercase">best polycule</h1>
      <PolyculeCard
        key={polycule.id}
        onCardClick={onCardClick}
        polycule={polycule}
        position={1}
        size="large"
      />
    </div>
  );
}
