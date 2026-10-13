export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && locales.some((locale) => locale === value);

/**
 * Resolves either an app locale or an Accept-Language value to a supported
 * locale. Regional variants such as `es-MX` fall back to their base locale.
 */
export const resolveLocale = (value?: string | null): Locale => {
  if (!value) {
    return defaultLocale;
  }

  for (const language of value.split(",")) {
    const tag = language.split(";")[0]?.trim().toLowerCase();

    if (!tag) {
      continue;
    }

    if (isLocale(tag)) {
      return tag;
    }

    const baseLocale = tag.split("-")[0];
    if (isLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return defaultLocale;
};
