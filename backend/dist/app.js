"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
// Initialisation de l'application
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middlewares
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
// Connexion à MongoDB
const MONGO_URI = process.env.MONGO_URI; // Utilisation de la variable d'environnement
if (!MONGO_URI) {
    console.error("Erreur : MONGO_URI n'est pas défini dans le fichier .env");
    process.exit(1);
}
mongoose_1.default
    .connect(MONGO_URI, {})
    .then(() => {
    console.log("Connected to MongoDB");
    // Logs pour les collections existantes
    const db = mongoose_1.default.connection.db;
    if (db) {
        db.listCollections()
            .toArray()
            .then((collections) => {
            console.log(`Number of collections: ${collections.length}`);
            console.log("Collections:", collections.map((col) => col.name));
        })
            .catch((err) => console.error("Error fetching collections:", err));
    }
    else {
        console.error("Database connection is not defined.");
    }
})
    .catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/recipes", recipeRoutes_1.default);
exports.default = app;
