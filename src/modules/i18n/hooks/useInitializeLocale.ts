import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import { globalTranslation } from '../globalTranslation';
import { Locale } from '../locales';

export const useInitializeLocale = (): { isInitialized: boolean } => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(false);

    void intl
      .init({
        currentLocale: Locale.en,
        locales: globalTranslation,
        fallbackLocale: Locale.en,
      })
      .then(() => setIsInitialized(true));
  }, []);

  return { isInitialized };
};
