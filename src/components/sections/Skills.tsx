import { Cloud, Code2, Database, Brain, Shield, Wrench, Layout, FileText, LayoutDashboard, Server } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const groups: { icon: typeof Cloud; title: string; items: string[] }[] = [
  {
    icon: Layout,
    title: "Frontend Development",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Vite", "TanStack Router", "TanStack Query", "Lucide React", "Responsive Web Design"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    items: ["Next.js API Routes", "REST API Development", "Server-side Logic", "Authentication", "NextAuth.js", "Session Management", "Node.js", "Express.js", "FastAPI", "Socket.io", "Boto3"],
  },
  {
    icon: Brain,
    title: "AI & Intelligent Features",
    items: [
      "AI-Powered CV Analysis",
      "AI CV Tailoring",
      "Job Description Analysis",
      "CV-to-Job Matching",
      "AI Prompt Engineering",
      "Structured AI Output",
      "AI-Assisted Content Optimization",
      "LLM Integration",
      "Amazon SageMaker",
      "Scikit-learn",
      "Prophet",
      "Pandas",
      "NumPy",
    ],
  },
  {
    icon: FileText,
    title: "Document & PDF Processing",
    items: [
      "PDF Text Extraction",
      "CV Parsing",
      "Structured Document Data",
      "CV Document Generation",
      "PDF Export",
      "A4 & Letter Layouts",
      "Print-Ready Rendering",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Product & Application Development",
    items: [
      "Dashboard Development",
      "CRUD Operations",
      "Document Management",
      "CV Builder/Editor",
      "Multiple CV Templates",
      "Live Document Preview",
      "Document Thumbnails",
      "Preview Modals",
      "Rename / Duplicate / Download / Export / Delete Workflows",
      "Error Handling",
      "Mobile-Responsive App Design",
    ],
  },
  {
    icon: Code2,
    title: "Development & Deployment",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Environment Variables",
      "Production Deployment",
      "TypeScript Type Checking",
      "npm",
      "Build & Deployment Troubleshooting",
      "Terraform",
      "Linux Administration",
      "Bash",
      "AWS CLI",
      "CI/CD",
      "GitHub Actions",
      "Monitoring & Alarms",
      "VS Code",
      "Postman",
      "Lovable",
    ],
  },
  {
    icon: Cloud,
    title: "AWS & Cloud",
    items: [
      "EC2",
      "S3",
      "VPC",
      "IAM",
      "Route 53",
      "CloudWatch",
      "ALB",
      "NLB",
      "Target Groups",
      "ACM",
      "Lambda",
      "Organizations",
      "Billing & Cost Management",
      "Recycle Bin",
      "SageMaker",
    ],
  },
  {
    icon: Database,
    title: "Databases & Storage",
    items: [
      "Amazon RDS",
      "Amazon Aurora",
      "Amazon DynamoDB",
      "Amazon S3",
      "Amazon EFS",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    items: [
      "IAM & Least Privilege",
      "Access Control",
      "System Hardening",
      "SSL/TLS (ACM)",
      "Nmap",
      "Wireshark",
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
            A toolkit built through <span className="text-gradient">real projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            The technologies and capabilities I work with across real products — including building and deploying
            full-stack applications such as myDoc, an AI-powered CV platform.
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
