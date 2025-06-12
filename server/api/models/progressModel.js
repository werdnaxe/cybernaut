import mongoose from "mongoose";

// Define the Progress schema
const progressSchema = new mongoose.Schema({
    // Each progress document stores reference to a given user...
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    XP: {
        type: Number,
        required: true,
        default: 0,
    },
    modules: [
        {
            title: String,
            nextSubmodule: Number,
            isDisabled: Boolean,
        }
    ]
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
