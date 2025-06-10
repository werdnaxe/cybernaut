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
            { expiresIn: '1h' } 
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
            secure: process.env.NODE_ENV === 'production',   // use secure cookies in production
            sameSite: 'Strict',   // prevents CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000   // 30 days in milliseconds
        })
    
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

    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Invalid refresh token:', err);
            return res.send('Invalid refresh token').status(403);
        }

        // If refresh token is valid, generate a new access token
        const accessToken = jwt.sign( 
            { id: user._id }, 
            process.env.JWT_SECRET_KEY,   // backend secret token in .env, AKA the JWT secret
            { expiresIn: '1h' } 
        );
        console.log('Access token generated:', accessToken);
    });

    res.send({ accessToken }).status(200);
})

export default router;
