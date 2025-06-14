// src/index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import todoRoutes from "./routes/todo.route.js";
import meetingRoutes from "./routes/meeting.route.js"; // ✅ Add this import

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

// ✅ Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/meetings", meetingRoutes); // ✅ Mount meeting routes properly

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Start server
server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDB();
});
