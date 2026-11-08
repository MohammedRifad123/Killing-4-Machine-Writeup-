# NexaCorp Solutions — CTF Write-Up Website

A cybersecurity CTF write-up web platform built with HackTheBox and Medium dark aesthetic.

## Features
- **Design & Theme**:
  - Dark Theme: `#0a0e1a` background, `#0d1117` cards.
  - Accent Color: `#00ff41` (Matrix green).
  - Secondary Accent: `#00aaff` (Blue).
  - Vulnerability Red: `#ff4444` for critical flaws.
  - Fonts: Monospace (`Fira Code`, `JetBrains Mono`) for code & terminals; Clean sans-serif (`Inter`, `Space Grotesk`) for content.
- **Header Profile**:
  - Target IP: `192.168.0.20`
  - Attacker IP: `192.168.0.17` (Kali Linux)
  - Badges: Difficulty `MEDIUM` (Yellow), OS `LINUX` (Blue), Status `PWNED` (Green), Points `30 pts`
  - Author: `killing`, Date: `November 2024`
  - Tags: `#php`, `#fileupload`, `#cronjob`, `#privesc`, `#fuelcms`
- **Interactive Attack Chain Flowchart**:
  - 8-stage visual progression with step circles, emojis, titles, and click-to-jump navigation.
- **Detailed Write-Up Stages (Real Terminal Emulation)**:
  - Step 1: Reconnaissance (Nmap port scan & service version detection).
  - Step 2: Directory Enumeration (Gobuster fuzzing with status code color coding: 403 red, 200 green, 301 `/uploads/` key finding).
  - Step 3: Web Analysis (Staff document portal, CWE-434 critical vulnerability alert).
  - Step 4: Initial Access (Pentestmonkey PHP reverse shell upload & Netcat catch `www-data`).
  - Step 5: Privilege Escalation (Writable `chmod 777` `/opt/system_cleanup.sh` cron job hijack).
  - Step 6: Root Access (Root reverse shell capture & victory banner).
- **Vulnerabilities Table**:
  - Structured summary of discovered vectors, locations, severities, and CVE (`CVE-2018-16763`).
- **Arsenal / Tools Used**:
  - Nmap, Gobuster, PHP Reverse Shell, Netcat, Python3.
- **Captured Flag Showcase**:
  - Styled vault card with one-click copy button for `flag{ayyO_chechi_n1n3_hack_cheythu_p0l1c3_var0}`.
- **Interactive Enhancements**:
  - Reading progress bar at top of screen.
  - Scrollspy sidebar highlighting current reading section.
  - One-click copy with toast notifications for all commands and IP addresses.
  - CRT Scanline toggle for authentic retro terminal feel.
  - Fully mobile-responsive layout with slide-out drawer menu.

## Quick Start / How to Run
Simply open `index.html` in your web browser, or launch a local web server:

```powershell
# Using Python
python -m http.server 8000

# Or using Node.js npx
npx serve .
```
Then navigate to `http://localhost:8000`.

