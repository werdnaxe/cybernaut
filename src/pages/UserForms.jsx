import React from 'react'
import LoginForm from '../features/users/LoginForm'
import SignupForm from '../features/users/SignupForm'

export default function UserLogin() {
    return (
        <div className="flex-grow flex">
            {/* Left column - Login */}
            <div className="w-1/2 flex items-center justify-center bg-blue-50 border-1">
                <LoginForm />   
            </div>

            {/* Right column - Signup */}
            <div className="w-1/2 flex items-center justify-center bg-blue-50 border-1">
                <SignupForm />
            </div> 
        </div>
    );
}
