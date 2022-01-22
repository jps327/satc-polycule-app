let idCounter = 0;

// Generates a uniqueId for this browser session, basically in the same
// way that lodash does
export default function uniqueId(): string {
  idCounter += 1;
  return idCounter.toString();
}
