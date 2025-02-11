import mongoose from "mongoose";

const questionSchema = new mongoose.Schema (
    {
        category: {
            type: String,
            required: true,
            trim: true
        },
        questionText: {
            type: String,
            required: true,
            unique: true
        },
        options: [
            {
                optionText: { type: String, required: true },
                isCorrect: { type: Boolean, required: true } // Indicates the correct option
            }
        ]
    }
)
export const Question = mongoose.model('Questions',questionSchema) ;