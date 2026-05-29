import { Download } from "lucide-react";
import jsPDF from "jspdf";

const buildResume = (doc: jsPDF) => {
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (h: number) => {
    if (y + h > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const text = (
    str: string,
    opts: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number } = {},
  ) => {
    const { size = 11, bold = false, color = [40, 40, 40], gap = 4 } = opts;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(str, maxWidth) as string[];
    const lineH = size * 1.25;
    ensureSpace(lines.length * lineH + gap);
    lines.forEach((ln) => {
      doc.text(ln, margin, y);
      y += lineH;
    });
    y += gap;
  };

  const heading = (str: string) => {
    ensureSpace(28);
    y += 6;
    doc.setDrawColor(180, 140, 50);
    doc.setLineWidth(1);
    doc.line(margin, y, margin + 28, y);
    y += 14;
    text(str.toUpperCase(), { size: 12, bold: true, color: [120, 90, 20], gap: 6 });
  };

  // Header
  text("Emmanuel Faleti", { size: 22, bold: true, color: [20, 20, 20], gap: 2 });
  text("Cloud Engineering Intern · Cybersecurity Undergraduate", {
    size: 11,
    color: [110, 110, 110],
    gap: 8,
  });
  text(
    "emmanuelfaleti@outlook.com  ·  +234 (0) 911-807-4905  ·  Ogun State, Nigeria",
    { size: 10, color: [110, 110, 110] },
  );

  heading("Summary");
  text(
    "Cybersecurity undergraduate and Cloud Engineering Intern with hands-on experience in AWS cloud infrastructure, Linux administration, networking, and security fundamentals. Skilled in EC2, S3, IAM, VPC, route tables, load balancers, and AWS CLI, with practical experience in system monitoring, troubleshooting, and infrastructure management.",
  );

  heading("Education");
  text("Osun State University — BS, Cybersecurity", { bold: true, gap: 1 });
  text("11/2023 – Present  ·  Osogbo, Nigeria", { size: 10, color: [110, 110, 110] });

  heading("Experience");

  text("Cloud Engineering Intern — Ntech", { bold: true, gap: 1 });
  text("Apr 2026 – Present  ·  Osun, Nigeria", { size: 10, color: [110, 110, 110], gap: 4 });
  [
    "Configured AWS resources (EC2, S3, IAM) for cloud infrastructure deployments.",
    "Deployed and managed applications on Linux servers; troubleshot using cloud & system tools.",
    "Applied IP addressing, DNS, and routing to support infrastructure operations.",
    "Supported security best practices including access control and system hardening.",
    "Used command-line tools and scripts to manage and troubleshoot cloud resources.",
    "Reduced server response time by ~15% through proactive system monitoring.",
    "Documented 10+ security hardening practices for Linux servers.",
    "Created an automated backup script using Bash for cloud storage.",
  ].forEach((b) => text(`•  ${b}`, { gap: 2 }));

  text("Freelance Virtual Assistant", { bold: true, gap: 1 });
  text("Dec 2023 – Present  ·  Remote — Asia, US", { size: 10, color: [110, 110, 110], gap: 4 });
  [
    "Managed administrative and operational tasks for multiple clients.",
    "Handled email communication, scheduling, and data organization.",
    "Supported recruitment, candidate sourcing, research, and digital records.",
    "Improved workflows using productivity tools.",
  ].forEach((b) => text(`•  ${b}`, { gap: 2 }));

  text("App & Web Tester — Freelance", { bold: true, gap: 1 });
  text("Jan 2023 – May 2024  ·  Remote, US", { size: 10, color: [110, 110, 110], gap: 4 });
  [
    "Tested web and mobile applications for usability and performance.",
    "Identified bugs, UI/UX issues, and functional inconsistencies.",
    "Documented test results and provided actionable feedback.",
    "Collaborated with developers to improve user experience.",
  ].forEach((b) => text(`•  ${b}`, { gap: 2 }));

  heading("Projects");
  [
    "Static Website Hosted on AWS S3 — Deployed a static portfolio site using an S3 bucket with public access and custom IAM permissions.",
    "Linux Server Monitoring Lab — Set up a Linux virtual server with uptime monitoring, resource tracking, and automated log rotation via Bash.",
    "Network Scanning with Nmap & Wireshark — Performed network discovery and traffic analysis, documenting open ports and potential vulnerabilities.",
  ].forEach((b) => text(`•  ${b}`, { gap: 3 }));

  heading("Certifications");
  [
    "Google Cloud Computing Foundation — Google (2024)",
    "Cisco Networking Essentials — Cisco (2024)",
    "Cloud Managed Network 201 — Cisco (2024)",
    "Linux Essentials — Cisco (2024)",
  ].forEach((b) => text(`•  ${b}`, { gap: 2 }));

  heading("Skills");
  text(
    "Cloud & Networking: AWS (EC2, S3, IAM, VPC, route tables, load balancers, CLI), Linux server basics, IP addressing, DNS, routing, system monitoring.",
    { gap: 3 },
  );
  text(
    "Security & Testing: Access control, system hardening, Nmap, Wireshark, bug reporting, UI/UX analysis.",
    { gap: 3 },
  );
  text("Tools & Languages: Bash, Git, GitHub, command line, HTML, CSS, Python.", { gap: 3 });
  text(
    "Admin & Productivity: Data entry, web research, email/calendar management, Google Workspace, MS Office, virtual assistance.",
  );

  heading("Currently Learning");
  ["AWS Solutions Architect Associate", "Python for Automation", "Zero Trust Security Models"].forEach(
    (b) => text(`•  ${b}`, { gap: 2 }),
  );
};

const DownloadResume = () => {
  const onClick = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    buildResume(doc);
    doc.save("Emmanuel-Faleti-Resume.pdf");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Download résumé as PDF"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.7)] transition-transform hover:scale-[1.04] md:bottom-8 md:right-8"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Download Resume</span>
    </button>
  );
};

export default DownloadResume;
