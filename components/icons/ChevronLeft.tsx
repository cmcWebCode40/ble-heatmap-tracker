import React from "react";
import Svg, { Path } from "react-native-svg";

import { SvgIconProps } from "./types";

export const ChevronLeft: React.FunctionComponent<SvgIconProps> = ({
  color = "#0E010C",
  size = "24",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m-3.29 13.59L14.29 18l-6-6l6-6l1.42 1.41L11.12 12z"
      />
    </Svg>
  );
};
