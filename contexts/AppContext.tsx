import React from 'react';

import { ThemeContextProvider } from './ThemeContext';

type AppContextProps = {
  children: React.ReactNode;
};
const AppContextProvider: React.FunctionComponent<AppContextProps> = ({ children }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

export default AppContextProvider;
