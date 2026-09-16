import { Cloud, Activity, ShieldCheck, Zap, Briefcase, FileText, LucideIcon } from "lucide-react";

export interface CaseStudy {
  slug: string;
  icon: LucideIcon;
  accent: string; // tailwind class for hero accent ring/glow color
  title: string;
  shortDescription: string;
  tags: string[];
  problem: string;
  approach: string[];
  tools: string[];
  code: { language: string; content: string };
  outcome: string;
  github: string;
  liveUrl?: string;
  metaTitle: string;
  metaDescription: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "mydoc",
    icon: FileText,
    accent: "from-amber-400 to-yellow-500",
    title: "myDoc — AI-Powered CV Platform",
    shortDescription:
      "The CV builder that does not lie. A full-stack platform to create, modernize, and tailor professional CVs — AI parsing, job matching, six templates, and PDF export.",
    tags: ["Next.js", "AI Integration", "Full-Stack"],
    problem:
      "Most CV tools either fabricate experience or lock users into rigid templates. myDoc was built around a simple philosophy: the CV builder that does not lie. Users can build a CV from scratch, upload an existing CV and restructure it, or tailor their CV to a specific job description — always grounded in their real experience.",
    approach: [
      "Built three CV creation flows: from scratch, upload-and-modernize an existing CV, and tailor-to-job-description",
      "Implemented AI-powered CV parsing that extracts structured information from uploaded documents",
      "Developed AI-powered CV tailoring based on job descriptions, with job description analysis and CV-to-job match reports",
      "Designed six professional CV templates with a live CV preview",
      "Engineered print-ready document rendering with A4 and Letter layouts and automatic document fitting across pages",
      "Built a dashboard for managing saved CV documents, with thumbnails, a preview modal, and rename / duplicate / download / export / delete actions",
      "Implemented authentication with NextAuth.js and session-aware navigation",
      "Added PDF/document export and robust error handling for invalid or unsupported uploads",
      "Shipped a responsive mobile interface and deployed to production on Vercel with Vercel Web Analytics",
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth.js",
      "Next.js API Routes",
      "Lucide React",
      "AI/LLM Integration",
      "PDF Text Extraction",
      "Vercel",
      "Git",
      "GitHub",
    ],
    code: {
      language: "typescript",
      content: `// Next.js API route — AI-powered CV tailoring
export async function POST(req: Request) {
  const { cvData, jobDescription } = await req.json();

  if (!cvData || !jobDescription) {
    return Response.json(
      { error: "A CV and job description are both required." },
      { status: 400 },
    );
  }

  // Tailor the user's real experience to the role — never inventing
  // achievements or skills the user doesn't actually have.
  const tailored = await tailorCvToJob({
    cv: cvData,
    job: jobDescription,
    groundTruthOnly: true,
  });

  const matchReport = analyzeMatch(tailored, jobDescription);

  return Response.json({ tailored, matchReport });
}`,
    },
    outcome:
      "Shipped a production full-stack application on Vercel with authentication, AI-driven parsing and tailoring, a six-template document engine, and a complete document management dashboard. I personally handled full-stack development, AI integration, CV parsing, document generation, dashboard architecture, responsive UI, authentication, API development, and deployment.",
    github: "https://github.com/Emmy1223",
    liveUrl: "https://mydoc-six.vercel.app/",
    metaTitle: "myDoc — AI-Powered CV Platform | Emmanuel Faleti",
    metaDescription:
      "myDoc is an AI-powered CV platform — the CV builder that does not lie. Create, modernize, and tailor professional CVs with AI parsing, job matching, six templates, and PDF export.",
  },
  {
    slug: "principal-ai-engineer-portfolio",
    icon: Briefcase,
    accent: "from-indigo-400 to-violet-500",
    title: "Enterprise Portfolio Website for a Principal AI Platform Engineer",
    shortDescription:
      "Designed, engineered, debugged, and deployed a production-ready portfolio site for a client — solving 13+ frontend, deployment, backend integration, and architecture challenges end-to-end.",
    tags: ["Client Work", "Vercel", "Apps Script", "Canvas"],
    problem:
      "A Principal AI Platform Engineer needed a modern, responsive, production-grade portfolio that reflected the seniority of their role. The engagement went far beyond UI — it required backend contact-form integration, deployment work, architectural refactoring, and iterative debugging based on continuous client feedback.",
    approach: [
      "Gathered client requirements and translated them into a full design and delivery plan",
      "Designed the complete UI, built every section from scratch, and shipped reusable frontend components",
      "Challenge 01 — Reducing Visual Noise: replaced the distracting Matrix background with a custom Canvas API circuit-board animation featuring glowing nodes and animated connections while keeping frame-time budget",
      "Challenge 02 — Hero Section Optimization: rebuilt typography hierarchy, responsive scaling, spacing, and readability",
      "Challenge 03 — Dark & Light Theme System: implemented CSS-variable-driven theming with persistent user preference via localStorage",
      "Challenge 04 — Google Apps Script Integration: connected the contact form to Apps Script + Google Drive, resolving CORS, fetch failures, authorization, duplicate endpoint declarations, validation bugs, and async handling",
      "Challenge 05 — Legacy JS Compatibility: identified the Rhino runtime on Apps Script and refactored ES6 code to ES5 (var, traditional functions) so the backend actually ran",
      "Challenge 06 — Form Submission Bugs: fixed page reloads, hardened validation, and added loading, success, and failure states",
      "Challenge 07 — Project Navigation: turned static project cards into interactive detail pages with metrics, tech stacks, and inter-page navigation",
      "Challenge 08 — Floating Action Components: fixed overlapping floating UI by redesigning positioning and responsive behavior",
      "Challenge 09 — Skills Section Redesign: rebuilt into categorized interactive cards with icons, hover animations, and responsive layouts",
      "Challenge 10 — Education Section Redesign: new layout with status badge, icon header, two-column structure, divider, and responsive rules",
      "Challenge 11 — Architecture Refactoring: broke the monolithic single-file HTML into modular HTML, CSS, and JS for maintainability and scale",
      "Challenge 12 — Deployment & Production: configured Vercel deployment and resolved missing assets, broken routes, incorrect project structure, and production build validation",
      "Challenge 13 — Documentation: delivered Apps Script setup guide, deployment instructions, README, and full client handover docs",
    ],
    tools: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6)",
      "Google Apps Script",
      "Google Drive API",
      "Git",
      "GitHub",
      "Vercel",
      "Responsive Design",
      "Local Storage",
      "Fetch API",
      "Canvas API",
      "CSS Grid",
      "Flexbox",
    ],
    code: {
      language: "javascript",
      content: `// Apps Script (Rhino runtime — ES5 only)
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!data.name || !data.email || !data.message) {
      return json({ ok: false, error: "Missing fields" });
    }
    var folder = DriveApp.getFolderById(FOLDER_ID);
    var filename = "contact-" + new Date().toISOString() + ".json";
    folder.createFile(filename, JSON.stringify(data), "application/json");
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}`,
    },
    outcome:
      "Shipped a production-ready, fully responsive portfolio with a backend-integrated contact form, maintainable modular codebase, professional documentation, and a stable Vercel deployment — resolving 13+ engineering challenges and delivering a polished, scalable product the client could own and extend.",
    github: "https://github.com/Emmy1223",
    metaTitle: "Client Portfolio for a Principal AI Engineer — Emmanuel Faleti Case Study",
    metaDescription:
      "Client engagement: designed, engineered, debugged, and deployed a production portfolio for a Principal AI Platform Engineer with Apps Script backend and Vercel deployment.",
  },
  {
    slug: "neural-drive",
    icon: Zap,
    accent: "from-amber-400 to-orange-500",
    title: "Neural Drive — AI-Powered EV Charging Intelligence",
    shortDescription:
      "Cloud-native EV charging intelligence platform for Nigeria — real-time station visibility, demand forecasting, and AI-driven investment insights.",
    tags: ["AWS", "React", "FastAPI", "AI"],
    problem:
      "Nigeria's emerging EV ecosystem lacks unified visibility into charging infrastructure, real-time station availability, and demand intelligence — leaving drivers, fleet operators, investors, and policymakers without the data to make informed decisions.",
    approach: [
      "Architected a cloud-native stack on AWS (S3, Lambda, CloudWatch, IAM) for scalable, secure delivery",
      "Built an interactive EV charging map with Mapbox for real-time station discovery",
      "Implemented real-time station status updates using Socket.io over a Node.js/Express backend",
      "Designed analytics dashboards with demand heatmaps and infrastructure intelligence views",
      "Trained AI demand forecasting models with Scikit-learn and Prophet served via FastAPI",
      "Persisted operational data in PostgreSQL with Redis caching for low-latency reads",
      "Shipped CI/CD with GitHub Actions and a fully mobile-responsive React + TanStack frontend",
    ],
    tools: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Socket.io",
      "AWS S3",
      "AWS Lambda",
      "AWS CloudWatch",
      "AWS IAM",
      "Mapbox",
      "Scikit-learn",
      "Prophet",
      "GitHub Actions",
    ],
    code: {
      language: "python",
      content: `from fastapi import FastAPI
from prophet import Prophet
import pandas as pd

app = FastAPI()

@app.post("/forecast")
def forecast_demand(station_id: str):
    df = load_station_history(station_id)  # ds, y
    model = Prophet(daily_seasonality=True, weekly_seasonality=True)
    model.fit(df)
    future = model.make_future_dataframe(periods=24, freq="H")
    fc = model.predict(future)[["ds", "yhat", "yhat_lower", "yhat_upper"]]
    return fc.tail(24).to_dict(orient="records")`,
    },
    outcome:
      "Delivered a production-ready EV charging intelligence platform during the One-with-AI Hackathon — empowering drivers, fleet operators, investors, and policymakers with real-time visibility, AI-driven demand forecasts, and actionable infrastructure intelligence.",
    github: "https://github.com/Emmy1223",
    liveUrl: "https://neural-drive-brown.vercel.app/",
    metaTitle: "Neural Drive — Emmanuel Faleti Case Study",
    metaDescription:
      "AI-powered, cloud-native EV charging intelligence platform built on AWS, FastAPI, and React with real-time analytics and demand forecasting.",
  },
  {
    slug: "s3-static-site",
    icon: Cloud,
    accent: "from-cyan-400 to-sky-500",
    title: "Static Website Hosted on AWS S3",
    shortDescription:
      "Deployed a fully static portfolio site using an S3 bucket with public access and custom permissions configured via IAM.",
    tags: ["AWS S3", "IAM", "Static Hosting"],
    problem:
      "Needed a fast, cost-effective way to host a static website without managing a server. Traditional hosting options were either too expensive or required ongoing server maintenance.",
    approach: [
      "Created an S3 bucket on AWS with the correct naming convention",
      "Configured bucket policy to allow public read access for static hosting",
      "Set up IAM permissions following least privilege principles",
      "Enabled static website hosting on the bucket",
      "Uploaded HTML/CSS files and verified public accessibility",
      "Configured index.html and error.html as entry points",
    ],
    tools: ["AWS S3", "AWS IAM", "AWS CLI", "HTML", "CSS"],
    code: {
      language: "json",
      content: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}`,
    },
    outcome:
      "Successfully deployed a publicly accessible static website on AWS S3 with zero server management, near-zero cost, and 99.99% uptime backed by AWS infrastructure.",
    github: "https://github.com/Emmy1223",
    metaTitle: "S3 Static Site — Emmanuel Faleti Case Study",
    metaDescription:
      "How I hosted a fast, low-cost static website on AWS S3 with IAM-secured permissions and 99.99% uptime.",
  },
  {
    slug: "linux-monitoring-lab",
    icon: Activity,
    accent: "from-emerald-400 to-green-500",
    title: "Linux Server Monitoring Lab",
    shortDescription:
      "Set up a Linux-based virtual server with uptime monitoring, resource tracking, and automated log rotation using Bash scripts.",
    tags: ["Linux", "Bash", "Monitoring"],
    problem:
      "Needed hands-on experience managing a live Linux server — monitoring uptime, tracking resource usage, and automating log management without manual intervention.",
    approach: [
      "Provisioned a Linux virtual server environment",
      "Wrote a Bash script to monitor CPU, memory, and disk usage at regular intervals",
      "Set up automated log rotation to prevent disk space exhaustion",
      "Configured cron jobs to run monitoring scripts on a schedule",
      "Documented findings and system health metrics",
      "Implemented alerts for threshold breaches",
    ],
    tools: ["Linux", "Bash", "Cron", "System Monitoring", "Log Management"],
    code: {
      language: "bash",
      content: `#!/bin/bash
# Resource monitor
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2}')
DISK=$(df -h / | awk 'NR==2{print $5}')
echo "[$(date)] CPU: $CPU% | MEM: $MEM | DISK: $DISK" >> /var/log/monitor.log`,
    },
    outcome:
      "Built a fully automated server monitoring system that logs resource metrics every 5 minutes, automatically rotates logs weekly, and provides a clear audit trail of server health over time.",
    github: "https://github.com/Emmy1223",
    metaTitle: "Linux Monitoring Lab — Emmanuel Faleti Case Study",
    metaDescription:
      "Automating Linux server health monitoring with Bash, cron, and log rotation for a fully hands-off audit trail.",
  },
  {
    slug: "network-scanner",
    icon: ShieldCheck,
    accent: "from-fuchsia-400 to-purple-500",
    title: "Network Scanning with Nmap & Wireshark",
    shortDescription:
      "Performed network discovery and traffic analysis on a test environment, documenting open ports and potential vulnerabilities.",
    tags: ["Nmap", "Wireshark", "Networking"],
    problem:
      "Needed to understand what devices, open ports, and potential vulnerabilities exist on a test network — simulating the reconnaissance phase of a real security assessment.",
    approach: [
      "Set up an isolated test network environment on Kali Linux",
      "Used Nmap to perform host discovery and identify live devices",
      "Ran service version detection scans to identify running services",
      "Captured and analyzed network traffic using Wireshark",
      "Documented all open ports, services, and potential attack surfaces",
      "Generated a structured JSON report of findings",
      "Built a Python wrapper script around Nmap for automated scanning and reporting",
    ],
    tools: ["Python", "Nmap", "Wireshark", "Kali Linux", "Networking", "JSON"],
    code: {
      language: "python",
      content: `import nmap
nm = nmap.PortScanner()
nm.scan(hosts='192.168.1.0/24', arguments='-sS -sV')
for host in nm.all_hosts():
    print(f"Host: {host} | State: {nm[host].state()}")
    for proto in nm[host].all_protocols():
        for port in nm[host][proto].keys():
            print(f"  Port: {port} | Service: {nm[host][proto][port]['name']}")`,
    },
    outcome:
      "Successfully mapped an entire test network, identified 12+ open ports across multiple hosts, documented 3 potential vulnerability surfaces, and produced an automated JSON report — simulating a real penetration testing reconnaissance workflow.",
    github: "https://github.com/Emmy1223/network-scanner-tool",
    metaTitle: "Network Scanner — Emmanuel Faleti Case Study",
    metaDescription:
      "Recon-phase network scanning with Nmap, Wireshark, and a Python automation wrapper producing structured JSON reports.",
  },
];

export const getCaseStudy = (slug?: string) =>
  caseStudies.find((c) => c.slug === slug);
