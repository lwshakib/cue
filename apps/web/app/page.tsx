"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { 
  Headset, 
  Terminal, 
  User, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Radar, 
  Infinity, 
  Search, 
  Home, 
  Inbox, 
  Users, 
  Settings, 
  ChevronLeft, 
  Play, 
  Database, 
  MessageSquareText, 
  MessageSquareCode,
  Activity, 
  FileText, 
  Link as LinkIcon,
  ArrowRight,
  Zap,
  Plus,
  Grid3X3,
  MousePointer2,
  PlusSquare,
  Hand,
  Globe
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { WorkflowEditor } from "@repo/ui/components/workflow-editor";

export default function LandingPage() {
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll Progress Indicator
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollPx / winHeightPx;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for Reveal Animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll, .kinetic-heading").forEach((el) => {
      revealObserver.observe(el);
    });

    // Subtle Magnetic Interaction for Cards
    const cards = document.querySelectorAll(".magnetic-card");
    cards.forEach(card => {
      const cardEl = card as HTMLElement;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        cardEl.style.transform = `translate3d(${x * 0.03}px, ${y * 0.03}px, 0)`;
      };

      const handleMouseLeave = () => {
        cardEl.style.transform = `translate3d(0px, 0px, 0)`;
      };

      cardEl.addEventListener("mousemove", handleMouseMove);
      cardEl.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cardEl.removeEventListener("mousemove", handleMouseMove);
        cardEl.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="landing-themed bg-background text-foreground overflow-x-hidden min-h-screen relative selection:bg-primary/30 rounded-none font-sans">
      <Script 
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
        onLoad={() => {
          // @ts-ignore
          if (window.UnicornStudio) {
            // @ts-ignore
            window.UnicornStudio.init();
          }
        }}
      />
      
      <div id="scroll-progress" ref={scrollProgressRef} className="fixed top-0 left-0 h-[2px] w-full z-[70] bg-gradient-to-r from-primary via-primary/70 to-primary/40 pointer-events-none origin-left transform scale-x-0 transition-transform duration-120 linear"></div>
      
      {/* Fixed Laboratory Backgrounds */}
      <div className="fixed inset-0 vertical-streaks pointer-events-none z-0"></div>
      <div className="fixed inset-0 crt-scanlines pointer-events-none z-0 opacity-40"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/95 to-background z-0 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="md:px-10 lg:px-16 flex md:h-20 w-full h-16 pr-6 pl-6 items-center">
          <div className="flex items-center gap-4">
            <Logo className="w-8 h-8 text-primary" />
            <a href="#home" className="font-orbitron text-sm md:text-base tracking-[0.08em] text-foreground/90 hover:text-primary transition-colors">Axonix</a>
          </div>

          <div className="ml-auto flex items-center gap-6 md:gap-10">
            <div className="hidden md:flex items-center gap-10">
              <a href="#workflows" className="text-xs font-orbitron tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors">Workflows</a>
              <a href="#system" className="text-xs font-orbitron tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors">Platform</a>
              <a href="#licensing" className="text-xs font-orbitron tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            </div>

            <a href="/home/workflows" className="font-orbitron text-xs tracking-[0.08em] border border-primary/30 text-primary bg-primary/5 px-6 py-2.5 md:py-3 transition-all duration-300 relative group overflow-hidden rounded-none inline-flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Get started</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <main className="z-10 w-full relative pt-16 md:pt-20">
        
        {/* Hero Section */}
        <section id="home" className="relative w-full h-[80vh] min-h-[500px] overflow-hidden flex items-center border-b border-border">
          {/* WebGL Background Placeholder */}
          <div data-us-project="q0JSwb0l42Yf6m79xfW9" className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" style={{ width: '100%', height: '100%' }}></div>

          <div className="absolute bottom-12 left-6 md:left-12 lg:left-16 z-20 pointer-events-none w-full max-w-4xl animate-hero-rise">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs md:text-sm font-orbitron tracking-[0.2em] text-primary">Platform online</span>
              <span className="w-10 h-[1px] bg-primary/50"></span>
            </div>
            <h1 className="font-orbitron text-foreground leading-[1.1] tracking-tight text-3xl md:text-5xl lg:text-6xl drop-shadow-[0_0_30px_rgba(0,255,255,0.15)] kinetic-heading">
              Build agent workflows<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/50">that run your operations.</span>
            </h1>
            <p className="mt-6 text-base text-muted-foreground font-light tracking-wide max-w-xl border-l border-primary/30 pl-4 py-1">
              Design automation flows with triggers, AI executions, and data actions. Connect nodes visually, test quickly, and ship reliable agent systems.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 pointer-events-auto">
              <a href="/home/workflows" className="group relative inline-flex items-center gap-3 border border-primary bg-primary/10 text-primary font-orbitron font-normal text-xs tracking-[0.08em] px-6 py-3 transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] rounded-none">
                <span>Start building</span>
                <ArrowRight className="w-4 h-4" />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/50 group-hover:border-black/50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/50 group-hover:border-black/50"></div>
              </a>
              <a href="/home/workflows" className="group relative inline-flex items-center gap-3 border border-foreground/10 bg-transparent text-foreground font-orbitron font-normal text-xs tracking-[0.08em] px-6 py-3 transition-all duration-300 hover:border-foreground/30 hover:bg-foreground/5 rounded-none">
                <span>Explore workflows</span>
                <Radar className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tech Stack Indicators */}
          <div className="absolute bottom-12 right-6 lg:right-16 z-30 flex flex-col items-end gap-2 text-right pointer-events-none reveal-on-scroll" style={{ ["--reveal-delay" as any]: "0ms" }}>
            <p className="font-orbitron text-xs tracking-[0.2em] text-neutral-600">Core technologies</p>
            <div className="flex gap-3 text-xs font-mono text-primary/70 mt-1">
              <span>[ React Flow ]</span>
              <span>[ AI models ]</span>
              <span>[ PostgreSQL ]</span>
            </div>
          </div>
        </section>

        {/* Workflows Section */}
        <section id="workflows" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 w-full border-b border-border bg-background relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6 reveal-on-scroll" style={{ ["--reveal-delay" as any]: "0ms" }}>
              <div className="">
                <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-primary mb-3 flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[1px] bg-primary"></span> Workflow automation
                </p>
                <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-foreground font-orbitron">Design, connect, execute</h2>
              </div>
              <p className="text-muted-foreground text-xs font-orbitron tracking-[0.08em] max-w-xs text-right">
                Build production-ready agent workflows with a visual editor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              
              {/* Workflow 1: Market Intelligence */}
              <div className="group relative bg-card border border-border hover:border-primary/50 transition-colors duration-500 p-5 md:p-6 flex flex-col justify-between min-h-[280px] rounded-none overflow-hidden cursor-crosshair reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "90ms" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden"><div className="h-full w-1/3 bg-primary animate-scan-line hidden group-hover:block"></div></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-8 h-8 md:w-10 md:h-10 border border-border bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 rounded-none">
                      <Search className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-sans font-medium tracking-widest text-muted-foreground border border-border px-2 py-1 uppercase">Intelligence</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-normal tracking-tight mb-2 text-foreground font-orbitron group-hover:text-primary transition-colors">Market Intelligence</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed font-sans mt-2">
                    Autonomous deep-web research and competitor analysis. Surfacing high-signal opportunities in real-time without human oversight.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-primary text-[10px] font-sans font-bold tracking-widest uppercase mt-6 opacity-50 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Workflow 2: Autonomous Operations */}
              <div className="group relative bg-card border border-border hover:border-primary/50 transition-colors duration-500 p-5 md:p-6 flex flex-col justify-between min-h-[280px] rounded-none overflow-hidden cursor-crosshair reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "180ms" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden"><div className="h-full w-1/3 bg-primary animate-scan-line hidden group-hover:block"></div></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-8 h-8 md:w-10 md:h-10 border border-border bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 rounded-none">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-sans font-medium tracking-widest text-muted-foreground border border-border px-2 py-1 uppercase">Operations</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-normal tracking-tight mb-2 text-foreground font-orbitron group-hover:text-primary transition-colors">Autonomous Operations</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed font-sans mt-2">
                    Brand-aligned content generation and multi-channel distribution. Maintaining consistent narrative across all digital properties at scale.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-primary text-[10px] font-sans font-bold tracking-widest uppercase mt-6 opacity-50 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Workflow 3: Response Automation */}
              <div className="group relative bg-card border border-border hover:border-primary/50 transition-colors duration-500 p-5 md:p-6 flex flex-col justify-between min-h-[280px] rounded-none overflow-hidden cursor-crosshair reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "270ms" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden"><div className="h-full w-1/3 bg-primary animate-scan-line hidden group-hover:block"></div></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-8 h-8 md:w-10 md:h-10 border border-border bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 rounded-none">
                      <MessageSquareCode className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-sans font-medium tracking-widest text-muted-foreground border border-border px-2 py-1 uppercase">Customer</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-normal tracking-tight mb-2 text-foreground font-orbitron group-hover:text-primary transition-colors">Response Automation</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed font-sans mt-2">
                    Intelligent ticket triage and resolution. Bridging the gap between knowledge base and complex customer queries with reasoning.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-primary text-[10px] font-sans font-bold tracking-widest uppercase mt-6 opacity-50 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interface Section / Agent Workspace Dashboard */}
        <section className="md:py-24 md:px-12 overflow-hidden bg-background/30 w-full border-border border-b pt-16 pr-6 pb-16 pl-6 relative" id="system">
          <div className="max-w-[1300px] mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 reveal-on-scroll border-b border-border pb-6" style={{ ["--reveal-delay" as any]: "0ms" }}>
              <div className="">
                <p className="uppercase flex items-center gap-3 text-xs md:text-sm text-primary tracking-[0.4em] font-sans font-bold mb-3">
                  <span className="bg-primary w-6 md:w-8 h-[1px]"></span> Interactive simulation
                </p>
                <h2 className="text-2xl md:text-4xl font-normal text-foreground tracking-tight font-orbitron uppercase">Agent Command Center</h2>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-sans font-medium tracking-[0.2em] uppercase max-w-sm md:text-right">
                Real-time multi-agent processing orchestrated visually.
              </p>
            </div>

            {/* Workflow Editor simulation App Container */}
            <div className="border border-border bg-card h-[800px] w-full overflow-hidden relative rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] reveal-on-scroll" style={{ ["--reveal-delay" as any]: "90ms" }}>
              {/* Editor Canvas */}
              <main className="h-full relative overflow-hidden bg-background group/canvas cursor-crosshair">
                {/* Dot Grid Layer */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, var(--muted-foreground) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>

                {/* Workflow Nodes Landscape */}
                <div className="h-full w-full">
                  <WorkflowEditor />
                </div>
              </main>
            </div>
          </div>
        </section>
        
        {/* Workforces Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-neutral-950/30 w-full border-white/5 border-b relative" id="workforces">
          <div className="z-10 max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-end gap-6 reveal-on-scroll border-white/10 border-b mb-12 pb-6 justify-between" style={{ ["--reveal-delay" as any]: "0ms" }}>
              <div className="">
                <p className="uppercase flex items-center gap-3 text-xs md:text-sm text-primary tracking-[0.4em] font-orbitron mb-3">
                  <span className="w-6 md:w-8 h-[1px] bg-primary"></span> Active units
                </p>
                <h2 className="text-2xl md:text-4xl font-normal tracking-tight text-white font-orbitron uppercase">Agent Workforces</h2>
              </div>
              <p className="text-neutral-500 text-xs md:text-sm font-orbitron tracking-[0.2em] uppercase max-w-xs md:text-right">
                Autonomous multi-agent systems currently deployed in the field.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Unit 1 */}
              <div className="group border border-white/10 bg-black p-5 md:p-6 relative overflow-hidden reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "90ms" }}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 group-hover:bg-primary transition-colors duration-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex group-hover:scale-110 transition-transform duration-500 text-primary bg-neutral-950 w-8 h-8 md:w-10 md:h-10 border-white/10 border rounded-none items-center justify-center">
                     <Search className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                    <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> Active
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-normal tracking-tight text-white font-orbitron uppercase mb-1">Research Hub</h3>
                <p className="text-xs md:text-sm text-neutral-500 font-light font-sans mb-5">Deep Domain Knowledge Extraction</p>
                <div className="space-y-2 border-t border-white/5 pt-3">
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Analysis Rate</span> <span className="text-primary">High</span></div>
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Reliability</span> <span className="text-primary">99.9%</span></div>
                </div>
              </div>

              {/* Unit 2 */}
              <div className="group border border-white/10 bg-black p-5 md:p-6 relative overflow-hidden reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "180ms" }}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 group-hover:bg-primary transition-colors duration-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 bg-neutral-950 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 rounded-none">
                     <Network className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                    <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> Active
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-normal tracking-tight text-white font-orbitron uppercase mb-1">Growth Engine</h3>
                <p className="text-xs md:text-sm text-neutral-500 font-light font-sans mb-5">Autonomous Lead Generation Cycle</p>
                <div className="space-y-2 border-t border-white/5 pt-3">
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Daily Outreach</span> <span className="text-primary">2.5k</span></div>
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Automation</span> <span className="text-primary">100%</span></div>
                </div>
              </div>

              {/* Unit 3 */}
              <div className="group border border-white/10 bg-black p-5 md:p-6 relative overflow-hidden reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "270ms" }}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 group-hover:bg-primary transition-colors duration-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 bg-neutral-950 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 rounded-none">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                    <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> Active
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-normal tracking-tight text-white font-orbitron uppercase mb-1">Security Sentry</h3>
                <p className="text-xs md:text-sm text-neutral-500 font-light font-sans mb-5">Compliance & Safety Guardrails</p>
                <div className="space-y-2 border-t border-white/5 pt-3">
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Risk Score</span> <span className="text-primary">Minimal</span></div>
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Integrity</span> <span className="text-primary">Verified</span></div>
                </div>
              </div>

              {/* Unit 4 */}
              <div className="group border border-white/10 bg-black p-5 md:p-6 relative overflow-hidden reveal-on-scroll magnetic-card" style={{ ["--reveal-delay" as any]: "360ms" }}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 group-hover:bg-primary transition-colors duration-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 bg-neutral-950 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 rounded-none">
                     <Radar className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-amber-500 uppercase">
                    <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse"></span> Standby
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-normal tracking-tight text-white font-orbitron uppercase mb-1">Strategic Pilot</h3>
                <p className="text-xs md:text-sm text-neutral-500 font-light font-sans mb-5">Market Sentiment & Forecasting</p>
                <div className="space-y-2 border-t border-white/5 pt-3">
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Insight Yield</span> <span className="text-primary">High</span></div>
                   <div className="flex justify-between text-xs md:text-sm font-sans text-neutral-400 font-medium"><span className="uppercase tracking-wider">Accuracy</span> <span className="text-primary">96.4%</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Units Section */}
        <section id="a-team" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-background w-full border-border border-b relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
             <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] w-[60%]">
                <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" alt="A-Team Workforce" className="w-full h-auto object-contain" />
             </div>
             <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--background),1)_0%,rgba(var(--background),0.8)_60%,transparent_100%)]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-2xl mb-12 md:mb-16 reveal-on-scroll">
              <p className="font-orbitron text-xs md:text-sm uppercase tracking-[0.4em] text-primary mb-3 flex items-center gap-3">
                <span className="w-6 md:w-8 h-[1px] bg-primary"></span> Specialized units
              </p>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-foreground font-orbitron uppercase mb-6 leading-tight">
                The A-Team <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-foreground/50">Agents.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed border-l border-primary/30 pl-4 py-1 text-pretty">
                Deploy specialized autonomous units tailored for high-impact organizational roles. Operating seamlessly in the background to drive acquisition, streamline internal operations, and augment executive strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              
              {/* Card 1: SDR */}
              <div className="group border border-border bg-card/60 backdrop-blur-md p-6 md:p-8 relative overflow-hidden reveal-on-scroll magnetic-card hover:border-primary/50 transition-colors duration-500" style={{ ["--reveal-delay" as any]: "90ms" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden"><div className="h-full w-1/3 bg-primary animate-scan-line hidden group-hover:block"></div></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-none">
                      <Headset className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                      <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> Active
                    </span>
                  </div>
                  <p className="text-[10px] font-sans font-bold text-muted-foreground mb-1 uppercase tracking-wider">[ Outbound Strategy ]</p>
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight text-foreground font-orbitron mb-3">SDR Agent</h3>
                  <p className="text-sm text-muted-foreground font-light mb-6 leading-relaxed font-sans">
                    Relentless pipeline generation. Autonomous multi-channel outreach, dynamic script adaptation, and real-time lead qualification at infinite scale.
                  </p>
                  
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between items-center text-[10px] font-sans font-bold">
                      <span className="text-muted-foreground uppercase tracking-widest">Prospecting Cap</span>
                      <span className="text-primary">10k+ / Day</span>
                    </div>
                    <div className="w-full h-1 bg-foreground/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-primary animate-progress" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: INTERNAL */}
              <div className="group border border-border bg-card/60 backdrop-blur-md p-6 md:p-8 relative overflow-hidden reveal-on-scroll magnetic-card hover:border-primary/50 transition-colors duration-500" style={{ ["--reveal-delay" as any]: "180ms" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden"><div className="h-full w-1/3 bg-primary animate-scan-line hidden group-hover:block"></div></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] rounded-none">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                      <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> Active
                    </span>
                  </div>
                  <p className="text-[10px] font-sans font-bold text-muted-foreground mb-1 uppercase tracking-wider">[ Internal Automation ]</p>
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight text-foreground font-orbitron mb-3">Support Unit</h3>
                  <p className="text-sm text-muted-foreground font-light mb-6 leading-relaxed font-sans">
                    Automated triage and resolution. Instantly solves 80% of level-1 tickets, provisions access, and maintains internal knowledge graphs securely.
                  </p>
                  
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between items-center text-[10px] font-sans font-bold">
                      <span className="text-muted-foreground uppercase tracking-widest">Resolution Rate</span>
                      <span className="text-primary">82.4%</span>
                    </div>
                    <div className="w-full h-1 bg-foreground/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-primary animate-progress" style={{ width: '82.4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: EXECUTIVE */}
              <div className="group border border-border bg-card/60 backdrop-blur-md p-6 md:p-8 relative overflow-hidden reveal-on-scroll magnetic-card hover:border-primary/50 transition-colors duration-500" style={{ ["--reveal-delay" as any]: "270ms" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden"><div className="h-full w-1/3 bg-primary animate-scan-line hidden group-hover:block"></div></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-none">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                      <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> Active
                    </span>
                  </div>
                  <p className="text-[10px] font-sans font-bold text-muted-foreground mb-1 uppercase tracking-wider">[ Executive Strategy ]</p>
                  <h3 className="text-xl md:text-2xl font-normal tracking-tight text-foreground font-orbitron mb-3">CEO Co-Pilot</h3>
                  <p className="text-sm text-muted-foreground font-light mb-6 leading-relaxed font-sans">
                    Strategic synthesis and executive summary. Aggregates cross-departmental data into real-time briefings, surfacing critical anomalies.
                  </p>
                  
                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between items-center text-[10px] font-sans font-bold">
                      <span className="text-muted-foreground uppercase tracking-widest">Data Streams</span>
                      <span className="text-primary">14 Active</span>
                    </div>
                    <div className="w-full h-1 bg-foreground/5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-primary animate-progress" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="licensing" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background w-full relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.05),_transparent_40%)] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-24 reveal-on-scroll">
              <p className="font-orbitron text-xs md:text-sm uppercase tracking-[0.4em] text-primary mb-4 inline-flex items-center gap-3">
                <span className="w-10 h-[1px] bg-primary"></span> System access
              </p>
              <h2 className="text-3xl md:text-6xl font-normal tracking-tighter text-foreground font-orbitron uppercase mb-6 drop-shadow-2xl">
                Licensing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-foreground/40">Tiers.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-1">
              {/* Plan 1: Starter */}
              <div className="group border border-border bg-card/20 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between reveal-on-scroll hover:border-foreground/20 transition-all duration-500 relative" style={{ ["--reveal-delay" as any]: "0ms" }}>
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-border group-hover:border-foreground/30 transition-colors"></div>
                <div>
                  <div className="text-xs font-mono text-primary/60 uppercase tracking-[0.2em] mb-4">[ Tier 01 ]</div>
                  <h3 className="text-2xl font-normal text-foreground font-orbitron uppercase mb-2">Starter</h3>
                  <div className="text-4xl font-normal text-foreground mb-8">$0<span className="text-sm text-muted-foreground font-light ml-2 uppercase tracking-widest">/ Month</span></div>
                  <ul className="space-y-4 mb-12">
                    <li className="flex items-center gap-3 text-sm text-muted-foreground font-light"><div className="w-1 h-1 bg-primary"></div> 3 active agent workflows</li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground font-light"><div className="w-1 h-1 bg-primary"></div> Basic LLM integrations</li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground font-light"><div className="w-1 h-1 bg-primary"></div> Community support</li>
                  </ul>
                </div>
                <a href="/home/workflows" className="w-full py-4 text-center border border-border text-foreground font-orbitron text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all">Current Plan</a>
              </div>

              {/* Plan 2: Professional (Featured) */}
              <div className="group border-x border-primary/30 bg-accent/40 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between reveal-on-scroll scale-100 md:scale-110 z-20 shadow-[0_0_100px_rgba(6,182,212,0.1)] relative" style={{ ["--reveal-delay" as any]: "100ms" }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-[10px] font-sans font-bold text-primary-foreground uppercase tracking-[0.2em] rounded-b-sm">Recommended for Growth</div>
                <div>
                  <div className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-4">[ Tier 02 ]</div>
                  <h3 className="text-2xl font-normal text-foreground font-orbitron uppercase mb-2">Power</h3>
                  <div className="text-4xl font-normal text-foreground mb-8">$49<span className="text-sm text-muted-foreground font-light ml-2 uppercase tracking-widest">/ Month</span></div>
                  <ul className="space-y-4 mb-12">
                    <li className="flex items-center gap-3 text-sm text-foreground font-light"><div className="w-1.5 h-1.5 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div> Unlimited workflows</li>
                    <li className="flex items-center gap-3 text-sm text-foreground font-light"><div className="w-1.5 h-1.5 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div> Advanced reasoning nodes</li>
                    <li className="flex items-center gap-3 text-sm text-foreground font-light"><div className="w-1.5 h-1.5 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div> Priority execution</li>
                  </ul>
                </div>
                <a href="/home/workflows" className="w-full py-4 text-center bg-primary text-primary-foreground font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary/90 shadow-[0_0_30px_rgba(8,145,178,0.4)] transition-all">Select Plan</a>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="group border border-white/5 bg-neutral-950/20 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between reveal-on-scroll hover:border-white/20 transition-all duration-500 relative" style={{ ["--reveal-delay" as any]: "200ms" }}>
                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/10 group-hover:border-white/30 transition-colors"></div>
                <div>
                  <div className="text-xs font-mono text-primary/60 uppercase tracking-[0.2em] mb-4">[ Tier 03 ]</div>
                  <h3 className="text-2xl font-normal text-white font-orbitron uppercase mb-2">Corporate</h3>
                  <div className="text-4xl font-normal text-white mb-8">Custom</div>
                  <ul className="space-y-4 mb-12">
                    <li className="flex items-center gap-3 text-sm text-neutral-400 font-light font-sans"><div className="w-1 h-1 bg-primary"></div> Dedicated node clusters</li>
                    <li className="flex items-center gap-3 text-sm text-neutral-400 font-light font-sans"><div className="w-1 h-1 bg-primary"></div> SOC2 & InfoSec compliance</li>
                    <li className="flex items-center gap-3 text-sm text-neutral-400 font-light font-sans"><div className="w-1 h-1 bg-primary"></div> 24/7 priority support</li>
                  </ul>
                </div>
                <a href="mailto:hello@axonix.ai" className="w-full py-4 text-center border border-white/10 text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-background border-t border-border w-full relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Logo className="w-8 h-8 text-primary" />
                <span className="font-orbitron text-sm md:text-base tracking-[0.08em] text-foreground/90">Axonix</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">Design workflows. Connect agents. Run automation.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <a href="#" className="text-xs font-orbitron tracking-[0.08em] text-neutral-500 hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="text-xs font-orbitron tracking-[0.08em] text-neutral-500 hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-xs font-orbitron tracking-[0.08em] text-neutral-500 hover:text-primary transition-colors">LinkedIn</a>
              <a href="mailto:hello@axonix.ai" className="font-orbitron text-xs tracking-[0.08em] border border-primary/30 text-primary bg-primary/5 px-6 py-2.5 hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300">
                Contact sales
              </a>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
            <p className="text-xs font-mono text-neutral-600">© 2026 AXONIX EXPERIMENTAL</p>
            <p className="text-xs font-mono text-neutral-600">SYS_STATUS: <span className="text-primary">NOMINAL</span></p>
          </div>
        </footer>
      </main>
    </div>
  );
}
