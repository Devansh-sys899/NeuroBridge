import React from 'react'
import { UserAvatar } from '@clerk/clerk-react';

const Navbar = () => {
    return (
        <div className='h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6'>
            <h1 className="text-lg font-semibold text-white">
                NeuroBridge
            </h1>
            <div className="ml-auto">
                <div className="w-8 h-8 rounded-full bg-gray-700">
                    <UserAvatar />
                </div>
            </div>
        </div>
    )
}

export default Navbar