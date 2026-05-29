import { Briefcase, MapPin, Calendar, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Role = {
  role: string;
  company: string;
  date: string;
  location: string;
  bullets: string[];
  highlights?: string[];
};


const experience: Role[] = [
  {
    role: "Cloud Engineering Intern",
    company: "Ntech",
    date: "Apr 2026 – Present",
    location: "Osun, Nigeria",
    bullets: [
      "Configured AWS resources (EC2, S3, IAM) for cloud infrastructure deployments",
      "Deployed and managed applications on Linux servers; troubleshot using cloud & system tools",
      "Applied IP addressing, DNS, and routing to support infrastructure operations",
      "Supported security best practices including access control and system hardening",
      "Used command-line tools and scripts to manage and troubleshoot cloud resources",
    ],
    highlights: [
      "Reduced server response time by ~15% through proactive system monitoring",
      "Documented 10+ security hardening practices for Linux servers",
      "Created an automated backup script using Bash for cloud storage",
    ],
  },
  {
    role: "Freelance Virtual Assistant",
    company: "Freelance",
    date: "Dec 2023 – Present",
    location: "Remote — Asia, US",
    bullets: [
      "Manage administrative and operational tasks for multiple clients",
      "Handle email communication, scheduling, and data organization",
      "Support recruitment and candidate sourcing processes",
      "Conduct research and maintain structured digital records",
    ],
  },
  {
    role: "App & Web Tester",
    company: "Freelance",
    date: "Jan 2023 – May 2024",
    location: "Remote, US",
    bullets: [
      "Tested web and mobile applications for usability and performance",
      "Identified bugs, UI/UX issues, and functional inconsistencies",
      "Documented test results and provided actionable feedback",
      "Collaborated with developers to improve user experience",
    ],
  },
];

const Experience = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="experience" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Experience
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A timeline of <span className="text-gradient">growth</span>.
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Vertical line */}
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary/0 via-primary/40 to-accent/0 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <div
                  key={e.role}
                  className={cn(
                    "relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10",
                    "transition-all duration-700",
                    visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Dot */}
                  <span className="absolute left-5 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-primary shadow-[0_0_18px_2px_hsl(var(--primary)/0.7)] md:left-1/2" />

                  <div
                    className={cn(
                      "pl-12 md:pl-0",
                      right ? "md:col-start-2 md:pl-10" : "md:pr-10 md:text-right",
                    )}
                  >
                    <div className="glass hover-lift rounded-2xl p-6">
                      <div
                        className={cn(
                          "flex items-center gap-2 text-xs text-muted-foreground",
                          right ? "" : "md:justify-end",
                        )}
                      >
                        <Briefcase className="h-3.5 w-3.5 text-primary" />
                        <span className="font-mono uppercase tracking-wider">{e.company}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                        {e.role}
                      </h3>
                      <div
                        className={cn(
                          "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
                          right ? "" : "md:justify-end",
                        )}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> {e.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" /> {e.location}
                        </span>
                      </div>
                      <ul
                        className={cn(
                          "mt-4 space-y-2 text-sm text-muted-foreground",
                          right ? "" : "md:text-right",
                        )}
                      >
                        {e.bullets.map((b) => (
                          <li
                            key={b}
                            className={cn(
                              "flex items-start gap-2",
                              right ? "" : "md:flex-row-reverse md:text-right",
                            )}
                          >
                            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {e.highlights && (
                        <div className="mt-5 rounded-xl border border-primary/30 bg-gradient-soft p-4">
                          <div
                            className={cn(
                              "flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary",
                              right ? "" : "md:justify-end",
                            )}
                          >
                            <Sparkles className="h-3.5 w-3.5" /> Key contributions
                          </div>
                          <ul
                            className={cn(
                              "mt-3 space-y-1.5 text-sm text-foreground/85",
                              right ? "" : "md:text-right",
                            )}
                          >
                            {e.highlights.map((h) => (
                              <li
                                key={h}
                                className={cn(
                                  "flex items-start gap-2",
                                  right ? "" : "md:flex-row-reverse md:text-right",
                                )}
                              >
                                <span className="text-primary">✓</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
