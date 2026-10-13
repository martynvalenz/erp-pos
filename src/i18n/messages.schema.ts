import type { Locale } from "@/i18n/config";

type ValidationMessages = {
  validationFailed: string;
  required: (attribute: string) => string;
  email: (attribute: string) => string;
  min: (attribute: string, min: number) => string;
  max: (attribute: string, max: number) => string;
};

/**
 * Central validation rule messages, equivalent to Laravel's validation
 * language files. Schemas provide the translated attribute name.
 */
export const langMessages = {
  en: {
    validationFailed: "The given data was invalid.",
    required: (attribute) => `The ${attribute} field is required.`,
    email: (attribute) => `The ${attribute} must be a valid email address.`,
    min: (attribute, min) =>
      `The ${attribute} must be at least ${min} characters.`,
    max: (attribute, max) =>
      `The ${attribute} must not be greater than ${max} characters.`,
  },
  es: {
    validationFailed: "Los datos proporcionados no son válidos.",
    required: (attribute) => `El campo ${attribute} es obligatorio.`,
    email: (attribute) =>
      `El campo ${attribute} debe ser una dirección de correo válida.`,
    min: (attribute, min) =>
      `El campo ${attribute} debe tener al menos ${min} caracteres.`,
    max: (attribute, max) =>
      `El campo ${attribute} no debe tener más de ${max} caracteres.`,
  },
} satisfies Record<Locale, ValidationMessages>;
