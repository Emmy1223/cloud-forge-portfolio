import { Cloud, Activity, ShieldCheck, LucideIcon } from "lucide-react";

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
  metaTitle: string;
  metaDescription: string;
}

export const caseStudies: CaseStudy[] = [
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
