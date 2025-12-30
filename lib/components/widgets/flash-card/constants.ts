import { IconPaletteType } from "@/lib/types";

import {
  blueIconContainerClass,
  blueIconFrameClass,
  greenIconContainerClass,
  greenIconFrameClass,
  greyIconContainerClass,
  greyIconFrameClass,
  orangeIconContainerClass,
  orangeIconFrameClass,
  purpleIconContainerClass,
  purpleIconFrameClass,
  redIconContainerClass,
  redIconFrameClass,
} from "./flash-card.styles";

export const iconContainerClassMap = {
  [IconPaletteType.GREEN]: greenIconContainerClass,
  [IconPaletteType.RED]: redIconContainerClass,
  [IconPaletteType.BLUE]: blueIconContainerClass,
  [IconPaletteType.ORANGE]: orangeIconContainerClass,
  [IconPaletteType.PURPLE]: purpleIconContainerClass,
  [IconPaletteType.GRAY]: greyIconContainerClass,
};

export const iconFrameClassMap = {
  [IconPaletteType.GREEN]: greenIconFrameClass,
  [IconPaletteType.RED]: redIconFrameClass,
  [IconPaletteType.BLUE]: blueIconFrameClass,
  [IconPaletteType.ORANGE]: orangeIconFrameClass,
  [IconPaletteType.PURPLE]: purpleIconFrameClass,
  [IconPaletteType.GRAY]: greyIconFrameClass,
};
