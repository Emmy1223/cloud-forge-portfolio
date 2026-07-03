import { useEffect, useRef, useState, KeyboardEvent as ReactKeyboardEvent } from "react";

type Line = { type: "input" | "output" | "link"; text: string; href?: string };

const PROMPT = "emmanuel@portfolio:~$";

const COMMANDS: { name: string; desc: string }[] = [
  { name: "help", desc: "Show all available commands" },
  { name: "about", desc: "Learn more about Emmanuel" },
  { name: "skills", desc: "View technical skills" },
  { name: "projects", desc: "List featured projects" },
  { name: "experience", desc: "View professional experience" },
  { name: "education", desc: "View educational background" },
  { name: "contact", desc: "Show contact information" },
  { name: "resume", desc: "Open/download resume" },
  { name: "github", desc: "Open GitHub profile" },
  { name: "linkedin", desc: "Open LinkedIn profile" },
  { name: "email", desc: "Open email client" },
  { name: "clear", desc: "Clear terminal screen" },
  { name: "whoami", desc: "Display current profile identity" },
  { name: "pwd", desc: "Show current terminal location" },
  { name: "ls", desc: "List available sections" },
  { name: "cat <file>", desc: "Read content from a virtual file" },
  { name: "theme", desc: "Show current theme" },
  { name: "date", desc: "Display current date and time" },
  { name: "echo <text>", desc: "Print custom text" },
  { name: "neuraldrive", desc: "Open Neural Drive project" },
  { name: "exit", desc: "Close terminal" },
];

const COMMAND_NAMES = [
  "help", "--help", "about", "skills", "projects", "experience", "education",
  "contact", "resume", "github", "linkedin", "email", "clear", "whoami",
  "pwd", "ls", "cat", "theme", "date", "echo", "neuraldrive", "exit",
];

const WELCOME: Line[] = [
  { type: "output", text: "Welcome to Emmanuel's terminal. Type 'help' for commands." },
];

