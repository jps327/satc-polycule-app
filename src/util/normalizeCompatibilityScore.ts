import numeral from 'numeral';

/**
 * Normalize a compatbility score of 0-1 to a percentage string to 2 decimal
 * places
 */
export default function normalizeCompatibilityScore(score: number): string {
  return numeral(score).format('0.00%');
}
