import mongoose from "mongoose";
import { Answer } from "./answersModel.js";
const UserSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/]
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        score: {
            type: Number,     
            default:0        
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }]
   
    }
)
export const User = mongoose.model('user' ,UserSchema) ;