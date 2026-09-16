import { BookOpen, CheckCircle2, Cloud, Code2, ShieldCheck } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: Cloud,
    title: "AWS Solutions Architect Associate",
    note: "Deepening cloud architecture & design patterns",
  },
  {
    icon: Code2,
    title: "Python for Automation",
    note: "Scripting, APIs, and infrastructure automation",
  },
  {
    icon: ShieldCheck,
    title: "Zero Trust Security Models",
    note: "Modern identity-first security frameworks",
  },
];

const Learning = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="learning" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 text-primary" /> Currently learning
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Always <span className="text-gradient">leveling up</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Study tracks I've completed as I grow as a cloud and security engineer.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className={cn(
                "glass hover-lift relative rounded-2xl p-6 transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[0_0_24px_-8px_hsl(var(--primary)/0.7)]">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.note}</p>
              <div className="mt-5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Learning;
