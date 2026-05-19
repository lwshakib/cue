"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ShieldAlert, ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Identity credentials required.");
      return;
    }

    await authClient.forgetPassword(
      { email },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (data) => {
          toast.success("Recovery protocol initiated.");
          setSubmitted(true);
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(`Security Incident: ${ctx.error.message}`);
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-card/60 backdrop-blur-xl border border-border p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] group overflow-hidden">
      {/* Scanning Line Decorator */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="h-full w-1/3 bg-primary animate-scan-line"></div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Link href="/sign-in" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-2 h-2 bg-primary animate-pulse rounded-full shadow-[0_0_10px_rgba(var(--primary),1)]"></div>
      </div>

      <div className="mb-10 text-center">
        <ShieldAlert className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
        <h1 className="text-2xl font-normal tracking-tight text-foreground font-orbitron mb-2">
          Reset Password
        </h1>
        <p className="text-sm font-sans text-muted-foreground leading-relaxed">
          {submitted ? "Recovery link sent. Check your inbox." : "Enter your email address to receive a password reset link."}
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-primary/50 text-[10px]">Required</span>
            </label>
            <div className="relative group/input">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background/50 border border-border focus:border-primary/50 outline-none px-10 py-3 text-sm text-foreground font-sans placeholder:text-muted-foreground/30 transition-all focus:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group/btn relative w-full border border-primary/30 bg-primary/10 px-6 py-4 text-[11px] font-orbitron text-primary uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30_rgba(var(--primary),0.4)] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                SENDING...
              </span>
            ) : (
              <span className="relative z-10 flex items-center justify-center gap-2 font-sans font-semibold text-sm">
                Send Reset Link
              </span>
            )}
          </button>
        </form>
      ) : (
        <div className="bg-primary/10 border border-primary/20 p-6 text-center">
          <p className="text-sm font-sans text-primary mb-4">
            Recovery instructions sent to {email}. Please follow the link in your email to reset your password.
          </p>
          <Link
            href="/sign-in"
            className="inline-block border border-border bg-background px-6 py-3 text-[10px] font-sans font-medium text-foreground uppercase tracking-widest hover:border-foreground/30 hover:bg-muted transition-all text-sm"
          >
            Back to Sign In
          </Link>
        </div>
      )}

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-border/50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border/50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-border/50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-border/50"></div>
    </div>
  );
}
