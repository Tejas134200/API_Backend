import express from "express";
import cors from "cors";
import questionRouter from "./routes/question.routes.js";
import { dbConnect } from "./coneection.js";
import authRouter from "./routes/auth.routes.js";
import studentRouter from "./routes/student.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

await dbConnect();   

app.use("/question", questionRouter);
app.use("/auth",authRouter);
app.use("/student", studentRouter);


app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
