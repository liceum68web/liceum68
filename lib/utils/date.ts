import { format, parseISO } from "date-fns";
import { uk } from "date-fns/locale";

/**
 * Formats a date string according to the given format string using date-fns library.
 * If locale is provided, it will format the date accordingly.
 *
 * @param dateString
 * @param formatString
 * @returns Formatted date string
 */

export const formatDate =
  (formatString: string, locale?: string) =>
  (dateString: string): string => {
    return format(parseISO(dateString), formatString, {
      locale: uk,
    });
  };
