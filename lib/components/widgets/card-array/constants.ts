import { ArrayLayoutType } from "@/lib/types";

import {
  columnLayoutClass,
  gridLayoutClass,
  rowLayoutClass,
} from "./card-array.styles";

export const cardArrayLayoutTypeMap: Record<ArrayLayoutType, string> = {
  [ArrayLayoutType.GRID]: gridLayoutClass,
  [ArrayLayoutType.ROW]: rowLayoutClass,
  [ArrayLayoutType.COLUMN]: columnLayoutClass,
};
