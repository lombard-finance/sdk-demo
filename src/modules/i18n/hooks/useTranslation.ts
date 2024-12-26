import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { uid } from 'react-uid';

import { Locale } from '../locales';
import { TFunction } from '../utils/t';
import { transformKey } from '../utils/transformKey';

export type Translation<
  T extends Record<string, string | Record<string, string>>,
> = Record<Locale, T>;

export type UseTranslationResult<
  T extends Record<string, string | Record<string, string>>,
> = {
  t: TFunction;
  keys: T;
  locale: Locale;
};

export function useTranslation<
  T extends Record<string, string | Record<string, string>>,
>(data: Translation<T>): UseTranslationResult<T> {
  const [id] = useState(uid(data));
  const [isLoaded, setIsLoaded] = useState(false);

  const keys = useMemo(() => {
    return Object.entries(data[Locale.en]).reduce((obj, [key, value]) => {
      return {
        ...obj,
        [key]: transformKey(id, key, value),
      };
    }, {} as T);
  }, [data, id]);

  useLayoutEffect(() => {
    if (isLoaded && intl.get(id)) {
      return;
    }

    const intlData = Object.entries(data).reduce((data, [locale, text]) => {
      return {
        ...data,
        [locale]: {
          [id]: text,
        },
      };
    }, {});

    intl.load(intlData);
    setIsLoaded(true);
  }, [data, id, isLoaded]);

  const t: TFunction = useCallback(
    (key, variables, withHTML) => {
      if (!isLoaded) {
        return key;
      }

      if (withHTML) {
        return intl.getHTML(key, variables) || key;
      }

      return intl.get(key, variables) || key;
    },
    [isLoaded],
  );

  return {
    t,
    keys,
    locale: Locale.en,
  };
}
