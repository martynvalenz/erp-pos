import { Resend } from "resend";
import { env } from "@/env";
import { styles } from "@/email/styles";
import { logger } from "@/server/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailLogger = logger.child({ service: "resend-email-link" });

export const sendEmailLink = async ({
  email,
  subject,
  meta,
}: {
  email: string;
  subject: string;
  meta: {
    description: string;
    link: string;
    button: string;
  };
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_SENDER,
      to: email,
      subject: `${env.NEXT_PUBLIC_TITLE} - ${subject}`,
      html: `
      <div style="${styles.container}">
        <h1 style="${styles.heading}">${subject}</h1>
        <p style="${styles.paragraph}">${meta.description}</p>
        <a href="${meta.link}" style="${styles.link}">${meta.button}</a>
      </div>
      `,
    });
    if (error) {
      emailLogger.error({ err: error }, "Failed to send email link");
      return { data: null, error: error };
    }
    return { data, error: null };
  } catch (err) {
    emailLogger.error({ err }, "Failed to send email link");
    return { data: null, error: err };
  }
};
