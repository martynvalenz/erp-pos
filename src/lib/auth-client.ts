import {
  customSessionClient,
  inferAdditionalFields,
  jwtClient,
  lastLoginMethodClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
    lastLoginMethodClient(),
    jwtClient(),
  ],
});

export const {
  signIn,
  signUp,
  useSession,
  getSession,
  signOut,
  requestPasswordReset,
  resetPassword,
  sendVerificationEmail,
  isLastUsedLoginMethod,
  token,
} = authClient;

export async function getConvexToken({
  forceRefreshToken = false,
}: {
  forceRefreshToken?: boolean;
} = {}) {
  const result = await token({
    fetchOptions: {
      cache: forceRefreshToken ? "reload" : "no-cache",
    },
  });

  if (result.error) {
    console.error("Better Auth JWT token error:", result.error);
    return null;
  }

  return result.data?.token ?? null;
}
