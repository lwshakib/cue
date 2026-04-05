"use client";

import { useEffect, useState } from "react";

interface AuthOptions {
  onRequest?: () => void;
  onSuccess?: (ctx: any) => void;
  onError?: (ctx: { error: { message: string } }) => void;
}

interface EmailSignInOptions {
  email: string;
  password?: string;
  callbackURL?: string;
}

interface EmailSignUpOptions extends EmailSignInOptions {
  name: string;
}

/**
 * AuthClient Service
 * 
 * Centralizes the authentication redirection and API logic for the Axonix ecosystem.
 */
class AuthClient {
  private readonly BASE_URL: string;

  public signIn = {
    /**
     * Redirect to social OAuth provider
     */
    social: async (options: { provider: "google" | "github"; callbackURL?: string }) => {
      const { provider } = options;
      window.location.href = `${this.BASE_URL}/${provider}`;
    },

    /**
     * Authenticate via Email
     */
    email: async (options: EmailSignInOptions, callbacks?: AuthOptions) => {
      callbacks?.onRequest?.();
      try {
        const response = await fetch(`${this.BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Email authentication failed");
        }

        // Persist session token if provided
        if (data.sessionToken) {
          localStorage.setItem("axonix_session_token", data.sessionToken);
        }

        callbacks?.onSuccess?.(data);
      } catch (error: any) {
        callbacks?.onError?.({ error: { message: error.message } });
      }
    }
  };

  public signUp = {
    /**
     * Register via Email
     */
    email: async (options: EmailSignUpOptions, callbacks?: AuthOptions) => {
      callbacks?.onRequest?.();
      try {
        const response = await fetch(`${this.BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Registration failed");
        }

        callbacks?.onSuccess?.(data);
      } catch (error: any) {
        callbacks?.onError?.({ error: { message: error.message } });
      }
    }
  };

  /**
   * Custom React Hook to retrieve the current session.
   */
  public useSession() {
    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
      const fetchSession = async () => {
        const token = localStorage.getItem("axonix_session_token");
        if (!token) {
          setData(null);
          setIsPending(false);
          return;
        }

        try {
          const response = await fetch(`${this.BASE_URL}/session`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const session = await response.json();
            setData(session);
          } else {
            setData(null);
            localStorage.removeItem("axonix_session_token");
          }
        } catch (error) {
          console.error("[AuthClient] useSession synchronization failed:", error);
          setData(null);
        } finally {
          setIsPending(false);
        }
      };

      fetchSession();
    }, []);

    return { data, isPending };
  }

  /**
   * Request a password reset email.
   */
  public async forgetPassword(options: { email: string; callbackURL?: string }, callbacks?: AuthOptions) {
    callbacks?.onRequest?.();
    try {
      const response = await fetch(`${this.BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Password reset request failed");
      }

      callbacks?.onSuccess?.(data);
    } catch (error: any) {
      callbacks?.onError?.({ error: { message: error.message } });
    }
  }

  /**
   * Reset the password using a verification token.
   */
  public async resetPassword(options: { newPassword: string; token: string }, callbacks?: AuthOptions) {
    callbacks?.onRequest?.();
    try {
      const response = await fetch(`${this.BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Password reset failed");
      }

      callbacks?.onSuccess?.(data);
    } catch (error: any) {
      callbacks?.onError?.({ error: { message: error.message } });
    }
  }

  /**
   * Sign out and clear local session state.
   */
  public async signOut() {
    localStorage.removeItem("axonix_session_token");
    window.location.href = "/sign-in";
  }

  constructor() {
    this.BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/auth";
  }
}

export const authClient = new AuthClient();
