import { Github, Globe, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const socials = [
  { icon: Mail, label: "Email", href: "mailto:emmanuelfaleti@outlook.com" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "https://github.com/Emmy1223" },
  { icon: Globe, label: "Portfolio", href: "#home" },
];

const Contact = () => {
  const { ref, visible } = useReveal();
  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div
          className={cn(
            "relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] transition-all duration-700",
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="absolute -inset-10 -z-10 bg-gradient-soft blur-3xl" />
          <div className="glass-strong rounded-[2rem] p-10 sm:p-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Contact
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Let's Build <span className="text-gradient">Something</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Open to cloud engineering, security, and operations roles. Reach out and let's talk.
            </p>

            <div className="mx-auto mt-10 grid max-w-xl gap-3">
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value="+234 911 807 4905"
                href="tel:+2349118074905"
              />
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value="emmanuelfaleti@outlook.com"
                href="mailto:emmanuelfaleti@outlook.com"
              />
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value="Ogun State, Nigeria"
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-all hover:scale-105 hover:border-primary/50 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <a
              href="mailto:emmanuelfaleti@outlook.com"
              className="group relative mt-8 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_hsl(var(--primary)/0.7)] transition-transform hover:scale-[1.04] hover:shadow-[0_0_60px_-4px_hsl(var(--primary)/0.9)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-2 ring-primary/60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
              <Send className="relative h-4 w-4" />
              <span className="relative">Get In Touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) => {
  const inner = (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-background/40 px-5 py-4 text-left transition-colors hover:border-primary/40 hover:bg-background/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-soft text-primary transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="truncate text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
};

export default Contact;
