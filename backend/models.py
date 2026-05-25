from sqlalchemy import Column, Integer, String, DateTime, Float
from database import Base

class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True)
    home_team = Column(String)
    away_team = Column(String)
    venue_city = Column(String)
    kickoff_time = Column(DateTime)
    home_score = Column(Integer, default=0)
    away_score = Column(Integer, default=0)
    status = Column(String, default="scheduled")

class CityData(Base):
    __tablename__ = "city_data"
    id = Column(Integer, primary_key=True)
    city_slug = Column(String, unique=True)
    crowd_level = Column(Float)
    flight_demand = Column(Float)
    hotel_demand = Column(Float)
    updated_at = Column(DateTime)