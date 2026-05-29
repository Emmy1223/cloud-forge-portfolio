import { Cloud, Shield, Terminal, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const About = () => {
  const { ref, visible } = useReveal();

  return (
    <section id="about" ref={ref} className="section-padding relative">
      <div className="container-tight grid items-center gap-14 lg:grid-cols-2">
        <div
          className={cn(
            "transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> About me
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Building <span className="text-gradient">scalable & secure</span> systems.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I'm a Cybersecurity undergraduate and Cloud Engineering Intern with hands-on experience
              in AWS cloud infrastructure, Linux administration, networking, and security fundamentals.
              I work with services like EC2, S3, IAM, VPC, route tables, load balancers, and the AWS CLI.
            </p>
            <p>
              I'm familiar with security tools such as Nmap and Wireshark, and I'm committed to applying
              cybersecurity best practices. Alongside infrastructure, I have experience in remote
              operations, technical support, and application testing.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "relative transition-all duration-700 [transition-delay:160ms]",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-soft blur-2xl" />
          <div className="glass relative rounded-[1.75rem] p-7">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-accent/60" />
              <span className="h-3 w-3 rounded-full bg-primary/70" />
              <span className="ml-3 text-xs text-muted-foreground">~/faleti/stack</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <StackTile icon={<Cloud className="h-5 w-5" />} label="Cloud" sub="AWS · Linux" />
              <StackTile icon={<Shield className="h-5 w-5" />} label="Security" sub="IAM · Access" />
              <StackTile icon={<Terminal className="h-5 w-5" />} label="Automation" sub="Python · Bash" />
              <StackTile icon={<Sparkles className="h-5 w-5" />} label="Reliability" sub="Monitoring" />
            </div>

            <div className="mt-6 rounded-xl border border-border bg-background/40 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-primary">$</span> whoami<br />
              <span className="text-foreground">→ emmanuel · cloud-intern · security-undergrad</span>
              <br />
              <span className="text-primary">$</span> mission<br />
              <span className="text-foreground">→ ship resilient infra, secure by default.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StackTile = ({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) => (
  <div className="group rounded-xl border border-border bg-background/40 p-4 transition-colors hover:border-primary/40">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-soft text-primary transition-transform group-hover:scale-110">
      {icon}
    </div>
    <div className="mt-3 text-sm font-semibold text-foreground">{label}</div>
    <div className="text-xs text-muted-foreground">{sub}</div>
  </div>
);

export default About;
