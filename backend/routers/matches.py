from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Match
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/matches", tags=["matches"])

class MatchOut(BaseModel):
    id: int
    home_team: str
    away_team: str
    venue_city: str
    home_score: int
    away_score: int
    status: str

    class Config:
        from_attributes = True

@router.get("/", response_model=List[MatchOut])
def get_all_matches(db: Session = Depends(get_db)):
    return db.query(Match).all()

@router.get("/city/{city_slug}", response_model=List[MatchOut])
def get_matches_by_city(city_slug: str, db: Session = Depends(get_db)):
    return db.query(Match).filter(Match.venue_city == city_slug).all()

@router.get("/live", response_model=List[MatchOut])
def get_live_matches(db: Session = Depends(get_db)):
    return db.query(Match).filter(Match.status == "live").all()