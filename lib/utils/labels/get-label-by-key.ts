export const getLabelByKey =
  (dictionary: Record<string, string>) =>
  (key: string): string => {
    if (!key) return "";

    return (dictionary as Record<string, string>)[key] ?? key;
  };
