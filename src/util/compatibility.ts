import jstat from 'jstat';

import { TRAITS } from '../constants';
import type { Character, TraitKey } from '../types';

const IMPORTANCE_MEAN = 0.5;
const IMPORTANCE_STD_DEV = 0.3035;
const GAUSSIAN_IMPORTANCE_LOOKUP = new Map<number, number>()
  .set(1, 1)
  .set(0, 0)
  .set(0.75, jstat.normal.cdf(0.75, IMPORTANCE_MEAN, IMPORTANCE_STD_DEV))
  .set(0.5, jstat.normal.cdf(0.5, IMPORTANCE_MEAN, IMPORTANCE_STD_DEV))
  .set(0.25, jstat.normal.cdf(0.25, IMPORTANCE_MEAN, IMPORTANCE_STD_DEV));

/**
 * Normalize importance using a gaussian distribution of mean 0.5, std dev 0.3035
 * Returned value is between 0 and 1
 */
function normalizeImportance(importance: 1 | 2 | 3 | 4 | 5): number {
  // get importance from 0 to 1
  const scaledImportance = (importance - 1) / 4;
  if (GAUSSIAN_IMPORTANCE_LOOKUP.has(scaledImportance)) {
    return GAUSSIAN_IMPORTANCE_LOOKUP.get(scaledImportance) || 0;
  }

  const normalizedImportance = jstat.normal.cdf(
    scaledImportance,
    IMPORTANCE_MEAN,
    IMPORTANCE_STD_DEV,
  );
  GAUSSIAN_IMPORTANCE_LOOKUP.set(scaledImportance, normalizedImportance);
  return normalizedImportance;
}

/**
 * Calculate the compatibility score of a polycule consisting of `characters`.
 *
 * @param characters - Array of characters in the polycule
 * @returns Object containing the overall score (a number between 0 and 1)
 * and an array of all traits with their respective scores.
 */
export default function compatibility(characters: readonly Character[]): {
  score: number;
  traits: ReadonlyArray<{ key: TraitKey; score: number }>;
} {
  const numCharacters = characters.length;

  const traitScores = TRAITS.map((traitKey: TraitKey) => {
    // calculate the trait estimate
    let traitSum = 0;
    characters.forEach(char1 => {
      characters.forEach(char2 => {
        if (char1 === char2) {
          return;
        }

        const T = char2.traits[traitKey].score;
        const I = normalizeImportance(char1.traits[traitKey].importance);
        const traitVal = T ** (2 * I);
        let reward = 0;
        if (I > 0.5) {
          reward = (1 - traitVal) * I * T * T * T;
        }

        traitSum += traitVal + reward;
      });
    });

    const traitEstimate = traitSum / (numCharacters * (numCharacters - 1));

    // calculate the stability score
    // get the average of the traits
    const traitAvg =
      characters.reduce((sum, c) => sum + c.traits[traitKey].score, 0) /
      numCharacters;
    const importanceAvg =
      characters.reduce(
        (sum, c) => sum + normalizeImportance(c.traits[traitKey].importance),
        0,
      ) / numCharacters;

    // now get the mean squared error of each character from the traitAvg
    // squaring it to punish larger differences
    const squaredErrorSum = characters.reduce((sum, c) => {
      const diff = traitAvg - c.traits[traitKey].score;
      return sum + diff * diff;
    }, 0);
    const meanSquaredError = squaredErrorSum / numCharacters;
    const stabilityScore = (1 - meanSquaredError) ** (2 * importanceAvg);

    // trait score is the traitAvg, punished by how big the difference
    // of the traits was
    return {
      key: traitKey,
      score: traitEstimate * stabilityScore,
    };
  });

  // add up all trait scores, then divide by num of traits
  const score = traitScores.reduce((sum, trait) => sum + trait.score, 0);
  return {
    score: score / TRAITS.length,
    traits: traitScores,
  };
}
