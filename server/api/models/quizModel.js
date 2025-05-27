import mongoose from "mongoose";

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            order: {
                type: Number,
                required: true,
            },
            answers: [
                {
                    answer: {
                        type: String,
                        required: true,
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                    }
                }
            ]
        }
    ]
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
