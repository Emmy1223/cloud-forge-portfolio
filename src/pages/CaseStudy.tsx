import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Copy, Github, Share2 } from "lucide-react";
import { toast } from "sonner";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = getCaseStudy(slug);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!study) return;
    const prevTitle = document.title;
    document.title = study.metaTitle;
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    const prevDesc = meta.getAttribute("content");
    meta.setAttribute("content", study.metaDescription);
    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) meta.setAttribute("content", prevDesc);
    };
  }, [study]);

  if (!study) return <NotFound />;

  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const Icon = study.icon;

  const copyCode = async () => {
    await navigator.clipboard.writeText(study.code.content);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 1500);
  };

  const shareLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  return (
    <div className="relative min-h-screen animate-fade-in">
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="container-tight flex items-center justify-between pt-8">
        <Link
          to="/#projects"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "projects" } });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground/90 transition-all hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <button
          onClick={shareLink}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/20 hover:shadow-[0_0_18px_-4px_hsl(var(--primary)/0.8)]"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      <main className="container-tight pb-24 pt-10">
        {/* Hero */}
        <section className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className={cn("absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br opacity-30 blur-3xl", study.accent)} />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-primary-foreground shadow-[0_0_40px_-8px_hsl(var(--primary)/0.7)]", study.accent)}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Case Study 0{idx + 1}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                {study.title}
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{study.shortDescription}</p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <Reveal>
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              The <span className="text-gradient">Problem</span>
            </h2>
            <p className="mt-4 text-muted-foreground">{study.problem}</p>
          </section>
        </Reveal>

        <div className="my-12 h-px w-full bg-border/60" />

        {/* Approach */}
        <Reveal>
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              The <span className="text-gradient">Approach</span>
            </h2>
            <ul className="mt-5 space-y-3">
              {study.approach.map((step) => (
                <li
                  key={step}
                  className="glass flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-foreground/90"
                >
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <div className="my-12 h-px w-full bg-border/60" />

        {/* Tools */}
        <Reveal>
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Tools <span className="text-gradient">Used</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {study.tools.map((t) => (
                <span
                  key={t}
                  className="cursor-default rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_18px_-4px_hsl(var(--primary)/0.8)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        <div className="my-12 h-px w-full bg-border/60" />

        {/* Code */}
        <Reveal>
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Key <span className="text-gradient">Code</span>
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-[#0a0e0a]">
              <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-4 py-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {study.code.language}
                </span>
                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors hover:bg-secondary"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-[#7cf5c4]">
                <code>{study.code.content}</code>
              </pre>
            </div>
          </section>
        </Reveal>

        <div className="my-12 h-px w-full bg-border/60" />

        {/* Outcome */}
        <Reveal>
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              The <span className="text-gradient">Outcome</span>
            </h2>
            <p className="mt-4 text-muted-foreground">{study.outcome}</p>
            <a
              href={study.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-primary/20"
            >
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </section>
        </Reveal>

        {/* Prev / Next */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="glass hover-lift group rounded-2xl p-5 transition-all"
          >
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous Project
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-primary">
              {prev.title}
            </p>
          </Link>
          <Link
            to={`/projects/${next.slug}`}
            className="glass hover-lift group rounded-2xl p-5 text-right transition-all"
          >
            <span className="flex items-center justify-end gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Next Project <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <p className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-primary">
              {next.title}
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CaseStudy;
