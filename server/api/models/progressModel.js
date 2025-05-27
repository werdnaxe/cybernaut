import mongoose from "mongoose";

// Define the nextSubmoduleSchema sub-schema
// This sub-schema is used to store the next submodule to be completed for each module
const nextSubmoduleSchema = new mongoose.Schema({
    module: {
        type: String,
        ref: "Module",
        required: true,
    },
    nextSubmodule: {
        type: Number,
        ref: "Submodule",
        default: 0,
    }
});

// Define the Progress schema
const progressSchema = new mongoose.Schema({
    // Each progress document stores reference to a given user...
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    XP: {
        type: Number,
        required: true,
        default: 0,
    },
    // ...as well as to modules and next submodule the user needs to complete
    submodulePerModule: {
        type: [ nextSubmoduleSchema ],
    }
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
