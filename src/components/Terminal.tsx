import { useEffect, useRef, useState, KeyboardEvent as ReactKeyboardEvent } from "react";

type Line = { type: "input" | "output"; text: string };

const PROMPT = "emmanuel@portfolio:~$";

const HELP_CMDS = [
  "whoami",
  "ls projects",
  "cat skills.txt",
  "cat contact.txt",
  "hire me",
  "open github",
  "open portfolio",
  "pwd",
  "date",
  "clear",
  "help",
];

const WELCOME: Line[] = [
  { type: "output", text: "Welcome to Emmanuel's terminal. Type 'help' for commands." },
];

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
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

  // Dragging
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

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    const out: Line[] = [{ type: "input", text: `${PROMPT} ${raw}` }];
    if (!cmd) {
      setLines((p) => [...p, ...out]);
      return;
    }
    const lower = cmd.toLowerCase();
    let response: string | string[] | null = null;
    let clear = false;

    switch (lower) {
      case "whoami":
        response = "Emmanuel Faleti. Cloud Engineer. Cybersecurity Enthusiast. Builder.";
        break;
      case "ls projects":
        response = "aws-infra-setup/   network-scanner-tool/   linux-hardening/   s3-static-site/";
        break;
      case "cat skills.txt":
        response = [
          "Cloud: AWS EC2, S3, IAM, VPC, Linux",
          "Security: Nmap, Wireshark, IAM, System Hardening",
          "Scripting: Python, Bash",
          "Networking: TCP/IP, DNS, VPNs, OSI Model",
        ];
        break;
      case "cat contact.txt":
        response = [
          "Email: emmanuelfaleti@outlook.com",
          "Phone: +234 911 807 4905",
          "Location: Ogun State, Nigeria",
        ];
        break;
      case "hire me":
        response = "Opening contact form...";
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 400);
        break;
      case "open github":
        response = "Redirecting to github.com/Emmy1223...";
        setTimeout(() => window.open("https://github.com/Emmy1223", "_blank"), 300);
        break;
      case "open portfolio":
        response = "You're already here 😄";
        break;
      case "pwd":
        response = "/home/emmanuel/portfolio";
        break;
      case "date":
        response = new Date().toString();
        break;
      case "clear":
        clear = true;
        break;
      case "help":
        response = `Available commands: ${HELP_CMDS.join(", ")}`;
        break;
      default:
        response = `command not found: ${cmd}. Type 'help' for available commands.`;
    }

    if (clear) {
      setLines([]);
      return;
    }
    const responses = Array.isArray(response) ? response : [response as string];
    setLines((p) => [...p, ...out, ...responses.map((t) => ({ type: "output" as const, text: t }))]);
  };

  const onSubmit = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      if (input.trim()) {
        setHistory((h) => [...h, input]);
      }
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
      className="fixed z-[80] w-[92vw] max-w-2xl bottom-4 left-1/2 -translate-x-1/2 sm:left-1/2 animate-in slide-in-from-bottom duration-500"
      style={pos ? { ...style, transform: "none" } : undefined}
    >
      <div className="rounded-lg overflow-hidden border border-[#00ffae]/30 bg-[#0a0e0a] shadow-[0_20px_60px_-10px_rgba(0,255,174,0.25)]">
        {/* Header */}
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
              onClick={(e) => { e.stopPropagation(); setOpen(false); setMinimized(false); }}
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
            className="font-mono text-[13px] text-[#7cf5c4] bg-[#0a0e0a] px-4 py-3 h-72 overflow-y-auto leading-relaxed"
          >
            {lines.map((l, i) => (
              <div key={i} className={l.type === "input" ? "text-[#a8ffd8]" : "text-[#7cf5c4]"}>
                {l.text}
              </div>
            ))}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
