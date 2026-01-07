import React from "react";
import SessionCard from "../Components/SessionCard";
import QuickStats from "../Components/QuickStats"
import EndSessionModal from "../Components/EndSessionModal"

const Dashboard = () => {
    return (
        <div className="flex flex-col justify-center gap-10 ml-[20%]">
            <QuickStats />
            <SessionCard />
        </div>
    )
}

export default Dashboard;