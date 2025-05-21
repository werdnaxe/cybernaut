import React from 'react'
import LoginForm from '../features/users/LoginForm'
import SignupForm from '../features/users/SignupForm'

export default function UserLogin() {
    return (
        <div className="h-screen flex">
            {/* Left column - Login */}
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <LoginForm />   
            </div>

            {/* Right column - Signup */}
            <div className="w-1/2 flex items-center justify-center">
                <SignupForm />
            </div> 
        </div>
    );
}
