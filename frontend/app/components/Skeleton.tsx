export function StatCardSkeleton() {
    return (
        <div className="bg-gray-900 rounded-2xl p-6 animate-pulse">
            <div className="h-3 bg-gray-700 rounded w-1/3 mb-3"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2"></div>
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="bg-gray-900 rounded-2xl p-6 h-48 animate-pulse">
            <div className="h-full bg-gray-700 rounded"></div>
        </div>
    );
}