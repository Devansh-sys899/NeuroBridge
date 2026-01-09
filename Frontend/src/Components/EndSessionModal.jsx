import React, { useState } from "react";

const EndSessionModal = ({ open, onClose, onConfirm }) => {
    const [focus, setFocus] = useState(3);

    if(!open) return null;

    return (
        <div className="fixed inset-0 bg-surface flex items-center justify-center z-50">
            <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    End Focus Session?
                </h2>
                <p className="text-sm text-textMuted mb-4">
                    How focused were you during this session?
                </p>

                <div className="flex justify-between mb-6">
                    {[1,2,3,4,5].map(val => (
                        <button 
                        key={val}
                        onClick={() => setFocus(val)}
                        className={`w-10 h-10 rounded-full border transition ${focus === val ? 'bg-indigo-600 border-indigo-500': 'border-gray-700 hover:border-gray-500'}`}>
                            {val}
                        </button>
                    ))}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-md text-gray-300 hover:text-white">
                        Cancel
                    </button>

                    <button
                    onClick={() => onConfirm(focus)}
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500">
                        End Session
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EndSessionModal;