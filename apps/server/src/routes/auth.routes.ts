import { Router } from "express";
import { auth, passportService } from "../services/auth.services.js";
import { postgresService } from "../services/postgres.services.js";
import { WEB_URL } from "../envs.js";

const router: Router = Router();

// --- Google Authentication Routes ---
router.get(
  "/google",
  passportService.passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passportService.passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const user: any = req.user;
      // Social login creates a session
      await postgresService.createSession(user.id, req.headers["user-agent"], req.ip);
      
      res.json({
        success: true,
        message: "Google_Protocol_Authorized",
        user,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// --- GitHub Authentication Routes ---
router.get(
  "/github",
  passportService.passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passportService.passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const user: any = req.user;
      // Social login creates a session
      await postgresService.createSession(user.id, req.headers["user-agent"], req.ip);

      res.json({
        success: true,
        message: "GitHub_Protocol_Authorized",
        user,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// --- Email Authentication Routes ---

/**
 * Handle Credentials-based Registration.
 * No session is created; user must verify email.
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await postgresService.findUserByEmail(email);
    const existingAccount = await postgresService.findAccount("credentials", email);

    let user = existingUser;
    if (!user) {
      user = await postgresService.createUser({ name, email });
    }

    if (existingAccount) {
      return res.status(400).json({ success: false, message: "Security Breach: Identity already registered." });
    }

    await postgresService.createAccount({
      userId: user.id,
      providerId: "credentials",
      accountId: email,
      password,
    });

    // Create Verification Protocol
    const verification = await postgresService.createVerification(email);
    const verificationUrl = `${WEB_URL}/verify?token=${verification.value}`;

    await auth.emailVerification.sendVerificationEmail({
      user: { name, email },
      url: verificationUrl,
      token: verification.value,
    });

    res.json({
      success: true,
      message: "Init_Identity_Success | Verification Broadcasted",
      user: { name, email },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Handle Credentials-based Sign-In.
 * Creates a unique session in the DB.
 */
router.post("/login", (req, res, next) => {
  passportService.passport.authenticate("local", async (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: info.message });

    try {
      // Check for email verification if enabled
      if (auth.emailAndPassword.requireEmailVerification && !user.emailVerified) {
        return res.status(403).json({ success: false, message: "Security Access Denied: Protocol verification required." });
      }

      // Create Session in DB
      const session = await postgresService.createSession(user.id, req.headers["user-agent"], req.ip);

      res.json({
        success: true,
        message: "Init_Sequence_Success",
        user,
        sessionToken: session.token,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  })(req, res, next);
});

/**
 * Handle Email Verification Protocol Callback.
 */
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ success: false, message: "Invalid payload: Token mismatch." });

  try {
    const verification = await postgresService.findVerificationByToken(token as string);
    if (!verification) return res.status(400).json({ success: false, message: "Security Protocol Mismatch: Invalid or expired token." });

    const user = await postgresService.findUserByEmail(verification.identifier);
    if (user) {
      await postgresService.verifyUserEmail(user.id);
      await postgresService.deleteVerification(verification.id);
      
      // Redirect to sign-in page with success
      res.redirect(`${WEB_URL}/sign-in?verified=true`);
    } else {
      res.status(404).json({ success: false, message: "Node Identity not found." });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Recover the current session.
 * Accepts Authorization: Bearer <token> header.
 */
router.get("/session", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: Missing session protocol." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { rows } = await postgresService.pool.query(
      'SELECT s.*, u.email, u.name, u.image, u."emailVerified" FROM session s JOIN "user" u ON s."userId" = u.id WHERE s.token = $1 AND s."expiresAt" > CURRENT_TIMESTAMP',
      [token]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired session." });
    }

    const sessionData = rows[0];
    res.json({
      success: true,
      session: {
        id: sessionData.id,
        expiresAt: sessionData.expiresAt,
        token: sessionData.token,
      },
      user: {
        id: sessionData.userId,
        email: sessionData.email,
        name: sessionData.name,
        image: sessionData.image,
        emailVerified: sessionData.emailVerified,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Handle Forgot Password Request.
 * Generates a verification token and sends an email.
 */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await postgresService.findUserByEmail(email);
    // Don't leak if user exists or not for security, but we do need to send email if they do.
    if (user) {
      const verification = await postgresService.createVerification(email);
      const resetUrl = `${WEB_URL}/reset-password?token=${verification.value}`;

      await auth.emailAndPassword.sendResetPassword({
        user: { name: user.name, email },
        url: resetUrl,
        token: verification.value,
      });
    }

    res.json({
      success: true,
      message: "If the identity exists, reset instructions have been broadcasted.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Handle Reset Password Execution.
 * Validates token and updates the DB.
 */
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: "Invalid payload: Missing token or password." });
  }

  try {
    const verification = await postgresService.findVerificationByToken(token);
    if (!verification) {
      return res.status(400).json({ success: false, message: "Security Protocol Mismatch: Invalid or expired token." });
    }

    // Update password
    await postgresService.updateAccountPassword(verification.identifier, newPassword);
    
    // Clean up used token
    await postgresService.deleteVerification(verification.id);

    // Trigger onPasswordReset hook
    const user = await postgresService.findUserByEmail(verification.identifier);
    if (user && auth.emailAndPassword.onPasswordReset) {
      await auth.emailAndPassword.onPasswordReset({ user });
    }

    res.json({
      success: true,
      message: "Identity Protocol Validated: Password Reset Successful.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
