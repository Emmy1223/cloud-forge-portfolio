import { ArrowRight, ChevronDown, Cloud, Server, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl animate-blob" />
        <div className="absolute right-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-accent/25 blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute left-[6%] bottom-[12%] h-[320px] w-[320px] rounded-full bg-primary-glow/20 blur-3xl animate-blob [animation-delay:-12s]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)/0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 30%, black 40%, transparent 80%)",
        }}
      />

      {/* Floating abstract icons */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[26%] animate-float-slow opacity-40">
          <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
            <Cloud className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="absolute right-[12%] top-[22%] animate-float opacity-40 [animation-delay:-2s]">
          <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
            <Shield className="h-6 w-6 text-accent" />
          </div>
        </div>
        <div className="absolute right-[18%] bottom-[24%] animate-float-slow opacity-40 [animation-delay:-4s]">
          <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
            <Server className="h-6 w-6 text-primary-glow" />
          </div>
        </div>
      </div>

      <div className="container-tight relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for cloud & security roles
          </div>

          <h1 className="animate-fade-in-slow mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl [animation-delay:120ms]">
            <span className="block">Faleti</span>
            <span className="block text-gradient">Emmanuel</span>
          </h1>

          <p className="animate-fade-in mt-6 text-lg font-medium text-foreground/80 sm:text-xl [animation-delay:280ms]">
            Cloud Engineer <span className="text-muted-foreground">&</span> Cybersecurity Enthusiast
          </p>

          <p className="animate-fade-in mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg [animation-delay:380ms]">
            I design, automate, and secure cloud systems using Python and modern infrastructure tools.
            Focused on building scalable and reliable solutions.
          </p>

          <div className="animate-fade-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:480ms]">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_hsl(var(--primary)/0.7)] transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
