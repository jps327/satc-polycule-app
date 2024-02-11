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

export type Trait = {
  score: number;

  // 1 = not important at all, 5 = deal breaker
  importance: 1 | 2 | 3 | 4 | 5;
};

export type Character = {
  name: string;
  gender: 'Male' | 'Female' | 'Nonbinary';
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
};

export type ScoredTrait = {
  key: TraitKey;
  score: number;
};

export type TraitMetadata = {
  name: string;
  description: string;
};

export type Polycule = {
  id: string;
  characters: readonly Character[];
  compatibility: {
    score: number;
    traits: readonly ScoredTrait[];
  };
};
