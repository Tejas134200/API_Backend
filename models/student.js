// models/Student.js
import mongoose from "mongoose";

const solvedSchema = new mongoose.Schema({
    easy: {
        type: Number,
        default: 0
    },
    medium: {
        type: Number,
        default: 0
    },
    hard: {
        type: Number,
        default: 0
    }
}, { _id: false });

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    questionsSolved: {
        type: solvedSchema,
        default: () => ({})
    }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
