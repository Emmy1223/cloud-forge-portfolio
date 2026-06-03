import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC =
  "https://archive.org/download/prelude-and-fugue-no.-1-in-c-major-bwv-846-from-bachs-well-tempered-clavier-gulda-pianist/Prelude%20and%20Fugue%20No.%201%20in%20C%20major%2C%20BWV%20846%2C%20from%20Bachs%20Well-tempered%20Clavier%2C%20Gulda%20pianist.mp3";

const AmbientSound = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
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
