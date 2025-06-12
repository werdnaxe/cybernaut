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
    verificationToken: {   // used for account verification and resetting password
        type: String,
        default: null,
    },
    isVerified: {   // has user verified their account?
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model("User", userSchema);
export default User;
