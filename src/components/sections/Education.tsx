import { GraduationCap } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const Education = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="education" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Education
          </span>
        </div>

        <div
          className={cn(
            "relative mx-auto mt-10 max-w-2xl transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-soft blur-2xl" />
          <div className="glass hover-lift rounded-[1.75rem] p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[0_0_30px_-6px_hsl(var(--primary)/0.7)]">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Osun State University
            </h3>
            <p className="mt-2 text-muted-foreground">Bachelor's Degree in Cybersecurity</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
