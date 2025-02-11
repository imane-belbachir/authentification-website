import mongoose from "mongoose";
import { User } from "./usermodel.js";
import { Question } from "./questionModel.js";
const AnswerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    selectedOption: {
        type: String, // Stores the selected option's text
        required: true
    },
    isCorrect: {
        type: Boolean, // True if the selected option is correct
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
export const Answer = mongoose.model("Answer", AnswerSchema);