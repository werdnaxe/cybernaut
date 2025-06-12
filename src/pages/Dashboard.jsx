/* This page will display the user's dynamic site information, such as game progress data like XP points accumulated or modules completed. */

import React from "react";
import { useAuthContext } from "../features/users/AuthProvider";

// This component will display the user's progress information, such as XP and current module.
const Dashboard = () => {
    const { progress } = useAuthContext(); 

    // Check for next isDisabled = true, and get the module number right before it
    const nextModuleIndex = progress?.modules?.findIndex(module => module.isDisabled === true); 
    let currentModule = nextModuleIndex !== -1 ? nextModuleIndex : progress?.modules?.length;   // current module is the one before the first disabled module, or the last module if none are disabled

    // TODO (optional): Link Current Module number to actual module page

    // Render the dashboard with user progress information and redirection link to current module/submodule
    return (
        <div className="container mx-auto p-6 max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-medium">XP:</p>
                    <span className="text-xl">{progress?.XP ?? 0}</span>   {/* guard against null or undefined progress? */}
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xl font-medium">Current Module:</p>
                    <span className="text-xl">
                        {currentModule}
                    </span>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
