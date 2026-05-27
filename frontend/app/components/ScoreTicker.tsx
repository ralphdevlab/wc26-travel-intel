"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Match = { id: number; home: string; away: string; score: string; city: string };

export default function ScoreTicker() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
        const ws = new WebSocket(`${wsUrl}/ws/scores`);

        ws.onopen = () => setConnected(true);
        ws.onclose = () => setConnected(false);
        ws.onmessage = (e) => setMatches(JSON.parse(e.data));

        return () => ws.close();
    }, []);

    if (!connected) return (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></span>
            Connecting to live feed...
        </div>
    );

    if (matches.length === 0) return (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            No matches live right now
        </div>
    );

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs uppercase tracking-widest font-medium">Live</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
                <AnimatePresence>
                    {matches.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -20}}
                            className="bg-green-950 border border-green-800 rounded-xl px-5 py-3 whitespace-nowrap flex-shrink-0"
                        >
                            <div className="text-sm font-medium text-white">{m.home} vs {m.away}</div>
                            <div className="text-2xl font-bold text-green-400 mt-1">{m.score}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}