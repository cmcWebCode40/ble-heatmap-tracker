import { appTheme, colors, Theme } from '@/constants';
import { useColorScheme } from 'nativewind';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode) => {
  switch (mode) {
    case 'dark':
      return {
        ...appTheme,
        colors: colors.dark,
      };
    case 'light':
      return {
        ...appTheme,
        colors: colors.light,
      };
    default:
      return {
        ...appTheme,
        colors: colors.light,
      };
  }
};

type DefaultContext = {
  theme: Theme;
  mode: ThemeMode;
  toggleColorScheme: (mode: ThemeMode) => void;
};

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<DefaultContext>({
  mode: 'light',
  toggleColorScheme: (mode: ThemeMode) => mode,
  theme: getTheme('dark') as Theme,
});

export const ThemeContextProvider: React.FunctionComponent<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(appTheme);
  const [mode, setMode] = useState<ThemeMode>('dark');
  const { colorScheme, setColorScheme } = useColorScheme();

  const updateAppTheme = useCallback((mode: ThemeMode) => {
    setMode(mode);
    setTheme(getTheme(mode));
    setColorScheme(mode);
  }, []);

  useEffect(() => {
    //TODO: setup persistent local storage then check for user previous settings
    (async () => {
      // const userColorPreference = await getFromAsyncStore(USER_COLOR_PREFERENCE);
      // if (userColorPreference) {
      //   updateAppTheme(userColorPreference as ThemeMode);
      // }
    })();
  }, [colorScheme, updateAppTheme]);

  const toggleColorScheme = useCallback(async (mode: ThemeMode) => {
    updateAppTheme(mode);
    // await saveToAsyncStore(USER_COLOR_PREFERENCE, mode);
  }, []);

  const values = useMemo(
    () => ({
      theme,
      toggleColorScheme,
      mode,
    }),
    [mode, toggleColorScheme, theme]
  );

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};
