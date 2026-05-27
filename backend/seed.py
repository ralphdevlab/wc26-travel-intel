from database import SessionLocal
from models import Match, CityData
from datetime import datetime

db = SessionLocal()

cities = [
    CityData(city_slug="miami", crowd_level=0.85, flight_demand=0.78, hotel_demand=0.91),
    CityData(city_slug="los-angeles", crowd_level=0.72, flight_demand=0.65, hotel_demand=0.80),
    CityData(city_slug="new-york", crowd_level=0.90, flight_demand=0.88, hotel_demand=0.95),
    CityData(city_slug="dallas", crowd_level=0.60, flight_demand=0.55, hotel_demand=0.70),
    CityData(city_slug="orlando", crowd_level=0.75, flight_demand=0.70, hotel_demand=0.82),
]

matches = [
    Match(home_team="Brazil", away_team="France", venue_city="miami",
          kickoff_time=datetime(2026, 6, 15, 20, 0), status="live",
          home_score=2, away_score=1),
    Match(home_team="Germany", away_team="Argentina", venue_city="dallas",
          kickoff_time=datetime(2026, 6, 16, 18, 0), status="scheduled",
          home_score=0, away_score=0),
    Match(home_team="Spain", away_team="Portugal", venue_city="orlando",
          kickoff_time=datetime(2026, 6, 17, 21, 0), status="scheduled",
          home_score=0, away_score=0),
]

db.add_all(cities + matches)
db.commit()
db.close()
print("Seeded RDS successfully.")