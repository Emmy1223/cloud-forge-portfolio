import { Activity, Cloud, Code2, Shield } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const skills = [
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    items: ["AWS EC2", "S3", "IAM", "Linux"],
  },
  {
    icon: Shield,
    title: "Networking & Security",
    items: ["IP Addressing", "DNS", "Routing", "Access Control"],
  },
  {
    icon: Code2,
    title: "Development & Tools",
    items: ["Python", "Bash", "Git", "GitHub", "HTML", "CSS"],
  },
  {
    icon: Activity,
    title: "Operations & Support",
    items: ["System Monitoring", "UI/UX Testing", "Bug Reporting"],
  },
];

const Skills = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="skills" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A <span className="text-gradient">full-stack</span> ops toolkit
          </h2>
          <p className="mt-4 text-muted-foreground">
            From provisioning to monitoring, automation to security — built around modern cloud
            workflows.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                "glass hover-lift group relative rounded-2xl p-6 transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[0_0_24px_-6px_hsl(var(--primary)/0.7)] transition-transform group-hover:scale-110">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
