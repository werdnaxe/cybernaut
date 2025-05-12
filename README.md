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

See developer for `MONGO_URI` value.
