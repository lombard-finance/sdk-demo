export function transformKey(
  id: string,
  key: string,
  value: string | Record<string, string>,
): string | Record<string, string> {
  if (typeof value === 'string') {
    return `${id}.${key}`;
  }

  return Object.keys(value).reduce(
    (obj, itemKey) => {
      return {
        ...obj,
        [itemKey]: `${id}.${key}.${itemKey}`,
      };
    },
    {} as Record<string, string>,
  );
}
