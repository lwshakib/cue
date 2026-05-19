"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ShieldCheck, Loader2, XCircle, CheckCircle2 } from "lucide-react";

/**
 * Handle Verification Protocol Core
 */
function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Synchronizing identity protocol...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Security Protocol Mismatch: Missing verification token.");
      return;
    }

    const triggerVerification = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/auth"}/verify-email?token=${token}`);
        if (response.ok) {
          setStatus("success");
          setMessage("Identity Protocol Verified. Initializing redirection...");
          toast.success("Identity Sequence Synchronized Successfully.");
          setTimeout(() => {
            router.push("/sign-in?verified=true");
          }, 3000);
        } else {
          const data = await response.json();
          throw new Error(data.message || "Security Access Denied.");
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message);
        toast.error(`Verification Sequence Failed: ${error.message}`);
      }
    };

    triggerVerification();
  }, [token, router]);

  return (
    <div className="relative z-10 w-full max-w-md bg-neutral-950/60 backdrop-blur-xl border border-white/10 p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] group overflow-hidden">
      {/* Scanning Line Decorator */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="h-full w-1/3 bg-cyan-400 animate-scan-line"></div>
      </div>

      <div className="flex flex-col items-center gap-8 text-center py-6">
        <div className="relative">
          {status === "loading" && (
            <div className="w-20 h-20 rounded-full border-2 border-cyan-500/20 flex items-center justify-center animate-spin">
              <Loader2 className="w-10 h-10 text-cyan-500" />
            </div>
          )}
          {status === "success" && (
            <div className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-cyan-500" />
            </div>
          )}
          {status === "error" && (
            <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-orbitron text-[10px] uppercase tracking-[0.4em] text-cyan-500 mb-2">Security Hub</p>
          <h1 className="text-2xl font-normal tracking-tight text-white font-orbitron uppercase">
            Protocol_Identity
          </h1>
          <p className="text-sm font-mono text-neutral-400 max-w-[280px] leading-relaxed">
            {message}
          </p>
        </div>

        {status === "error" && (
          <button 
            onClick={() => router.push("/sign-up")}
            className="mt-4 border border-white/10 bg-black px-6 py-3 text-[10px] font-orbitron text-white uppercase tracking-widest hover:border-white/30 hover:bg-white/5 transition-all"
          >
            Reconnect_Identity
          </button>
        )}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
    </div>
  );
}

/**
 * Loading state for Suspense
 */
function VerifyLoading() {
  return (
     <div className="relative z-10 w-full max-w-md bg-neutral-950/60 backdrop-blur-xl border border-white/10 p-10 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
     </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
       <VerifyContent />
    </Suspense>
  );
}
