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
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c, i) => (
            <div
              key={c.name}
              className={cn(
                "glass hover-lift group flex flex-col items-start gap-4 rounded-2xl p-6 transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[0_0_24px_-8px_hsl(var(--accent)/0.7)] transition-transform group-hover:rotate-[-6deg] group-hover:scale-110">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold leading-snug text-foreground">
                  {c.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Issued by {c.issuer}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                <Calendar className="h-3 w-3" /> {c.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
