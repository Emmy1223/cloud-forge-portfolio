import { useEffect, useRef } from "react";

/** Subtle Matrix-style falling code rain background. Fixed full-page, behind all content. */
const CHARS = "01{}[]<>/\\#$;:=";
const WORDS = ["EC2", "S3", "IAM", "VPC", "SSH"];

const pickGlyph = () => {
  // ~15% chance to render an AWS-ish term, else a single char
  if (Math.random() < 0.15) return WORDS[Math.floor(Math.random() * WORDS.length)];
  return CHARS[Math.floor(Math.random() * CHARS.length)];
};

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;
    const FRAME_MS = 80; // slow fall

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * window.innerHeight) / fontSize)
      );
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < FRAME_MS) return;
      last = t;

      // Soft trail fade — read the actual background color so it works in light & dark
      const bg = getComputedStyle(document.body).backgroundColor || "rgb(10,10,10)";
      // Convert "rgb(r, g, b)" to rgba with low alpha for trailing
      const rgb = bg.match(/\d+/g);
      const fade = rgb
        ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.12)`
        : "rgba(10,10,10,0.12)";

      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      const primaryRaw = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "45 80% 58%";
      const primary = primaryRaw.replace(/\s+/g, ", ");
      for (let i = 0; i < drops.length; i++) {
        const glyph = pickGlyph();
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const alpha = 0.05 + Math.random() * 0.10; // 5–15%
        ctx.fillStyle = `hsla(${primary}, ${alpha})`;
        ctx.fillText(glyph, x, y);

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      style={{ zIndex: -1 }}
    />
  );
};

export default CodeRain;
