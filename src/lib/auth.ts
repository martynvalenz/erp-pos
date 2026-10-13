import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { customSession, jwt, lastLoginMethod } from "better-auth/plugins";
import { getLocale } from "next-intl/server";
import { db } from "@/server/drizzle/db";
import * as drizzleSchema from "@/server/drizzle/schemas";
import randomColor from "@/functions/generateRandomColors";
import { sendEmailLink } from "@/services/resend-email-link";
import { sendNotificationEmail } from "@/services/resend-notification";
import { hashPassword, verifyPassword } from "./bcrypt";

const publicBaseUrl =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  "http://localhost:4000";

const options = {
  baseURL: publicBaseUrl,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: drizzleSchema,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24 * 10,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url: resetPasswordUrl }) => {
      const lang = await getLocale();
      await sendEmailLink({
        email: user.email,
        subject: lang === "es" ? "Recupera tu acceso" : "Reset your password",
        meta: {
          description:
            lang === "es"
              ? "Da click al vínculo para recuperar tu acceso"
              : "Please click the link below to reset your password.",
          link: String(resetPasswordUrl),
          button: lang === "es" ? "Click aquí" : "Click here",
        },
      });
    },
    onPasswordReset: async ({ user }) => {
      const lang = await getLocale();
      await sendNotificationEmail({
        email: user.email,
        subject:
          lang === "es" ? "Restablecimiento de contraseña" : "Password reset",
        meta: {
          description:
            lang === "es"
              ? "Tu contraseña se ha restablecido correctamente."
              : "Your password has been reset successfully.",
        },
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  user: {
    additionalFields: {
      userType: {
        type: "string",
        required: true,
        defaultValue: "USER",
      },
      color: {
        type: "string",
        required: true,
        defaultValue: randomColor(),
      },
    },
  },
  // databaseHooks: {
  //   user: {
  //     create: {
  //       after: async (user) => {
  //         await syncUserProfileToConvex({
  //           id: user.id,
  //           email: user.email,
  //           name: user.name,
  //           image: user.image,
  //           color: typeof user.color === "string" ? user.color : "#2655FFFF",
  //         });
  //       },
  //     },
  //   },
  // },
  plugins: [
    lastLoginMethod(),
    jwt({
      jwks: {
        keyPairConfig: {
          alg: "ES256",
        },
      },
    }),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      return {
        session: {
          expiresAt: session.expiresAt,
          token: session.token,
          userAgent: session.userAgent,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
          userType: user.userType,
          color: user.color,
        },
      };
    }, options),
    nextCookies(),
  ],
});
