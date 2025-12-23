import * as dictionary from "../constants/labels/dictionary.json";
import { getLabelByKey as getLabelByKeyUtil } from "../utils";

export const useLabel = () => {
  return {
    getLabelByKey: getLabelByKeyUtil(dictionary),
  };
};
