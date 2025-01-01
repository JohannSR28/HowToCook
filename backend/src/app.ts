import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/recipeRoutes";

// Initialisation de l'application
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/HowToCookDatabase", {})
  .then(async () => {
    console.log("Connected to MongoDB");

    // Récupérer les collections de la base de données
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection failed");
    }
    const collections = await db.listCollections().toArray();

    console.log(`Number of collections: ${collections.length}`);
    console.log(
      "Collections:",
      collections.map((col) => col.name)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

export default app;
