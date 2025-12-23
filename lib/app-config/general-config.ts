import * as dictionary from "../constants/labels/dictionary.json";
import { getLabelByKey } from "../utils";

const getLabel = getLabelByKey(dictionary);

export const generalConfig = {
  fallbackTitle: getLabel("fallbackSiteTitle"),
  fallbackDescription: getLabel("fallbackSiteDescription"),
};
