"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { LockKeyhole, Loader2 } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Security mismatch: Missing override token.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Integrity check failed: Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Security mismatch: Password must be at least 8 characters.");
      return;
    }

    await authClient.resetPassword(
      { newPassword: password, token },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Security keys successfully overridden.");
          router.push("/sign-in?reset=true");
        },
        onError: (ctx) => {
          toast.error(`Override Failed: ${ctx.error.message}`);
          setLoading(false);
        },
      }
    );
  };

  if (!token) {
    return (
      <div className="relative z-10 w-full max-w-md bg-neutral-950/60 backdrop-blur-xl border border-white/10 p-10 md:p-12 text-center text-white">
        <h1 className="text-xl font-orbitron text-red-500 uppercase mb-4">Invalid Protocol Sequence</h1>
        <p className="text-sm font-mono text-neutral-400 mb-6">No secure override token detected in uplink.</p>
        <Link href="/forgot-password" className="border border-white/10 bg-black px-6 py-3 text-[10px] font-orbitron uppercase tracking-widest hover:border-white/30 hover:bg-white/5 transition-all">
          Request Override
        </Link>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-md bg-neutral-950/60 backdrop-blur-xl border border-white/10 p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] group overflow-hidden">
      {/* Scanning Line Decorator */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="h-full w-1/3 bg-cyan-400 animate-scan-line"></div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
        <div className="text-[10px] uppercase font-orbitron tracking-widest text-neutral-500">Node_Unlocked</div>
      </div>

      <div className="mb-10 text-center">
        <LockKeyhole className="w-12 h-12 text-cyan-500 mx-auto mb-4 opacity-80" />
        <h1 className="text-2xl font-normal tracking-tight text-white font-orbitron uppercase mb-2">
          New_Override_Key
        </h1>
        <p className="text-sm font-mono text-neutral-400 leading-relaxed">
          Inject new security credentials to restore node access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2 relative">
            <label className="text-[10px] font-orbitron uppercase tracking-[0.2em] text-neutral-500 flex items-center justify-between">
              <span>New_Credential</span>
              <span className="text-cyan-500/50">Required</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 outline-none px-4 py-3 text-sm text-white font-mono placeholder:text-neutral-700 transition-all focus:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-[10px] font-orbitron uppercase tracking-[0.2em] text-neutral-500 flex items-center justify-between">
              <span>Verify_Credential</span>
              <span className="text-cyan-500/50">Required</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-500/50 outline-none px-4 py-3 text-sm text-white font-mono placeholder:text-neutral-700 transition-all focus:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group/btn relative w-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-[11px] font-orbitron text-cyan-500 uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              INJECTING...
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2">
              Confirm Override
            </span>
          )}
        </button>
      </form>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
       <div className="relative z-10 w-full max-w-md bg-neutral-950/60 backdrop-blur-xl border border-white/10 p-10 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
       </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
