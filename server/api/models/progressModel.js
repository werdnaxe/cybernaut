import mongoose from "mongoose";

// Define the LastSubmodulePerModule sub-schema
// This sub-schema is used to store the last submodule completed for each module
const lastSubmodulePerModuleSchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
    },
    lastSubmodule: {
        type: mongoose.Schema.Types.ObjectId,
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
    // ...as well as to modules and last submodule the user has completed
    lastSubmodulePerModule: {
        type: [ lastSubmodulePerModuleSchema ],
    }
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