const VIRTUAL_FILES: Record<string, string[]> = {
  "about.txt": [
    "Emmanuel Faleti",
    "Cloud & Infrastructure Engineer | Cybersecurity Student",
    "",
    "I build practical, cloud-native solutions — from AWS infrastructure",
    "to AI-powered platforms like Neural Drive. Passionate about secure,",
    "scalable systems and great developer experience.",
  ],
  "contact.txt": [
    "Email:    emmanuelfaleti@outlook.com",
    "Phone:    +234 911 807 4905",
    "Location: Ogun State, Nigeria",
    "GitHub:   https://github.com/Emmy1223",
    "LinkedIn: https://www.linkedin.com/in/emmanuel-faleti",
  ],
  "skills.json": [
    "{",
    '  "cloud_devops": ["AWS EC2", "S3", "IAM", "Lambda", "CloudWatch", "RDS", "Linux", "CI/CD", "GitHub Actions"],',
    '  "languages":    ["JavaScript", "TypeScript", "Python", "SQL", "C"],',
    '  "frontend":     ["React", "Vite", "Tailwind CSS", "TanStack"],',
    '  "backend":      ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "Socket.io"],',
    '  "ai_data":      ["Scikit-learn", "Prophet", "Pandas", "NumPy"],',
    '  "security":     ["IAM", "System Hardening", "Nmap", "Wireshark"],',
    '  "tools":        ["Git", "GitHub", "VS Code", "Postman", "Lovable"]',
    "}",
  ],
  "experience.md": [
    "# Experience",
    "",
    "- Cloud & Infrastructure Engineer — building AWS-based platforms",
    "- Hackathon Builder — Neural Drive (One-with-AI Hackathon)",
    "- Independent projects across Linux, networking, and security labs",
  ],
  "education.txt": [
    "B.Sc. Cybersecurity (in progress)",
    "Certifications: Linux Essentials, Cisco Networking Essentials,",
    "Cloud Managed Network 201, Google Cloud Computing Foundation",
  ],
  "resume.pdf": ["Use the 'resume' command to download the PDF."],
};

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [closing, setClosing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bufferRef = useRef("");

  // Global "hello" detection
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-10);
        if (bufferRef.current.endsWith("hello")) {
          setOpen(true);
          setMinimized(false);
          bufferRef.current = "";
        }
      } else {
        bufferRef.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, minimized]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const push = (out: Line[]) => setLines((p) => [...p, ...out]);
  const outText = (text: string): Line => ({ type: "output", text });
  const outLink = (text: string, href: string): Line => ({ type: "link", text, href });

  const getTheme = () => (document.documentElement.classList.contains("dark") ? "Dark" : "Light");

  const closeTerminal = () => {
    push([outText("Session terminated."), outText("Thanks for visiting.")]);
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setMinimized(false);
      setLines(WELCOME);
    }, 900);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    push([{ type: "input", text: `${PROMPT} ${raw}` }]);
    if (!cmd) return;

    const [head, ...rest] = cmd.split(/\s+/);
    const lower = head.toLowerCase();
    const argStr = rest.join(" ");

    switch (lower) {
      case "help":
      case "--help": {
        const pad = Math.max(...COMMANDS.map((c) => c.name.length)) + 2;
        push([
          outText("Available Commands"),
          outText(""),
          ...COMMANDS.map((c) => outText(`  ${c.name.padEnd(pad)}${c.desc}`)),
        ]);
        return;
      }
      case "about":
        push(VIRTUAL_FILES["about.txt"].map(outText));
        return;
      case "skills":
        push([
          outText("Cloud & DevOps:    AWS EC2, S3, IAM, Lambda, CloudWatch, RDS, Linux, CI/CD"),
          outText("Languages:         JavaScript, TypeScript, Python, SQL, C"),
          outText("Frontend:          React, Vite, Tailwind CSS, TanStack"),
          outText("Backend:           Node.js, Express, FastAPI, PostgreSQL, Redis, Socket.io"),
          outText("AI & Data:         Scikit-learn, Prophet, Pandas, NumPy"),
          outText("Cybersecurity:     IAM, System Hardening, Nmap, Wireshark"),
          outText("Tools:             Git, GitHub, VS Code, Postman, Lovable"),
        ]);
        return;
      case "projects":
        push([
          outText("Featured Projects"),
          outText(""),
          outText("1. Neural Drive — AI-Powered EV Charging Intelligence Platform"),
          outLink("   https://neural-drive-brown.vercel.app/", "https://neural-drive-brown.vercel.app/"),
          outText("2. Portfolio Website — Personal developer portfolio"),
          outText("3. Static Website on AWS S3 — IAM-secured static hosting"),
          outText("4. Linux Server Monitoring Lab — Bash + cron automation"),
          outText("5. Network Scanner — Nmap + Wireshark recon toolkit"),
        ]);
        return;
      case "experience":
        push(VIRTUAL_FILES["experience.md"].map(outText));
        setTimeout(() => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return;
      case "education":
        push(VIRTUAL_FILES["education.txt"].map(outText));
        setTimeout(() => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return;
      case "contact":
        push([
          outText("Contact"),
          outText(""),
          outLink("LinkedIn: https://www.linkedin.com/in/emmanuel-faleti", "https://www.linkedin.com/in/emmanuel-faleti"),
          outLink("GitHub:   https://github.com/Emmy1223", "https://github.com/Emmy1223"),
          outLink("Email:    emmanuelfaleti@outlook.com", "mailto:emmanuelfaleti@outlook.com"),
          outText("Portfolio: you're already here 😄"),
        ]);
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return;
      case "resume":
        push([outText("Opening resume...")]);
        setTimeout(() => window.open("/__l5e/assets-v1/0c2f05eb-d456-404b-b07c-8a4b885d614a/Emmanuel-Faleti-Resume.pdf", "_blank"), 250);
        return;
      case "github":
        push([outText("Redirecting to github.com/Emmy1223...")]);
        setTimeout(() => window.open("https://github.com/Emmy1223", "_blank"), 250);
        return;
      case "linkedin":
        push([outText("Opening LinkedIn...")]);
        setTimeout(() => window.open("https://www.linkedin.com/in/emmanuel-faleti", "_blank"), 250);
        return;
      case "email":
        push([outText("Opening email client...")]);
        setTimeout(() => { window.location.href = "mailto:emmanuelfaleti@outlook.com"; }, 200);
        return;
      case "whoami":
        push([
          outText("Emmanuel Faleti"),
          outText("Cloud & Infrastructure Engineer"),
          outText("Cybersecurity Student"),
          outText("Builder of practical solutions."),
        ]);
        return;
      case "pwd":
        push([outText("/portfolio/home")]);
        return;
      case "ls":
        push([outText("about.txt   skills.json   projects/   experience.md   education.txt   contact.txt   resume.pdf")]);
        return;
      case "cat": {
        if (!argStr) { push([outText("usage: cat <file>")]); return; }
        const file = VIRTUAL_FILES[argStr];
        if (!file) { push([outText(`cat: ${argStr}: No such file or directory`)]); return; }
        push(file.map(outText));
        return;
      }
      case "theme":
        push([outText(`Current Theme: ${getTheme()}`)]);
        return;
      case "date":
        push([outText(new Date().toString())]);
        return;
      case "echo":
        push([outText(argStr)]);
        return;
      case "neuraldrive":
        push([
          outText("Opening Neural Drive..."),
          outText(""),
          outText("Cloud-Native EV Charging Intelligence Platform"),
          outText("Built with React, TypeScript, Node.js, AWS, PostgreSQL,"),
          outText("Redis, FastAPI and AI Forecasting."),
          outLink("https://neural-drive-brown.vercel.app/", "https://neural-drive-brown.vercel.app/"),
        ]);
        setTimeout(() => window.open("https://neural-drive-brown.vercel.app/", "_blank"), 400);
        return;
      case "clear":
        setLines(WELCOME);
        return;
      case "exit":
        closeTerminal();
        return;
      // Legacy aliases
      case "hire":
        if (rest[0]?.toLowerCase() === "me") {
          push([outText("Opening contact form...")]);
          setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300);
          return;
        }
        break;
    }

    push([
      outText(`Command not found: ${cmd}`),
      outText("Type 'help' to see available commands."),
    ]);
  };

  const onSubmit = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      if (input.trim()) setHistory((h) => [...h, input]);
      setHistoryIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length <= 1) {
        const matches = COMMAND_NAMES.filter((c) => c.startsWith(input.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0] + " ");
        } else if (matches.length > 1) {
          push([{ type: "input", text: `${PROMPT} ${input}` }, outText(matches.join("    "))]);
        }
      } else if (parts[0].toLowerCase() === "cat") {
        const frag = parts[1] || "";
        const matches = Object.keys(VIRTUAL_FILES).filter((f) => f.startsWith(frag));
        if (matches.length === 1) setInput(`cat ${matches[0]}`);
        else if (matches.length > 1) push([{ type: "input", text: `${PROMPT} ${input}` }, outText(matches.join("    "))]);
      }
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!pos) setPos({ x: rect.left, y: rect.top });
    setDragging(true);
  };

  if (!open) return null;

  const style: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, bottom: "auto", right: "auto" }
    : {};

  return (
    <div
      className={`fixed z-[80] w-[92vw] max-w-2xl bottom-4 left-1/2 -translate-x-1/2 sm:left-1/2 ${
        closing ? "animate-out fade-out slide-out-to-bottom duration-700" : "animate-in slide-in-from-bottom duration-500"
      }`}
      style={pos ? { ...style, transform: "none" } : undefined}
    >
      <div className="rounded-lg overflow-hidden border border-[#00ffae]/30 bg-[#0a0e0a] shadow-[0_20px_60px_-10px_rgba(0,255,174,0.25)]">
        <div
          onMouseDown={startDrag}
          className="flex items-center justify-between px-3 py-2 bg-[#111511] border-b border-[#00ffae]/20 cursor-move select-none"
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-[#7cf5c4]">{PROMPT}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }}
              onMouseDown={(e) => e.stopPropagation()}
              className="px-2 text-[#7cf5c4] hover:text-white text-sm font-mono"
              aria-label="Minimize"
            >—</button>
            <button
              onClick={(e) => { e.stopPropagation(); closeTerminal(); }}
              onMouseDown={(e) => e.stopPropagation()}
              className="px-2 text-[#7cf5c4] hover:text-red-400 text-sm font-mono"
              aria-label="Close"
            >✕</button>
          </div>
        </div>

        {!minimized && (
          <div
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
            className="font-mono text-[13px] text-[#7cf5c4] bg-[#0a0e0a] px-4 py-3 h-72 overflow-y-auto leading-relaxed whitespace-pre-wrap"
          >
            {lines.map((l, i) => {
              if (l.type === "link" && l.href) {
                return (
                  <div key={i}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#a8ffd8] underline decoration-[#00ffae]/40 hover:decoration-[#00ffae]"
                    >
                      {l.text}
                    </a>
                  </div>
                );
              }
              return (
                <div key={i} className={l.type === "input" ? "text-[#a8ffd8]" : "text-[#7cf5c4]"}>
                  {l.text}
                </div>
              );
            })}
            <div className="flex items-center">
              <span className="text-[#a8ffd8]">{PROMPT}&nbsp;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onSubmit}
                className="flex-1 bg-transparent outline-none border-0 text-[#a8ffd8] caret-[#00ffae] font-mono"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="ml-0.5 inline-block w-2 h-4 bg-[#00ffae] animate-pulse" aria-hidden />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
