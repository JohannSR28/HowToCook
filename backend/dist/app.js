"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Initialisation de l'application
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connexion à MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/HowToCookDatabase", {})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to MongoDB");
    // Récupérer les collections de la base de données
    const db = mongoose_1.default.connection.db;
    if (!db) {
        throw new Error("Database connection failed");
    }
    const collections = yield db.listCollections().toArray();
    console.log(`Number of collections: ${collections.length}`);
    console.log("Collections:", collections.map((col) => col.name));
}))
    .catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use("/api/users", userRoutes_1.default);
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
exports.default = app;
