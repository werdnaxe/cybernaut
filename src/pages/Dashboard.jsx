/* This page will display the user's dynamic site information, such as game progress data like XP points accumulated or modules completed. */

import React from "react";
import { useAuthContext } from "../features/users/AuthProvider";

// This component will display the user's progress information, such as XP and current module.
const Dashboard = () => {
    const { progress } = useAuthContext(); 

    // Render the dashboard with user progress information and redirection link to current module/submodule
    return (
        <div className="container mx-auto p-6 max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-medium">XP:</p>
                    <span className="text-xl">{progress?.XP ?? 0}</span>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xl font-medium">Current Module:</p>
                    <span className="text-xl">
                        {progress?.submodulePerModule?.[0]?.module ?? "N/A"}
                    </span>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
