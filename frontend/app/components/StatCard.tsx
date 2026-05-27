"use client";
import { motion } from "framer-motion";

type Props = {
    label: string;
    value: string;
    color?: "green" | "yellow" | "red" | "blue";
};

const colorMap = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    blue: "text-blue-400",
};

export default function StatCard({ label, value, color = "green" }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
        >
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
        </motion.div>
    );
}