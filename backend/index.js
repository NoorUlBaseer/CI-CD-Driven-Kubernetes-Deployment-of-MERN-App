import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Create default admin user
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        isAdmin: true,
      });
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce"
    );
    console.log("MongoDB connected successfully");

    // Create admin user after successful connection
    await createAdminUser();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
