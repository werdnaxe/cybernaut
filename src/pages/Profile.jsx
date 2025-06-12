/* This page will display the user's profile information, such as username and email. It will also allow the user to change their username and password.
It can be extended to include more user information and settings in the future. */

import {React, useState} from "react";
import { useAuthContext } from "../features/users/AuthProvider";

// This component wil display the user's profile information, to include username, email, and password change options.
const Profile = () => {
    const { user, updateUsername, updatePassword, deleteUser } = useAuthContext(); 
    const [error, setError] = useState('');

    // Handles username update
    const handleUsernameUpdate = async () => {
        const newUsername = prompt("Enter new username:");
        try {
            setError('');  // clear previous error message
            await updateUsername(user._id, { username: newUsername });   // calls updateUsername function from AuthProvider
        } catch (error) {
            setError(error.message);
        }
    };

    // Handles password update
    const handlePasswordUpdate = () => {
        const newPassword = prompt("Enter new password:");
        if (newPassword) {
            updatePassword(user._id, { password: newPassword });   // calls updatePassword function from AuthProvider
        }
    };

    // Should prevent reloading issue so component doesn't render before user is fetched
    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            
            {/* Username Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-lg pl-6">
                <div className="grid grid-cols-2 items-center gap-4">
                    <p className="text-xl font-medium mb-2 sm:mb-0">Username: {user.username}</p>
                    <div className="flex flex-col">
                        <button
                            onClick={handleUsernameUpdate}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Change Username
                        </button>
                        {/* Render error message if necessary */}
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </div>
            </div>

            {/* Email Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-lg pl-6">
                <div className="grid grid-cols-2 items-center gap-4">
                    <p className="text-xl font-medium mb-2 sm:mb-0 whitespace-nowrap">Email: {user.email}</p>
                </div>
            </div>

            {/* Password Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-lg pl-6">
                <div className="grid grid-cols-2 items-center gap-4">
                    <p className="text-xl font-medium mb-2 sm:mb-0">Password: </p>
                    <button
                        onClick={handlePasswordUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Change Password
                    </button>
                </div>
            </div>

            {/* Delete Account Section */}
            <button
                onClick={() => {
                    // Handle deletion of user account
                    if (window.confirm("Are you sure you want to delete your account?")) {
                        try {
                            deleteUser(user._id);   // calls deleteUser function from AuthProvider
                        } catch (error) {
                            console.error("Error deleting user:", error);
                            throw error;
                        }
                    }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-4">
                Delete Account
            </button>
        </div>
    )
}

export default Profile;
