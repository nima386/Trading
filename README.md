# KASAI Brain — AI Agent System

> Visual architecture & live demo for the KASAI Health & Fitness AI agent system.

![KASAI Brain](https://img.shields.io/badge/Agents-6-8B5CF6?style=for-the-badge) ![Skills](https://img.shields.io/badge/Skills-43-EC4899?style=for-the-badge) ![Cost](https://img.shields.io/badge/Cost-%240%2Fmo-10B981?style=for-the-badge) ![PWA](https://img.shields.io/badge/PWA-Installable-06B6D4?style=for-the-badge)

## What is this?

An interactive PWA that visualizes the complete AI agent architecture powering **KASAI** — a health & fitness tracking app. Browse all 6 specialized agents, explore 43 skills, test the live chat router, and understand the full data flow.

## Features

- **Dashboard** — Brain visualization with all 6 agents, live stats, activity feed
- **Agents** — Detailed cards for every agent with all 43 skills (priority badges, descriptions)
- **Chat Demo** — Live chat with keyword-based Tier-1 routing simulation across all agents
- **Flow** — Animated 5-step data flow visualization (Input → Router → Context → Agent → Response)
- **Tech Stack** — Infrastructure overview, $0/month cost breakdown, provider fallback chain

## Agent Architecture

```
                    KASAI BRAIN (Router)
                          |
           ┌──────────────┼──────────────┐
    Tier-1 Keyword    Tier-2 LLM     Proactive Cron
     Classifier       Classifier       Scheduler
           └──────────────┼──────────────┘
                          |
       ┌──────┬──────┬────┴────┬──────┬──────┐
       |      |      |        |      |      |
      TA     NA     RA      HA     AA     PA
   Training Nutri  Running  Habits Analyt Proaktiv
   12 Skills 8 Sk  6 Skills 6 Sk  6 Sk   5 Skills
```

| Agent | Skills | Domain |
|-------|--------|--------|
| Training Agent | 12 | Workouts, progressive overload, volume, plans |
| Nutrition Agent | 8 | Meal logging, macros, hydration, meal plans |
| Running Agent | 6 | Pace analysis, run types, race planning |
| Habits Agent | 6 | Streaks, daily checklists, sleep, steps |
| Analytics Agent | 6 | Weekly/monthly reports, goals, consistency |
| Proactive Agent | 5 | Morning briefings, smart reminders, auto-adjust |

## Tech Stack (100% Free)

| Component | Solution | Free Tier |
|-----------|----------|-----------|
| LLM (Primary) | Groq API (Llama 3.1 70B/8B) | 14,400 req/day |
| LLM (Fallback) | Cloudflare Workers AI | 10,000 neurons/day |
| API Layer | Supabase Edge Functions | 500,000/month |
| Database | Supabase PostgreSQL | Included |
| Cron Jobs | Supabase pg_cron | Included |
| Frontend | Vanilla JS PWA | $0 |

## Quick Start

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/kasai-agent.git
cd kasai-agent

# Serve locally (any static server works)
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` — works on desktop and mobile.

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / `root`
5. Your site is live at `https://YOUR_USERNAME.github.io/kasai-agent/`

## PWA Install

The app is installable as a PWA on mobile and desktop:
- **Android**: Chrome menu → "Add to Home screen"
- **iOS**: Safari share → "Add to Home Screen"
- **Desktop**: Chrome address bar install icon

## File Structure

```
kasai-agent/
├── index.html       # Complete app (all HTML/CSS/JS inline)
├── manifest.json    # PWA manifest
├── sw.js            # Service Worker (cache-first)
├── icon-192.svg     # App icon 192x192
├── icon-512.svg     # App icon 512x512
└── README.md        # This file
```

## Connected Backend

The visual demo simulates the routing. The actual backend runs on Supabase Edge Functions:

```
supabase/functions/
├── _shared/
│   ├── llm-provider.ts      # Groq → CF → Ollama fallback
│   ├── router.ts             # 2-Tier intent classifier
│   ├── context-assembler.ts  # State extraction per agent
│   ├── prompts.ts            # System prompts (all 6 agents)
│   ├── memory.ts             # Long-term user memory
│   └── tools.ts              # Action parsing + formatting
├── ai-chat/index.ts          # Main chat endpoint
├── ai-briefing/index.ts      # Morning briefing cards
├── ai-suggest/index.ts       # Inline suggestions (meal NLP, set recs)
└── ai-proactive/index.ts     # Cron-triggered background tasks
```

## License

MIT

---

Built for **KASAI Health & Fitness**
