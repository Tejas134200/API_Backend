import express from "express";
import Question from "../models/question.js";
import { authAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authAdmin , async (req, res) => {
    try {
        const { questionId, title, description, testCases, difficulty, tags } = req.body;

        // Basic validation (minimal, but helpful)
        if (!questionId || !title || !description || !testCases) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const saved = await Question.create({
            questionId,
            title,
            description,
            testCases,
            difficulty,
            tags
        });

        res.status(201).json({
            message: "Question added",
            data: saved
        });
    } catch (err) {
        // Handle duplicate questionId nicely
        if (err.code === 11000) {
            return res.status(409).json({ error: "Question with this questionId already exists" });
        }
        res.status(500).json({ error: err.message });
    }
});

router.delete("/remove/:questionId",authAdmin, async (req, res) => {
    try {
        const { questionId } = req.params;

        const deleted = await Question.findOneAndDelete({ questionId });

        if (!deleted) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.json({
            message: "Question removed successfully",
            data: deleted
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET /question/all
router.get("/all", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Get by ID
router.get("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const question = await Question.findOne({questionId:{$eq:id}});
        res.json(question);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});




export default router;
