import express from "express";
import dotenv from "dotenv";
import ragRoutes from "./routes/ragRoutes.js";

dotenv.config();
console.log("API KEY =", process.env.GEMINI_API_KEY);

const app = express();
app.use(express.json());

app.use("/api", ragRoutes);

app.listen(3545, () => {
    console.log("Server started at PORT:3545");
})