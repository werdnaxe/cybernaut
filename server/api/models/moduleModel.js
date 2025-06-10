import mongoose from "mongoose";

// Define the Module schema
const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,               
    },
    description: {
        type: String,
        required: true,
    },
    // Each module stores reference to its quiz
    quiz: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Quiz",
    }
});

const Module = mongoose.model("Module", moduleSchema);
export default Module;
