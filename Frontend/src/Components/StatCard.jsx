import React from "react";

const StatCard = ({ label, value, sub }) => {
    return (
        <div className="bg-surface border border-border/50 rounded-xl p-4">
            <p className="text-xs text-textMuted">{label}</p>
            <p className="text-2xl font-semibold text-textMuted mt-1">{value}</p>
            { sub && (
                <p className="text-xs text-textMuted mt-1">{sub}/</p>
            )}
        </div>
    )
}

export default StatCard;