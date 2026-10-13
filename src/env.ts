import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const string = z.string().min(1);

export const env = createEnv({
  server: {
    APP_ID: string,
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: string,
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,
    RESEND_API_KEY: string,
    EMAIL_SENDER: string,
    EMAIL_SENDER_NAME: string,
    INTERNAL_DOMAIN: string,
  },
  client: {
    NEXT_PUBLIC_TITLE: string.default("Cherry pick"),
    NEXT_PUBLIC_DESCRIPTION: string.default("Description"),
    NEXT_PUBLIC_APP_IMAGO: string,
    NEXT_PUBLIC_APP_LOGO: string,
    NEXT_PUBLIC_BASE_URL: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TITLE: process.env.NEXT_PUBLIC_TITLE,
    NEXT_PUBLIC_DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION,
    NEXT_PUBLIC_APP_IMAGO: process.env.NEXT_PUBLIC_APP_IMAGO,
    NEXT_PUBLIC_APP_LOGO: process.env.NEXT_PUBLIC_APP_LOGO,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
