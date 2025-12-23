import { startCase, camelCase } from "lodash";

/**
 * Converts a kebab-case string to PascalCase.
 * @param str - The kebab-case string to convert
 * @returns The PascalCase version of the string
 * @example kebabToPascal('hello-world') // 'HelloWorld'
 */
export const kebabToPascal = (str: string): string => {
  return startCase(camelCase(str)).replace(/ /g, "");
};
