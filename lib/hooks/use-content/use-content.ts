/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: implement content hook
import mockContentData from "./mock-navbar-content.temp.json";
import mockUserPreferenceData from "./mock-user-preference-menu-content.json";
import { headerNavbarSlug, userProfileMenuSlug } from "@/lib/constants";
export const useContent = (rawContent: any | undefined) => {
  const findContentBySlug = (slug: string): any => {
    if (slug === headerNavbarSlug) {
      return mockContentData;
    }
    if (slug === userProfileMenuSlug) {
      return mockUserPreferenceData;
    }

    return {};
  };

  return {
    findContentBySlug,
  };
};
