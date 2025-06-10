/* This page will display the user's profile information, such as username and email. It will also allow the user to change their username and password.
It can be extended to include more user information and settings in the future. */

import React from "react";
import { useAuthContext } from "../features/users/AuthProvider";

// This component wil display the user's profile information, to include username, email, and password change options.
const Profile = () => {
    const { user, updateUser, deleteUser } = useAuthContext(); 

    // Handles username update
    const handleUsernameUpdate = () => {
        const newUsername = prompt("Enter new username:");
        if (newUsername) {
            updateUser(user._id, { username: newUsername, email: user.email, password: user.password });   // calls updateUser function from AuthProvider
        }
    };

    // Handles password update
    const handlePasswordUpdate = () => {
        const newPassword = prompt("Enter new password:");
        if (newPassword) {
            updateUser(user._id, { username: user.username, email: user.email, password: newPassword });   // calls updateUser function from AuthProvider
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
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xl font-medium mb-2 sm:mb-0">Username: {user.username}</p>
                    <button
                        onClick={handleUsernameUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Change Username
                    </button>
                </div>
            </div>

            {/* Email Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xl font-medium mb-2 sm:mb-0">Email: {user.email}</p>
                </div>
            </div>

            {/* Password Section */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
