import React, { useState } from 'react'
import { useSessionStore } from '../Store/Session.store';
import { useSessionFlow } from '../Hooks/useSessionFlow';
import { useNavigate } from 'react-router-dom';

const Session = () => {
    const navigate = useNavigate();
    const { startSession } = useSessionFlow();
    const activeSessionId = useSessionStore(s => s.activeSessionId);

    if(activeSessionId) navigate('/dashboard');

    const [topic, setTopic] = useState('');
    const [intent, setIntent] = useState('Learning');
    const [difficulty, setDifficulty] = useState(3);

    const handleStart = async () => {
        if(!topic.trim()) return;

        await startSession({
            topic: topic,
            intent,
            difficulty
        });

        navigate('/dashboard');
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900 p-4'>
            <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 space-y-6 shadow-md">
                <h1 className="text-2xl font-bold text-white text-center">
                    Start Focus Session
                </h1>

                <div className="flex flex-col space-y-1">
                    <label className='text-sm text-gray-300'>
                        What are you working on?
                    </label>
                    <input 
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder='Deep work on DSA'
                    className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-300">
                        Intent
                    </label>
                    <select
                    value={intent}
                    onChange={e => setIntent(e.target.value)}
                    className='p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    >
                        <option value="Learning">Learning</option>
                        <option value="Revise">Revise</option>
                        <option value="Research">Research</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-1">
                    <label className='text-sm text-gray-300'>
                        Difficulty
                    </label>
                    <input 
                    type="text"
                    min={1}
                    max={5}
                    value={difficulty}
                    onChange={e => setDifficulty(Number(e.target.value))}
                    className='w-full accent-indigo-500 text-black p-2 rounded-md'
                    />
                    <div className="text-gray-400 text-sm">
                        Level: {difficulty}
                    </div>
                </div>

                <button
                onClick={handleStart}
                disabled={!topic.trim()}
                className={`w-full py-2 rounded-md font-semibold text-white transition ${topic.trim() ? 'bg-indigo-600 hover:bg-indigo-500': 'bg-gray-600 cursor-not-allowed'}`}>
                    Start Session
                </button>
            </div>
        </div>
    )
}

export default Session