import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground relative flex items-center justify-center overflow-hidden selection:bg-primary/30">
      {/* Fixed Laboratory Backgrounds */}
      <div className="fixed inset-0 vertical-streaks pointer-events-none z-0"></div>
      <div className="fixed inset-0 crt-scanlines pointer-events-none z-0 opacity-40"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-background/95 to-background z-0 pointer-events-none"></div>

      {/* Main Content Wrapper */}
      <main className="z-10 w-full max-w-md px-6 py-12 relative animate-hero-rise">
        {children}
      </main>
    </div>
  );
}
