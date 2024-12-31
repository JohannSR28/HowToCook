import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload; // Déclare la propriété `user` pour l'objet `Request`
  }
}

// Clé secrète pour signer le JWT
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Récupère le token après "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user; // Ajoute l'utilisateur décodé à la requête
    next();
  });
};
