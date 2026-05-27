from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from database import SessionLocal
from models import Match
import asyncio, json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)
        print(f"Client connected. Total: {len(self.active)}")

    def disconnect(self, ws: WebSocket):
        self.active.remove(ws)
        print(f"Client disconnected. Total: {len(self.active)}")

    async def broadcast(self, data: str):
        for ws in self.active:
            await ws.send_text(data)

manager = ConnectionManager()

@router.websocket("/ws/scores")
async def score_feed(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            db = SessionLocal()
            live = db.query(Match).filter(Match.status == "live").all()
            payload = [{
                "id": m.id,
                "home": m.home_team,
                "away": m.away_team,
                "score": f"{m.home_score}-{m.away_score}",
                "city": m.venue_city,
            } for m in live]
            db.close()
            await websocket.send_text(json.dumps(payload))
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        manager.disconnect(websocket)