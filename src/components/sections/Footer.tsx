import { Github, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container-tight flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-primary font-display text-xs font-bold text-primary-foreground">
            EF
          </span>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emmanuel Faleti. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SocialLink href="mailto:emmanuelfaleti@outlook.com" label="Email">
            <Mail className="h-4 w-4" />
          </SocialLink>
          <SocialLink href="https://github.com/Emmy1223" label="GitHub">
            <Github className="h-4 w-4" />
          </SocialLink>
          <SocialLink href="https://wa.me/2349118074905" label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </SocialLink>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
  >
    {children}
  </a>
);

export default Footer;
