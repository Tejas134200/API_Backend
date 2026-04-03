import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
}, { _id: false });

const questionSchema = new mongoose.Schema({
    questionId: {
        type: String,        // you can keep this as custom ID like "Q123"
        required: true,
        unique: true
    },
    title: {
        type: String,        // short title of the problem
        required: true,
        trim: true
    },
    description: {
        type: String,        // full coding problem statement
        required: true
    },
    testCases: {
        type: [testCaseSchema],
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium"
    },
    tags: {
        type: [String],     // e.g. ["dp", "graphs", "arrays"]
        default: []
    }
}, {
    timestamps: true
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
