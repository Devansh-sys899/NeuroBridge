import React from "react";
import StatCard from './StatCard';
import { useMetrics } from '../Hooks/useMetrics';

const QuickStats = () => {
    const { data, isLoading, error } = useMetrics();

    console.log('Metrics data:', data);

    if(isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div 
                    key={i} 
                    className="h-24 bg-surface rounded-xl animate-pulse"></div>
                ))}
            </div>
        )
    }

    if (error || !data) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
            label="Sessions"
            value={data.metrics.totalSessions}
            sub='Completed'
            />
            <StatCard 
            label="Avg Cognitive Load"
            value={data.metrics.avgCognitiveLoad}
            sub='Total'
            />
            <StatCard 
            label="Average Focus"
            value={`${data.metrics.avgFocus}/5`}
            sub='Self Reported'
            />
        </div>
    )
}

export default QuickStats;