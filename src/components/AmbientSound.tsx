import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Floating ambient mode toggle. Uses Web Audio API to synthesize a soft cinematic pad. */
const AmbientSound = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode[]; gain: GainNode } | null>(null);

  const start = async () => {
    const AC: typeof AudioContext =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new AC();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    // Soft low cinematic pad — slightly detuned sine voices
    const freqs = [110, 165.0, 220, 277.18]; // A2, E3-ish, A3, C#4
    const osc = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      // slow LFO via detune
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.05 + i * 0.03;
      lfoGain.gain.value = 4;
      lfo.connect(lfoGain).connect(o.detune);
      lfo.start();
      o.connect(gain);
      o.start();
      return o;
    });

    // fade in
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.4);
    nodesRef.current = { osc, gain };
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) return;
    nodes.gain.gain.cancelScheduledValues(ctx.currentTime);
    nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    setTimeout(() => {
      nodes.osc.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {}
      });
      nodes.gain.disconnect();
      nodesRef.current = null;
    }, 700);
  };

  useEffect(() => () => stop(), []);

  const toggle = async () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      await start();
      setPlaying(true);
    }
  };

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
