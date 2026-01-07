import React from "react";

const StatCard = ({ label, value, sub }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-400">{label}</p>
            <p className="text-2xl font-semibold text-white mt-1">{value}</p>
            { sub && (
                <p className="text-xs text-zinc-500 mt-1">{sub}/</p>
            )}
        </div>
    )
}

export default StatCard;