import ScoreTicker from "@/app/components/ScoreTicker";
import CrowdChart from "@/app/components/CrowdChart";
import StatCard from "@/app/components/StatCard";
import { StatCardSkeleton, ChartSkeleton } from "@/app/components/Skeleton";
import Link from "next/link";

const CITY_NAMES: Record<string, string> = {
    miami: "Miami",
    "los-angeles": "Los Angeles",
    "new-york": "New York",
    dallas: "Dallas",
    orlando: "Orlando",
    seattle: "Seattle",
};

async function getCityData(slug: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/cities/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
}

export default async function CityDashboard({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    const data = await getCityData(city);
    const cityName = CITY_NAMES[city] || city;

    return (
        <main className="min-h-screen p-8 max-w-5xl mx-auto">
            <Link href="/" className="text-gray-500 hover:text-white text-sm mb-6 inline-block transition-colors">
                ← All cities
            </Link>

            <h1 className="text-4xl font-bold mb-1">{cityName}</h1>
            <p className="text-gray-400 mb-8">World Cup 2026 travel intelligence</p>

            <section className="mb-8">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Scores</p>
                <ScoreTicker />
            </section>

            {data ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard
                        label="Crowd Demand"
                        value={`${Math.round(data.crowd_level * 100)}%`}
                        color={data.crowd_level > 0.85 ? "red" : data.crowd_level > 0.65 ? "yellow" : "green"}
                    />
                    <StatCard
                        label="Flight Demand"
                        value={`${Math.round(data.flight_demand * 100)}%`}
                        color={data.flight_demand > 0.8 ? "red" : "yellow"}
                    />
                    <StatCard
                        label="Hotel Demand"
                        value={`${Math.round(data.hotel_demand * 100)}%`}
                        color={data.hotel_demand > 0.85 ? "red" : "yellow"}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton />
                </div>
            )}

            {data ? (
                <CrowdChart
                    crowd={data.crowd_level}
                    flights={data.flight_demand}
                    hotels={data.hotel_demand}
                />
            ) : <ChartSkeleton />}
        </main>
    );
}