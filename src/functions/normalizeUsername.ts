import { env } from "@/env";

export function normalizeUsernameForLogin(username: string) {
  return username
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // optional: removes accents
    .replace(/\s+/g, ""); // removes all spaces
}

export function buildUsernameLoginEmail(
  username: string,
  organizationId: string,
) {
  const normalizedUsername = normalizeUsernameForLogin(username);

  return `${normalizedUsername}.${organizationId}@${env.INTERNAL_DOMAIN}`;
}
