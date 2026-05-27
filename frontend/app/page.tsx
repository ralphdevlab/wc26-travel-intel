import CityCard from "./components/CityCard";

const HOST_CITIES = [
  { name: "Miami", slug: "miami", stadium: "Hard Rock Stadium" },
  { name: "Los Angeles", slug: "los-angeles", stadium: "SoFi Stadium" },
  { name: "New York", slug: "new-york", stadium: "MetLife Stadium" },
  { name: "Dallas", slug: "dallas", stadium: "AT&T Stadium" },
  { name: "Orlando", slug: "orlando", stadium: "Inter&Co Stadium" },
  { name: "Seattle", slug: "seattle", stadium: "Lumen Field" },
];

export default function Home() {
  return (
      <main className="min-h-screen p-8 max-w-5xl mx-auto">
        <div className="mb-12 mt-8">
          <h1 className="text-5xl font-bold tracking-tight mb-3">
            WC26 Travel Intel
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time crowd, flight & match data for every World Cup 2026 host city
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOST_CITIES.map((city, i) => (
              <CityCard key={city.slug} {...city} index={i} />
          ))}
        </div>
      </main>
  );
}