import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Floating ambient mode toggle. Uses Web Audio API oscillators — no external files. */
const AmbientSound = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const playAmbientTone = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const notes = [261.63, 329.63, 392.0, 523.25];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 1.5;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.06, start + 2);
      gain.gain.linearRampToValueAtTime(0, start + 6);
      osc.start(start);
      osc.stop(start + 6);
    });
  };

  const toggle = () => {
    if (playing) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setPlaying(false);
      return;
    }

    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctor();
    }

    ctxRef.current.resume().then(() => {
      playAmbientTone();
      intervalRef.current = window.setInterval(playAmbientTone, 8000);
      setPlaying(true);
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Disable ambient mode" : "Enable ambient mode"}
      title="Ambient Mode"
      className={`group fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.5)] backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/50 hover:text-primary md:bottom-8 md:right-8 ${
        playing ? "ring-2 ring-primary/60 animate-glow-pulse" : ""
      }`}
    >
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        Ambient Mode
      </span>
    </button>
  );
};

export default AmbientSound;
