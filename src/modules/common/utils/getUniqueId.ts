let id = 0;
/**
 * Returns a unique id.
 */
export function getUniqueId(): string {
  return `${id++}`;
}
