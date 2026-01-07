import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const linkClasses = ({ isActive }) => 
        `block px-4 py-2 rounded-md text-sm ${ isActive ? "bg-gray-800 text-white" : "texy-gray-400 hover:text-white hover:bg-gray-800"}
    }`;

    return (
        <aside className='w-60 bg-gray-900 border-r border-gray-800 p-4 text-white font-semibold'>
            <nav className="space-y-2">
                <NavLink to='/dashboard' className={linkClasses}>
                    Dashboard
                </NavLink>
                <NavLink to='/session' className={linkClasses}>
                    Session
                </NavLink>
                <NavLink to='/analytics' className={linkClasses}>
                    Analytics
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;