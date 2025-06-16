## Steps to run code

1. Clone the repo and 'cd' to its root
2. Run 'npm install' to install dependencies
3. 'cd' to server directory and run 'npm install'
4. in server directory run 'nodemon server'
5. in root directory run 'npm run dev'
6. open http://localhost:5173 in browser

### Environment Variables

Create a `.env` file inside the `server/` directory with the following:

MONGO_URI=your_mongodb_connection_string  
PORT=5000  
JWT_SECRET_KEY=strong_random_string (e.g., generated via 'openssl rand -base64 64')  
EMAIL_USER=from_email_address  
EMAIL_PASS=app_password  

If you need help with any of these values, please reach out to ajessex95@gmail.com.

### Creating an Account

1. Signup like you normally would for any other service. Use a real email.
2. You should receive a verification link to your email. Click it. It will expire after 10 minutes.
3. Wait to be redirected to the login page. Your account is verified and you may now login. All modules except the first one (Social Media Safe Passage 1) are locked. You may proceed in order to test.
