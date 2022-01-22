import type { TraitKey, TraitMetadata } from '../types';

const TRAITS_METADATA: { [traitKey: string]: TraitMetadata } = {
  respectsOthers: {
    name: 'Mutual respect',
    description: '',
  },
  vulnerability: {
    name: 'Vulnerability',
    description: '',
  },
  trustsOthers: {
    name: 'Trust',
    description: '',
  },
  honest: {
    name: 'Honesty',
    description: '',
  },
  empathetic: {
    name: 'Empathy',
    description: '',
  },
  prioritizesKindness: {
    name: 'Prioritize kindness',
    description: '',
  },
  respectsBoundaries: {
    name: "Respect each other's boundaries",
    description: '',
  },
  committed: {
    name: 'Committed',
    description: '',
  },
  thoughtful: {
    name: 'Thoughtfulness',
    description: '',
  },
  forgivesOthers: {
    name: 'Forgive each other',
    description: '',
  },
  gentleToOthers: {
    name: 'Gentleness',
    description: '',
  },
  affectionate: {
    name: 'Affection',
    description: '',
  },
  appreciative: {
    name: 'Appreciate each other',
    description: '',
  },
  validatesOthers: {
    name: 'Validate each other',
    description: '',
  },
};

const TraitsUtil = {
  getName(traitKey: TraitKey): string {
    if (traitKey in TRAITS_METADATA) {
      return TRAITS_METADATA[traitKey].name;
    }

    return traitKey;
  },

  getDescription(traitKey: TraitKey): string {
    if (traitKey in TRAITS_METADATA) {
      return TRAITS_METADATA[traitKey].description;
    }

    return traitKey;
  },
};

export default TraitsUtil;
