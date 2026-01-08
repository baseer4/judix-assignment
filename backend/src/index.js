import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import notesRoutes from "./routes/notes.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app =express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.VITE_FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

