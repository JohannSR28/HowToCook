import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import dotenv from "dotenv";

// Initialisation de l'application
const app = express();
dotenv.config();

// Middlewares
const allowedOrigins = [
  "http://localhost:3000",
  "https://how-to-cook-two.vercel.app/",
  "https://how-to-cook-johanns-projects-36ee6764.vercel.app/",
  "https://how-to-cook-git-main-johanns-projects-36ee6764.vercel.app/",
  "https://how-to-cook-gzxcc3zri-johanns-projects-36ee6764.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.set("trust proxy", 1); // Important pour les cookies sécurisés en production

app.use(express.json());

// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI; // Utilisation de la variable d'environnement

if (!MONGO_URI) {
  console.error("Erreur : MONGO_URI n'est pas défini dans le fichier .env");
  process.exit(1);
}
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");

    // Logs pour les collections existantes
    const db = mongoose.connection.db;
    if (db) {
      db.listCollections()
        .toArray()
        .then((collections) => {
          console.log(`Number of collections: ${collections.length}`);
          console.log(
            "Collections:",
            collections.map((col) => col.name)
          );
        })
        .catch((err) => console.error("Error fetching collections:", err));
    } else {
      console.error("Database connection is not defined.");
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

export default app;
