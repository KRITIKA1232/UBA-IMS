import express from "express";
import userRoutes from "../routes/routes";
import AppDataSource from "../config/db"; // ✅ Correctly imported once

const app = express(); // ✅ Ensure it's declared only once

app.use(express.json());
app.use("/", userRoutes);

// ✅ Ensure database initializes once
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database connected successfully!");
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
    });

export default app; // ✅ Only one export of `app`



