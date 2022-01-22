export type TraitKey =
  | 'respectsOthers'
  | 'vulnerability'
  | 'trustsOthers'
  | 'honest'
  | 'empathetic'
  | 'prioritizesKindness'
  | 'respectsBoundaries'
  | 'committed'
  | 'thoughtful'
  | 'forgivesOthers'
  | 'gentleToOthers'
  | 'affectionate'
  | 'appreciative'
  | 'validatesOthers';

export interface Trait {
  score: number;

  // 1 = not important at all, 5 = deal breaker
  importance: 1 | 2 | 3 | 4 | 5;
}

export interface Character {
  name: string;
  traits: {
    respectsOthers: Trait;
    vulnerability: Trait;
    trustsOthers: Trait;
    honest: Trait;
    empathetic: Trait;
    prioritizesKindness: Trait;
    respectsBoundaries: Trait;
    committed: Trait;
    thoughtful: Trait;
    forgivesOthers: Trait;
    gentleToOthers: Trait;
    affectionate: Trait;
    appreciative: Trait;
    validatesOthers: Trait;
  };
}

export interface ScoredTrait {
  key: TraitKey;
  score: number;
}

export interface TraitMetadata {
  name: string;
  description: string;
}

export interface Polycule {
  id: string;
  characters: readonly Character[];
  compatibility: {
    score: number;
    traits: readonly ScoredTrait[];
  };
}
