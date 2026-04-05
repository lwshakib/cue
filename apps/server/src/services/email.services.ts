import { Resend } from "resend";
import { RESEND_API_KEY } from "../envs.js";
import { SendMailEnum } from "../constants.js";

/**
 * Interface for email sending options.
 */
interface SendEmailOptions {
  to: string;
  url: string;
  token?: string;
  user: {
    name: string;
    email: string;
  };
}

/**
 * Service to handle transactional emails using Resend.
 */
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(RESEND_API_KEY);
  }

  /**
   * Send a transactional email based on the specified type.
   */
  public async sendEmail(type: SendMailEnum, options: SendEmailOptions): Promise<void> {
    const { to, url, user } = options;

    console.log(`[EmailService] Preparing to send ${type} to ${to}`);

    let subject = "";
    let html = "";

    switch (type) {
      case SendMailEnum.VERIFY_EMAIL:
        subject = "Axonix | Verify your identity";
        html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #22d3ee;">Init_Identity Protocol</h2>
            <p>Salutations, <strong>${user.name}</strong>.</p>
            <p>To finalize your node registration, please synchronize your identity link below:</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #22d3ee; color: #000; text-decoration: none; font-weight: bold; margin-top: 10px;">PROCEED_SYNC</a>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not initiate this request, please ignore this broadcast.</p>
          </div>
        `;
        break;

      case SendMailEnum.RESET_PASSWORD:
        subject = "Axonix | Secure Protocol Reset";
        html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #22d3ee;">Secure Gateway Reset</h2>
            <p>Access request detected for <strong>${user.email}</strong>.</p>
            <p>Execute the following link to reset your secure protocol:</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #22d3ee; color: #000; text-decoration: none; font-weight: bold; margin-top: 10px;">RESET_PWD</a>
          </div>
        `;
        break;

      default:
        throw new Error(`[EmailService] Unrecognized email type: ${type}`);
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: "Axonix <onboarding@resend.dev>", // Default Resend domain for testing
        to: [to],
        subject,
        html,
      });

      if (error) {
        console.error(`[EmailService] Failed to send email:`, error);
        throw new Error("Email dispatch failed.");
      }

      console.log(`[EmailService] ${type} sent successfully to ${to}. ID: ${data?.id}`);
    } catch (err) {
      console.error(`[EmailService] Unexpected error:`, err);
      throw err;
    }
  }
}

export const emailService = new EmailService();

/**
 * Standardized wrapper for sending emails.
 */
export const sendEmail = async (type: SendMailEnum, options: SendEmailOptions) => {
  return await emailService.sendEmail(type, options);
};
