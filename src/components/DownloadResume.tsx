import { Download } from "lucide-react";

const RESUME_URL = "/Emmanuel-Faleti-Resume.pdf";

const DownloadResume = () => {
  return (
    <a
      href={RESUME_URL}
      download="Emmanuel-Faleti-Resume.pdf"
      aria-label="Download résumé as PDF"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.7)] transition-transform hover:scale-[1.04] md:bottom-8 md:right-8"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Download Resume</span>
    </a>
  );
};

export default DownloadResume;
