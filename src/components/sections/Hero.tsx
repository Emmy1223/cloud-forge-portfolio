import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import StarField from "@/components/StarField";

const SUBTITLE = "Cloud Engineer and Cybersecurity Enthusiast";

const Hero = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    // Wait for the cinematic name reveal, then typewrite the subtitle
    const startDelay = 1800;
    let i = 0;
    let id: number;
    const begin = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += 1;
        setTyped(SUBTITLE.slice(0, i));
        if (i >= SUBTITLE.length) window.clearInterval(id);
      }, 55);
    }, startDelay);
    return () => {
      window.clearTimeout(begin);
      window.clearInterval(id);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28"
    >
      {/* Vignette + drifting starfield */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_85%)]" />
        <StarField />
      </div>

      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 35%, black 30%, transparent 80%)",
        }}
      />

      <div className="container-tight relative">
        <div className="mx-auto max-w-5xl text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for cloud & security roles
          </div>

          {/* Cinematic name reveal — words zoom in from depth */}
          <h1 className="mt-8 font-display text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block animate-cinematic-zoom [animation-delay:200ms] [animation-fill-mode:both]">
              Emmanuel
            </span>
            <span className="mt-2 block text-gradient animate-cinematic-zoom [animation-delay:900ms] [animation-fill-mode:both] drop-shadow-[0_0_28px_hsl(var(--primary)/0.45)]">
              Faleti
            </span>
          </h1>

          {/* Typewriter subtitle */}
          <p className="mx-auto mt-8 h-7 max-w-2xl text-lg font-medium text-foreground/85 sm:text-xl">
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-primary animate-cursor-blink align-middle" />
          </p>

          <p className="animate-fade-in mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg [animation-delay:2200ms] [animation-fill-mode:both]">
            Hands-on with AWS (EC2, S3, IAM, VPC), Linux administration, and networking.
            Building secure, scalable cloud systems with a cybersecurity-first mindset.
          </p>

          <div className="animate-fade-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:2500ms] [animation-fill-mode:both]">
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
