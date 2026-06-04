import { useEffect } from "react";

let clickCtx: AudioContext | null = null;

function playClickSound() {
  if (!clickCtx) {
    clickCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (clickCtx.state === "suspended") {
    clickCtx.resume();
  }

  const oscillator = clickCtx.createOscillator();
  const gain = clickCtx.createGain();

  oscillator.connect(gain);
  gain.connect(clickCtx.destination);

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(800, clickCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, clickCtx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.08, clickCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, clickCtx.currentTime + 0.08);

  oscillator.start(clickCtx.currentTime);
  oscillator.stop(clickCtx.currentTime + 0.08);
}

const ClickSound = () => {
  useEffect(() => {
    document.addEventListener("mousedown", playClickSound);
    return () => {
      document.removeEventListener("mousedown", playClickSound);
    };
  }, []);

  return null;
};

export default ClickSound;
