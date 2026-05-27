"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type Props = { crowd: number; flights: number; hotels: number };

export default function CrowdChart({ crowd, flights, hotels }: Props) {
    const data = [
        { name: "Crowd", value: Math.round(crowd * 100) },
        { name: "Flights", value: Math.round(flights * 100) },
        { name: "Hotels", value: Math.round(hotels * 100) },
    ];

    const getColor = (val: number) =>
        val >= 85 ? "#f87171" : val >= 65 ? "#facc15" : "#4ade80";

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Demand Forecast</p>
            <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={40}>
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} unit="%" domain={[0, 100]} />
                        <Tooltip
                            formatter={(v) => [`${v}%`]}
                            contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                            {data.map((entry, i) => (
                                <Cell key={i} fill={getColor(entry.value)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}