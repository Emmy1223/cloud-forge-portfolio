import { useEffect, useState } from "react";

function playBookSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch {
    // ignore
  }
}

const BookIntro = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("book-intro-played") !== "1";
  });
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!show) return;
    setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    sessionStorage.setItem("book-intro-played", "1");
    document.body.style.overflow = "hidden";

    const t1 = requestAnimationFrame(() => {
      playBookSound();
      setOpen(true);
    });
    const t2 = window.setTimeout(() => setFade(true), 1800);
    const t3 = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2300);

    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] pointer-events-none transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      style={{ perspective: "1600px" }}
      aria-hidden
    >
      {isMobile ? (
        <div
          className="absolute inset-0 origin-top transition-transform duration-[1800ms]"
          style={{
            background: "#050a0f",
            borderBottom: "1px solid rgba(0,200,255,0.5)",
            boxShadow: "0 0 24px rgba(0,200,255,0.35)",
            transformStyle: "preserve-3d",
            transform: open ? "rotateX(-95deg)" : "rotateX(0deg)",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ) : (
        <>
          <div
            className="absolute left-0 top-0 h-full w-1/2 origin-left transition-transform duration-[1800ms]"
            style={{
              background: "#050a0f",
              borderRight: "1px solid rgba(0,200,255,0.5)",
              boxShadow: "inset -8px 0 24px -8px rgba(0,200,255,0.35)",
              transformStyle: "preserve-3d",
              transform: open ? "rotateY(-105deg)" : "rotateY(0deg)",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-1/2 origin-right transition-transform duration-[1800ms]"
            style={{
              background: "#050a0f",
              borderLeft: "1px solid rgba(0,200,255,0.5)",
              boxShadow: "inset 8px 0 24px -8px rgba(0,200,255,0.35)",
              transformStyle: "preserve-3d",
              transform: open ? "rotateY(105deg)" : "rotateY(0deg)",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </>
      )}
    </div>
  );
};

export default BookIntro;
