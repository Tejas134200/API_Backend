import express from "express";
import Student from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authAdmin } from "../middleware/auth.js";

const router = express.Router();


router.post("/login", async (req, res) => {
    const { rollNo, password } = req.body;

    const student = await Student.findOne({ rollNo });
    if (!student) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, student.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
        { id: student._id, email: student.email, role: "student" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token , rollNo});
});



router.post("/add", authAdmin, async (req, res) => {
    try {
        
        const { email, password, rollNo } = req.body;

        
        if (!email || !password || !rollNo) {
            return res.status(400).json({ error: "Email, password, and rollNo are required" });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const savedStudent = await Student.create({
            email,
            password: hashedPassword,
            rollNo,
            // questionsSolved will use defaults defined in schema
        });

        // 3. Respond (excluding password for security)
        const studentResponse = savedStudent.toObject();
        delete studentResponse.password;

        res.status(201).json({
            message: "Student registered successfully",
            data: studentResponse
        });

    } catch (err) {
        
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(409).json({ 
                error: `A student with this ${field} already exists.` 
            });
        }
        
        res.status(500).json({ error: err.message });
    }
});



router.delete("/remove/:rollNo", authAdmin, async (req, res) => {
    try {
        const { rollNo } = req.params;

        const deleted = await Student.findOneAndDelete({ rollNo });

        if (!deleted) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({
            message: "Student removed successfully",
            data: deleted
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /student/all
router.get("/all", authAdmin, async (req, res) => {
    try {
        // .select("-password") ensures we don't send hashes over the network
        const students = await Student.find().select("-password");
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/:rollNo", authAdmin, async (req, res) => {
    try {
        const { rollNo } = req.params;
        
        // Using findOne with the rollNo field
        const student = await Student.findOne({ rollNo }).select("-password");
        
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;
