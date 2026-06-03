import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC = "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749f5d2.mp3";
const FALLBACK_SRC = "https://cdn.pixabay.com/audio/2023/01/23/audio_26e4a2a5c7.mp3";

/** Floating ambient mode toggle. Uses HTML5 <audio> for a looping solemn piano track. */
const AmbientSound = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = 0.4;
      audio.onerror = () => {
        // Fallback if primary fails
        const fallback = new Audio(FALLBACK_SRC);
        fallback.loop = true;
        fallback.volume = 0.4;
        fallback.play().catch(() => {});
        audioRef.current = fallback;
      };
      audioRef.current = audio;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
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
