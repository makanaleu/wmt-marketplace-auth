/**
 * Returns the current Epoch timestamp in milliseconds.
 */
export function epochInMilliseconds(): number {
  return Math.round((new Date()).getTime());
}
