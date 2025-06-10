import mongoose from "mongoose";

// Define the Submodule schema
const submoduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,               
    },
    description: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    // Each submodule stores reference to its parent module
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
    }
});

const Submodule = mongoose.model("Submodule", submoduleSchema);
export default Submodule;
