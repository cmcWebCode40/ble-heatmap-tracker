import React from "react";

import { BluetoothProvider } from "./BluetoothContext";
import { ThemeContextProvider } from "./ThemeContext";

type AppContextProps = {
  children: React.ReactNode;
};
const AppContextProvider: React.FunctionComponent<AppContextProps> = ({
  children,
}) => {
  return (
    <ThemeContextProvider>
      <BluetoothProvider>{children}</BluetoothProvider>
    </ThemeContextProvider>
  );
};

export default AppContextProvider;
