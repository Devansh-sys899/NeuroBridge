import { useMetrics } from '../Hooks/useMetrics';

const StatCard = ({ label, value, suffix, hint }) => {
    const isEmpty = value === null || value === undefined;

    return (
        <div className="bg-surface border border-border rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-semibold">
                { isEmpty ? '-' : `${value}${suffix = ''}`}
            </p>

            { isEmpty && (
                <p className="text-xs text-gray-500 mt-1">
                    {hint || 'Not enough data yet'}
                </p>
            )}
        </div>
    )
}

const InsightCard = ({ title, description }) => (
    <div className="bg-surface border border-border rounded-xl p-5 w-72">
        <h3 className="text-sm font-medium text-gray-300 mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

const Analytics = () => {
    const { data, isLoading, isError } = useMetrics();

    console.log('Data:', data);
    if(isLoading) {
        return <p className="text-textMuted">Loading Analytics...</p>
    }

    if(isError) {
        return <p className="text-red-400">Failed to laod analytics</p>
    }

    const { 
        totalSessions,
        avgDuration,
        avgFocus,
        knowledgeDecayIndex,
    } = data.metrics || {};

    console.log('Total Duration:', avgDuration);

    const focusInsight = avgFocus >= 4 ? 'Your focus quality is consistently strong.' : avgFocus >= 2 ? 'Your focus fluctuates, try longer sessions' : 'Focus depth is low. Consider fewer but longer sessions';

    const durationInsight = avgDuration >= 25 ? 'You are regularly entering deep work states' : avgDuration >= 5 ? 'Sessions are meaningful but still shallow.' : 'Most sessions are very short. Try staying longer';

    const decayInsight = knowledgeDecayIndex <= 0.3 ? 'Your knowledge retention is stable.' : knowledgeDecayIndex <= 0.6 ? 'Some decay detected. A revision may help' : 'High decay risk. Consider revisiting past topics';

    return (
        <div className='space-y-10'>
            <div>
                <h1 className="text-2xl font-semibold">Analytics</h1>
                <p className="text-sm text-textMuted">
                    Insights based on your focus sessions.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                label="Total Sessions"
                value={totalSessions}
                />
                <StatCard
                label="Avg Session duration"
                value={avgDuration}
                suffix=" min"
                hint="Requires longer"
                />
                <StatCard
                label="Avg Focus score"
                value={avgFocus}
                hint="Rate focus after sessions"
                />
                <StatCard
                label="Knowledge Decay Index"
                value={knowledgeDecayIndex}
                hint="Build consistency to stablilize"
                />

                <div className="grid grid-cols-3 gap-[20rem]">
                    <InsightCard
                    title="Focus Quality"
                    description={focusInsight}
                    />
                    <InsightCard
                    title="Session Depth"
                    description={durationInsight}
                    />
                    <InsightCard
                    title="Knowledge Retention"
                    description={decayInsight}
                    />
                </div>

                { totalSessions < 5 && (
                    <div className="bg-surface border-border rounded-xl p-5">
                        <p className="text-sm text-textMuted">
                            Analytics become more accurate after 5-10 meaningful sessions. Keep Going.
                        </p>
                    </div>
                )} 
            </div>
        </div>
    )    
}

export default Analytics;
