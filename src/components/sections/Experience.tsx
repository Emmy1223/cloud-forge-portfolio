import { useState } from "react";
import { Briefcase, MapPin, Calendar, Sparkles, ChevronDown } from "lucide-react";
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
      "Provisioned and managed AWS resources end-to-end: EC2, S3, VPC, IAM, RDS, Aurora, DynamoDB, EFS, and Recycle Bin",
      "Built highly available architectures with Route 53 DNS, ALB/NLB, Target Groups, Health Checks, and ACM-managed SSL/TLS",
      "Automated infrastructure provisioning with Boto3 and the AWS CLI — VPCs, subnets, security groups, EC2, S3, RDS, load balancers, and DNS records",
      "Operated CloudWatch for monitoring, application observability, log analysis, alarms, and troubleshooting AWS resources",
      "Managed multi-account governance and spend via AWS Organizations and Billing & Cost Management",
      "Explored AI-powered cloud workflows with Amazon SageMaker",
      "Applied security best practices: IAM least privilege, system hardening, and secure-by-default deployments",
    ],
    highlights: [
      "Reduced server response time by ~15% through proactive CloudWatch monitoring and alarms",
      "Documented 10+ security hardening practices for Linux servers",
      "Authored Boto3 automation scripts to provision repeatable VPC + EC2 + ALB stacks",
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
  const [open, setOpen] = useState<number | null>(0);

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
          <p className="mt-3 text-sm text-muted-foreground">Click any role to expand details.</p>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Vertical line */}
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary/0 via-primary/40 to-accent/0" />

          <div className="space-y-5">
            {experience.map((e, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={e.role}
                  className={cn(
                    "relative pl-14 transition-all duration-700",
                    visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Node dot */}
                  <span
                    className={cn(
                      "absolute left-5 top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-primary shadow-[0_0_18px_2px_hsl(var(--primary)/0.7)] transition-transform",
                      isOpen && "scale-125",
                    )}
                  />

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="glass hover-lift w-full rounded-2xl p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5 text-primary" />
                          <span className="font-mono uppercase tracking-wider">{e.company}</span>
                        </div>
                        <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                          {e.role}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> {e.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" /> {e.location}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180 text-primary",
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {e.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        {e.highlights && (
                          <div className="mt-5 rounded-xl border border-primary/30 bg-gradient-soft p-4">
                            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary">
                              <Sparkles className="h-3.5 w-3.5" /> Key contributions
                            </div>
                            <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
                              {e.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2">
                                  <span className="text-primary">✓</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
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
