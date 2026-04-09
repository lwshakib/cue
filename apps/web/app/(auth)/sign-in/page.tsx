"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../../lib/auth-client";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.35 12.24c0-.72-.06-1.25-.19-1.8H12v3.48h5.38c-.11.87-.72 2.18-2.08 3.06l-.02.12 3.03 2.35.21.02c1.92-1.77 3.03-4.38 3.03-7.23Z" fill="#4285F4"/>
      <path d="M12 21.75c2.64 0 4.85-.87 6.47-2.37l-3.08-2.39c-.82.57-1.93.96-3.39.96-2.59 0-4.79-1.71-5.57-4.08l-.11.01-3.15 2.44-.04.11c1.61 3.18 4.9 5.32 8.87 5.32Z" fill="#34A853"/>
      <path d="M6.43 13.87A5.97 5.97 0 0 1 6.1 12c0-.65.12-1.28.32-1.87l-.01-.13-3.19-2.48-.1.05A9.74 9.74 0 0 0 2.25 12c0 1.58.38 3.07 1.06 4.43l3.12-2.56Z" fill="#FBBC05"/>
      <path d="M12 6.04c1.84 0 3.08.8 3.79 1.47l2.77-2.7C16.84 3.23 14.64 2.25 12 2.25 8.03 2.25 4.74 4.39 3.13 7.57l3.3 2.56C7.22 7.75 9.41 6.04 12 6.04Z" fill="#EA4335"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.24.78-.54 0-.27-.01-1.15-.01-2.09-3.19.69-3.86-1.35-3.86-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.67 0-1.25.45-2.28 1.17-3.08-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.17a10.86 10.86 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.6.23 2.78.11 3.07.73.8 1.17 1.83 1.17 3.08 0 4.41-2.69 5.38-5.25 5.66.41.35.78 1.03.78 2.09 0 1.5-.01 2.7-.01 3.06 0 .3.2.65.79.54A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/home/workflows`,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Signed in successfully");
          router.push("/home/workflows");
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-card/60 backdrop-blur-xl border border-border p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group overflow-hidden">
      {/* Scanning Line Decorator */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="h-full w-1/3 bg-primary animate-scan-line"></div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground font-orbitron">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border px-10 py-3 text-sm font-light text-foreground transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 rounded-none placeholder:text-muted-foreground/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground">Password</label>
              <Link href="/forgot-password" className="text-[10px] font-sans font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border px-10 py-3 text-sm font-light text-foreground transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 rounded-none placeholder:text-muted-foreground/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <div className="relative w-4 h-4 border border-border bg-background cursor-pointer group/check">
              <input 
                type="checkbox" 
                className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed" 
                disabled={loading}
              />
              <div className="absolute inset-0 bg-primary transform scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
            </div>
            <span className="text-[11px] font-sans font-medium text-muted-foreground uppercase tracking-wider">Remember me</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full border border-primary bg-primary/10 text-primary font-orbitron font-normal text-xs uppercase tracking-[0.2em] py-4 transition-all duration-300 overflow-hidden rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 w-full h-full bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-primary-foreground transition-colors duration-300 text-sm font-sans font-semibold">
              {loading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </form>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border"></div>
            <span className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground">Or sign in with</span>
            <div className="h-px flex-1 bg-border"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={async () => {
                 await authClient.signIn.social({
                   provider: "google",
                   callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/home/workflows`,
                 });
               }}
               disabled={loading}
               className="inline-flex items-center justify-center gap-2 border border-border bg-background py-3 text-[10px] font-sans font-medium text-muted-foreground uppercase tracking-widest hover:border-foreground/30 hover:bg-muted transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <GoogleIcon />
               <span>Google</span>
             </button>
             <button 
               onClick={async () => {
                 await authClient.signIn.social({
                   provider: "github",
                   callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/home/workflows`,
                 });
               }}
               disabled={loading}
               className="inline-flex items-center justify-center gap-2 border border-border bg-background py-3 text-[10px] font-sans font-medium text-muted-foreground uppercase tracking-widest hover:border-foreground/30 hover:bg-muted transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <GitHubIcon />
               <span>GitHub</span>
             </button>
          </div>
        </div>

        <p className="text-[11px] font-sans font-medium text-muted-foreground text-center mt-4">
          New to Axonix? <Link href="/sign-up" className="text-primary hover:text-primary/80 transition-colors">Create account</Link>
        </p>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-border/50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-border/50"></div>
    </div>
  );
}
