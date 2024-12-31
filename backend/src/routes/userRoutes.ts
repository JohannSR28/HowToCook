import express from "express";
import { Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const router: Router = express.Router();

router.get("/profile", authenticateToken, (req: Request, res: Response) => {
  const user = req.user; // Récupère les données utilisateur depuis le token
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(200).json({
    message: "Profile accessed successfully.",
    user,
  });
});

// Route GET : Récupérer tous les utilisateurs
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Regex pour validation
const NAME_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Route POST : Créer un utilisateur
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;

    /*
    // Vérifier que tous les champs sont remplis
    if (!name || !username || !email || !password) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    // Validation des champs avec regex
    if (!NAME_REGEX.test(name)) {
      res.status(400).json({
        error:
          "Name must be 4-24 characters and can contain letters, numbers, underscores, or hyphens.",
      });
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: "Invalid email format." });
      return;
    }

    // Vérification de l'unicité de l'email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(409).json({ error: "Email is already in use." });
      return;
    }

    // Vérification de l'unicité du username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(409).json({ error: "Username is already in use." });
      return;
    }
    */
    // Hachage du mot de passe avec bcrypt
    const saltRounds = 10; // Nombre de rounds pour générer le sel
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création du nouvel utilisateur avec le mot de passe haché
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword, // Utiliser le mot de passe haché
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

// login route
router.post("/auth", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Recherche l'utilisateur par username
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" } // Le token expirera dans 1 heure
    );

    // Retourner le token au frontend
    res.status(200).json({
      message: "User authenticated successfully.",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred during authentication." });
  }
});

// Route DELETE : Supprimer un utilisateur par son ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
