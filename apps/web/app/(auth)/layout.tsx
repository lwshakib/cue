import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden selection:bg-cyan-500/30">
      {/* Fixed Laboratory Backgrounds */}
      <div className="fixed inset-0 vertical-streaks pointer-events-none z-0"></div>
      <div className="fixed inset-0 crt-scanlines pointer-events-none z-0 opacity-40"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/95 to-black z-0 pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <main className="z-10 w-full max-w-md px-6 py-12 relative animate-hero-rise">
        {children}
      </main>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 w-full h-12 border-t border-white/5 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 z-50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></div>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-cyan-500/70 font-medium">Secure Authentication</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span className="text-[10px] font-sans text-neutral-600 uppercase tracking-widest font-medium">Status: <span className="text-cyan-500">Active</span></span>
          <span className="text-[10px] font-sans text-neutral-600 uppercase tracking-widest font-medium">Protocol: <span className="text-cyan-500">Encrypted</span></span>
        </div>
      </div>
    </div>
  );
}
