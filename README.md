# WC26 Travel Intel

A travel-planning dashboard for the 2026 FIFA World Cup host cities. Pick a city to see crowd, flight, and hotel demand, the matches being played there, and a live score ticker pushed over WebSockets.

Built with a FastAPI + PostgreSQL backend on AWS (EC2 + RDS) and a Next.js/TypeScript frontend.

> Match and demand figures come from seeded sample data (`backend/seed.py`), not a live data provider.

---

## Features

- **City grid**: animated cards for each host city (Framer Motion staggered reveal)
- **City dashboard**: crowd level, flight demand, and hotel demand stat cards plus a demand chart (Recharts)
- **Live score ticker**: the backend pushes current live matches to every connected client every 5 seconds over a WebSocket
- **REST API**: matches (all, by city, live) and per-city demand data, with Pydantic response models
- **Cloud deployment**: API on EC2 managed by a systemd service that auto-restarts on failure; data in AWS RDS PostgreSQL

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic, Uvicorn |
| **Realtime** | WebSockets (FastAPI) |
| **Database** | PostgreSQL on AWS RDS |
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, Recharts |
| **Deployment** | AWS EC2 + systemd (API), AWS RDS (database), Vercel (frontend) |

---

## Architecture

```
┌──────────────────┐   REST (JSON)   ┌──────────────────────┐   SQL   ┌──────────────────┐
│  Next.js (UI)    │ ──────────────► │  FastAPI             │ ──────► │  PostgreSQL      │
│  React + TS      │ ◄────────────── │  /matches  /cities   │ ◄────── │  (AWS RDS)       │
│  (Vercel)        │ ◄── WebSocket ─ │  /ws/scores (5s)     │         │  matches         │
└──────────────────┘                 │  EC2 + systemd       │         │  city_data       │
                                     └──────────────────────┘         └──────────────────┘
```

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/matches/` | All matches |
| `GET` | `/matches/city/{city_slug}` | Matches in one host city |
| `GET` | `/matches/live` | Matches currently live |
| `GET` | `/cities/{city_slug}` | Crowd, flight, and hotel demand for a city (404 if unknown) |
| `WS` | `/ws/scores` | Pushes live match scores every 5 seconds |

FastAPI also serves interactive docs at `/docs`.

---

## Running Locally

### Prerequisites
- Python 3.10+, Node.js 18+, PostgreSQL

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# .env (git-ignored)
echo 'DATABASE_URL=postgresql://user:password@localhost:5432/wc26' > .env

python seed.py                 # load sample cities and matches
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install

# .env.local
#   NEXT_PUBLIC_API_URL=http://localhost:8000
#   NEXT_PUBLIC_WS_URL=ws://localhost:8000

npm run dev
```

---

## Deployment

The API runs on an EC2 instance under `deployment/wc26api.service`, a systemd unit that starts Uvicorn from the project's virtualenv and restarts it automatically (`Restart=always`). The database is an RDS PostgreSQL instance reached through `DATABASE_URL`. SSH keys (`*.pem`) and `.env` files are git-ignored.

---

## What I Learned

- Building a REST + WebSocket API with FastAPI and SQLAlchemy
- Pushing realtime updates to many clients and handling disconnects
- Provisioning AWS RDS and running a Python service on EC2 with systemd
- Connecting a Vercel-hosted frontend to a separately hosted API (CORS, environment config)

## Possible Future Improvements

- Pull real fixtures and scores from a sports data API instead of seed data
- Broadcast from a single background task instead of one database poll per connected client
- Tests for the API routes and CI on every push

---

## Author

**Ralph Alexandre**
[GitHub](https://github.com/ralphdevlab)
