import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Interface personnalisée pour définir la structure du JWT décodé
interface DecodedUser extends JwtPayload {
  userId: string;
  username: string;
}

// Étendre le type Request pour inclure le champ `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedUser; // Le champ `user` contiendra les données du JWT décodé
  }
}

// Clé secrète utilisée pour signer et vérifier les JWT
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Middleware pour authentifier les requêtes
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"]; // Récupère l'en-tête Authorization
  const token = authHeader && authHeader.split(" ")[1]; // Extrait le token après "Bearer"

  // Si aucun token n'est fourni
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Vérification et décodage du token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }

    // Ajouter les données décodées à la requête
    req.user = user as DecodedUser;
    next(); // Passe au middleware ou contrôleur suivant
  });
};
