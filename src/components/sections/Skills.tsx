import { Cloud, Code2, Network, Shield, TestTube2 } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const groups: { icon: typeof Cloud; title: string; items: string[] }[] = [
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    items: ["AWS EC2", "AWS S3", "AWS IAM", "VPC", "Load Balancers", "Linux", "AWS CLI"],
  },
  {
    icon: Network,
    title: "Networking",
    items: ["TCP/IP", "DNS", "VPNs", "OSI Model", "Routing", "IP Addressing"],
  },
  {
    icon: Shield,
    title: "Security",
    items: ["IAM", "Access Control", "System Hardening", "Nmap", "Wireshark"],
  },
  {
    icon: Code2,
    title: "Dev & Scripting",
    items: ["Python", "Bash", "HTML", "CSS", "Git", "GitHub"],
  },
  {
    icon: TestTube2,
    title: "Testing",
    items: ["App Testing", "Bug Reporting", "QA", "UI/UX Analysis"],
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
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="cursor-default rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_18px_-4px_hsl(var(--primary)/0.8)]"
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
