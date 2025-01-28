"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Clé secrète utilisée pour signer et vérifier les JWT
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
// Middleware pour authentifier les requêtes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Récupère l'en-tête Authorization
    const token = authHeader && authHeader.split(" ")[1]; // Extrait le token après "Bearer"
    // Si aucun token n'est fourni
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    // Vérification et décodage du token
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token." });
        }
        // Ajouter les données décodées à la requête
        req.user = user;
        next(); // Passe au middleware ou contrôleur suivant
    });
};
exports.authenticateToken = authenticateToken;
