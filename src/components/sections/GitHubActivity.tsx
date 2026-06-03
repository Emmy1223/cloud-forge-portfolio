import { useEffect, useState } from "react";
import {
  Github,
  Star,
  GitFork,
  Code2,
  GitCommit,
  Eye,
  GitPullRequest,
  CircleDot,
  Users,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const USERNAME = "Emmy1223";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface User {
  public_repos: number;
  followers: number;
  following: number;
}

interface Event {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Java: "#b07219",
  Go: "#00ADD8",
  Ruby: "#701516",
  C: "#555555",
  "C++": "#f34b7d",
};

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

function eventIcon(type: string) {
  switch (type) {
    case "PushEvent":
      return GitCommit;
    case "WatchEvent":
      return Star;
    case "ForkEvent":
      return GitFork;
    case "PullRequestEvent":
      return GitPullRequest;
    case "IssuesEvent":
      return CircleDot;
    case "CreateEvent":
      return Code2;
    default:
      return Eye;
  }
}

function eventLabel(type: string): string {
  const map: Record<string, string> = {
    PushEvent: "Pushed to",
    WatchEvent: "Starred",
    ForkEvent: "Forked",
    PullRequestEvent: "PR on",
    IssuesEvent: "Issue on",
    CreateEvent: "Created",
    DeleteEvent: "Deleted in",
    PublicEvent: "Made public",
  };
  return map[type] ?? type.replace("Event", "");
}

const GitHubActivity = () => {
  const { ref, visible } = useReveal();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [u, r, e] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`).then((x) => x.json()),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=4`).then((x) => x.json()),
          fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=6`).then((x) => x.json()),
        ]);
        if (cancelled) return;
        if (u && typeof u.public_repos === "number") setUser(u);
        if (Array.isArray(r)) setRepos(r);
        if (Array.isArray(e)) setEvents(e);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    { icon: BookOpen, label: "Public Repos", value: user?.public_repos },
    { icon: Users, label: "Followers", value: user?.followers },
    { icon: Github, label: "Following", value: user?.following },
  ];

  const hasData = user || repos.length > 0 || events.length > 0;
  const showFallback = (loading || failed || !hasData) && !user && repos.length === 0;

  return (
    <section id="github" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Github className="h-3.5 w-3.5" /> Live from GitHub
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Code &amp; <span className="text-gradient">Commits</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A real-time look at what I'm building, breaking, and shipping on GitHub.
          </p>
        </div>

        {showFallback ? (
          <div
            className={cn(
              "glass mx-auto mt-14 max-w-md rounded-2xl p-8 text-center transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <Github className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">GitHub activity loading...</p>
          </div>
        ) : (
          <>
            {/* Stat chips */}
            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "glass hover-lift flex items-center justify-between rounded-2xl p-5 transition-all duration-700",
                    visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-1 font-display text-3xl font-bold text-foreground">
                      {s.value ?? "—"}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[0_0_24px_-6px_hsl(var(--primary)/0.7)]">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Repos grid */}
              <div className="grid gap-5 sm:grid-cols-2">
                {repos.slice(0, 4).map((repo, i) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "glass hover-lift group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all duration-700",
                      visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    )}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-base font-semibold text-foreground line-clamp-1">
                        {repo.name}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                      {repo.language ? (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: LANG_COLORS[repo.language] || "hsl(var(--primary))" }}
                          />
                          {repo.language}
                        </span>
                      ) : (
                        <span />
                      )}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Activity feed */}
              <div
                className={cn(
                  "glass rounded-2xl p-5 transition-all duration-700",
                  visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
                style={{ transitionDelay: "200ms" }}
              >
                <h3 className="font-display text-lg font-semibold text-foreground">Recent Activity</h3>
                <ul className="mt-4 space-y-3">
                  {events.slice(0, 6).map((ev, i) => {
                    const Icon = eventIcon(ev.type);
                    return (
                      <li
                        key={ev.id}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/30 p-3 animate-fade-in"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-foreground">
                            <span className="text-muted-foreground">{eventLabel(ev.type)}</span>{" "}
                            <a
                              href={`https://github.com/${ev.repo.name}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="font-medium hover:text-primary"
                            >
                              {ev.repo.name}
                            </a>
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo(ev.created_at)}</p>
                        </div>
                      </li>
                    );
                  })}
                  {events.length === 0 && (
                    <li className="text-center text-sm text-muted-foreground">No recent activity.</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="mt-12 flex justify-center">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_-8px_hsl(var(--primary)/0.9)]"
          >
            <Github className="h-4 w-4" />
            View Full Profile
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
