import { Cloud, Activity, ShieldCheck } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const projects = [
  {
    icon: Cloud,
    title: "Static Website Hosted on AWS S3",
    description:
      "Deployed a fully static portfolio site using an S3 bucket with public access and custom permissions configured via IAM.",
    tags: ["AWS S3", "IAM", "Static Hosting"],
  },
  {
    icon: Activity,
    title: "Linux Server Monitoring Lab",
    description:
      "Set up a Linux-based virtual server with uptime monitoring, resource tracking, and automated log rotation using Bash scripts.",
    tags: ["Linux", "Bash", "Monitoring"],
  },
  {
    icon: ShieldCheck,
    title: "Network Scanning with Nmap & Wireshark",
    description:
      "Performed network discovery and traffic analysis on a test environment, documenting open ports and potential vulnerabilities.",
    tags: ["Nmap", "Wireshark", "Networking"],
  },
];

const Projects = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Featured projects
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Things I've <span className="text-gradient">built</span>.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Hands-on labs and deployments that blend cloud, automation, and security fundamentals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={cn(
                "glass hover-lift group relative overflow-hidden rounded-2xl p-7 transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-primary opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[0_0_30px_-8px_hsl(var(--primary)/0.7)]">
                  <p.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  Project 0{i + 1}
                </span>
              </div>

              <h3 className="relative mt-6 font-display text-xl font-bold text-foreground sm:text-2xl">
                {p.title}
              </h3>
              <p className="relative mt-3 text-sm text-muted-foreground">{p.description}</p>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
