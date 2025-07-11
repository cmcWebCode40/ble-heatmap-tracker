import { Theme } from '@/constants';
import { useMemo } from 'react';
import useTheme from './useTheme';


type Styles<T extends Record<string, unknown>> = (theme: Theme) => T;
const useThemedStyles = <T extends Record<string, unknown>>(styles: Styles<T>) => {
  const { theme } = useTheme();

  return useMemo(() => styles(theme), [styles, theme]);
};

export default useThemedStyles;
