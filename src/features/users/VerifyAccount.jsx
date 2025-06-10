/* This is the commponent that will handle a user's account verification. It's called when a user clicks the verification link in their email. Once the user is verified here, the component
sends the verification token to the backend to unlock the user's account. */
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';   // to access the URL for the verification token
import axios from 'axios';

export default function VerifyAccount() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); 
    const navigate = useNavigate();
    const [status, setStatus] = useState('');   // to show verifications status
    const [message, setMessage] = useState(['']);   // to show success or error message

    useEffect(() => {

        if (!token) {
            setStatus('error');
            setMessage('No verification token found.');
            return;
        }

        const verify = async () => {
            try {
                await axios.post(`http://localhost:5000/api/auth/verify-token?token=${token}`);
                setStatus('success');
                setMessage('Your account has been successfuly verified!');
                setTimeout(() => { navigate('/user-forms'); }, 3000);   // redirect user to login page after 3 seconds
            } catch (error) {
                console.error('Error verifying account:', error);
                setStatus('error');
                setMessage(error.response?.data || 'There was an error verifying your account.');
            }
        }

        verify();
    }, [token, navigate]);   // run effect when token changes

    return (
        <div>
            <h1 className="text-2xl mb-4">Account Verification</h1>
            {status === 'success' ? (
                <p className="text-green-500">{message}</p>
            ) : status === 'error' ? (
                <p className="text-red-500">{message}</p>
            ) : (
                <p>Verifying your account...</p>
            )}
        </div>
    );
}