import intl from 'react-intl-universal';

export type TFunction = (
  key: string,
  variables?: unknown,
  withHTML?: boolean,
) => string;

export const t: TFunction = (key, variables, withHTML) => {
  if (withHTML) {
    return intl.getHTML(key, variables) || key;
  }
  return intl.get(key, variables) || key;
};
