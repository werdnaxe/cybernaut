/* This file contains the authentication routes for user login and token management. */

import express from 'express';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import authenticateToken from '../authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Login user and grant access token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if login credentials are valid, and generate token if so. Otherwise, throw 'Invalid username or password' error
    try {
        // First, retrieve username and password hash from database
        const user = await User.findOne({ username }).select('+password');   // use select('+password') since password is hashed and we can't search for it directly

        // Check if user has verified account
        if (user && !user.isVerified) {
            return res.status(403).send('Please check your email to verify your account before logging in.');
        }

        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Then, compare password with hash
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).send('Invalid username or password');
        }

        // If credentials are valid, generate a user access token
        const accessToken = jwt.sign( 
            { id: user._id }, 
            process.env.JWT_SECRET_KEY,   // backend secret token in .env, AKA the JWT secret
            { expiresIn: '15m' }
        );
        console.log('Access token generated:', accessToken);
    
        // Generate a refresh token as well. This will be used server-side to recreate new access token when current one expires
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30d' }
        );
        console.log('Refresh token generated:', refreshToken);
    
        // Set refresh token in HTTP-only cookie to live in browser
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,   // ensures cookie only accessible by server
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',   // prevents CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000   // 30 days in milliseconds
        })

        // Console log refresh token in cookie
        console.log('Refresh token set in cookie:', req.cookies.refreshToken);   // debugging line
    
        // Remove password from user object before sending response
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.send( { user: userWithoutPassword, token: accessToken } ).status(200);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in user');
    }
})

// Logout user and clear refresh token cookie
router.post('/logout', authenticateToken, (res) => {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    })
    console.log('User logged out and refresh token cleared');
    res.send('User logged out').status(200);
})

// Account verification route - sending verification email with URL containing verification token
router.post('/verify-account', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne( { email });

    // Generate a verification token
    const verificationToken = jwt.sign(
        { userID: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '10m' }
    );
    console.log('Verification token generated:', verificationToken);

    // Tie user to verification token and save to DB
    user.verificationToken = verificationToken;
    await user.save();

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Send verification email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the link: 
               http://localhost:5173/verify-account?token=${verificationToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
        res.send('Verification email sent').status(200);
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).send('Error sending verification email');
    }
});

// Verify verification token and activate user account
router.post('/verify-token', async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).send('Verification token not received');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userID);
        if (!user) return res.status(404).send('User not found');

        // If new token was issued, make sure user didn't click an old link
        if (user.verificationToken !== token) {
            return res.status(400).send('Invalid verification token');
        }

        user.isVerified = true;   // unlock user account
        user.verificationToken = null;
        await user.save();

        res.status(200).send('Account successfully verified');
    } catch (error) {
        res.status(400).send('Invalid or expired verification token');
    }
});

// Route for refreshing tokens
router.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    console.log('Received refresh token:', refreshToken);   // debugging line

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Invalid refresh token:', err);
            return res.status(403).send('Invalid or expired refresh token');
        }

        // If refresh token is valid, generate a new access token
        const accessToken = jwt.sign( 
            { id: user._id }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15m' } 
        );
        console.log('New access token generated:', accessToken);

        res.status(200).send({ accessToken });
    });
});

// Forgot username or password route
router.post('/login-help', async (req, res) => {
    // First parse the URL query parameters to determine if the user is recovering their username or resetting their password
    const option = req.query.option;   // either 'username' or 'password'

    // THen grab the email from the JSON body of the request
    const email = req.body.email;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    // Then check if the user exists in the DB with the provided email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions;
    // If the user is recovering their username, send them an email with their username. 
    if (option === 'username') {
        const username = user.username;

        // Send verification email
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Username Recovery',
            text: `Your username is ${username}\n\n - WMSMDM Team`,
        };
    } else {   // (option === 'password')
        // Generate a password reset token
        const passwordResetToken = jwt.sign( 
            { id: user._id }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: '10m' }
        );

        // Send verification email
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `Please click the link to reset your password. This link will expire in 10 minutes: 
                   http://localhost:5173/reset-password?token=${passwordResetToken}`,
        };
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Recovery email sent to:', email);
        res.status(200).send(email, 'Recovery email sent');
    } catch (error) {
        console.error('Error sending recovery email:', error);
        res.status(500).send('Error sending recovery email');
    }
});

// Reset password (logged out) route
router.put('/reset-password', async (req, res) => {
    const userID = req.body.userID;
    const user = await User.findById(userID);
    const newPassword = req.body.password;

    // Hash new password before updating
    user.password = await bcrypt.hash(newPassword, 10);
    const updatedUser = await user.save();
    console.log('Password updated:', updatedUser.password);

    res.status(200).send('Password successfully reset');
});

export default router;
