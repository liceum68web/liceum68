import { filterChildrenByDisplayNames } from "@/lib/utils";
import {
  globalNavbarButtonItemDisplayName,
  globalNavbarLinkItemDisplayName,
  globalNavbarLinkOutItemDisplayName,
} from "./constants";

export const filterNavbarItemsFromChildren = filterChildrenByDisplayNames([
  globalNavbarLinkItemDisplayName,
  globalNavbarLinkOutItemDisplayName,
  globalNavbarButtonItemDisplayName,
]);
