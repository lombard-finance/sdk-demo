import { DependencyList, useMemo } from 'react';
import intl from 'react-intl-universal';

function useLocaleMemo<T = unknown>(
  memoFn: () => T,
  deps: DependencyList | undefined,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(memoFn, [
    ...(deps || []),
    intl.getInitOptions().currentLocale,
  ]);
}

export { useLocaleMemo };
