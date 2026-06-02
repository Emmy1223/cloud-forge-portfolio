import { Award, Calendar } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const certs = [
  { name: "Google Cloud Computing Foundation", issuer: "Google", year: "2024" },
  { name: "Cisco Networking Essentials", issuer: "Cisco", year: "2024" },
  { name: "Cloud Managed Network 201", issuer: "Cisco", year: "2024" },
  { name: "Linux Essentials", issuer: "Cisco", year: "2024" },
];

const Certifications = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="certifications" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Certifications
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Validated <span className="text-gradient">credentials</span>.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Hover any badge to flip it.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c, i) => (
            <div
              key={c.name}
              className={cn(
                "group [perspective:1200px] transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-56 w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl p-6 [backface-visibility:hidden]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[0_0_30px_-6px_hsl(var(--primary)/0.8)]">
                    <Award className="h-7 w-7" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {c.year}
                  </span>
                  <p className="text-center font-display text-sm font-semibold text-foreground">
                    {c.issuer}
                  </p>
                </div>
                {/* Back */}
                <div className="glass-strong absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-gradient-soft p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="font-display text-base font-bold leading-snug text-foreground">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Issued by {c.issuer}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/60 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-primary">
                    Verified · {c.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
