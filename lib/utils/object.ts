import { camelCase, isArray, isEmpty, isObject } from "lodash";

import { kebabToPascal } from "./text";

/**
 * Recursively converts all object keys to camelCase.
 *
 * - If the input is an array, all elements are processed recursively.
 * - If the input is an object, all keys are converted to camelCase and values are processed recursively.
 * - Non-object and empty values are returned as-is.
 *
 * @param {unknown} srcObj - The source object, array, or value to convert.
 * @returns {unknown} A new object, array, or value with all keys in camelCase.
 */
export const keysToCamelCase = (srcObj: unknown): unknown => {
  if (!isObject(srcObj) || isEmpty(srcObj)) {
    return srcObj;
  }

  if (isArray(srcObj)) {
    return srcObj.map(keysToCamelCase);
  }

  return Object.keys(srcObj).reduce<Record<string, unknown>>((acc, key) => {
    const camelKey = camelCase(key);
    acc[camelKey] = keysToCamelCase((srcObj as Record<string, unknown>)[key]);
    return acc;
  }, {});
};

/**
 * Creates an index mapping property values to their containing objects for fast lookups.
 * This provides O(1) lookup performance after O(n) initial indexing.
 *
 * @param {unknown} srcObj - The source object to index
 * @param {string} key - The property name to index on
 * @returns {Map<string, unknown>} Map of property values to containing objects
 */
export const createPropertyIndex = (
  srcObj: unknown,
  key: string,
): Map<string, unknown> => {
  const index = new Map<string, unknown>();

  if (!key) {
    return index;
  }

  const traverse = (current: unknown): void => {
    if (isArray(current)) {
      current.forEach(traverse);
    } else if (isObject(current) && !isEmpty(current)) {
      const record = current as Record<string, unknown>;

      // Index this object if it has the target property
      if (Object.hasOwn(record, key) && record[key] != null) {
        index.set(String(record[key]), current);
      }

      // Recursively traverse nested objects and arrays
      Object.values(record).forEach((value) => {
        if (isObject(value) || isArray(value)) {
          traverse(value);
        }
      });
    }
  };

  traverse(srcObj);
  return index;
};

/**
 * Fast lookup using a pre-built property index.
 *
 * @param {Map<string, unknown>} index - Pre-built index from createPropertyIndex
 * @param {string} keyValue - The value to look up
 * @returns {unknown} The matching object if found, null otherwise
 */
export const indexedLookUp = (
  index: Map<string, unknown>,
  keyValue: string,
): unknown => {
  return index.get(keyValue) || null;
};

/**
 * Recursively traverses an object/array and converts icon.name values from kebab-case to PascalCase.
 * @param srcObj - The source object, array, or primitive to process
 * @returns A new object with transformed icon.name values
 */
export const iconNameToPascalCase = <T>(srcObj: T): T => {
  if (srcObj === null || srcObj === undefined) {
    return srcObj;
  }

  if (Array.isArray(srcObj)) {
    return srcObj.map((item) => iconNameToPascalCase(item)) as T;
  }

  if (typeof srcObj === "object") {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(srcObj)) {
      if (key === "icon" && typeof value === "object" && value !== null) {
        const iconObj = value as Record<string, unknown>;
        result[key] = {
          ...iconObj,
          name:
            typeof iconObj.name === "string"
              ? kebabToPascal(iconObj.name)
              : iconObj.name,
        };
        // Recursively process other properties of the icon object
        for (const [iconKey, iconValue] of Object.entries(iconObj)) {
          if (iconKey !== "name") {
            (result[key] as Record<string, unknown>)[iconKey] =
              iconNameToPascalCase(iconValue);
          }
        }
      } else {
        result[key] = iconNameToPascalCase(value);
      }
    }

    return result as T;
  }

  return srcObj;
};
