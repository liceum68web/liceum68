import { filterChildrenByDisplayNames } from "@/lib/utils";

import { globalMenuItemDisplayName } from "./constants";

export const filterMenuItemsFromChildren = filterChildrenByDisplayNames([
  globalMenuItemDisplayName,
]);
