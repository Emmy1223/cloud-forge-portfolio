import { Activity, Cloud, Code2, Shield, Users } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Level = "Proficient" | "Familiar" | "Beginner";

const levelStyles: Record<Level, string> = {
  Proficient: "border-primary/50 bg-primary/15 text-foreground",
  Familiar: "border-primary/25 bg-primary/5 text-foreground/85",
  Beginner: "border-border bg-background/60 text-muted-foreground",
};

const groups: { icon: typeof Cloud; title: string; items: { name: string; level: Level }[] }[] = [
  {
    icon: Cloud,
    title: "Cloud & Networking",
    items: [
      { name: "AWS EC2", level: "Proficient" },
      { name: "AWS S3", level: "Proficient" },
      { name: "AWS IAM", level: "Proficient" },
      { name: "Linux CLI", level: "Proficient" },
      { name: "VPC", level: "Familiar" },
      { name: "Load Balancers", level: "Familiar" },
      { name: "IP / DNS / Routing", level: "Familiar" },
      { name: "Route Tables", level: "Beginner" },
      { name: "AWS CLI (advanced)", level: "Beginner" },
    ],
  },
  {
    icon: Shield,
    title: "Security & Testing",
    items: [
      { name: "Nmap", level: "Proficient" },
      { name: "Access Control", level: "Familiar" },
      { name: "System Hardening", level: "Familiar" },
      { name: "Wireshark", level: "Familiar" },
      { name: "Bug Reporting", level: "Proficient" },
      { name: "UI/UX Analysis", level: "Familiar" },
    ],
  },
  {
    icon: Code2,
    title: "Tools & Languages",
    items: [
      { name: "Bash", level: "Proficient" },
      { name: "Git", level: "Proficient" },
      { name: "GitHub", level: "Proficient" },
      { name: "Command Line", level: "Proficient" },
      { name: "Python", level: "Familiar" },
      { name: "HTML / CSS", level: "Familiar" },
    ],
  },
  {
    icon: Users,
    title: "Admin & Productivity",
    items: [
      { name: "Virtual Assistance", level: "Proficient" },
      { name: "Email / Calendar", level: "Proficient" },
      { name: "Google Workspace", level: "Proficient" },
      { name: "MS Office", level: "Proficient" },
      { name: "Web Research", level: "Proficient" },
      { name: "Data Entry", level: "Proficient" },
    ],
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
            A <span className="text-gradient">growing</span> ops toolkit
          </h2>
          <p className="mt-4 text-muted-foreground">
            From provisioning to monitoring, security fundamentals to remote operations.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            {(Object.keys(levelStyles) as Level[]).map((lv) => (
              <span
                key={lv}
                className={cn("rounded-full border px-2.5 py-1 font-medium", levelStyles[lv])}
              >
                {lv}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {groups.map((g, i) => (
            <div
              key={g.title}
              className={cn(
                "glass hover-lift group relative rounded-2xl p-6 transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[0_0_24px_-6px_hsl(var(--primary)/0.7)]">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{g.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span
                    key={it.name}
                    title={it.level}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                      levelStyles[it.level],
                    )}
                  >
                    {it.name}
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
