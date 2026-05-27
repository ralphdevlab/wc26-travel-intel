from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import matches, cities, ws

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="WC26 Travel Intel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://wc26-travel-intel.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(matches.router)
app.include_router(cities.router)
app.include_router(ws.router)

@app.get("/health")
def health():
    return {"status": "ok"}