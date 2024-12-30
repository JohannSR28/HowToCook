import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HowToCook API",
      version: "1.0.0",
      description: "API documentation for HowToCook application",
    },
  },
  apis: ["./src/routes/*.ts"], // Chemin vers vos fichiers de routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
