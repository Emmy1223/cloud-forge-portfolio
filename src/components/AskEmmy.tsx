import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

const SYSTEM_PROMPT = `You are "Ask Emmy", an AI assistant embedded in Emmanuel Faleti's portfolio website. Answer questions about Emmanuel professionally, warmly and concisely. Never make up information. Here is everything you know about Emmanuel:

NAME: Emmanuel Faleti
ROLE: Cloud Engineering Intern and Cybersecurity undergraduate
LOCATION: Ogun State, Nigeria. Open to remote roles globally.
EMAIL: emmanuelfaleti@outlook.com
PHONE: +234 911 807 4905
PORTFOLIO: https://emmanuelfaleti.vercel.app
GITHUB: https://github.com/Emmy1223

EDUCATION: Bachelor's Degree in Cybersecurity — Osun State University, Osogbo Nigeria. Started November 2023, currently in progress.

EXPERIENCE:
1. Cloud Engineering Intern at Ntech — April 2026 to present, Osun Nigeria. Configures AWS resources (EC2, S3, IAM), deploys and manages apps on Linux servers, applies IP addressing DNS and routing, supports security best practices, uses CLI scripts to manage cloud resources.
2. Freelance Virtual Assistant — December 2023 to present, Remote (Asia, US). Manages admin tasks, email, scheduling, data organization, recruitment support, research.
3. App and Web Tester — January 2023 to May 2024, Remote US. Tested web and mobile apps, bug reporting, UI/UX feedback, QA.

SKILLS:
Cloud: AWS EC2, S3, IAM, VPC, Subnets, Route Tables, Load Balancers, AWS CLI, Linux Administration, Server Management, System Monitoring
Networking: TCP/IP, IP Addressing, DNS, VPNs, OSI Model, Routing, Network Troubleshooting
Security: Access Control, IAM, Least Privilege, System Hardening, Vulnerability Assessment, Nmap, Wireshark
Scripting: Python, Bash, HTML, CSS, Git, GitHub
Testing: App Testing, Web Testing, Bug Reporting, UI/UX Analysis, QA

CERTIFICATIONS: Google Cloud Computing Foundation, Cisco Networking Essentials, Cloud Managed Network 201 (Cisco), Linux Essentials (Cisco)

PROJECTS:
1. Static Website Hosted on AWS S3 — deployed static site using S3 bucket with IAM permissions
2. Linux Server Monitoring Lab — Bash scripts for uptime monitoring and log rotation
3. Network Scanner Tool — Python + Nmap tool for port scanning and network discovery. GitHub: https://github.com/Emmy1223/network-scanner-tool

AVAILABILITY: Currently open to Cloud Engineering, Cybersecurity, SOC Analyst, QA Engineer, and remote technical roles.

If asked something you don't know, say: "I don't have that information — reach out to Emmanuel directly at emmanuelfaleti@outlook.com"`;

const STARTERS = [
  "Is Emmanuel available for hire?",
  "What are his AWS skills?",
  "Show me his projects",
  "How can I contact him?",
];

type Msg = { role: "user" | "model"; text: string };

const AskEmmy = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMessage }]);
    setLoading(true);
    try {
      const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
      if (!key) throw new Error("VITE_GEMINI_API_KEY is missing");
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            systemInstruction: { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Gemini API error response:", res.status, data);
        throw new Error(data?.error?.message || `HTTP ${res.status}`);
      }
      const reply: string =
        data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ||
        "I don't have that information — reach out to Emmanuel directly at emmanuelfaleti@outlook.com";
      setMessages((m) => [...m, { role: "model", text: reply }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages((m) => [
        ...m,
        { role: "model", text: "Emmy is unavailable right now — email emmanuelfaleti@outlook.com" },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Ask Emmy chat"
        className="fixed bottom-5 left-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-background/80 text-primary shadow-[0_0_24px_-4px_hsl(var(--primary)/0.8)] backdrop-blur-xl transition-all hover:scale-105 hover:border-primary md:bottom-8 md:left-8 animate-glow-pulse"
      >
        <Bot className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-20 left-3 z-[70] flex h-[450px] w-[calc(100vw-1.5rem)] max-w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-[0_30px_80px_-20px_rgba(0,200,255,0.35)] backdrop-blur-xl md:bottom-24 md:left-8 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/70 bg-secondary/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-foreground">Ask Emmy 🤖</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                online
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="rounded-2xl rounded-tl-sm border border-border bg-secondary/40 px-3 py-2 text-foreground/90">
                  Hi! I'm Emmy 🤖 — ask me anything about Emmanuel.
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground transition-all hover:border-primary/60 hover:bg-primary/20 hover:text-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary/90 px-3 py-2 text-primary-foreground"
                      : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-border bg-secondary/40 px-3 py-2 text-foreground/90"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-secondary/40 px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border/70 bg-secondary/30 px-3 py-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Emmanuel..."
              className="flex-1 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AskEmmy;
