/* This middleware checks for a valid JWT in the Authorization header. */

import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access token required');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.error('Invalid or expired token:', err);
                return res.status(403).send('Invalid or expired token');
            }

            req.user = user;   // attach decoded user info to request object
            next();   // proceed to the next middleware or route
    });
};

export default authenticateToken;
