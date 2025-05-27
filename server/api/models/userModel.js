import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: false,
    }
});

const User = mongoose.model("User", userSchema);
export default User;
