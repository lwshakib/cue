/**
 * Server-Side Auth Utility for Axonix.
 * 
 * This file serves as a server-to-server bridge for authentication logic, 
 * optimizing session recovery and secure operations in Server Components and Actions.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/auth";

interface SignInOptions {
  body: {
    email: string;
    password?: string;
  };
  asResponse?: boolean;
}

interface SignUpOptions extends SignInOptions {
  body: {
    name: string;
    email: string;
    password?: string;
  };
}

/**
 * Server-Side Auth Object with API Methods.
 */
export const auth = {
  api: {
    /**
     * Fetch the current session on the server side.
     * Forwarding headers (like cookies) is essential for identity synchronization.
     */
    getSession: async (options: { headers: Headers }) => {
      const { headers } = options;
      
      try {
        const response = await fetch(`${BASE_URL}/session`, {
          method: "GET",
          headers: headers, // Forwarding cookies/tokens for session validation
        });

        if (!response.ok) return null;
        return await response.json();
      } catch (err) {
        console.error("[ServerAuth] getSession sequence failed:", err);
        return null;
      }
    },

    /**
     * Perform a server-side Sign-In via Email.
     * Returns a Response object if asResponse: true is specified.
     */
    signInEmail: async (options: SignInOptions) => {
      const { body, asResponse } = options;
      
      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (asResponse) return response;

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Security Access Denied");
        return data;
      } catch (err: any) {
        if (asResponse) {
           return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
        }
        throw err;
      }
    },

    /**
     * Perform a server-side Sign-Up via Email.
     * Returns a Response object if asResponse: true is specified.
     */
    signUpEmail: async (options: SignUpOptions) => {
      const { body, asResponse } = options;
      
      try {
        const response = await fetch(`${BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (asResponse) return response;

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Identity Registration Failed");
        return data;
      } catch (err: any) {
        if (asResponse) {
          return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
        }
        throw err;
      }
    },

    /**
     * Request a password reset email via server.
     */
    forgetPassword: async (options: { body: { email: string }, asResponse?: boolean }) => {
      const { body, asResponse } = options;
      
      try {
        const response = await fetch(`${BASE_URL}/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (asResponse) return response;

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Password reset request failed");
        return data;
      } catch (err: any) {
        if (asResponse) {
          return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
        }
        throw err;
      }
    },

    /**
     * Reset the password via server.
     */
    resetPassword: async (options: { body: { newPassword: string; token: string }, asResponse?: boolean }) => {
      const { body, asResponse } = options;
      
      try {
        const response = await fetch(`${BASE_URL}/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (asResponse) return response;

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Password reset failed");
        return data;
      } catch (err: any) {
        if (asResponse) {
          return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
        }
        throw err;
      }
    },
  },
};

