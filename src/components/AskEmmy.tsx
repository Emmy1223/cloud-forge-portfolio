import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Dynamic portfolio knowledge base                                   */
/*  Reads the rendered DOM so the AI always answers from the LATEST    */
/*  site content — no hardcoded facts, no manual sync.                 */
/* ------------------------------------------------------------------ */

type Section = { id: string; title: string; text: string; tokens: Set<string> };

const STOP = new Set([
  "the","a","an","and","or","but","of","to","in","on","for","with","at","by",
  "is","are","was","were","be","been","being","it","its","this","that","these",
  "those","i","you","he","she","we","they","me","my","your","our","their","as",
  "from","so","if","then","than","about","into","over","up","down","out","do",
  "does","did","have","has","had","can","could","should","would","will","just",
]);

const tokenize = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s+.#-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP.has(w)),
  );

const cleanText = (el: Element) =>
  (el.textContent || "")
    .replace(/\s+/g, " ")
    .trim();

const extractPortfolio = (): Section[] => {
  const root = document.querySelector("main") || document.body;
  if (!root) return [];
  const sections: Section[] = [];
  const seen = new Set<string>();

  // Every <section> under main + footer
  const nodes: Element[] = [
    ...Array.from(root.querySelectorAll("section")),
    ...Array.from(document.querySelectorAll("footer")),
  ];

  for (const node of nodes) {
    const id = node.id || node.getAttribute("aria-label") || `section-${sections.length}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const heading = node.querySelector("h1, h2, h3");
    const title = heading ? cleanText(heading) : id;
    const text = cleanText(node);
    if (text.length < 20) continue;
    sections.push({ id, title, text, tokens: tokenize(title + " " + text) });
  }

  // Hero often has no id — capture the first big heading area explicitly
  const h1 = document.querySelector("h1");
  if (h1) {
    const heroText = cleanText(h1.closest("section") || h1.parentElement || h1);
    if (heroText && !sections.some((s) => s.text.includes(heroText.slice(0, 40)))) {
      sections.unshift({
        id: "hero",
        title: cleanText(h1),
        text: heroText,
        tokens: tokenize(heroText),
      });
    }
  }

  return sections;
};

// Questions that are really about the tech stack should always pull in Skills
const SKILL_TRIGGERS =
  /\b(skill|skills|stack|tech|technolog|tool|tools|toolkit|framework|language|languages|experience with|know|use|used|build|built|mydoc|my ?doc|aws|cloud|frontend|backend|database|deploy)/i;

const isSkills = (s: Section) => /skill|toolkit|stack/i.test(s.id + " " + s.title);

const rankSections = (question: string, sections: Section[]): Section[] => {
  const qTokens = tokenize(question);
  if (qTokens.size === 0) return sections;
  const scored = sections.map((s) => {
    let score = 0;
    qTokens.forEach((t) => {
      if (s.tokens.has(t)) score += 2;
      else if (s.text.toLowerCase().includes(t)) score += 1;
    });
    // Boost the live Skills section for any stack/tooling question
    if (isSkills(s) && SKILL_TRIGGERS.test(question)) score += 10;
    return { s, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((x) => x.score > 0).map((x) => x.s);
  // Always keep hero/about/contact + the Skills section as baseline context
  const baseline = sections.filter((s) => /hero|about|contact/i.test(s.id) || isSkills(s));
  const merged: Section[] = [];
  [...top, ...baseline].forEach((s) => {
    if (!merged.includes(s)) merged.push(s);
  });
  return merged.slice(0, 7);
};

const buildContext = (sections: Section[]) =>
  sections
    // Skills lists are long — never truncate them mid-stack
    .map((s) => `## ${s.title} (#${s.id})\n${s.text.slice(0, isSkills(s) ? 4000 : 1200)}`)
    .join("\n\n");

/* ------------------------------------------------------------------ */

const STARTERS = [
  "What is Emmanuel's latest project?",
  "What are his AWS skills?",
  "Show me his certifications",
  "How can I contact him?",
];

type Msg = { role: "user" | "model"; text: string };

const AskEmmy = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const kbRef = useRef<Section[]>([]);
  const dirtyRef = useRef(true);

  // Build KB once, refresh when the DOM changes (debounced).
  useEffect(() => {
    const refresh = () => {
      kbRef.current = extractPortfolio();
      dirtyRef.current = false;
    };
    // initial pass after first paint
    const t = window.setTimeout(refresh, 300);

    let debounce: number | undefined;
    const observer = new MutationObserver(() => {
      dirtyRef.current = true;
      window.clearTimeout(debounce);
      debounce = window.setTimeout(refresh, 500);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(debounce);
      observer.disconnect();
    };
  }, []);

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

      if (dirtyRef.current || kbRef.current.length === 0) {
        kbRef.current = extractPortfolio();
        dirtyRef.current = false;
      }
      const relevant = rankSections(userMessage, kbRef.current);
      const context = buildContext(relevant);

      const systemPrompt = `You are "Ask Emmy", a live AI assistant embedded in Emmanuel Faleti's portfolio website.

You answer ONLY using the PORTFOLIO CONTENT below, which is extracted in real time from the currently rendered website. Never invent facts. If the answer isn't present, reply: "That's not currently listed on the portfolio — you can reach Emmanuel directly at emmanuelfaleti@outlook.com."

Style: warm, concise, recruiter-friendly. Combine information across sections when useful. Prefer specifics (project names, technologies, dates) that appear verbatim on the site.

---- PORTFOLIO CONTENT (live from DOM) ----
${context}
---- END PORTFOLIO CONTENT ----`;

      // Include prior conversation for continuity
      const history = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [...history, { role: "user", parts: [{ text: userMessage }] }],
            systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Gemini API error response:", res.status, data);
        throw new Error(data?.error?.message || `HTTP ${res.status}`);
      }
      const reply: string =
        data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ||
        "That's not currently listed on the portfolio — you can reach Emmanuel directly at emmanuelfaleti@outlook.com.";
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
                live
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
                  Hi! I'm Emmy 🤖 — I read this portfolio live, so ask me anything about Emmanuel.
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
