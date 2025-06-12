## Steps to run code

1. cd to root directory and run 'npm install'
2. cd to server directory and run 'npm install'
3. in server directory run 'nodemon server'
4. in root directory run 'npm run dev'
5. open http://localhost:5173 in browser

### Environment Variables

Create a `.env` file inside the `server/` directory with the following:

MONGO_URI=your_mongodb_connection_string  
PORT=5000

Use your own instance of database or see developer for MONGO_URI value.

### Creating an Account

1. Signup like you normally would for any other service. Use a real email.
2. You should receive a verification link to your email. Click it. It will expire after 10 minutes.
3. Wait to be redirected to the login page. Your account is verified and you may now login. All modules except the first one (Social Media Safe Passage 1) are locked. You may proceed in order to test.
