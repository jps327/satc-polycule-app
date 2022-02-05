import type { Character, TraitKey } from './types';

export const ANYONE = 'Anyone';

export const TRAITS: readonly TraitKey[] = [
  'respectsOthers',
  'vulnerability',
  'trustsOthers',
  'honest',
  'empathetic',
  'prioritizesKindness',
  'respectsBoundaries',
  'committed',
  'thoughtful',
  'forgivesOthers',
  'gentleToOthers',
  'affectionate',
  'appreciative',
  'validatesOthers',
];

export const CHARACTERS: readonly Character[] = [
  {
    name: 'Carrie',
    traits: {
      respectsOthers: {
        score: 0.6,
        importance: 3,
      },
      vulnerability: {
        score: 0.9,
        importance: 5,
      },
      trustsOthers: {
        score: 0.9,
        importance: 3,
      },
      honest: {
        score: 0.5,
        importance: 2,
      },
      empathetic: {
        score: 0.9,
        importance: 2,
      },
      prioritizesKindness: {
        score: 0.8,
        importance: 2,
      },
      respectsBoundaries: {
        score: 0.9,
        importance: 4,
      },
      committed: {
        score: 0.7,
        importance: 5,
      },
      thoughtful: {
        score: 0.6,
        importance: 3,
      },
      forgivesOthers: {
        score: 0.99,
        importance: 5,
      },
      gentleToOthers: {
        score: 0.6,
        importance: 2,
      },
      affectionate: {
        score: 0.9,
        importance: 3,
      },
      appreciative: {
        score: 0.6,
        importance: 3,
      },
      validatesOthers: {
        score: 0.6,
        importance: 4,
      },
    },
  },
  {
    name: 'Miranda',
    traits: {
      respectsOthers: {
        score: 0.9,
        importance: 4,
      },
      vulnerability: {
        score: 0.5,
        importance: 1,
      },
      trustsOthers: {
        score: 0.4,
        importance: 4,
      },
      honest: {
        score: 0.98,
        importance: 5,
      },
      empathetic: {
        score: 0.8,
        importance: 3,
      },
      prioritizesKindness: {
        score: 0.3,
        importance: 2,
      },
      respectsBoundaries: {
        score: 0.9,
        importance: 4,
      },
      committed: {
        score: 0.95,
        importance: 4,
      },
      thoughtful: {
        score: 0.7,
        importance: 4,
      },
      forgivesOthers: {
        score: 0.5,
        importance: 3,
      },
      gentleToOthers: {
        score: 0.6,
        importance: 2,
      },
      affectionate: {
        score: 0.3,
        importance: 1,
      },
      appreciative: {
        score: 0.6,
        importance: 3,
      },
      validatesOthers: {
        score: 0.6,
        importance: 4,
      },
    },
  },
  {
    name: 'Charlotte',
    traits: {
      respectsOthers: {
        score: 0.7,
        importance: 3,
      },
      vulnerability: {
        score: 0.99,
        importance: 5,
      },
      trustsOthers: {
        score: 0.95,
        importance: 3,
      },
      honest: {
        score: 0.95,
        importance: 4,
      },
      empathetic: {
        score: 0.95,
        importance: 3,
      },
      prioritizesKindness: {
        score: 0.99,
        importance: 2,
      },
      respectsBoundaries: {
        score: 0.95,
        importance: 3,
      },
      committed: {
        score: 1,
        importance: 5,
      },
      thoughtful: {
        score: 0.9,
        importance: 4,
      },
      forgivesOthers: {
        score: 0.95,
        importance: 4,
      },
      gentleToOthers: {
        score: 0.9,
        importance: 4,
      },
      affectionate: {
        score: 0.9,
        importance: 4,
      },
      appreciative: {
        score: 0.9,
        importance: 3,
      },
      validatesOthers: {
        score: 0.95,
        importance: 4,
      },
    },
  },
  {
    name: 'Samantha',
    traits: {
      respectsOthers: {
        score: 0.9,
        importance: 4,
      },
      vulnerability: {
        score: 0.8,
        importance: 1,
      },
      trustsOthers: {
        score: 0.3,
        importance: 2,
      },
      honest: {
        score: 0.95,
        importance: 5,
      },
      empathetic: {
        score: 0.4,
        importance: 2,
      },
      prioritizesKindness: {
        score: 0.5,
        importance: 2,
      },
      respectsBoundaries: {
        score: 0.3,
        importance: 4,
      },
      committed: {
        score: 0.3,
        importance: 1,
      },
      thoughtful: {
        score: 0.75,
        importance: 3,
      },
      forgivesOthers: {
        score: 0.9,
        importance: 4,
      },
      gentleToOthers: {
        score: 0.7,
        importance: 3,
      },
      affectionate: {
        score: 0.8,
        importance: 1,
      },
      appreciative: {
        score: 0.7,
        importance: 4,
      },
      validatesOthers: {
        score: 0.8,
        importance: 4,
      },
    },
  },
  {
    name: 'Steve',
    traits: {
      respectsOthers: {
        score: 0.95,
        importance: 4,
      },
      vulnerability: {
        score: 0.95,
        importance: 4,
      },
      trustsOthers: {
        score: 0.95,
        importance: 4,
      },
      honest: {
        score: 0.9,
        importance: 4,
      },
      empathetic: {
        score: 0.9,
        importance: 4,
      },
      prioritizesKindness: {
        score: 0.85,
        importance: 4,
      },
      respectsBoundaries: {
        score: 0.7,
        importance: 2,
      },
      committed: {
        score: 0.9,
        importance: 4,
      },
      thoughtful: {
        score: 0.8,
        importance: 3,
      },
      forgivesOthers: {
        score: 0.85,
        importance: 4,
      },
      gentleToOthers: {
        score: 0.8,
        importance: 2,
      },
      affectionate: {
        score: 0.99,
        importance: 4,
      },
      appreciative: {
        score: 0.9,
        importance: 4,
      },
      validatesOthers: {
        score: 0.9,
        importance: 4,
      },
    },
  },
  {
    name: 'Harry',
    traits: {
      respectsOthers: {
        score: 0.9,
        importance: 2,
      },
      vulnerability: {
        score: 0.95,
        importance: 3,
      },
      trustsOthers: {
        score: 0.85,
        importance: 3,
      },
      honest: {
        score: 0.95,
        importance: 4,
      },
      empathetic: {
        score: 0.75,
        importance: 3,
      },
      prioritizesKindness: {
        score: 0.8,
        importance: 2,
      },
      respectsBoundaries: {
        score: 0.7,
        importance: 4,
      },
      committed: {
        score: 0.9,
        importance: 3,
      },
      thoughtful: {
        score: 0.8,
        importance: 4,
      },
      forgivesOthers: {
        score: 0.85,
        importance: 3,
      },
      gentleToOthers: {
        score: 0.85,
        importance: 2,
      },
      affectionate: {
        score: 0.99,
        importance: 4,
      },
      appreciative: {
        score: 0.95,
        importance: 2,
      },
      validatesOthers: {
        score: 1,
        importance: 3,
      },
    },
  },
  {
    name: 'Smith',
    traits: {
      respectsOthers: {
        score: 1,
        importance: 4,
      },
      vulnerability: {
        score: 0.9,
        importance: 3,
      },
      trustsOthers: {
        score: 0.9,
        importance: 4,
      },
      honest: {
        score: 0.9,
        importance: 4,
      },
      empathetic: {
        score: 0.8,
        importance: 3,
      },
      prioritizesKindness: {
        score: 0.8,
        importance: 2,
      },
      respectsBoundaries: {
        score: 0.95,
        importance: 3,
      },
      committed: {
        score: 0.9,
        importance: 3,
      },
      thoughtful: {
        score: 0.9,
        importance: 3,
      },
      forgivesOthers: {
        score: 0.99,
        importance: 2,
      },
      gentleToOthers: {
        score: 0.8,
        importance: 2,
      },
      affectionate: {
        score: 0.8,
        importance: 3,
      },
      appreciative: {
        score: 0.9,
        importance: 3,
      },
      validatesOthers: {
        score: 0.8,
        importance: 3,
      },
    },
  },
  {
    name: 'Big',
    traits: {
      respectsOthers: {
        score: 0.3,
        importance: 2,
      },
      vulnerability: {
        score: 0.1,
        importance: 1,
      },
      trustsOthers: {
        score: 0.95,
        importance: 2,
      },
      honest: {
        score: 0.8,
        importance: 3,
      },
      empathetic: {
        score: 0.2,
        importance: 3,
      },
      prioritizesKindness: {
        score: 0.7,
        importance: 1,
      },
      respectsBoundaries: {
        score: 0.1,
        importance: 5,
      },
      committed: {
        score: 0.5,
        importance: 1,
      },
      thoughtful: {
        score: 0.7,
        importance: 2,
      },
      forgivesOthers: {
        score: 0.8,
        importance: 5,
      },
      gentleToOthers: {
        score: 0.8,
        importance: 4,
      },
      affectionate: {
        score: 0.7,
        importance: 2,
      },
      appreciative: {
        score: 0.3,
        importance: 4,
      },
      validatesOthers: {
        score: 0.2,
        importance: 4,
      },
    },
  },
];
