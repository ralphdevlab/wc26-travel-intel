from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import CityData
from pydantic import BaseModel

router = APIRouter(prefix="/cities", tags=["cities"])

class CityOut(BaseModel):
    city_slug: str
    crowd_level: float
    flight_demand: float
    hotel_demand: float

    class Config:
        from_attributes = True

@router.get("/{city_slug}", response_model=CityOut)
def get_city(city_slug: str, db: Session = Depends(get_db)):
    city = db.query(CityData).filter(CityData.city_slug == city_slug).first()
    if not city:
        raise HTTPException(status_code=404, detail=f"City '{city_slug}' not found")
    return city