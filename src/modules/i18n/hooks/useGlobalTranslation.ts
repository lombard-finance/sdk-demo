import { globalTranslation } from '../globalTranslation';
import { Locale } from '../locales';
import { useTranslation, UseTranslationResult } from './useTranslation';

interface UseGlobalTranslationResult
  extends UseTranslationResult<(typeof globalTranslation)[Locale]> {}

/**
 * Custom hook to provide global translation functionality.
 *
 * This hook utilizes the `useTranslation` hook with a global translation context.
 */
export function useGlobalTranslation(): UseGlobalTranslationResult {
  return useTranslation(globalTranslation);
}
