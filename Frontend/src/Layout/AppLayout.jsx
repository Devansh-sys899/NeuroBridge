import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Dashboard from '../Pages/Dashboard'
import Session from '../Pages/Session'
import Analytics from '../Pages/Analytics'
import SignInPage from '../Pages/SignInPage'
import SignUpPage from '../Pages/SignUpPage'
import { Routes, Route } from 'react-router-dom';

const AppLayout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-950 text-white overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    )
}

export default AppLayout;