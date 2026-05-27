"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
    name: string;
    slug: string;
    stadium: string;
    index: number;
};

export default function CityCard({ name, slug, stadium, index }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link href={`/dashboard/${slug}`}
                  className="block bg-gray-900 border border-gray-800 rounded-2xl p-6
                   hover:border-green-500 hover:bg-gray-800 transition-colors duration-200">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">{name}</h2>
                        <p className="text-gray-400 text-sm mt-1">{stadium}</p>
                    </div>
                    <span className="text-green-400 text-xl">→</span>
                </div>
            </Link>
        </motion.div>
    );
}