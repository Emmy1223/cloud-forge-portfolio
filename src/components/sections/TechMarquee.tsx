const tools = [
  "AWS",
  "Linux",
  "Git",
  "Python",
  "Bash",
  "Nmap",
  "Wireshark",
  "VS Code",
  "GitHub",
  "Google Workspace",
];

const TechMarquee = () => {
  const row = [...tools, ...tools];
  return (
    <section aria-label="Tech stack" className="relative py-12">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-3 py-2">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="glass inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/85"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
